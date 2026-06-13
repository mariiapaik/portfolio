import { nav, profile } from "@/lib/data";

export default function Navbar() {
  return (
    <header className="nav-wrap">
      <nav className="nav">
        <div className="nav-brand">
          <a className="nav-logo" href="#top">
            PAIK.DEV
          </a>
          <span className="nav-status">
            <span className="nav-status-dot" />
            <span className="nav-status-txt">SYSTEM STATUS: ONLINE</span>
          </span>
        </div>

        <div className="nav-links">
          {nav.map((n) => (
            <a key={n.label} href={n.href}>
              {n.label}
            </a>
          ))}
        </div>

        <a className="nav-cta" href={profile.cv} download>
          Download CV
        </a>
      </nav>
    </header>
  );
}
