"use client";

import { CalendarDays, MapPin, Share2, Users } from "lucide-react";
import { AnimatedNumber, useLive } from "@/components/live";
import { Reveal } from "@/components/ui";
import { decl, PETITION } from "@/lib/petition";

export default function StatsStrip() {
  const { stats } = useLive();
  const days =
    Math.max(
      1,
      Math.floor((Date.now() - new Date(PETITION.startedAt).getTime()) / 86400000)
    ) || 1;

  const items = [
    {
      icon: Users,
      value: stats.count,
      label: decl(stats.count, "подпись", "подписи", "подписей") + " собрано",
    },
    {
      icon: MapPin,
      value: stats.cities,
      label: decl(stats.cities, "город", "города", "городов") + " России",
    },
    {
      icon: Share2,
      value: stats.sharesCount,
      label:
        decl(stats.sharesCount, "репост", "репоста", "репостов") + " в соцсетях",
    },
    {
      icon: CalendarDays,
      value: days,
      label: decl(days, "день", "дня", "дней") + " идёт кампания",
    },
  ];

  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-line border-x border-line lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal
            key={i}
            delay={i * 0.08}
            className="border-t border-line px-6 py-9 lg:border-t-0 lg:py-12"
          >
            <item.icon className="size-6 text-crimson" strokeWidth={1.6} />
            <AnimatedNumber
              value={item.value}
              className="font-display mt-4 block text-4xl font-black text-ink lg:text-5xl"
            />
            <p className="mt-1 text-sm text-ink-soft">{item.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
