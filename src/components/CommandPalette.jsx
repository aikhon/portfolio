import { useState, useEffect, useRef } from "react";
import {
  Search,
  Terminal,
  Compass,
  FileText,
  Mail,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  ExternalLink,
  X,
  Code2,
  Trophy,
  Briefcase,
  User,
  Zap,
} from "lucide-react";
import { site, navItems } from "../data/site.js";
import { projects } from "../data/projects.js";
import { playTactileClick, isSoundEnabled, toggleSound } from "../utils/sound.js";

export function CommandPalette({
  isOpen,
  onClose,
  onCopyEmail,
  isDark,
  toggleTheme,
  onTriggerToast,
}) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("actions"); // 'actions' | 'terminal'
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState([
    {
      type: "system",
      text: "EEKHLASSOV SHELL v2.6.4 · Host: Atyrau, KZ\nType 'help' for available commands or 'exit' to close.",
    },
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (activeTab === "terminal") {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory, activeTab]);

  const soundOn = isSoundEnabled();

  const actions = [
    {
      id: "jump-home",
      label: "Jump to Overview (01)",
      category: "Navigation",
      icon: Compass,
      perform: () => {
        window.location.hash = "#home";
        onClose();
      },
    },
    {
      id: "jump-career",
      label: "Jump to Career & Experience (02)",
      category: "Navigation",
      icon: Briefcase,
      perform: () => {
        window.location.hash = "#career";
        onClose();
      },
    },
    {
      id: "jump-education",
      label: "Jump to Accolades & Education (03)",
      category: "Navigation",
      icon: Trophy,
      perform: () => {
        window.location.hash = "#education";
        onClose();
      },
    },
    {
      id: "jump-work",
      label: "Jump to Projects (04)",
      category: "Navigation",
      icon: Code2,
      perform: () => {
        window.location.hash = "#work";
        onClose();
      },
    },
    {
      id: "jump-about",
      label: "Jump to Field Notes & Telemetry (05)",
      category: "Navigation",
      icon: User,
      perform: () => {
        window.location.hash = "#about";
        onClose();
      },
    },
    {
      id: "action-copy-email",
      label: `Copy Email (${site.email})`,
      category: "Actions",
      icon: Mail,
      perform: () => {
        onCopyEmail();
        onClose();
      },
    },
    {
      id: "action-view-cv",
      label: "Open Resume / CV (PDF)",
      category: "Actions",
      icon: FileText,
      perform: () => {
        window.open(site.resumeUrl, "_blank");
        onClose();
      },
    },
    {
      id: "action-toggle-theme",
      label: `Switch to ${isDark ? "Light" : "Dark"} Theme`,
      category: "Preferences",
      icon: isDark ? Sun : Moon,
      perform: () => {
        toggleTheme();
        playTactileClick("switch");
        onTriggerToast(`Theme switched to ${isDark ? "Light" : "Dark"} mode`);
      },
    },
    {
      id: "action-toggle-sound",
      label: soundOn ? "Disable Tactile Audio FX" : "Enable Tactile Audio FX",
      category: "Preferences",
      icon: soundOn ? VolumeX : Volume2,
      perform: () => {
        const next = toggleSound();
        playTactileClick("beep");
        onTriggerToast(next ? "Tactile audio feedback enabled" : "Tactile audio disabled");
      },
    },
    {
      id: "social-github",
      label: "Open GitHub Profile (aikhon)",
      category: "External Links",
      icon: ExternalLink,
      perform: () => {
        window.open("https://github.com/aikhon", "_blank");
      },
    },
    {
      id: "social-linkedin",
      label: "Open LinkedIn (in/ikhlassov)",
      category: "External Links",
      icon: ExternalLink,
      perform: () => {
        window.open("https://linkedin.com/in/ikhlassov", "_blank");
      },
    },
    {
      id: "social-telegram",
      label: "Direct Telegram Contact (@ikhlasov)",
      category: "External Links",
      icon: ExternalLink,
      perform: () => {
        window.open("https://t.me/ikhlasov", "_blank");
      },
    },
    {
      id: "social-monkeytype",
      label: "View Monkeytype Typist Profile (pixeln)",
      category: "External Links",
      icon: Zap,
      perform: () => {
        window.open("https://monkeytype.com/profile/pixeln", "_blank");
      },
    },
  ];

  const filteredActions = actions.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }

    if (activeTab === "actions") {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredActions.length || 1));
        playTactileClick("click");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % (filteredActions.length || 1));
        playTactileClick("click");
      } else if (e.key === "Enter" && filteredActions[selectedIndex]) {
        e.preventDefault();
        filteredActions[selectedIndex].perform();
        playTactileClick("click");
      }
    }
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    playTactileClick("click");
    const nextHistory = [...terminalHistory, { type: "input", text: `$ ${terminalInput}` }];

    switch (cmd) {
      case "help":
        nextHistory.push({
          type: "output",
          text: `AVAILABLE COMMANDS:
  whoami     - High-level bio & engineering focus
  stack      - Categorized skills & technology stack
  projects   - Key production software & field projects
  stats      - Athletics, typing speed & competitions
  contact    - Email, Telegram & professional socials
  cv         - Open curriculum vitae in browser
  theme      - Toggle between light & dark mode
  clear      - Clear terminal output
  exit       - Close command palette`,
        });
        break;
      case "whoami":
        nextHistory.push({
          type: "output",
          text: `ALIKHAN IKHLASSOV (eekhlassov / aikhon)
Location: Atyrau, Kazakhstan [UTC+5]
Role: Full-Stack Developer & Systems/Field IT Engineer
Background: WorldSkills Web Dev Champion · Software Engineering Degree at APEC Petrotechnic
Philosophy: Pragmatic systems over hype. Field-tested reliability.`,
        });
        break;
      case "stack":
        nextHistory.push({
          type: "output",
          text: `TECHNICAL STACK:
• Backend & Runtimes: C# (.NET), Python (Django, DRF, Aiogram), Node.js, PowerShell, Bash
• Frontend: React 19, Next.js, Vite, TypeScript, Tailwind CSS
• Databases & Cloud: PostgreSQL, Supabase, TursoDB (libSQL/MySQL), Vercel
• Systems & Infra: Docker & Compose, Linux VPS (SSH), TCP/IP, DHCP, PXE, LAN config, Field container setup`,
        });
        break;
      case "projects":
        nextHistory.push({
          type: "output",
          text: `ACTIVE PROJECTS:
1. Miyaly Bus (miyaly-bus.kz) - Intercity B2C transit booking platform with Kaspi.kz payment.
2. TheTochka Hospitality Suite - POS system, multi-tenant QR menu with CMS & table reservation engine.
3. Swiss Site APEC - Automated student intake & Telegram bot webhook dispatch platform.
4. KMS Corporate Portal - Next.js/Payload CMS web application + containerized field offices.`,
        });
        break;
      case "stats":
        nextHistory.push({
          type: "output",
          text: `METRICS & TELEMETRY:
• Typing Speed: 120+ WPM personal best on Monkeytype (profile: pixeln)
• Athletics: Distance runner (half-marathon training), systematic endurance
• Accolades: WorldSkills IT Solutions in Business 1st Place (Atyrau Marathon app)
• Hackathons: Atyrau Youth Hackathon winner (300,000 KZT grant)`,
        });
        break;
      case "contact":
        nextHistory.push({
          type: "output",
          text: `COMMUNICATION CHANNELS:
• Email:    ${site.email}
• Telegram: https://t.me/ikhlasov
• GitHub:   https://github.com/aikhon
• LinkedIn: https://linkedin.com/in/ikhlassov
• WhatsApp: https://wa.me/87787060150`,
        });
        break;
      case "cv":
      case "resume":
        window.open(site.resumeUrl, "_blank");
        nextHistory.push({ type: "output", text: "Opening CV / resume in new tab..." });
        break;
      case "theme":
        toggleTheme();
        nextHistory.push({ type: "output", text: `Switched theme to ${!isDark ? "Dark" : "Light"} mode.` });
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      case "exit":
      case "quit":
        onClose();
        setTerminalInput("");
        return;
      default:
        nextHistory.push({
          type: "error",
          text: `Unknown command: '${cmd}'. Type 'help' to inspect valid commands.`,
        });
    }

    setTerminalHistory(nextHistory);
    setTerminalInput("");
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Deck"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:pt-20"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Dialog Frame */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-line bg-surface shadow-2xl transition-all">
        {/* Top Header & Tabs */}
        <div className="flex items-center justify-between border-b border-line px-4 py-3 bg-surface-subtle">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-heading">
              COMMAND DECK // TERMINAL
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                setActiveTab("actions");
                playTactileClick("click");
              }}
              className={`rounded px-2.5 py-1 font-mono text-xs transition-colors ${
                activeTab === "actions"
                  ? "bg-surface text-heading font-medium border border-line shadow-xs"
                  : "text-muted hover:text-heading"
              }`}
            >
              ACTIONS
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("terminal");
                playTactileClick("click");
              }}
              className={`rounded px-2.5 py-1 font-mono text-xs transition-colors ${
                activeTab === "terminal"
                  ? "bg-surface text-heading font-medium border border-line shadow-xs"
                  : "text-muted hover:text-heading"
              }`}
            >
              SHELL
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="ml-2 rounded p-1 text-muted hover:bg-canvas hover:text-heading transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Tab 1: Actions & Search */}
        {activeTab === "actions" && (
          <div>
            <div className="flex items-center gap-3 border-b border-line px-4 py-3 bg-surface">
              <Search className="size-4 text-muted shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command, section, or link..."
                className="w-full bg-transparent text-sm text-heading placeholder:text-muted focus:outline-hidden font-mono"
              />
              <span className="rounded border border-line bg-surface-subtle px-1.5 py-0.5 font-mono text-[10px] text-muted">
                ESC
              </span>
            </div>

            <div className="max-h-96 overflow-y-auto p-2">
              {filteredActions.length === 0 ? (
                <div className="p-8 text-center font-mono text-xs text-muted">
                  No matching commands found.
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredActions.map((action, i) => {
                    const Icon = action.icon;
                    const isSelected = i === selectedIndex;
                    return (
                      <button
                        key={action.id}
                        type="button"
                        onClick={() => {
                          action.perform();
                          playTactileClick("click");
                        }}
                        onMouseEnter={() => setSelectedIndex(i)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                          isSelected
                            ? "bg-surface-active text-heading border border-line"
                            : "text-muted hover:bg-surface-subtle hover:text-heading border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`size-4 ${isSelected ? "text-accent" : "text-muted"}`} />
                          <span className={`font-mono text-xs ${isSelected ? "text-heading font-medium" : "text-body"}`}>
                            {action.label}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-muted uppercase">
                          {action.category}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 bg-surface-subtle font-mono text-[11px] text-muted">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span className="hidden sm:inline">Tip: press [ ? ] anytime</span>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Terminal Shell */}
        {activeTab === "terminal" && (
          <div className="p-4 bg-canvas font-mono text-xs">
            <div className="h-72 overflow-y-auto space-y-2.5 pr-2">
              {terminalHistory.map((line, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed whitespace-pre-wrap ${
                    line.type === "input"
                      ? "text-accent font-medium"
                      : line.type === "error"
                      ? "text-red-400"
                      : line.type === "system"
                      ? "text-muted"
                      : "text-heading"
                  }`}
                >
                  {line.text}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            <form
              onSubmit={handleTerminalSubmit}
              className="mt-3 flex items-center gap-2 border-t border-line pt-3"
            >
              <Terminal className="size-4 text-accent shrink-0" />
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type command (e.g. whoami, stack, stats, contact, clear)..."
                className="w-full bg-transparent text-xs text-heading placeholder:text-muted focus:outline-hidden font-mono"
                autoFocus
              />
              <button
                type="submit"
                className="rounded border border-line bg-surface-subtle px-2 py-1 font-mono text-[11px] text-heading hover:bg-surface-active"
              >
                RUN
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
