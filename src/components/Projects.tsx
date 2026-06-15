import { Fragment } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section className="sec-block" id="projects">
      <div className="sec-block-head">
        <span className="sec-kicker">Technical depth</span>
        <h2 className="sec-block-title">Selected Engineering Projects</h2>
        <div className="sec-block-rule" />
      </div>

      <div className="proj-grid">
        {projects.map((p) => (
          <article className="glass-card proj-card" key={p.num}>
            <div className="proj-flow" aria-hidden>
              {p.flow.map((node, i) => (
                <Fragment key={node}>
                  {i > 0 && <span className="proj-flow-sep">›</span>}
                  <span className="proj-flow-node">{node}</span>
                </Fragment>
              ))}
            </div>

            <div className="proj-body">
              <div className="proj-top">
                <span className="proj-num">{p.num}</span>
                <ArrowUpRight size={18} className="proj-arrow" />
              </div>
              <h3 className="proj-title">{p.title}</h3>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-chips">
                {p.chips.map((c) => (
                  <span className="proj-chip" key={c}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
