import Typewriter from "./ui/Typewriter";
import TorusKnot from "./three/TorusKnot";
import { profile, typewriterLines } from "@/lib/data";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-3d">
        <TorusKnot variant="hero" />
      </div>

      <div className="hero-inner">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          AVAILABLE FOR CLIENT PROJECTS
        </div>
        <h1 className="hero-name">{profile.name}</h1>
        <div className="hero-type">
          <span className="hero-prompt">$</span>
          <Typewriter lines={typewriterLines} />
        </div>
        <div className="hero-btns">
          <a className="btn-main" href="#experience">
            VIEW CASE STUDY
          </a>
          <a className="btn-ghost" href="#contact">
            START A PROJECT
          </a>
        </div>
      </div>
    </section>
  );
}
