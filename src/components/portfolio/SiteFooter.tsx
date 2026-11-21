import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/portfolio";
import { BrandMark } from "./BrandMark";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-identity">
            <BrandMark />
            <p>
              {profile.role}
              <br />
              {profile.location}
            </p>
          </div>
          <div className="footer-links">
            {profile.socials.map((social) => (
              <a
                className="text-link"
                href={social.url}
                key={social.id}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.label}
                <ArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <p className="footer-wordmark" aria-label="Zayed Iqbal">
          Zayed <span>Iqbal.</span>
        </p>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Zayed Iqbal</p>
          <p>Open to full-stack developer opportunities.</p>
        </div>
      </div>
    </footer>
  );
}
