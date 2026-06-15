import { ArrowUpRight, Footprints, GraduationCap, Lock } from "lucide-react";
import { freelance } from "@/lib/data";

const fallbackIcons = {
  footprints: Footprints,
  graduation: GraduationCap,
  lock: Lock,
} as const;

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

      <div className="work-grid">
        {freelance.map((p) => {
          const live = p.links?.[0];
          const Fallback = p.icon ? fallbackIcons[p.icon] : null;
          const Card = live ? "a" : "div";
          return (
            <Card
              className="glass-card work-card"
              key={p.title}
              {...(live
                ? { href: live.href, target: "_blank", rel: "noreferrer" }
                : {})}
            >
              <div className="work-preview">
                <div className="work-chrome">
                  <span className="work-dot work-dot--r" />
                  <span className="work-dot work-dot--y" />
                  <span className="work-dot work-dot--g" />
                  <span className="work-url">
                    {live ? live.label : "private project"}
                  </span>
                  {live && <ArrowUpRight size={13} className="work-chrome-go" />}
                </div>
                {p.image ? (
                  <img
                    className="work-shot"
                    src={p.image}
                    alt={`${p.title} preview`}
                    loading="lazy"
                  />
                ) : (
                  <div className="work-fallback">
                    {Fallback && <Fallback size={34} strokeWidth={1.4} />}
                  </div>
                )}
              </div>

              <div className="work-body">
                <div className="work-top">
                  <h3 className="work-title">{p.title}</h3>
                  {p.wip && <span className="proj-wip">WIP</span>}
                </div>
                <p className="work-tagline">{p.tagline}</p>
                <div className="proj-chips">
                  {p.stack.map((s) => (
                    <span className="proj-chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
