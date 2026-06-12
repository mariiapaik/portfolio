import { cta, profile } from "@/lib/data";

export default function CTA() {
  return (
    <section className="cta-sec" id="contact">
      <div className="glass-card cta-card">
        <div className="cta-orb" />
        <div className="cta-inner">
          <h2 className="cta-title">{cta.title}</h2>
          <p className="cta-sub">{cta.sub}</p>
          <a className="cta-btn" href={`mailto:${profile.email}`}>
            {cta.button}
          </a>
        </div>
      </div>
    </section>
  );
}
