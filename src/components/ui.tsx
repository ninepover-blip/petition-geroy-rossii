"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 32,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-semibold tracking-[0.32em] uppercase ${
        tone === "light" ? "text-ink-soft" : "text-paper/60"
      }`}
    >
      <span
        className={`inline-block h-px w-10 ${
          tone === "light" ? "bg-crimson" : "bg-gold"
        }`}
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-4xl leading-[1.04] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl ${
        tone === "light" ? "text-ink" : "text-paper"
      } ${className ?? ""}`}
    >
      {children}
    </h2>
  );
}
