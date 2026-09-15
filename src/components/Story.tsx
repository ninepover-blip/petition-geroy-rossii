"use client";

import Image from "next/image";
import { Landmark, Medal } from "lucide-react";
import { Eyebrow, Reveal, SectionHeading } from "@/components/ui";
import { DEMANDS, PETITION, STORY_PARAGRAPHS } from "@/lib/petition";

export default function Story() {
  return (
    <section id="petition" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* sticky visual column */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>Текст петиции</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading className="mt-5">
              Почему эта награда —{" "}
              <span className="text-crimson italic">дело чести</span> для всех нас
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="card-paper mt-10 -rotate-[0.8deg] overflow-hidden p-3">
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image
                  src="/images/medal.jpg"
                  alt="Золотая звезда Героя Российской Федерации"
                  fill
                  className="object-cover transition-transform duration-[2000ms] hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                <p className="absolute bottom-3 left-4 text-[11px] font-semibold tracking-[0.26em] text-paper/90 uppercase">
                  Золотая звезда — высшее отличие страны
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-8 flex items-center gap-4 border border-line bg-paper-deep/70 p-5">
              <Landmark className="size-8 shrink-0 text-crimson" strokeWidth={1.4} />
              <p className="text-sm leading-relaxed text-ink-soft">
                Петиция адресована:{" "}
                <span className="font-semibold text-ink">{PETITION.addressee}</span>.
                После достижения цели пакет подписей будет официально передан в
                Администрацию Президента.
              </p>
            </div>
          </Reveal>
        </div>

        {/* text column */}
        <div>
          <Reveal>
            <div className="space-y-7 text-lg leading-[1.85] text-ink/85">
              {STORY_PARAGRAPHS.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:leading-[0.82] first-letter:font-black first-letter:text-crimson"
                      : ""
                  }
                >
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <blockquote className="font-display my-12 border-l-4 border-gold pl-7 text-2xl leading-snug font-bold text-ink italic sm:text-3xl">
              «Герой — это не тот, кто не боялся. Это тот, кто сделал шаг вперёд,
              когда боялись все».
            </blockquote>
          </Reveal>

          <Reveal delay={0.14}>
            <h3 className="flex items-center gap-3 text-sm font-bold tracking-[0.3em] text-ink uppercase">
              <Medal className="size-5 text-gold" />
              Мы требуем
            </h3>
            <ol className="mt-6 divide-y divide-line border-y border-line">
              {DEMANDS.map((d, i) => (
                <li key={i} className="group flex gap-6 py-6">
                  <span className="font-display text-4xl font-black text-ink/15 transition-colors duration-300 group-hover:text-crimson">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-1 text-base leading-relaxed text-ink/85 sm:text-lg">
                    {d}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-10 text-sm leading-relaxed text-ink-soft">
              Подписывая петицию, вы подтверждаете, что ваш голос может быть
              учтён при официальной передаче обращения. Публично отображаются
              только имя и город. Email не публикуется и нужен лишь для защиты
              от накруток.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
