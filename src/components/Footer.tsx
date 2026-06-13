import { profile } from "@/lib/data";

const gmailCompose = (email: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">MARIIA_PAIK</div>
        <div className="footer-status">
          © {new Date().getFullYear()} MARIIA PAIK · SYSTEM STATUS: OPTIMAL
        </div>
        <div className="footer-links">
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={gmailCompose(profile.email)} target="_blank" rel="noreferrer">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
