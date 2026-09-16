import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SignForm from "@/components/SignForm";
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
        <SignForm />
      </main>
      <Footer />
      <MobileCta />
    </LiveProvider>
  );
}
