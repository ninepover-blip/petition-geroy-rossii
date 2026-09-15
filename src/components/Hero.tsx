"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Landmark, Share2, Star } from "lucide-react";
import { AnimatedNumber, useLive } from "@/components/live";
import { PETITION, decl, formatNumber } from "@/lib/petition";

function CircularStamp() {
  return (
    <div className="absolute -bottom-8 -left-8 z-10 hidden size-36 md:block lg:size-40">
      <div className="absolute inset-0 rounded-full border-2 border-gold/70 bg-ink/90 shadow-2xl backdrop-blur" />
      <svg viewBox="0 0 120 120" className="animate-spin-slow absolute inset-0 size-full">
        <defs>
          <path id="stampCircle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text className="fill-gold text-[10.5px] font-semibold tracking-[0.22em]">
          <textPath href="#stampCircle">
            ГЕРОЙ РОССИИ • НАРОДНАЯ ПЕТИЦИЯ • ЗОЛОТАЯ ЗВЕЗДА •
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <Star className="size-10 fill-gold text-gold" strokeWidth={1} />
      </div>
    </div>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(1, ...data);
  return (
    <div className="flex h-12 items-end gap-1" aria-hidden>
      {data.map((v, i) => (
        <motion.div
          key={i}
          initial={{ height: 2 }}
          whileInView={{ height: `${Math.max(6, (v / max) * 100)}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full rounded-t-[2px] ${
            i === data.length - 1 ? "bg-crimson" : "bg-ink/25"
          }`}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const { stats } = useLive();
  const remaining = Math.max(0, stats.goal - stats.count);
  const pct = Math.min(100, (stats.count / stats.goal) * 100);

  return (
    <section id="top" className="relative overflow-hidden pt-28 lg:pt-36">
      {/* backdrop typography */}
      <div
        aria-hidden
        className="font-display pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 text-[26vw] leading-none font-black whitespace-nowrap text-ink/[0.035] select-none"
      >
        ГЕРОЙ
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pb-24">
        {/* LEFT */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase"
          >
            <span className="border border-crimson/40 bg-crimson/10 px-3 py-1.5 text-crimson">
              Народная петиция {PETITION.id}
            </span>
            <span className="flex items-center gap-2 text-ink-soft">
              <Landmark className="size-4" />
              {PETITION.addressee}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mt-6 text-[2.6rem] leading-[0.98] font-black tracking-tight text-balance sm:text-6xl lg:text-[4.4rem]"
          >
            {PETITION.titleTop}{" "}
            <span className="relative inline-block text-crimson italic">
              {PETITION.titleAccent}
              <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-gold/80" />
            </span>{" "}
            <span className="text-ink">{PETITION.heroName}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            Подвиг должен быть отмечен высшей наградой страны. Каждая подпись —
            это голос народной памяти, который будет услышан в Москве.
            Подпишите — и передайте дальше.
          </motion.p>

          {/* progress */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 border-y border-line py-7"
          >
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <AnimatedNumber
                    value={stats.count}
                    className="font-display text-6xl font-black text-ink sm:text-7xl"
                  />
                  <span className="text-lg text-ink-soft">
                    {decl(stats.count, "подпись", "подписи", "подписей")}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink-soft">
                  уже собрано · цель —{" "}
                  <span className="font-semibold text-ink">
                    {formatNumber(stats.goal)}
                  </span>
                </p>
              </div>
              <div className="min-w-40 flex-1 sm:flex-none">
                <div className="mb-2 flex justify-between text-[11px] tracking-[0.2em] text-ink-soft uppercase">
                  <span>Динамика, 14 дней</span>
                  <span className="font-semibold text-crimson">
                    +{formatNumber(stats.daily[stats.daily.length - 1] ?? 0)} сегодня
                  </span>
                </div>
                <Sparkline data={stats.daily} />
              </div>
            </div>

            <div className="relative mt-6">
              <div className="h-[3px] w-full bg-ink/12" />
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-crimson-deep via-crimson to-gold"
              />
              <motion.div
                initial={{ left: 0 }}
                whileInView={{ left: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <Star className="size-5 fill-gold text-gold drop-shadow" />
              </motion.div>
            </div>
            <p className="mt-3 text-sm text-ink-soft">
              Осталось{" "}
              <span className="font-semibold text-crimson">
                {formatNumber(remaining)}
              </span>{" "}
              {decl(remaining, "подпись", "подписи", "подписей")} до следующего
              рубежа — {formatNumber(stats.goal)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#sign"
              className="group flex items-center gap-3 bg-crimson px-7 py-4 text-base font-bold text-paper shadow-[0_18px_40px_-16px_rgba(179,33,43,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-crimson-deep"
            >
              Подписать петицию
              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#share"
              className="group flex items-center gap-3 border border-ink/25 px-7 py-4 text-base font-semibold text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-paper"
            >
              <Share2 className="size-5" />
              Рассказать друзьям
            </a>
          </motion.div>
        </div>

        {/* RIGHT — portrait card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:pl-8"
        >
          <div className="card-paper relative rotate-[0.6deg] p-3 transition-transform duration-700 hover:rotate-0">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/hero.jpg"
                alt="Вечный огонь — памятник героям"
                fill
                priority
                className="object-cover transition-transform duration-[2000ms] hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute right-4 bottom-4 left-4 text-paper">
                <p className="text-[10px] font-semibold tracking-[0.3em] uppercase opacity-80">
                  Вечная память
                </p>
                <p className="font-display mt-1 text-2xl leading-tight font-bold">
                  Николай Александрович
                  <br />
                  Кривоусов
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between px-2 pt-3 pb-1 text-[11px] tracking-[0.22em] text-ink-soft uppercase">
              <span>К высшей награде страны</span>
              <span className="flex items-center gap-1 text-gold">
                <Star className="size-3.5 fill-current" />
                Герой России
              </span>
            </div>
            <CircularStamp />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
