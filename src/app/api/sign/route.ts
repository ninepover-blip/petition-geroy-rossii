import { NextResponse } from "next/server";
import { google } from "googleapis";

export const dynamic = "force-dynamic";

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

function getSheetsClient() {
  if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) return null;
  const auth = new google.auth.JWT({
    email: GOOGLE_CLIENT_EMAIL,
    key: GOOGLE_PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

async function appendToSheet(values: string[]) {
  const sheets = getSheetsClient();
  if (!sheets || !SPREADSHEET_ID) return;
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Лист1!A:D",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [values] },
  });
}

async function sendTelegram(text: string) {
  if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) return;
  await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: "HTML",
    }),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
    }

    const name = String(body.name ?? "").trim().slice(0, 200);
    const phone = String(body.phone ?? "").trim().slice(0, 50);
    const email = String(body.email ?? "").trim().toLowerCase().slice(0, 220);

    if (name.length < 3) {
      return NextResponse.json({ error: "Укажите имя и фамилию" }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json({ error: "Укажите корректный email" }, { status: 400 });
    }

    const now = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

    // Append to Google Sheets: name, phone, email, Conversion Time
    await appendToSheet([name, phone, email, now]);

    // Send Telegram notification
    const msg = [
      "📢 <b>Новая подпись на петиции!</b>",
      "",
      `👤 <b>Имя:</b> ${name}`,
      `📞 <b>Телефон:</b> ${phone || "не указан"}`,
      `📧 <b>Email:</b> ${email}`,
      `🕐 <b>Время:</b> ${now}`,
    ].join("\n");
    await sendTelegram(msg);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("POST /api/sign failed", error);
    return NextResponse.json(
      { error: "Не удалось сохранить подпись. Попробуйте ещё раз." },
      { status: 500 }
    );
  }
}
