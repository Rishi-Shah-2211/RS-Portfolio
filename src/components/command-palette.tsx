"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Cmd = {
  id: string;
  label: string;
  hint: string;
  keywords?: string;
  run: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const commands = useMemo<Cmd[]>(() => {
    const go = (hash: string) => () => {
      close();
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else window.location.href = `/${hash}`;
    };
    const ext = (url: string) => () => {
      close();
      window.open(url, "_blank", "noopener,noreferrer");
    };
    return [
      { id: "work", label: "Go to Work", hint: "Section", run: go("#work") },
      { id: "prep", label: "Go to Test-Prep Suite", hint: "Section", keywords: "ielts gre sat kanan exam", run: go("#test-prep") },
      { id: "about", label: "Go to About", hint: "Section", run: go("#about") },
      { id: "skills", label: "Go to Stack", hint: "Section", run: go("#skills") },
      { id: "contact", label: "Go to Contact", hint: "Section", run: go("#contact") },
      { id: "ielts-a", label: "Open IELTS Academic simulator", hint: "Launch ↗", keywords: "test prep exam", run: ext("https://kanan-ielts-academic.vercel.app") },
      { id: "ielts-g", label: "Open IELTS General simulator", hint: "Launch ↗", keywords: "test prep exam", run: ext("https://kanan-ielts-general.vercel.app") },
      { id: "gre", label: "Open GRE simulator", hint: "Launch ↗", keywords: "test prep exam", run: ext("https://kanan-gre.vercel.app") },
      {
        id: "email",
        label: "Copy email address",
        hint: "rishishah457@gmail.com",
        keywords: "contact mail hire",
        run: () => {
          navigator.clipboard?.writeText("rishishah457@gmail.com");
          close();
        },
      },
      { id: "mailto", label: "Start an email", hint: "Get in touch", keywords: "hire contact", run: ext("mailto:rishishah457@gmail.com") },
    ];
  }, [close]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.hint} ${c.keywords ?? ""}`.toLowerCase().includes(q),
    );
  }, [commands, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[200] flex items-start justify-center bg-cream-dim/70 px-4 pt-[18vh] backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl overflow-hidden rounded-lg border border-ink/15 bg-paper shadow-[0_42px_120px_-30px_rgba(0,0,0,0.7)]"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onListKey}
          >
            <div className="flex items-center gap-3 border-b border-ink/10 px-5 py-4">
              <span className="text-ink-mute">⌘</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section, launch a simulator…"
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-mute"
              />
              <kbd className="rounded border border-ink/15 px-1.5 py-0.5 font-mono text-[10px] text-ink-mute">
                esc
              </kbd>
            </div>
            <ul className="max-h-[40vh] overflow-y-auto py-2 no-scrollbar">
              {filtered.length === 0 && (
                <li className="px-5 py-4 text-sm text-ink-mute">No matches.</li>
              )}
              {filtered.map((c, i) => (
                <li key={c.id}>
                  <button
                    onClick={c.run}
                    onMouseEnter={() => setActive(i)}
                    className={`flex w-full items-center justify-between px-5 py-3 text-left text-sm transition-colors ${
                      i === active ? "bg-cream text-ink" : "text-ink-soft"
                    }`}
                  >
                    <span>{c.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                      {c.hint}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-ink/10 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
              ↑↓ navigate · ↵ select · ⌘K toggle
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
