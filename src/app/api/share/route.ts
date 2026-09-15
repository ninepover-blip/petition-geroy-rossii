import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

const ALLOWED = new Set(["telegram", "vk", "whatsapp", "ok", "copy", "email"]);

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const network = String((body as Record<string, unknown> | null)?.network ?? "");
    if (!ALLOWED.has(network)) {
      return NextResponse.json({ error: "Неверная сеть" }, { status: 400 });
    }

    const hasDb = !!process.env.DATABASE_URL;

    if (hasDb) {
      const { db } = await import("@/db");
      const { shares } = await import("@/db/schema");
      await db.insert(shares).values({ network });
      const row = await db
        .select({ value: sql<number>`count(*)::int` })
        .from(shares)
        .then((r) => r[0]);
      return NextResponse.json({ ok: true, shares: row?.value ?? 0 }, { status: 201 });
    }

    return NextResponse.json({ ok: true, shares: 0 }, { status: 201 });
  } catch (error) {
    console.error("POST /api/share failed", error);
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}
