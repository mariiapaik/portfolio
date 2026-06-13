import { Terminal } from "lucide-react";
import { coreProject, terminalLog, experience } from "@/lib/data";

export default function Experience() {
  return (
    <section className="sec-block" id="experience">
      <div className="sec-block-head">
        <h2 className="sec-block-title">Experience Highlights</h2>
        <div className="sec-block-rule" />
      </div>

      <div className="exp-grid">
        {/* Core project card */}
        <div className="glass-card exp-card">
          <span className="exp-badge">{coreProject.badge}</span>
          <div>
            <h3 className="exp-title">{coreProject.title}</h3>
            <p className="exp-desc">{coreProject.desc}</p>
          </div>
          <div className="exp-arch">
            <div className="exp-arch-head">
              <Terminal size={15} className="exp-arch-icon" />
              <span>{coreProject.archTitle}</span>
            </div>
            <ul className="exp-arch-list">
              {coreProject.arch.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <div className="exp-chips">
            {coreProject.chips.map((c) => (
              <span className="exp-chip" key={c}>
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Terminal log card */}
        <div className="glass-card terminal">
          <div className="terminal-bar">
            <span className="terminal-dot dot-r" />
            <span className="terminal-dot dot-y" />
            <span className="terminal-dot dot-g" />
            <span className="terminal-name">ai-agent-v1.log</span>
          </div>
          <div className="terminal-body">
            {terminalLog.map((l) => (
              <div className="terminal-line" key={l.ts}>
                <span className="ts">{l.ts}</span>
                <span className={l.hi ? "hi" : undefined}>{l.msg}</span>
              </div>
            ))}
            <div className="terminal-cursor">
              &gt; <span>_</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full timeline */}
      <div className="timeline">
        {experience.map((job) => (
          <div className="tl-item" key={job.company}>
            <div className="tl-marker" />
            <div className="tl-content">
              <div className="tl-head">
                <h3 className="tl-role">
                  {job.role}
                  <span className="tl-company"> · {job.company}</span>
                </h3>
                <span className="tl-period">{job.period}</span>
              </div>
              <div className="tl-mode">{job.mode}</div>
              <p className="tl-summary">{job.summary}</p>
              {job.points.length > 0 && (
                <ul className="tl-points">
                  {job.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
