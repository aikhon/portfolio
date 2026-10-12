import { useEffect } from "react";
import { Check, Info } from "lucide-react";

export function Toast({ message, type = "info", onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 2800);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-lg border border-line bg-surface px-4 py-3 text-sm font-medium text-heading shadow-xl transition-all animate-in fade-in slide-in-from-bottom-2"
    >
      {type === "success" ? (
        <Check className="size-4 text-status-ok shrink-0" />
      ) : (
        <Info className="size-4 text-accent shrink-0" />
      )}
      <span className="font-mono text-xs text-heading">{message}</span>
    </div>
  );
}
