"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Paperclip,
  Sparkles,
  Bot,
  User as UserIcon,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types";

const SPRING = { type: "spring" as const, stiffness: 400, damping: 30 };

const SUGGESTED_PROMPTS = [
  "J'ai une fuite sous mon évier",
  "Mon WC est bouché",
  "Pas d'eau chaude depuis ce matin",
];

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Bonjour 👋 Je suis l'assistant IA de Plomberie Express. Décrivez-moi votre problème (vous pouvez aussi joindre une photo) — je qualifie votre demande en quelques secondes.",
  timestamp: Date.now(),
};

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [unread, setUnread] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // autoscroll
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isThinking]);

  // focus input on open
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function sendMessage(text: string, hasAttachment = false, attachmentName?: string) {
    if (!text.trim() && !hasAttachment) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      role: "user",
      content: text.trim() || "(image jointe)",
      timestamp: Date.now(),
      ...(hasAttachment && attachmentName
        ? { attachment: { type: "image", name: attachmentName } }
        : {}),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsThinking(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text || "(analyse image)",
          hasAttachment,
        }),
      });
      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `a_${Date.now()}`,
        role: "assistant",
        content: data.reply ?? "…",
        timestamp: Date.now(),
      };
      setMessages((m) => [...m, botMsg]);
      if (!open) setUnread((n) => n + 1);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: `e_${Date.now()}`,
          role: "assistant",
          content:
            "Désolé, je n'arrive pas à joindre le service. Réessayez dans un instant.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  }

  // Vision AI illusion: simulated upload progress
  async function handleAttachment(file: File) {
    const uploadId = `upl_${Date.now()}`;
    const uploadMsg: ChatMessage = {
      id: uploadId,
      role: "system",
      content: file.name,
      timestamp: Date.now(),
      attachment: { type: "image", name: file.name },
    };
    setMessages((m) => [...m, uploadMsg]);

    // fake upload progress (will be re-rendered by UploadBubble)
    await new Promise((r) => setTimeout(r, 1600));

    // morph "system" upload message into a user bubble + clear progress
    setMessages((m) =>
      m.map((msg) =>
        msg.id === uploadId
          ? { ...msg, role: "user" as const, content: "📎 Photo envoyée" }
          : msg
      )
    );

    // bot replies via Vision API
    await sendMessage("(analyse image)", true, file.name);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleAttachment(file);
    e.target.value = "";
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="chat-fab"
            type="button"
            onClick={() => setOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={SPRING}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Ouvrir l'assistant IA"
            className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-white shadow-premium ring-4 ring-brand-blue/20 transition-shadow hover:shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/40"
          >
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center">
              <span className="absolute h-full w-full rounded-full bg-brand-orange opacity-60 animate-ping" />
              <span className="relative flex h-3 w-3 items-center justify-center rounded-full bg-brand-orange ring-2 ring-white">
                {unread > 0 && (
                  <span className="text-[9px] font-bold leading-none text-white">
                    {unread}
                  </span>
                )}
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-modal"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={SPRING}
            role="dialog"
            aria-modal="true"
            aria-label="Assistant IA Plomberie Express"
            className="fixed bottom-6 right-6 z-[60] flex h-[600px] max-h-[calc(100vh-4rem)] w-[calc(100vw-3rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >
            {/* Header */}
            <header className="relative flex items-center justify-between border-b border-petrol bg-petrol px-4 py-3.5 text-white">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue">
                  <Bot className="h-5 w-5" aria-hidden="true" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-brand-navy" />
                </div>
                <div className="leading-tight">
                  <p className="flex items-center gap-1.5 font-semibold">
                    Assistant IA
                    <Sparkles
                      className="h-3.5 w-3.5 text-kairo-gold"
                      aria-hidden="true"
                    />
                  </p>
                  <p className="text-[11px] text-slate-300">
                    En ligne · réponse instantanée
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer l'assistant"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4"
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
              </AnimatePresence>

              {isThinking && <TypingBubble />}
            </div>

            {/* Suggested prompts */}
            {messages.length === 1 && !isThinking && (
              <div className="border-t border-slate-200 bg-white px-4 py-2.5">
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Suggestions rapides
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_PROMPTS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => sendMessage(p)}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 transition-all hover:border-brand-blue hover:bg-brand-blue/5 hover:text-brand-blue"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-slate-200 bg-white px-3 py-3"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={onFileChange}
                accept="image/*"
                className="hidden"
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isThinking}
                aria-label="Joindre une photo (Vision IA)"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:border-kairo-gold hover:bg-kairo-gold/5 hover:text-kairo-gold disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kairo-gold"
              >
                <Paperclip className="h-4 w-4" />
              </button>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Décrivez votre problème…"
                aria-label="Message à l'assistant"
                disabled={isThinking}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm placeholder:text-slate-400 focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isThinking || !input.trim()}
                aria-label="Envoyer le message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue text-white transition-all hover:bg-brand-blue-hover disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

            {/* Footer note */}
            <p className="border-t border-slate-100 bg-white px-4 py-1.5 text-center text-[10px] text-slate-400">
              Propulsé par <span className="font-semibold text-kairo-gold">Kaïro</span> · Triage IA
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ───────────────────────── Sub components ───────────────────────── */

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  if (isSystem) {
    // Upload-in-progress bubble (Vision AI illusion)
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={SPRING}
        className="flex justify-end"
      >
        <UploadBubble fileName={message.attachment?.name ?? "image"} />
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={SPRING}
      className={cn(
        "flex items-end gap-2",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white">
          <Bot className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      )}
      <div
        className={cn(
          "max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
          isUser
            ? "rounded-br-sm bg-brand-blue text-white"
            : "rounded-bl-sm border border-slate-200 bg-white text-brand-navy"
        )}
      >
        {message.attachment && isUser && (
          <div className="mb-1.5 flex items-center gap-1.5 rounded-lg bg-white/15 px-2 py-1 text-xs">
            <ImageIcon className="h-3 w-3" aria-hidden="true" />
            <span className="truncate">{message.attachment.name}</span>
          </div>
        )}
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
      {isUser && (
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-600">
          <UserIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      )}
    </motion.div>
  );
}

function TypingBubble() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={SPRING}
      className="flex items-end gap-2"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white">
        <Bot className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
      <div className="rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
              className="h-1.5 w-1.5 rounded-full bg-brand-blue"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function UploadBubble({ fileName }: { fileName: string }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const total = 1500;
    const step = (now: number) => {
      const p = Math.min(100, ((now - start) / total) * 100);
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(step);
      else setDone(true);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="w-[78%] rounded-md rounded-br-sm border-2 border-copper/40 bg-copper/5 p-3 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-kairo-gold/15 text-kairo-gold">
          {done ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-brand-navy">
            {fileName}
          </p>
          <p className="text-[10px] text-slate-500">
            {done ? "Vision IA · prêt à analyser" : `Upload ${Math.round(progress)}%`}
          </p>
        </div>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-200">
        <motion.div
          className="h-full bg-copper"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
