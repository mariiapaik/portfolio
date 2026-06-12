import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="site">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Experience />
        <TechStack />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
