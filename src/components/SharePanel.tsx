"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Link2, Mail, Share2 } from "lucide-react";
import { OkIcon, TelegramIcon, VkIcon, WhatsAppIcon } from "@/components/icons";
import { AnimatedNumber, useLive } from "@/components/live";
import { Eyebrow, Reveal, SectionHeading } from "@/components/ui";
import { decl, shareUrl, type NetworkId } from "@/lib/petition";

const NETWORKS: {
  id: NetworkId;
  label: string;
  icon: (p: { className?: string }) => React.ReactNode;
  hint: string;
}[] = [
  { id: "telegram", label: "Telegram", icon: (p) => <TelegramIcon {...p} />, hint: "Каналы и чаты" },
  { id: "vk", label: "ВКонтакте", icon: (p) => <VkIcon {...p} />, hint: "Запись на стене" },
  { id: "whatsapp", label: "WhatsApp", icon: (p) => <WhatsAppIcon {...p} />, hint: "Личные сообщения" },
  { id: "ok", label: "Одноклассники", icon: (p) => <OkIcon {...p} />, hint: "Класс друзьям" },
  { id: "copy", label: "Ссылка", icon: (p) => <Copy {...p} />, hint: "Скопировать" },
  { id: "email", label: "Email", icon: (p) => <Mail {...p} />, hint: "Отправить письмо" },
];

export function useShare() {
  const { bumpShares } = useLive();
  const [copied, setCopied] = useState(false);

  const share = async (network: NetworkId) => {
    const url = window.location.href.split("#")[0];
    try {
      fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ network }),
      });
      bumpShares();
    } catch {
      /* non-blocking */
    }
    if (network === "copy") {
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = url;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
      return;
    }
    const target = shareUrl(network, url);
    if (network === "email") {
      window.location.href = target;
    } else {
      window.open(target, "_blank", "noopener,noreferrer,width=680,height=560");
    }
  };

  return { share, copied };
}

export function ShareButtons({ dark = true }: { dark?: boolean }) {
  const { share, copied } = useShare();
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {NETWORKS.map((n) => (
          <motion.button
            key={n.id}
            type="button"
            onClick={() => share(n.id)}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.96 }}
            className={`group flex flex-col items-center gap-2 border px-3 py-4 transition-colors duration-300 ${
              dark
                ? "border-paper/15 bg-paper/[0.05] hover:border-gold/60 hover:bg-paper/10"
                : "border-line bg-paper hover:border-crimson/50 hover:bg-paper-deep"
            }`}
          >
            <span
              className={`grid size-10 place-items-center rounded-full transition-colors duration-300 ${
                dark
                  ? "bg-paper/10 text-paper group-hover:bg-gold group-hover:text-ink"
                  : "bg-ink/5 text-ink group-hover:bg-crimson group-hover:text-paper"
              }`}
            >
              {n.icon({ className: "size-5" })}
            </span>
            <span className={`text-xs font-semibold ${dark ? "text-paper" : "text-ink"}`}>
              {n.label}
            </span>
            <span className={`hidden text-[10px] sm:block ${dark ? "text-paper/45" : "text-ink-soft"}`}>
              {n.hint}
            </span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`absolute -top-12 left-1/2 flex -translate-x-1/2 items-center gap-2 px-4 py-2 text-sm font-semibold whitespace-nowrap shadow-xl ${
              dark ? "bg-paper text-ink" : "bg-ink text-paper"
            }`}
          >
            <Check className="size-4 text-emerald-600" />
            Ссылка скопирована
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SharePanel() {
  const { stats } = useLive();
  return (
    <section id="share" className="relative scroll-mt-24 overflow-hidden bg-ink py-24 text-paper lg:py-32">
      <Image
        src="/images/flag.jpg"
        alt=""
        fill
        className="object-cover opacity-25"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow tone="dark">Максимальный охват</Eyebrow>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading tone="dark" className="mt-5">
              Один репост — <span className="text-gold italic">тысячи глаз</span>
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-paper/65">
              Алгоритмы соцсетей работают на нас, когда мы действуем вместе.
              Поделитесь петицией во всех сетях — это займёт меньше минуты.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.18} className="mt-12">
          <ShareButtons dark />
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-3 border border-paper/12 bg-paper/[0.05] px-6 py-4 text-sm text-paper/70">
            <Link2 className="size-4 text-gold" />
            <Share2 className="size-4 text-gold" />
            <span>
              Уже{" "}
              <AnimatedNumber
                value={stats.sharesCount}
                className="font-display text-lg font-black text-paper"
              />{" "}
              {decl(stats.sharesCount, "репост", "репоста", "репостов")} — люди
              делятся петицией по всей стране
            </span>
          </div>
        </Reveal>
      </div>

      <div className="tricolor absolute inset-x-0 bottom-0 h-1.5" />
    </section>
  );
}
