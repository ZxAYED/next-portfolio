import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <main id="main-content" className="error-page">
      <p className="eyebrow">404 / A small detour</p>
      <h1>
        This page is <span className="serif accent">somewhere else.</span>
      </h1>
      <p>Let’s get you back to the work.</p>
      <Link href="/" className="button">
        Back to home
        <span className="button__icon">
          <ArrowUpRight aria-hidden="true" />
        </span>
      </Link>
    </main>
  );
}
