"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

const NAV_DESKTOP = [
  { href: "#", label: "My petitions" },
  { href: "#", label: "Search" },
];

export default function ChangeHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        {/* Left: Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-full bg-[#E5231E] text-xs font-bold text-white">
            co
          </span>
          <span className="hidden text-base font-semibold tracking-tight text-gray-900 sm:block">
            change.org
          </span>
        </Link>

        {/* Center: Desktop nav */}
        <nav className="ml-8 hidden items-center gap-1 md:flex">
          {NAV_DESKTOP.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: Desktop actions */}
        <div className="hidden items-center gap-2.5 md:flex">
          <Link
            href="#"
            className="rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
          >
            Start a petition
          </Link>
          <Link
            href="#"
            className="rounded-lg bg-[#E5231E] px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#c91c17]"
          >
            Log in
          </Link>
        </div>

        {/* Mobile: burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="size-5 text-gray-700" /> : <Menu className="size-5 text-gray-700" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_DESKTOP.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-gray-200" />
            <Link
              href="#"
              className="rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              Start a petition
            </Link>
            <Link
              href="#"
              className="mt-1 rounded-lg bg-[#E5231E] px-3.5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#c91c17]"
              onClick={() => setMenuOpen(false)}
            >
              Log in
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
