import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Ticker, { WordStrip } from "@/components/Ticker";
import StatsStrip from "@/components/StatsStrip";
import Story from "@/components/Story";
import Reasons from "@/components/Reasons";
import Updates from "@/components/Updates";
import SignForm from "@/components/SignForm";
import SharePanel from "@/components/SharePanel";
import Footer, { MobileCta } from "@/components/Footer";
import { LiveProvider } from "@/components/live";
import { getPetitionStats } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const stats = await getPetitionStats();

  return (
    <LiveProvider initial={stats}>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <StatsStrip />
        <Story />
        <WordStrip />
        <Reasons />
        <SignForm />
        <Updates />
        <SharePanel />
      </main>
      <Footer />
      <MobileCta />
    </LiveProvider>
  );
}
