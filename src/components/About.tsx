import { aboutBio, aboutFacts } from "@/lib/data";

export default function About() {
  return (
    <section className="sec-block" id="about">
      <div className="sec-block-head">
        <h2 className="sec-block-title">About</h2>
        <div className="sec-block-rule" />
      </div>

      <div className="about-grid">
        <div className="about-bio">
          {aboutBio.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
          <div className="about-badge">
            <span className="about-badge-dot" />
            <span>AVAILABLE · OPEN TO WORK</span>
          </div>
        </div>

        <div className="glass-card about-facts">
          {aboutFacts.map(([k, v]) => (
            <div className="about-fact" key={k}>
              <span className="about-fact-k">{k}</span>
              <span className="about-fact-v">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
