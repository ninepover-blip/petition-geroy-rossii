"use client";

import Link from "next/link";

const SECTIONS = [
  {
    title: "Get involved",
    links: [
      { href: "#", label: "Start a petition" },
      { href: "#", label: "Browse by topic" },
      { href: "#", label: "Browse by location" },
      { href: "#", label: "For Nonprofits" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "#", label: "Search for petitions" },
      { href: "#", label: "Petition guides" },
      { href: "#", label: "Create your petition" },
      { href: "#", label: "Collect signatures" },
    ],
  },
  {
    title: "About us",
    links: [
      { href: "#", label: "Impact" },
      { href: "#", label: "Team" },
      { href: "#", label: "Careers" },
      { href: "#", label: "Press" },
    ],
  },
  {
    title: "Help & legal",
    links: [
      { href: "#", label: "Help center" },
      { href: "#", label: "Community guidelines" },
      { href: "#", label: "Privacy policy" },
      { href: "#", label: "Terms of service" },
      { href: "#", label: "Cookie policy" },
    ],
  },
  {
    title: "Follow us",
    links: [
      { href: "#", label: "Instagram" },
      { href: "#", label: "X" },
      { href: "#", label: "Facebook" },
      { href: "#", label: "TikTok" },
    ],
  },
];

export default function ChangeFooter() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 lg:grid-cols-5">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-bold text-gray-900">
                {section.title}
              </h4>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 py-6 sm:flex-row">
          <p className="text-xs text-gray-500">
            &copy; 2026, Change.org, PBC
          </p>
          <div className="flex items-center gap-3">
            <Link href="#" className="text-xs text-gray-400 hover:text-gray-600">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-gray-400 hover:text-gray-600">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
