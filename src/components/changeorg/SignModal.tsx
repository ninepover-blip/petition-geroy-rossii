"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignModal({ isOpen, onClose }: SignModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("done");
    }, 1500);
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setStatus("idle");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 size-8 rounded-full bg-gray-100 flex items-center justify-center transition-colors hover:bg-gray-200"
              aria-label="Close"
            >
              <X className="size-4 text-gray-500" />
            </button>

            {status === "done" ? (
              <div className="text-center">
                <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-green-100">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="size-7 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Спасибо!</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Ваша подпись учтена. Поделитесь петицией с друзьями.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 w-full rounded-lg bg-[#E5231E] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#c91c17]"
                >
                  Готово
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-900">Sign petition</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Присоединяйтесь к 1,573 человек.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="sign-name" className="mb-1.5 block text-xs font-semibold text-gray-700">
                      Имя и фамилия
                    </label>
                    <input
                      id="sign-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Иван Петров"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-[#E5231E] focus:ring-2 focus:ring-[#E5231E]/10"
                    />
                  </div>

                  <div>
                    <label htmlFor="sign-email" className="mb-1.5 block text-xs font-semibold text-gray-700">
                      Email
                    </label>
                    <input
                      id="sign-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@mail.ru"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-[#E5231E] focus:ring-2 focus:ring-[#E5231E]/10"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-lg bg-[#f8e74a] px-6 py-3.5 text-base font-bold text-gray-900 transition-colors hover:bg-[#FFB64D] disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === "loading" ? "Отправляем…" : "Sign"}
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    Нажимая «Sign», вы соглашаетесь с условиями обработки данных.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
