import { desc, sql } from "drizzle-orm";
import { db } from "@/db";
import { petitionUpdates, shares, signatures } from "@/db/schema";
import { nextGoal, PETITION } from "@/lib/petition";

export interface PublicSignature {
  id: number;
  fullName: string;
  city: string;
  comment: string | null;
  createdAt: string;
}

export interface UpdateItem {
  id: number;
  title: string;
  body: string;
  createdAt: string;
}

export interface PetitionStats {
  count: number;
  goal: number;
  cities: number;
  sharesCount: number;
  recent: PublicSignature[];
  reasons: PublicSignature[];
  daily: number[];
  updates: UpdateItem[];
}

const IMPORTED_CITIES = 214;
const IMPORTED_SHARES = 1183;

const MOCK_SIGNATURES: PublicSignature[] = [
  { id: 1, fullName: "Алексей Смирнов", city: "Москва", comment: "Каждый подвиг должен быть отмечен!", createdAt: "2026-09-14T10:00:00.000Z" },
  { id: 2, fullName: "Мария Иванова", city: "Санкт-Петербург", comment: "Такие люди — гордость нашей страны.", createdAt: "2026-09-13T15:30:00.000Z" },
  { id: 3, fullName: "Дмитрий Козлов", city: "Новосибирск", comment: "", createdAt: "2026-09-12T09:00:00.000Z" },
  { id: 4, fullName: "Елена Петрова", city: "Екатеринбург", comment: "Поддерживаю! Героев нужно чтить.", createdAt: "2026-09-11T18:00:00.000Z" },
  { id: 5, fullName: "Сергей Волков", city: "Казань", comment: "", createdAt: "2026-09-10T12:00:00.000Z" },
  { id: 6, fullName: "Ольга Новикова", city: "Краснодар", comment: "Николай Александрович — истинный герой. Подписала!", createdAt: "2026-09-09T08:00:00.000Z" },
];

export async function getPetitionStats(): Promise<PetitionStats> {
  const hasDb = !!process.env.DATABASE_URL;

  if (!hasDb) {
    const total = PETITION.importedSignatures;
    const daily = Array.from({ length: 14 }, () => Math.floor(Math.random() * 40) + 10);
    return {
      count: total,
      goal: nextGoal(total),
      cities: IMPORTED_CITIES,
      sharesCount: IMPORTED_SHARES,
      recent: MOCK_SIGNATURES,
      reasons: MOCK_SIGNATURES.filter((s) => s.comment),
      daily,
      updates: [],
    };
  }

  const [
    countRow,
    citiesRow,
    sharesRow,
    recentRows,
    reasonRows,
    dailyRows,
    updateRows,
  ] = await Promise.all([
    db
      .select({ value: sql<number>`count(*)::int` })
      .from(signatures)
      .then((r) => r[0]),
    db
      .select({ value: sql<number>`count(distinct lower(${signatures.city}))::int` })
      .from(signatures)
      .then((r) => r[0]),
    db
      .select({ value: sql<number>`count(*)::int` })
      .from(shares)
      .then((r) => r[0]),
    db
      .select({
        id: signatures.id,
        fullName: signatures.fullName,
        city: signatures.city,
        comment: signatures.comment,
        createdAt: signatures.createdAt,
      })
      .from(signatures)
      .where(sql`${signatures.isPublic} = true`)
      .orderBy(desc(signatures.createdAt))
      .limit(14),
    db
      .select({
        id: signatures.id,
        fullName: signatures.fullName,
        city: signatures.city,
        comment: signatures.comment,
        createdAt: signatures.createdAt,
      })
      .from(signatures)
      .where(
        sql`${signatures.isPublic} = true and ${signatures.comment} is not null and length(${signatures.comment}) > 12`
      )
      .orderBy(desc(signatures.createdAt))
      .limit(6),
    db
      .select({
        day: sql<string>`to_char(${signatures.createdAt} at time zone 'UTC', 'YYYY-MM-DD')`,
        value: sql<number>`count(*)::int`,
      })
      .from(signatures)
      .groupBy(sql`1`)
      .orderBy(sql`1`)
      .limit(30),
    db
      .select()
      .from(petitionUpdates)
      .orderBy(desc(petitionUpdates.createdAt))
      .limit(5),
  ]);

  const total = (countRow?.value ?? 0) + PETITION.importedSignatures;

  const byDay = new Map(dailyRows.map((r) => [r.day, r.value]));
  const daily: number[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const key = d.toISOString().slice(0, 10);
    daily.push(byDay.get(key) ?? 0);
  }

  return {
    count: total,
    goal: nextGoal(total),
    cities: (citiesRow?.value ?? 0) + IMPORTED_CITIES,
    sharesCount: (sharesRow?.value ?? 0) + IMPORTED_SHARES,
    recent: recentRows.map((r) => ({
      id: r.id,
      fullName: r.fullName,
      city: r.city,
      comment: r.comment,
      createdAt: r.createdAt.toISOString(),
    })),
    reasons: reasonRows.map((r) => ({
      id: r.id,
      fullName: r.fullName,
      city: r.city,
      comment: r.comment,
      createdAt: r.createdAt.toISOString(),
    })),
    daily,
    updates: updateRows.map((r) => ({
      id: r.id,
      title: r.title,
      body: r.body,
      createdAt: r.createdAt.toISOString(),
    })),
  };
}
