import SkillWeb from "./three/SkillWeb";
import { skillGroups } from "@/lib/data";

export default function TechStack() {
  return (
    <section className="stack-sec" id="stack">
      <div className="stack-head">
        <span className="stack-pill">Engineering Toolkit</span>
        <h2 className="stack-title">Tools I Use to Ship Products</h2>
        <p className="stack-sub">
          A focused stack for building full-stack products, AI automations,
          dashboards, payment flows and integrations.
        </p>
      </div>

      <div className="stack-web">
        <SkillWeb />
      </div>

      {/* Categorized skill breakdown */}
      <div className="skill-groups">
        {skillGroups.map((g) => (
          <div className="skill-group glass-card" key={g.cat}>
            <div className="skill-group-cat">{g.cat}</div>
            <div className="skill-group-items">
              {g.items.map((it) => (
                <span className="skill-tag" key={it}>
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
