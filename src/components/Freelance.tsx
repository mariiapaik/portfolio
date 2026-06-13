import { ArrowUpRight } from "lucide-react";
import { freelance } from "@/lib/data";

export default function Freelance() {
  return (
    <section className="sec-block" id="freelance">
      <div className="sec-block-head">
        <span className="sec-kicker">Websites, funnels and integrations</span>
        <h2 className="sec-block-title">Client Work</h2>
        <p className="sec-intro">
          Selected projects shipped end-to-end for independent clients, from
          first structure and UI to backend logic, forms and integrations.
        </p>
        <div className="sec-block-rule" />
      </div>

      <div className="proj-grid">
        {freelance.map((p) => (
          <article className="glass-card proj-card" key={p.title}>
            <div className="proj-top">
              <span className="proj-role">{p.role}</span>
              {p.wip && <span className="proj-wip">WIP</span>}
            </div>
            <h3 className="proj-title">{p.title}</h3>
            <p className="proj-desc">{p.desc}</p>

            {p.links && (
              <div className="proj-links">
                {p.links.map((l) => (
                  <a
                    className="proj-link"
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {l.label}
                    <ArrowUpRight size={13} />
                  </a>
                ))}
              </div>
            )}

            <div className="proj-chips">
              {p.stack.map((s) => (
                <span className="proj-chip" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
