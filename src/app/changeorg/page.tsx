"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Flag, Menu, X } from "lucide-react";

export default function ChangeOrgPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSign = () => {
    document.getElementById("sign")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setError("");
    if (!firstName.trim() || !lastName.trim()) {
      setError("Укажите имя и фамилию");
      return;
    }
    if (!email.trim()) {
      setError("Укажите email");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          phone,
          email,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка");
      setSubmitted(true);
    } catch (e: any) {
      setError(e.message || "Ошибка отправки");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-[#E5231E] text-xs font-bold text-white">co</span>
            <span className="hidden text-base font-semibold tracking-tight text-gray-900 sm:block">change.org</span>
          </Link>
          <div className="hidden items-center gap-2.5 md:flex">
            <button onClick={scrollToSign} className="rounded-lg bg-[#E5231E] px-3.5 py-2 text-sm font-medium text-white hover:bg-[#c91c17]">Подписать</button>
            <Link href="https://www.change.org/start-a-petition/intro" className="rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50">Start a petition</Link>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex size-10 items-center justify-center rounded-lg hover:bg-gray-100 md:hidden" aria-label="Toggle menu">
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-gray-200 bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              <button onClick={() => { scrollToSign(); setMenuOpen(false); }} className="rounded-lg bg-[#E5231E] px-3.5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#c91c17]">Подписать</button>
              <Link href="https://www.change.org/start-a-petition/intro" className="rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50">Start a petition</Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero: photo + sign form side by side */}
      <section className="mx-auto max-w-[1200px] px-4 pt-6 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Left: Photo + title */}
          <div className="flex-1 min-w-0">
            <div className="overflow-hidden rounded-xl">
              <img
                src="/images/hero.jpg"
                alt="Николай Кривоусов"
                className="w-full object-contain"
                style={{ maxHeight: "420px" }}
              />
            </div>
            <div className="mt-5">
              <div className="h-3 w-[71px] bg-[#E5231E]" />
              <h1 className="mt-3 text-xl font-bold leading-tight text-gray-900 sm:text-2xl lg:text-3xl">
                Присвоить звание «Герой России» Кривоусову Николаю Александровичу
              </h1>
              <button onClick={scrollToSign} className="mt-4 rounded-lg bg-[#f8e74a] px-5 py-2.5 text-sm font-bold text-gray-900 transition-colors hover:bg-[#e6d640] sm:text-base">
                Подписать петицию
              </button>
            </div>
          </div>

          {/* Right: Sign form popup (appears after 5s, non-closable) */}
          <div className="w-full shrink-0 lg:w-[340px]" id="sign">
            {showPopup ? (
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.08)]">
                {submitted ? (
                  <div className="py-8 text-center">
                    <svg viewBox="0 0 24 24" fill="#16a34a" className="mx-auto size-12"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    <p className="mt-4 text-lg font-bold text-gray-900">Спасибо за подпись!</p>
                    <p className="mt-1 text-sm text-gray-500">Ваш голос важен.</p>
                  </div>
                ) : (
                  <>
                    <p className="text-center text-4xl font-bold text-gray-900">1,573</p>
                    <div className="mt-1 flex items-center justify-center gap-1.5">
                      <svg viewBox="0 0 24 24" fill="#1a73e8" className="size-4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                      <span className="text-sm text-gray-600">Verified signatures</span>
                    </div>
                    <hr className="my-5 border-gray-200" />
                    <h3 className="text-lg font-bold text-gray-900">Sign this petition</h3>
                    <div className="mt-4 space-y-3">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-700">First name</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#E5231E] focus:ring-1 focus:ring-[#E5231E]/20" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-700">Last name</label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#E5231E] focus:ring-1 focus:ring-[#E5231E]/20" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-700">Phone</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#E5231E] focus:ring-1 focus:ring-[#E5231E]/20" />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-gray-700">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#E5231E] focus:ring-1 focus:ring-[#E5231E]/20" />
                      </div>
                    </div>
                    <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-sm text-gray-600 select-none">
                      <input type="checkbox" checked={displayName} onChange={(e) => setDisplayName(e.target.checked)} className="mt-0.5 size-4 rounded border-gray-300 accent-[#E5231E]" />
                      Display my name on this petition
                    </label>
                    {error && <p className="mt-3 text-center text-sm text-red-500">{error}</p>}
                    <button onClick={handleSubmit} disabled={submitting} className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#f8e74a] px-6 py-3.5 text-base font-bold text-gray-900 transition-colors hover:bg-[#e6d640] disabled:opacity-50">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                      {submitting ? "Отправка..." : "Sign petition"}
                    </button>
                    <p className="mt-4 text-center text-[11px] leading-relaxed text-gray-400">
                      By signing, you accept Change.org&apos;s{" "}
                      <Link href="https://www.change.org/policies/terms-of-service" className="underline hover:text-gray-600">Terms of Service</Link> and{" "}
                      <Link href="https://www.change.org/policies/privacy" className="underline hover:text-gray-600">Privacy Policy</Link>.
                    </p>
                  </>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.08)] animate-pulse">
                <div className="mx-auto h-10 w-24 rounded bg-gray-200" />
                <div className="mx-auto mt-2 h-4 w-32 rounded bg-gray-100" />
                <hr className="my-5 border-gray-200" />
                <div className="space-y-3">
                  <div className="h-10 rounded-lg bg-gray-100" />
                  <div className="h-10 rounded-lg bg-gray-100" />
                  <div className="h-10 rounded-lg bg-gray-100" />
                  <div className="h-10 rounded-lg bg-gray-100" />
                </div>
                <div className="mt-5 h-12 rounded-lg bg-gray-200" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content: The Issue */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="py-10">
          <article className="max-w-3xl">
            <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
              The Issue
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-700">
              <p>
                Кривоусов Николай Александрович, уроженец пос. Бейсуг, участник СВО героически погиб 09 марта 2024 года на территории ДНР, спасая свой личный состав. На момент гибели ему было всего 25 лет. За свой короткий жизненный путь он успел совершить ряд подвигов и был награжден двумя медалями «Орден Мужества», медалью «За Отвагу», медалью «За воинскую доблесть». Еще один орден мужества Николай получить не успел.
              </p>
              <p>
                Имена героических сынов России не должны быть забыты будущими поколениями. Призываем подписать петицию о присвоении Николаю звания «Герой России» посмертно. Подпишите петицию!
              </p>
            </div>
            <div className="mt-8">
              <Link href="https://www.change.org/p/report" className="inline-flex items-center gap-1.5 text-xs text-gray-500 underline decoration-gray-300 underline-offset-2 hover:text-gray-700">
                <Flag className="size-3" />
                Report a policy violation
              </Link>
            </div>
            <hr className="my-8 border-gray-200" />
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600">ВЛ</div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Валентина Лузянина</p>
                <p className="text-xs text-gray-500">Petition Starter</p>
              </div>
            </div>
            <div className="mt-5">
              <Link href="https://www.change.org/l/ru/p/страница-пресс-службы-change-org" className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50">
                Media inquiries
              </Link>
            </div>
            <hr className="my-8 border-gray-200" />
          </article>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { title: "Get involved", links: [
                { text: "Start a petition", href: "https://www.change.org/start-a-petition/intro" },
                { text: "Browse by topic", href: "https://www.change.org/topic" },
                { text: "Browse by location", href: "https://www.change.org/local" },
                { text: "For Nonprofits", href: "https://www.change.org/nonprofit" },
                { text: "Search for petitions", href: "https://www.change.org/search" },
              ]},
              { title: "Learn", links: [
                { text: "Petition guides", href: "https://www.change.org/petition-guides" },
                { text: "Create your petition", href: "https://www.change.org/petition-guides/create-a-petition" },
                { text: "Collect signatures", href: "https://www.change.org/petition-guides/share-your-petition" },
                { text: "Reach out to media", href: "https://www.change.org/petition-guides/media" },
                { text: "Engage your Decision Maker", href: "https://www.change.org/petition-guides/engage-decision-makers" },
                { text: "Content for AI", href: "https://llms.change.org" },
              ]},
              { title: "About us", links: [
                { text: "About", href: "https://www.change.org/about" },
                { text: "Impact", href: "https://www.change.org/impact" },
                { text: "Team", href: "https://www.change.org/about/team" },
                { text: "Careers", href: "https://careers.change.org" },
                { text: "Press", href: "https://www.change.org/l/ru/p/страница-пресс-службы-change-org" },
              ]},
              { title: "Help & legal", links: [
                { text: "Help center", href: "https://help.change.org/en_US" },
                { text: "Community guidelines", href: "https://www.change.org/policies/community" },
                { text: "Privacy policy", href: "https://www.change.org/policies/privacy" },
                { text: "Terms of service", href: "https://www.change.org/policies/terms-of-service" },
                { text: "Cookie policy", href: "https://www.change.org/policies/cookies" },
                { text: "Manage cookies", href: "https://www.change.org/account_settings/manage_cookies" },
              ]},
              { title: "Follow us", links: [
                { text: "Instagram", href: "https://www.instagram.com/changedotorg" },
                { text: "X", href: "https://twitter.com/changeorgrus" },
                { text: "Facebook", href: "https://www.facebook.com/changeorgrus" },
                { text: "TikTok", href: "https://www.tiktok.com/@changedotorg" },
              ]},
            ].map((section) => (
              <div key={section.title}>
                <h4 className="text-sm font-bold text-gray-900">{section.title}</h4>
                <ul className="mt-3 space-y-2">
                  {section.links.map((link) => (
                    <li key={link.text}>
                      <Link href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-900">{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 py-6 sm:flex-row">
            <p className="text-xs text-gray-500">&copy; 2026, Change.org, PBC</p>
            <div className="flex items-center gap-3">
              <Link href="https://www.change.org/policies/privacy" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-gray-600">Privacy Policy</Link>
              <Link href="https://www.change.org/policies/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-gray-600">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
