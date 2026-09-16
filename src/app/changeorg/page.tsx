"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flag, Menu, X } from "lucide-react";

export default function ChangeOrgPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSign = () => {
    document.getElementById("sign")?.scrollIntoView({ behavior: "smooth" });
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
            <Link href="#" className="rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50">Start a petition</Link>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex size-10 items-center justify-center rounded-lg hover:bg-gray-100 md:hidden" aria-label="Toggle menu">
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-gray-200 bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              <button onClick={() => { scrollToSign(); setMenuOpen(false); }} className="rounded-lg bg-[#E5231E] px-3.5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#c91c17]">Подписать</button>
              <Link href="#" className="rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50">Start a petition</Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero with photo + title overlay */}
      <section className="relative">
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <img
            src="/images/hero.jpg"
            alt="Николай Кривоусов"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-white/20" />
          <div className="absolute right-0 bottom-0 left-0 px-4 pb-8 sm:px-8 lg:px-16">
            <div className="mx-auto max-w-[1200px]">
              <div className="h-3 w-[71px] bg-[#E5231E]" />
              <h1 className="mt-4 max-w-2xl text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                Присвоить звание «Герой России» Кривоусову Николаю Александровичу
              </h1>
              <button onClick={scrollToSign} className="mt-5 rounded-lg bg-[#f8e74a] px-6 py-3 text-base font-bold text-gray-900 transition-colors hover:bg-[#e6d640]">
                Подписать петицию
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content: two columns */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid gap-10 py-10 lg:grid-cols-[1fr_340px] lg:gap-14">

          {/* Left: The Issue */}
          <article>
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
              <Link href="#" className="inline-flex items-center gap-1.5 text-xs text-gray-500 underline decoration-gray-300 underline-offset-2 hover:text-gray-700">
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
              <Link href="#" className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50">
                Media inquiries
              </Link>
            </div>
            <hr className="my-8 border-gray-200" />
          </article>

          {/* Right: Sidebar with sign form */}
          <div id="sign" className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-2xl bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.08)] border border-gray-100">
              {/* Signature count */}
              <p className="text-center text-4xl font-bold text-gray-900">1,573</p>
              <div className="mt-1 flex items-center justify-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="#1a73e8" className="size-4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                <span className="text-sm text-gray-600">Verified signatures</span>
              </div>

              <hr className="my-5 border-gray-200" />

              {/* Sign form */}
              <h3 className="text-lg font-bold text-gray-900">Sign this petition</h3>

              <div className="mt-4 space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">First name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#E5231E] focus:ring-1 focus:ring-[#E5231E]/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">Last name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#E5231E] focus:ring-1 focus:ring-[#E5231E]/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#E5231E] focus:ring-1 focus:ring-[#E5231E]/20"
                  />
                </div>
              </div>

              <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-sm text-gray-600 select-none">
                <input
                  type="checkbox"
                  checked={displayName}
                  onChange={(e) => setDisplayName(e.target.checked)}
                  className="mt-0.5 size-4 rounded border-gray-300 accent-[#E5231E]"
                />
                Display my name on this petition
              </label>

              <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#f8e74a] px-6 py-3.5 text-base font-bold text-gray-900 transition-colors hover:bg-[#e6d640]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                Sign petition
              </button>

              <p className="mt-4 text-center text-[11px] leading-relaxed text-gray-400">
                By signing, you accept Change.org&apos;s{" "}
                <Link href="#" className="underline hover:text-gray-600">Terms of Service</Link> and{" "}
                <Link href="#" className="underline hover:text-gray-600">Privacy Policy</Link>, and agree to receive occasional emails about campaigns on Change.org. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { title: "Get involved", links: ["Start a petition", "Browse by topic", "Browse by location", "For Nonprofits"] },
              { title: "Learn", links: ["Search for petitions", "Petition guides", "Create your petition", "Collect signatures"] },
              { title: "About us", links: ["Impact", "Team", "Careers", "Press"] },
              { title: "Help & legal", links: ["Help center", "Community guidelines", "Privacy policy", "Terms of service"] },
              { title: "Follow us", links: ["Instagram", "X", "Facebook", "TikTok"] },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="text-sm font-bold text-gray-900">{section.title}</h4>
                <ul className="mt-3 space-y-2">
                  {section.links.map((link) => (
                    <li key={link}><Link href="#" className="text-sm text-gray-500 hover:text-gray-900">{link}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 py-6 sm:flex-row">
            <p className="text-xs text-gray-500">&copy; 2026, Change.org, PBC</p>
            <div className="flex items-center gap-3">
              <Link href="#" className="text-xs text-gray-400 hover:text-gray-600">Privacy Policy</Link>
              <Link href="#" className="text-xs text-gray-400 hover:text-gray-600">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Popup Modal — appears after 5 seconds */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onClick={() => setShowPopup(false)}>
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full hover:bg-gray-100" aria-label="Close">
              <X className="size-5 text-gray-500" />
            </button>

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
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#E5231E] focus:ring-1 focus:ring-[#E5231E]/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">Last name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#E5231E] focus:ring-1 focus:ring-[#E5231E]/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#E5231E] focus:ring-1 focus:ring-[#E5231E]/20"
                />
              </div>
            </div>

            <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-sm text-gray-600 select-none">
              <input
                type="checkbox"
                checked={displayName}
                onChange={(e) => setDisplayName(e.target.checked)}
                className="mt-0.5 size-4 rounded border-gray-300 accent-[#E5231E]"
              />
              Display my name on this petition
            </label>

            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#f8e74a] px-6 py-3.5 text-base font-bold text-gray-900 transition-colors hover:bg-[#e6d640]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
              Sign petition
            </button>

            <p className="mt-4 text-center text-[11px] leading-relaxed text-gray-400">
              By signing, you accept Change.org&apos;s{" "}
              <Link href="#" className="underline hover:text-gray-600">Terms of Service</Link> and{" "}
              <Link href="#" className="underline hover:text-gray-600">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
