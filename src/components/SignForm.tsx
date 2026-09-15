"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Lock, PartyPopper, PenLine, Send, ShieldCheck, Timer } from "lucide-react";
import { ShareButtons } from "@/components/SharePanel";
import { AnimatedNumber, useLive } from "@/components/live";
import { Eyebrow, Reveal, SectionHeading } from "@/components/ui";
import { formatNumber } from "@/lib/petition";
import type { PetitionStats } from "@/lib/data";

const inputCls =
  "w-full border border-line bg-paper px-4 py-3.5 text-base text-ink placeholder:text-ink-soft/50 outline-none transition-all duration-300 focus:border-crimson focus:ring-2 focus:ring-crimson/15";

export default function SignForm() {
  const { stats, setStats } = useLive();
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState<string | null>(null);
  const [signedNumber, setSignedNumber] = useState<number | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus("loading");
    try {
      const res = await fetch("/api/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, city, email, comment, isPublic }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Что-то пошло не так");
        setStatus("idle");
        return;
      }
      const newStats = data.stats as PetitionStats;
      setStats(newStats);
      setSignedNumber(newStats.count);
      setStatus("success");
    } catch {
      setError("Нет соединения. Попробуйте ещё раз.");
      setStatus("idle");
    }
  };

  return (
    <section id="sign" className="relative scroll-mt-24 overflow-hidden py-24 lg:py-32">
      {/* backdrop typography */}
      <div
        aria-hidden
        className="font-display pointer-events-none absolute top-8 right-0 text-[18vw] leading-none font-black text-ink/[0.03] select-none"
      >
        ГОЛОС
      </div>

      <div className="mx-auto grid max-w-7xl items-start gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* form card */}
        <Reveal className="relative">
          <div className="card-paper relative p-7 sm:p-10">
            <span className="absolute -top-px -left-px h-14 w-14 border-t-4 border-l-4 border-crimson" />
            <span className="absolute -right-px -bottom-px h-14 w-14 border-r-4 border-b-4 border-crimson" />

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center"
                >
                  <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-600 text-paper shadow-lg">
                    <PartyPopper className="size-8" />
                  </span>
                  <h3 className="font-display mt-6 text-3xl font-black text-ink sm:text-4xl">
                    Спасибо! Ваш голос учтён
                  </h3>
                  <p className="mt-3 text-ink-soft">
                    Вы стали подписью{" "}
                    <span className="font-display text-2xl font-black text-crimson">
                      № {formatNumber(signedNumber ?? stats.count)}
                    </span>
                  </p>
                  <div className="my-8 h-px bg-line" />
                  <p className="mb-5 text-sm font-semibold tracking-[0.22em] text-ink uppercase">
                    Последний шаг — максимальный охват
                  </p>
                  <ShareButtons dark={false} />
                  <p className="mt-6 text-xs leading-relaxed text-ink-soft">
                    Отправьте ссылку трём друзьям — так петиции обычно пробивают
                    рубеж в 100 000 подписей.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="space-y-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-3xl font-black text-ink">
                      Ваша подпись
                    </h3>
                    <span className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
                      <Timer className="size-4 text-crimson" />
                      30 секунд
                    </span>
                  </div>

                  <div>
                    <label htmlFor="fullName" className="mb-1.5 block text-xs font-bold tracking-[0.18em] text-ink uppercase">
                      Имя и фамилия *
                    </label>
                    <input
                      id="fullName"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Иван Петров"
                      className={inputCls}
                      autoComplete="name"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="city" className="mb-1.5 block text-xs font-bold tracking-[0.18em] text-ink uppercase">
                        Город *
                      </label>
                      <input
                        id="city"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Москва"
                        className={inputCls}
                        autoComplete="address-level2"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-xs font-bold tracking-[0.18em] text-ink uppercase">
                        Email *
                      </label>
                      <input
                        id="email"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@mail.ru"
                        className={inputCls}
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="comment" className="mb-1.5 block text-xs font-bold tracking-[0.18em] text-ink uppercase">
                      Почему это важно для вас{" "}
                      <span className="font-normal text-ink-soft normal-case">(необязательно)</span>
                    </label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Пара слов — и ваш голос станет убедительнее…"
                      rows={3}
                      maxLength={600}
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-soft select-none">
                    <input
                      type="checkbox"
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}
                      className="mt-0.5 size-4 accent-crimson"
                    />
                    Показывать моё имя и город в ленте подписавшихся
                  </label>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 border border-crimson/30 bg-crimson/10 px-4 py-3 text-sm font-semibold text-crimson"
                      >
                        <AlertCircle className="size-4 shrink-0" />
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.985 }}
                    className="group flex w-full items-center justify-center gap-3 bg-crimson py-4.5 text-lg font-bold text-paper shadow-[0_20px_42px_-18px_rgba(179,33,43,0.8)] transition-colors duration-300 hover:bg-crimson-deep disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <>
                        <span className="size-5 animate-spin rounded-full border-2 border-paper/40 border-t-paper" />
                        Сохраняем подпись…
                      </>
                    ) : (
                      <>
                        <PenLine className="size-5 transition-transform duration-300 group-hover:-rotate-6" />
                        Подписать петицию
                        <Send className="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-[11px] leading-relaxed text-ink-soft">
                    Нажимая кнопку, вы соглашаетесь с условиями обработки
                    персональных данных. Email не публикуется.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* info column */}
        <div className="lg:pt-8">
          <Reveal>
            <Eyebrow>Присоединяйтесь</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading className="mt-5">
              Ваша подпись весит{" "}
              <span className="text-crimson italic">больше, чем кажется</span>
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft">
              Сейчас нас{" "}
              <AnimatedNumber
                value={stats.count}
                className="font-display text-xl font-black text-ink"
              />
              . Когда петиция пересекает рубеж, СМИ и ведомства начинают
              реагировать. Следующий рубеж —{" "}
              <span className="font-bold text-ink">{formatNumber(stats.goal)}</span>{" "}
              подписей.
            </p>
          </Reveal>

          <div className="mt-10 space-y-4">
            {[
              {
                icon: ShieldCheck,
                title: "Защита от накруток",
                text: "Одна подпись — один email. Мы проверяем данные, чтобы каждый голос был настоящим.",
              },
              {
                icon: Lock,
                title: "Приватность",
                text: "Публично видны только имя и город. Email хранится зашифрованным и никуда не передаётся.",
              },
              {
                icon: Send,
                title: "Официальная передача",
                text: "По достижении цели подписи будут направлены в Администрацию Президента РФ.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={0.18 + i * 0.06}>
                <div className="group flex gap-5 border border-line bg-paper-deep/50 p-5 transition-colors duration-300 hover:border-crimson/40">
                  <span className="grid size-11 shrink-0 place-items-center border border-line bg-paper text-crimson transition-colors duration-300 group-hover:bg-crimson group-hover:text-paper">
                    <item.icon className="size-5" />
                  </span>
                  <div>
                    <h4 className="font-bold text-ink">{item.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
