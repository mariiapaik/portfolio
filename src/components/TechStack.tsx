import { MousePointer2, Sparkles } from "lucide-react";
import SkillWeb from "./three/SkillWeb";

export default function TechStack() {
  return (
    <section className="stack-sec" id="stack">
      <div className="stack-head">
        <span className="stack-pill">Engineering Toolkit</span>
        <h2 className="stack-title">Neural Architecture &amp; Stack</h2>
        <p className="stack-sub">
          An organic ecosystem of tools and technologies. Interact with the
          swarm below to explore the core components of my development
          environment.
        </p>
      </div>

      <div className="stack-web">
        <SkillWeb />
      </div>

      <div className="stack-hints">
        <div className="stack-hint">
          <MousePointer2 size={16} className="stack-hint-icon" />
          <span>SMOOTH PARALLAX</span>
        </div>
        <div className="stack-hint-divider" />
        <div className="stack-hint">
          <Sparkles size={16} className="stack-hint-icon" />
          <span>CONTAINED SWARM</span>
        </div>
      </div>
    </section>
  );
}
