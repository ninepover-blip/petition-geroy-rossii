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
      <span className="relative grid size-10 place-items-center bg-hero-red text-white shadow-[0_8px_20px_-8px_rgba(229,35,30,0.8)] transition-transform duration-500 group-hover:rotate-[-8deg]">
        <Star className="size-5 fill-current" strokeWidth={1} />
        <span className="absolute inset-0 border border-white/30" />
      </span>
      <span className="leading-none">
        <span
          className={`font-display block text-xl font-black tracking-[0.18em] ${
            tone === "light" ? "text-ink" : "text-white"
          }`}
        >
          {PETITION.platformName}
        </span>
        <span
          className={`text-[10px] tracking-[0.28em] uppercase ${
            tone === "light" ? "text-ink-soft" : "text-white/50"
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
          ? "border-line bg-white/90 backdrop-blur-xl"
          : "border-white/10 bg-hero-dark/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo tone={scrolled ? "light" : "dark"} />
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`group relative text-sm font-medium transition-colors ${
                scrolled
                  ? "text-ink-soft hover:text-ink"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-hero-red transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className={`hidden items-center gap-2 border px-3 py-1.5 text-xs font-semibold sm:flex ${
            scrolled
              ? "border-line bg-white/60 text-ink"
              : "border-white/15 bg-white/5 text-white"
          }`}>
            <span className="size-1.5 animate-pulse-soft rounded-full bg-hero-red" />
            <AnimatedNumber value={stats.count} />
            <span className={`font-normal ${scrolled ? "text-ink-soft" : "text-white/50"}`}>
              подписали
            </span>
          </div>
          <a
            href="#sign"
            className={`group flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors duration-300 ${
              scrolled
                ? "bg-ink text-paper hover:bg-crimson"
                : "bg-hero-red text-white hover:bg-[#c91c17]"
            }`}
          >
            <PenLine className="size-4 transition-transform duration-300 group-hover:-rotate-6" />
            Подписать
          </a>
        </div>
      </div>
    </header>
  );
}
