import assert from 'node:assert/strict'
import { access, readFile, stat } from 'node:fs/promises'
import { before, after, beforeEach, afterEach, test } from 'node:test'
import { JSDOM } from 'jsdom'
import { createServer } from 'vite'
import { act, createElement, StrictMode } from 'react'

const dom = new JSDOM('<!doctype html><html><head><meta name="theme-color" content="#faf9f6"></head><body><div id="root"></div></body></html>', {
  url: 'http://localhost/',
  runScripts: 'outside-only',
})
globalThis.window = dom.window
globalThis.document = dom.window.document
globalThis.localStorage = dom.window.localStorage
globalThis.IS_REACT_ACT_ENVIRONMENT = true
const media = new dom.window.EventTarget()
media.matches = false
dom.window.matchMedia = () => media

const { createRoot } = await import('react-dom/client')
let server, App, root
const html = await readFile(new URL('../index.html', import.meta.url), 'utf8')
const bootstrap = html.match(/<script>([\s\S]*?)<\/script>/)[1]

before(async () => {
  server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  App = (await server.ssrLoadModule('/src/App.jsx')).default
})

beforeEach(() => {
  dom.window.localStorage.clear()
  document.documentElement.classList.remove('dark')
  media.matches = false
  root = createRoot(document.getElementById('root'))
})

afterEach(async () => { await act(() => root.unmount()) })
after(async () => { await server?.close(); dom.window.close() })

async function mount() {
  await act(() => root.render(createElement(StrictMode, null, createElement(App))))
}

async function systemTheme(dark) {
  media.matches = dark
  const event = new dom.window.Event('change')
  Object.defineProperty(event, 'matches', { value: dark })
  await act(() => media.dispatchEvent(event))
}

test('navigation, CV, and photo links resolve; page has one named main heading', async () => {
  await mount()
  assert.equal(document.querySelectorAll('h1').length, 1)
  assert.match(document.querySelector('h1').textContent, /Alikhan Ikhlassov/)
  assert.equal(document.querySelectorAll('main').length, 1)
  const ids = [...document.querySelectorAll('[id]')].map((element) => element.id)
  assert.equal(new Set(ids).size, ids.length, 'IDs must be unique')
  for (const link of document.querySelectorAll('a')) {
    const href = link.getAttribute('href')
    assert.ok(link.textContent.trim() || link.getAttribute('aria-label'), 'Links need an accessible name')
    if (href.startsWith('#')) assert.ok(document.getElementById(href.slice(1)), `Missing anchor ${href}`)
    if (href.startsWith('/')) await access(new URL(`../public${href}`, import.meta.url))
    if (link.target === '_blank') assert.ok(link.rel.includes('noopener'))
  }
  for (const section of document.querySelectorAll('section')) {
    assert.ok(document.getElementById(section.getAttribute('aria-labelledby')))
  }
})

test('all image variants exist, have descriptive alt text, and stay under 200 KB combined', async () => {
  await mount()
  let largestVariantTotal = 0
  for (const image of document.querySelectorAll('img')) {
    assert.ok(image.alt.length > 20)
    const file = new URL(`../public${image.getAttribute('src')}`, import.meta.url)
    largestVariantTotal += (await stat(file)).size
    for (const source of image.srcset.split(',')) {
      await access(new URL(`../public${source.trim().split(' ')[0]}`, import.meta.url))
    }
  }
  assert.ok(largestVariantTotal < 200 * 1024)
})

test('career and education details remain available in native disclosures', async () => {
  await mount()
  assert.equal(document.querySelectorAll('.career-entry').length, 6)
  assert.equal(document.querySelectorAll('.milestone-list > li').length, 9)
  for (const details of document.querySelectorAll('details')) {
    assert.equal(details.firstElementChild.tagName, 'SUMMARY')
    assert.ok(details.textContent.trim())
    details.open = true
    assert.equal(details.open, true)
  }
  assert.equal(document.querySelectorAll('.project-list > li').length, 2)
})

test('theme follows the OS until the visitor explicitly chooses, including in StrictMode', async () => {
  await mount()
  assert.equal(dom.window.localStorage.getItem('theme'), null)
  await systemTheme(true)
  assert.equal(document.documentElement.classList.contains('dark'), true)
  const button = document.querySelector('.theme-toggle')
  assert.equal(button.getAttribute('aria-label'), 'Switch to light theme')
  await act(() => button.click())
  assert.equal(dom.window.localStorage.getItem('theme'), 'light')
  await systemTheme(true)
  assert.equal(document.documentElement.classList.contains('dark'), false)
  assert.equal(document.querySelector('meta[name="theme-color"]').content, '#faf9f6')
})

test('saved dark preference is applied before render and survives mounting', async () => {
  dom.window.localStorage.setItem('theme', 'dark')
  dom.window.eval(bootstrap)
  assert.equal(document.documentElement.classList.contains('dark'), true)
  await mount()
  assert.equal(document.querySelector('.theme-toggle').getAttribute('aria-label'), 'Switch to light theme')
  assert.equal(document.querySelector('meta[name="theme-color"]').content, '#191a18')
})

test('theme stays usable when browser storage is blocked', async () => {
  const storage = Object.getOwnPropertyDescriptor(dom.window, 'localStorage')
  const blocked = { configurable: true, get() { throw new Error('Storage blocked') } }
  Object.defineProperty(dom.window, 'localStorage', blocked)
  Object.defineProperty(globalThis, 'localStorage', blocked)
  try {
    assert.doesNotThrow(() => dom.window.eval(bootstrap))
    await mount()
    await act(() => document.querySelector('.theme-toggle').click())
    assert.equal(document.documentElement.classList.contains('dark'), true)
  } finally {
    Object.defineProperty(dom.window, 'localStorage', storage)
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, writable: true, value: dom.window.localStorage })
  }
})

test('theme updates made in another tab are reflected locally', async () => {
  await mount()
  await act(() => dom.window.dispatchEvent(new dom.window.StorageEvent('storage', { key: 'theme', newValue: 'dark' })))
  assert.equal(document.documentElement.classList.contains('dark'), true)
  await act(() => dom.window.dispatchEvent(new dom.window.StorageEvent('storage', { key: 'theme', newValue: null })))
  assert.equal(document.documentElement.classList.contains('dark'), false)
})

test('all text colors meet WCAG AA contrast in both themes, including hover surfaces', async () => {
  const css = await readFile(new URL('../src/style.css', import.meta.url), 'utf8')
  function luminance(hex) {
    const channels = hex.match(/[a-f0-9]{2}/gi)
      .map(value => parseInt(value, 16) / 255)
      .map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4)
    return channels.reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0)
  }
  for (const theme of [':root', ':root.dark']) {
    const block = css.slice(css.indexOf(`${theme} {`)).split('}')[0]
    const tokens = Object.fromEntries([...block.matchAll(/--([\w-]+): #(\w{6})/g)].map(match => [match[1], match[2]]))
    for (const foreground of ['heading', 'body', 'muted', 'accent']) {
      for (const background of ['canvas', 'hover']) {
        const [lighter, darker] = [luminance(tokens[foreground]), luminance(tokens[background])].sort((a, b) => b - a)
        assert.ok((lighter + .05) / (darker + .05) >= 4.5, `${theme}: ${foreground} on ${background}`)
      }
    }
  }
})
