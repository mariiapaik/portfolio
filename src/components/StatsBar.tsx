import { heroStats } from "@/lib/data";

export default function StatsBar() {
  return (
    <section className="stats-wrap">
      <div className="stats-card glass-card">
        {heroStats.map((s) => (
          <div className="stat" key={s.l}>
            <span className="stat-n">{s.n}</span>
            <span className="stat-l">{s.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
