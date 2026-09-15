import { NextResponse } from "next/server";
import { getPetitionStats } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = await getPetitionStats();
    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error("GET /api/petition failed", error);
    return NextResponse.json(
      { error: "Не удалось загрузить данные петиции" },
      { status: 500 }
    );
  }
}
