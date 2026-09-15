"use client";

import { useEffect, useState } from "react";
import { PenLine, Star } from "lucide-react";
import { AnimatedNumber, useLive } from "@/components/live";
import { PETITION } from "@/lib/petition";

const NAV = [
  { href: "#petition", label: "Петиция" },
  { href: "#reasons", label: "Голоса людей" },
  { href: "#updates", label: "Обновления" },
  { href: "#share", label: "Поделиться" },
];

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <a href="#top" className="group flex items-center gap-3">
      <span className="relative grid size-10 place-items-center bg-crimson text-paper shadow-[0_8px_20px_-8px_rgba(179,33,43,0.8)] transition-transform duration-500 group-hover:rotate-[-8deg]">
        <Star className="size-5 fill-current" strokeWidth={1} />
        <span className="absolute inset-0 border border-paper/30" />
      </span>
      <span className="leading-none">
        <span
          className={`font-display block text-xl font-black tracking-[0.18em] ${
            tone === "light" ? "text-ink" : "text-paper"
          }`}
        >
          {PETITION.platformName}
        </span>
        <span
          className={`text-[10px] tracking-[0.28em] uppercase ${
            tone === "light" ? "text-ink-soft" : "text-paper/50"
          }`}
        >
          {PETITION.platformTagline}
        </span>
      </span>
    </a>
  );
}

export default function Header() {
  const { stats } = useLive();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled
          ? "border-line bg-paper/85 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-crimson transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 border border-line bg-paper/60 px-3 py-1.5 text-xs font-semibold sm:flex">
            <span className="size-1.5 animate-pulse-soft rounded-full bg-crimson" />
            <AnimatedNumber value={stats.count} />
            <span className="font-normal text-ink-soft">подписали</span>
          </div>
          <a
            href="#sign"
            className="group flex items-center gap-2 bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition-colors duration-300 hover:bg-crimson"
          >
            <PenLine className="size-4 transition-transform duration-300 group-hover:-rotate-6" />
            Подписать
          </a>
        </div>
      </div>
    </header>
  );
}
