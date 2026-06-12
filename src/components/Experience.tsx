import { Terminal } from "lucide-react";
import { coreProject, terminalLog } from "@/lib/data";

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
    </section>
  );
}
