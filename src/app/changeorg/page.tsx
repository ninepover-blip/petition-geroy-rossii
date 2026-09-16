"use client";

import { useState } from "react";
import ChangeHeader from "@/components/changeorg/Header";
import ChangeHero from "@/components/changeorg/Hero";
import PetitionContent from "@/components/changeorg/PetitionContent";
import Sidebar from "@/components/changeorg/Sidebar";
import SignModal from "@/components/changeorg/SignModal";
import ChangeFooter from "@/components/changeorg/Footer";

export default function ChangeOrgPage() {
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <ChangeHeader />
      <ChangeHero />

      {/* Main content: two columns */}
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid gap-10 py-10 lg:grid-cols-[1fr_340px] lg:gap-14">
          {/* Left column */}
          <PetitionContent />

          {/* Right column */}
          <Sidebar onOpen={() => setIsSignModalOpen(true)} />
        </div>
      </div>

      <ChangeFooter />
      <SignModal
        isOpen={isSignModalOpen}
        onClose={() => setIsSignModalOpen(false)}
      />
    </div>
  );
}
