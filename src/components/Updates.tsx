"use client";

import { Newspaper } from "lucide-react";
import { useLive } from "@/components/live";
import { Eyebrow, Reveal, SectionHeading } from "@/components/ui";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export default function Updates() {
  const { stats } = useLive();
  if (stats.updates.length === 0) return null;

  return (
    <section id="updates" className="scroll-mt-24 border-t border-line py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>Ход кампании</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading className="mt-5">
              Обновления <span className="text-crimson italic">инициативной группы</span>
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              Мы открыто рассказываем о каждом шаге: обращениях, ответах
              ведомств и новых рубежах. Прозрачность — основа доверия.
            </p>
          </Reveal>
        </div>

        <div className="relative border-l-2 border-line pl-8 lg:pl-12">
          {stats.updates.map((u, i) => (
            <Reveal key={u.id} delay={i * 0.08} className="relative pb-12 last:pb-0">
              <span className="absolute top-1 -left-10 grid size-5 -translate-x-[9px] place-items-center lg:-left-14">
                <span className="absolute size-5 animate-pulse-soft rounded-full bg-crimson/20" />
                <span className="relative size-2.5 rounded-full bg-crimson" />
              </span>
              <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.26em] text-crimson uppercase">
                <Newspaper className="size-4" />
                {formatDate(u.createdAt)}
              </p>
              <h3 className="font-display mt-3 text-2xl leading-tight font-bold text-ink sm:text-3xl">
                {u.title}
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
                {u.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
