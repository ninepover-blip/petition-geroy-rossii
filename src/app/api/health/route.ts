export const dynamic = "force-dynamic";

export async function GET() {
  try {
    if (process.env.DATABASE_URL) {
      const { db } = await import("@/db");
      const { sql } = await import("drizzle-orm");
      await db.execute(sql`select 1`);
      return Response.json({ ok: true });
    }
    return Response.json({ ok: true, mode: "mock" });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
