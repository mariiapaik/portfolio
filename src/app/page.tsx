import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Freelance from "@/components/Freelance";
import TechStack from "@/components/TechStack";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Figurine from "@/components/three/Figurine";

export default function Home() {
  return (
    <div className="site">
      <Figurine />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <About />
        <Experience />
        <Projects />
        <Freelance />
        <TechStack />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
