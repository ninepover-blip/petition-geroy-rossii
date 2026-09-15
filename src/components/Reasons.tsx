"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useLive } from "@/components/live";
import { Eyebrow, Reveal, SectionHeading } from "@/components/ui";
import { avatarHue, initialsOf } from "@/lib/petition";

const FALLBACK = [
  {
    id: -1,
    fullName: "Елена Морозова",
    city: "Санкт-Петербург",
    comment:
      "Герои не должны оставаться без награды. Подписываю за справедливость и память.",
    createdAt: "",
  },
  {
    id: -2,
    fullName: "Дмитрий Соколов",
    city: "Екатеринбург",
    comment:
      "Такие люди — совесть страны. Звание Героя — достойный ответ на его подвиг.",
    createdAt: "",
  },
  {
    id: -3,
    fullName: "Мария Ильина",
    city: "Казань",
    comment:
      "Спасибо за мужество. Наши дети должны знать имена настоящих героев.",
    createdAt: "",
  },
] as const;

export default function Reasons() {
  const { stats } = useLive();
  const reasons = stats.reasons.length >= 3 ? stats.reasons : [...FALLBACK];

  return (
    <section id="reasons" className="scroll-mt-24 bg-ink py-24 text-paper lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <Eyebrow tone="dark">Голоса людей</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <SectionHeading tone="dark" className="mt-5">
                Почему люди <span className="text-gold italic">подписывают</span>
              </SectionHeading>
            </Reveal>
          </div>
          <Reveal delay={0.14}>
            <p className="max-w-sm text-sm leading-relaxed text-paper/60">
              Короткие слова тех, кто уже поставил подпись. Оставьте свою причину
              в форме ниже — она станет частью народного обращения.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reasons.slice(0, 6).map((r, i) => {
            const hue = avatarHue(r.fullName);
            return (
              <motion.figure
                key={r.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col justify-between border border-paper/12 bg-paper/[0.04] p-7 transition-colors duration-500 hover:border-gold/50 hover:bg-paper/[0.07]"
              >
                <Quote className="size-8 text-gold/70 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
                <blockquote className="font-display mt-5 text-xl leading-snug font-semibold text-paper/95">
                  {r.comment}
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3">
                  <span
                    className="grid size-10 place-items-center rounded-full text-xs font-bold text-white"
                    style={{ background: `hsl(${hue} 30% 34%)` }}
                  >
                    {initialsOf(r.fullName)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{r.fullName}</span>
                    <span className="block text-xs text-paper/50">{r.city}</span>
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
