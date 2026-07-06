"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Hi! I'm your Invoicezy assistant. Ask me about GST invoices, templates, or pricing."
    }
  ]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (!draft.trim()) {
      return;
    }

    const nextUser = { id: Date.now(), role: "user", text: draft.trim() };
    const nextAssistant = {
      id: Date.now() + 1,
      role: "assistant",
      text: "You can start with the free plan and upgrade later as your invoicing volume grows."
    };

    setMessages((current) => [...current, nextUser, nextAssistant]);
    setDraft("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70]">
      <AnimatePresence>
        {open ? (
          <motion.div
            key="chat-card"
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass-card mb-4 flex h-[400px] w-[300px] flex-col overflow-hidden"
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-4 light:border-slate-200 light:bg-slate-50">
              <div>
                <p className="text-sm font-semibold text-white light:text-slate-950">Invoicezy Assistant</p>
                <p className="text-xs text-slate-400">Online now</p>
              </div>
              <button className="rounded-full p-2 text-slate-400 hover:bg-white/10" onClick={() => setOpen(false)} type="button">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={message.role === "assistant" ? "mr-8 rounded-2xl bg-white/5 p-3 text-sm text-slate-200 light:bg-slate-50 light:text-slate-700" : "ml-8 rounded-2xl bg-primary/20 p-3 text-sm text-white light:bg-primary/10 light:text-primary"}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <form className="border-t border-white/10 p-4 light:border-slate-200" onSubmit={sendMessage}>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type your message"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                />
                <button
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-gradient text-white shadow-lg shadow-primary/30"
                  type="submit"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="relative flex justify-end">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/40" />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary-gradient text-white shadow-[0_20px_45px_rgba(79,70,229,0.45)]"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <MessageCircle className="h-6 w-6" />
        </motion.button>
      </div>
    </div>
  );
}
