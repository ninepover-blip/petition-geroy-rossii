"use client";

import { motion } from "framer-motion";
import { useLive } from "@/components/live";
import { avatarHue, initialsOf, timeAgo } from "@/lib/petition";
import type { PublicSignature } from "@/lib/data";

function SignatureChip({ sig }: { sig: PublicSignature }) {
  const hue = avatarHue(sig.fullName);
  return (
    <div className="card-paper flex shrink-0 items-center gap-3 rounded-full py-2 pr-5 pl-2">
      <span
        className="grid size-9 shrink-0 place-items-center rounded-full text-xs font-bold text-white"
        style={{ background: `hsl(${hue} 32% 32%)` }}
      >
        {initialsOf(sig.fullName)}
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold whitespace-nowrap text-ink">
          {sig.fullName}
        </span>
        <span className="block text-xs whitespace-nowrap text-ink-soft">
          {sig.city} · {timeAgo(sig.createdAt)}
        </span>
      </span>
    </div>
  );
}

function Row({ items, reverse }: { items: PublicSignature[]; reverse?: boolean }) {
  const tripled = [...items, ...items, ...items];
  return (
    <div className="marquee-paused relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`flex w-max items-center gap-4 py-2 pr-4 ${
          reverse ? "animate-marquee-right" : "animate-marquee-left"
        }`}
      >
        {tripled.map((sig, i) => (
          <SignatureChip key={`${sig.id}-${i}`} sig={sig} />
        ))}
      </div>
    </div>
  );
}

export default function Ticker() {
  const { stats } = useLive();
  const items = stats.recent.slice(0, 12);
  if (items.length < 4) return null;
  const half = Math.ceil(items.length / 2);
  return (
    <section aria-label="Последние подписавшие" className="relative border-y border-line bg-paper-deep/60 py-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="space-y-3"
      >
        <Row items={items.slice(0, half)} />
        <Row items={items.slice(half)} reverse />
      </motion.div>
      <p className="mt-4 text-center text-[11px] font-semibold tracking-[0.3em] text-ink-soft uppercase">
        Люди подписывают прямо сейчас
      </p>
    </section>
  );
}

export function WordStrip() {
  const words = ["Мужество", "Память", "Долг", "Честь", "Герой России", "Отечество"];
  const line = [...words, ...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-line bg-ink py-3 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="animate-marquee-left flex w-max items-center gap-8">
        {line.map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-sm font-bold tracking-[0.3em] whitespace-nowrap text-paper/80 uppercase">
              {w}
            </span>
            <span className="size-1.5 rotate-45 bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
