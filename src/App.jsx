import { useState, useCallback } from "react";
import { Navbar } from "./components/Navbar.jsx";
import { Hero } from "./sections/Hero.jsx";
import { Work } from "./sections/Work.jsx";
import { Career } from "./sections/Career.jsx";
import { Education } from "./sections/Education.jsx";
import { About } from "./sections/About.jsx";
import { Footer } from "./components/Footer.jsx";
import { Toast } from "./components/Toast.jsx";
import { useTheme } from "./hooks/useTheme.js";
import { site } from "./data/site.js";
import { playTactileClick } from "./utils/sound.js";

export default function App() {
  const { isDark, toggle: toggleTheme } = useTheme();
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");

  const showToast = useCallback((msg, type = "info") => {
    setToastMessage(msg);
    setToastType(type);
  }, []);

  const handleCopyEmail = useCallback(() => {
    try {
      navigator.clipboard.writeText(site.email);
      showToast(`Copied ${site.email}`, "success");
      playTactileClick("click");
    } catch {
      showToast(`Email: ${site.email}`, "info");
    }
  }, [showToast]);

  return (
    <div className="min-h-screen text-neutral-900 dark:text-neutral-100 antialiased selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900">
      {/* Floating Modern Header Dock */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        onTriggerToast={showToast}
      />

      {/* Main Content Column */}
      <main className="mx-auto max-w-2xl px-5 sm:px-8">
        <Hero onCopyEmail={handleCopyEmail} />
        <Work />
        <Career />
        <Education />
        <About />
        <Footer onCopyEmail={handleCopyEmail} />
      </main>

      {/* Unobtrusive Global Toast */}
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage("")}
      />
    </div>
  );
}
