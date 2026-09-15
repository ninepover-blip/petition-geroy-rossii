"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { PetitionStats } from "@/lib/data";

interface LiveContextValue {
  stats: PetitionStats;
  refresh: () => Promise<void>;
  setStats: (s: PetitionStats) => void;
  bumpShares: () => void;
}

const LiveContext = createContext<LiveContextValue | null>(null);

export function LiveProvider({
  initial,
  children,
}: {
  initial: PetitionStats;
  children: React.ReactNode;
}) {
  const [stats, setStatsState] = useState(initial);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/petition", { cache: "no-store" });
      if (res.ok) {
        const data = (await res.json()) as PetitionStats;
        setStatsState(data);
      }
    } catch {
      /* keep previous state */
    }
  }, []);

  useEffect(() => {
    timer.current = setInterval(refresh, 6000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [refresh]);

  const setStats = useCallback((s: PetitionStats) => setStatsState(s), []);
  const bumpShares = useCallback(
    () => setStatsState((prev) => ({ ...prev, sharesCount: prev.sharesCount + 1 })),
    []
  );

  return (
    <LiveContext.Provider value={{ stats, refresh, setStats, bumpShares }}>
      {children}
    </LiveContext.Provider>
  );
}

export function useLive(): LiveContextValue {
  const ctx = useContext(LiveContext);
  if (!ctx) throw new Error("useLive must be used inside LiveProvider");
  return ctx;
}

export function AnimatedNumber({
  value,
  className,
  duration = 900,
}: {
  value: number;
  className?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const from = prev.current;
    const to = value;
    prev.current = value;
    if (from === to) {
      setDisplay(to);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplay(Math.round(from + (to - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return (
    <span className={`tabular ${className ?? ""}`}>
      {new Intl.NumberFormat("ru-RU").format(display)}
    </span>
  );
}
