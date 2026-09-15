export const PETITION = {
  id: "№ 4817",
  titleTop: "Присвоить звание",
  titleAccent: "Героя России",
  heroName: "Кривоусову Николаю Александровичу",
  addressee: "Президенту Российской Федерации",
  platformName: "ГОЛОС",
  platformTagline: "платформа народных петиций",
  importedSignatures: 4652,
  startedAt: "2026-01-12T09:00:00.000Z",
  shareText:
    "Подписываю петицию: присвоить звание Героя Российской Федерации Кривоусову Николаю Александровичу. Присоединяйтесь — каждая подпись важна!",
} as const;

export const MILESTONES = [
  100, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000,
  1000000,
];

export function nextGoal(count: number): number {
  for (const m of MILESTONES) {
    if (count < m) return m;
  }
  return MILESTONES[MILESTONES.length - 1] * 2;
}

export const DEMANDS = [
  "Признать мужество, стойкость и самопожертвование Николая Александровича Кривоусова, проявленные при исполнении воинского долга.",
  "Ходатайствовать перед Президентом Российской Федерации о присвоении ему звания Героя Российской Федерации.",
  "Увековечить его имя — в память о подвиге и как пример для будущих поколений.",
];

export const STORY_PARAGRAPHS = [
  "Мы обращаемся к Президенту Российской Федерации и к каждому неравнодушному гражданину нашей страны. Николай Александрович Кривоусов — человек, чей поступок стал примером высшего проявления долга, мужества и любви к Родине.",
  "Звание Героя Российской Федерации — высшая государственная награда. Ею отмечают заслуги перед государством и народом, связанные с совершением геройского подвига. Мы убеждены: поступок Николая Александровича достоин именно такого признания — официального, государственного, вечного.",
  "Эта петиция — не просто сбор подписей. Это народная память. Каждая подпись — слово благодарности, которое останется в истории. Подпишите, расскажите друзьям, поделитесь в соцсетях — только вместе мы донесём этот голос до тех, кто принимает решение.",
];

export const SHARE_NETWORKS = [
  { id: "telegram", label: "Telegram" },
  { id: "vk", label: "ВКонтакте" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "ok", label: "Одноклассники" },
  { id: "copy", label: "Копировать ссылку" },
  { id: "email", label: "Email" },
] as const;

export type NetworkId = (typeof SHARE_NETWORKS)[number]["id"];

export function shareUrl(network: NetworkId, url: string): string {
  const text = PETITION.shareText;
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(text);
  switch (network) {
    case "telegram":
      return `https://t.me/share/url?url=${u}&text=${t}`;
    case "vk":
      return `https://vk.com/share.php?url=${u}&comment=${t}`;
    case "whatsapp":
      return `https://wa.me/?text=${t}%20${u}`;
    case "ok":
      return `https://connect.ok.ru/offer?url=${u}&title=${t}`;
    case "email":
      return `mailto:?subject=${t}&body=${t}%20${u}`;
    default:
      return url;
  }
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("ru-RU").format(n);
}

export function timeAgo(dateIso: string): string {
  const then = new Date(dateIso).getTime();
  const diff = Math.max(0, Date.now() - then);
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "только что";
  if (minutes < 60) return `${minutes} ${decl(minutes, "минуту", "минуты", "минут")} назад`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${decl(hours, "час", "часа", "часов")} назад`;
  const days = Math.floor(hours / 24);
  return `${days} ${decl(days, "день", "дня", "дней")} назад`;
}

export function decl(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export function avatarHue(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return h;
}
