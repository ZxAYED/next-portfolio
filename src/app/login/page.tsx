import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { BrandWordmark } from "@/components/portfolio/BrandMark";
import { ExperienceRuntime } from "@/components/experience/ExperienceRuntime";

export const metadata: Metadata = {
  title: "Owner workspace · Zayed",
  description: "Owner workspace status for Zayed’s portfolio.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main id="main-content" className="owner-access" data-theme="dark">
      <div className="container">
        <div className="owner-access__content">
          <Link
            href="/"
            className="owner-access__brand"
            aria-label="Zayed’s portfolio home"
          >
            <BrandWordmark />
          </Link>
          <div className="owner-access__symbol" aria-hidden="true">
            <LockKeyhole size={28} strokeWidth={1.4} />
          </div>
          <h1>
            Owner
            <br />
            workspace.
          </h1>
          <p className="owner-access__description">
            This portfolio is public. The private owner dashboard is not
            included in this release, so sign-in is currently unavailable.
          </p>
          <div className="owner-access__links">
            <Link href="/" className="button button--primary">
              <span>Back to the portfolio</span>
              <span className="button__icon" aria-hidden="true">
                <ArrowUpRight size={20} />
              </span>
            </Link>
            <Link href="/#contact" className="owner-access__contact">
              Looking to work together?
            </Link>
          </div>
          <p className="owner-access__note">
            You can explore the work, experience, and contact details without an
            account.
          </p>
        </div>
      </div>
      <ExperienceRuntime />
    </main>
  );
}
