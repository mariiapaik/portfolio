import { ArrowUpRight } from "lucide-react";
import { cta, profile, contactMethods, languages } from "@/lib/data";

export default function CTA() {
  return (
    <section className="cta-sec" id="contact">
      <div className="glass-card cta-card">
        <div className="cta-orb" />
        <div className="cta-inner">
          <h2 className="cta-title">{cta.title}</h2>
          <p className="cta-sub">{cta.sub}</p>

          <div className="contact-methods">
            {contactMethods.map((m) => (
              <a
                className="contact-method"
                key={m.label}
                href={m.href}
                target={m.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
              >
                <span className="contact-method-k">{m.label}</span>
                <span className="contact-method-v">
                  {m.value}
                  <ArrowUpRight size={14} />
                </span>
              </a>
            ))}
          </div>

          <div className="contact-langs">
            {languages.map((l) => (
              <span className="contact-lang" key={l.name}>
                <strong>{l.name}</strong> {l.level}
              </span>
            ))}
          </div>

          <a className="cta-btn" href={`mailto:${profile.email}`}>
            {cta.button}
          </a>
        </div>
      </div>
    </section>
  );
}
