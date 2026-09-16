"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Landmark, Share2, Star } from "lucide-react";
import { AnimatedNumber, useLive } from "@/components/live";
import { PETITION, decl, formatNumber } from "@/lib/petition";

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
            i === data.length - 1 ? "bg-hero-red" : "bg-white/20"
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
    <section id="top" className="relative bg-hero-dark pt-24 lg:pt-28">
      {/* Hero content area with photo and text */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-0">
          {/* LEFT — Text content */}
          <div className="relative z-10 flex flex-col justify-center py-12 lg:py-20 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase"
            >
              <span className="border border-hero-red/50 bg-hero-red/15 px-3 py-1.5 text-hero-red">
                Народная петиция {PETITION.id}
              </span>
              <span className="flex items-center gap-2 text-white/50">
                <Landmark className="size-4" />
                {PETITION.addressee}
              </span>
            </motion.div>

            {/* Red stripe */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 h-3 bg-hero-red max-w-[280px]"
            />

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-display mt-6 text-4xl leading-[1.05] font-black tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
            >
              {PETITION.titleTop}{" "}
              <span className="text-hero-red">
                {PETITION.titleAccent}
              </span>{" "}
              <span className="text-white">{PETITION.heroName}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-xl text-base leading-relaxed text-white/60"
            >
              Подвиг должен быть отмечен высшей наградой страны. Каждая подпись —
              это голос народной памяти, который будет услышан в Москве.
              Подпишите — и передайте дальше.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="#sign"
                className="group flex items-center gap-3 bg-hero-red px-7 py-4 text-base font-bold text-white shadow-[0_18px_40px_-16px_rgba(229,35,30,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#c91c17]"
              >
                Подписать петицию
                <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#share"
                className="group flex items-center gap-3 border border-white/20 px-7 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/10"
              >
                <Share2 className="size-5" />
                Рассказать друзьям
              </a>
            </motion.div>
          </div>

          {/* RIGHT — Photo hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:min-h-[600px]"
          >
            {/* Photo frame */}
            <div className="relative aspect-[4/5] overflow-hidden lg:absolute lg:inset-0 lg:aspect-auto">
              <Image
                src="/images/hero.jpg"
                alt="Вечный огонь — памятник героям"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gradient from right side (warm tones) */}
              <div className="absolute inset-0 bg-gradient-to-r from-hero-dark via-hero-dark/60 to-transparent lg:from-hero-dark lg:via-hero-dark/40" />
              {/* Gradient from bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-hero-dark via-transparent to-transparent" />
              {/* Photo label */}
              <div className="absolute right-6 bottom-6 left-6 z-10">
                <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/70">
                  Вечная память
                </p>
                <p className="font-display mt-1 text-2xl leading-tight font-bold text-white">
                  Николай Александрович
                  <br />
                  Кривоусов
                </p>
                <div className="mt-3 flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-white/60">
                  <span className="flex items-center gap-1 text-gold">
                    <Star className="size-3.5 fill-current" />
                    Герой России
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats bar below hero - dark background continues */}
      <div className="border-t border-white/10 bg-hero-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-6 py-6 sm:grid-cols-4 lg:gap-12"
          >
            <div>
              <div className="flex items-baseline gap-2">
                <AnimatedNumber
                  value={stats.count}
                  className="font-display text-3xl font-black text-white sm:text-4xl"
                />
                <span className="text-sm text-white/50">
                  {decl(stats.count, "подпись", "подписи", "подписей")}
                </span>
              </div>
              <p className="mt-1 text-xs text-white/40">
                уже собрано
              </p>
            </div>
            <div>
              <div className="font-display text-3xl font-black text-white sm:text-4xl">
                {formatNumber(stats.goal)}
              </div>
              <p className="mt-1 text-xs text-white/40">
                целевое число
              </p>
            </div>
            <div>
              <div className="font-display text-3xl font-black text-hero-red sm:text-4xl">
                +{formatNumber(stats.daily[stats.daily.length - 1] ?? 0)}
              </div>
              <p className="mt-1 text-xs text-white/40">
                сегодня
              </p>
            </div>
            <div className="flex items-end">
              <div className="w-full">
                <div className="mb-2 flex justify-between text-[10px] tracking-[0.2em] text-white/40 uppercase">
                  <span>Прогресс</span>
                  <span className="text-hero-red">{Math.round(pct)}%</span>
                </div>
                <div className="h-2 w-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-hero-red via-hero-red to-gold"
                  />
                </div>
                <p className="mt-2 text-[11px] text-white/50">
                  Осталось{" "}
                  <span className="font-semibold text-hero-red">
                    {formatNumber(remaining)}
                  </span>{" "}
                  {decl(remaining, "подпись", "подписи", "подписей")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Transition gradient to light content below */}
      <div className="h-16 bg-gradient-to-b from-hero-dark to-paper" />
    </section>
  );
}
