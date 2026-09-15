import { NextResponse } from "next/server";
import { getPetitionStats } from "@/lib/data";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function sanitize(input: unknown, max: number): string {
  return String(input ?? "")
    .replace(/[^\x20-\x7E\u0400-\u04FF]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
    }

    const fullName = sanitize((body as Record<string, unknown>).fullName, 140);
    const city = sanitize((body as Record<string, unknown>).city, 140);
    const email = sanitize((body as Record<string, unknown>).email, 220).toLowerCase();
    const comment = sanitize((body as Record<string, unknown>).comment, 600);
    const isPublic = (body as Record<string, unknown>).isPublic !== false;

    if (fullName.length < 3 || !fullName.includes(" ")) {
      return NextResponse.json(
        { error: "Укажите имя и фамилию через пробел" },
        { status: 400 }
      );
    }
    if (city.length < 2) {
      return NextResponse.json({ error: "Укажите город" }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Укажите корректный email" },
        { status: 400 }
      );
    }

    const hasDb = !!process.env.DATABASE_URL;

    if (hasDb) {
      const { db } = await import("@/db");
      const { signatures } = await import("@/db/schema");
      try {
        await db.insert(signatures).values({
          fullName,
          city,
          email,
          comment: comment.length > 0 ? comment : null,
          isPublic,
        });
      } catch (err) {
        const e = err as { code?: string; cause?: { code?: string } };
        if (e?.code === "23505" || e?.cause?.code === "23505") {
          return NextResponse.json(
            { error: "Этот email уже подписан. Спасибо за поддержку!" },
            { status: 409 }
          );
        }
        throw err;
      }
    }

    const stats = await getPetitionStats();
    return NextResponse.json({ ok: true, stats }, { status: 201 });
  } catch (error) {
    console.error("POST /api/sign failed", error);
    return NextResponse.json(
      { error: "Не удалось сохранить подпись. Попробуйте ещё раз." },
      { status: 500 }
    );
  }
}
