"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, PenLine } from "lucide-react";
import { Logo } from "@/components/Header";

const LINKS = [
  { href: "#petition", label: "Текст петиции" },
  { href: "#reasons", label: "Голоса людей" },
  { href: "#updates", label: "Обновления" },
  { href: "#sign", label: "Подписать" },
  { href: "#share", label: "Поделиться" },
];

export default function Footer() {
  return (
    <footer className="relative bg-ink pt-16 pb-10 text-paper">
      <div className="tricolor absolute inset-x-0 top-0 h-1.5" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-10 border-b border-paper/10 pb-12">
          <div className="max-w-sm">
            <Logo tone="dark" />
            <p className="mt-5 text-sm leading-relaxed text-paper/55">
              Независимая платформа гражданских инициатив. Мы помогаем голосу
              народа звучать громче и доходить до тех, кто принимает решения.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-14 gap-y-3">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-paper/65 transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="border border-paper/12 bg-paper/[0.04] p-5 text-sm leading-relaxed text-paper/55">
            <p className="font-semibold text-paper/85">Инициативная группа</p>
            <p className="mt-1">По вопросам кампании: golos@petition.ru</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 text-xs text-paper/40">
          <p>© 2026 Платформа «ГОЛОС». Петиция № 4817.</p>
          <p className="flex items-center gap-1.5">
            Сделано людьми для людей
            <Heart className="size-3.5 fill-crimson text-crimson" />
          </p>
        </div>
      </div>
    </footer>
  );
}

export function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const signEl = document.getElementById("sign");
      const rect = signEl?.getBoundingClientRect();
      const nearForm = rect ? rect.top < window.innerHeight && rect.bottom > 0 : false;
      setVisible(window.scrollY > 480 && !nearForm);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper/90 p-3 backdrop-blur-xl lg:hidden"
        >
          <a
            href="#sign"
            className="flex w-full items-center justify-center gap-2 bg-crimson py-3.5 text-base font-bold text-paper shadow-lg"
          >
            <PenLine className="size-5" />
            Подписать петицию
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
