"use client";

import { CheckCircle } from "lucide-react";

interface SidebarProps {
  signatureCount?: string;
  onOpen?: () => void;
}

export default function Sidebar({
  signatureCount = "1,573",
  onOpen,
}: SidebarProps) {
  return (
    <div className="md:sticky md:top-6">
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        {/* Signature count */}
        <p className="text-4xl font-bold text-gray-900">
          {signatureCount}
        </p>

        {/* Verified badge */}
        <div className="mt-2 flex items-center gap-2">
          <CheckCircle className="size-5 text-green-500" />
          <span className="text-sm font-medium text-gray-600">
            Verified signatures
          </span>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Sign button */}
        <button
          onClick={onOpen}
          className="w-full rounded-lg bg-[#f8e74a] px-6 py-3.5 text-base font-bold text-gray-900 transition-colors hover:bg-[#FFB64D]"
        >
          Sign petition
        </button>

        <p className="mt-4 text-center text-xs text-gray-500">
          By signing, you agree to our{" "}
          <a href="#" className="underline underline-offset-1">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-1">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
