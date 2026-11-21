import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ResumeIde from "@/components/resume/ResumeIde";
import { profile, skills } from "@/lib/portfolio";
import { ExperienceRuntime } from "@/components/experience/ExperienceRuntime";
import "@/styles/resume.css";

export const metadata: Metadata = {
  title: "Résumé — Experience & skills",
  description:
    "Explore Zayed Iqbal’s experience, development skills, working principles, and education in an interactive résumé.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <main id="main-content" className="resume-page" data-theme="dark">
      <div className="container">
        <Link href="/" className="resume-page__back">
          <ArrowLeft size={17} aria-hidden="true" /> Back to portfolio
        </Link>
        <header className="resume-page__heading" data-reveal>
          <div>
            <p className="eyebrow">
              {profile.fullName} · {profile.role}
            </p>
            <h1>
              A little more
              <br />
              <span className="serif">under the hood.</span>
            </h1>
          </div>
          <p className="muted">
            The experience, tools, and principles behind my work. Explore it as
            a résumé—or read the source.
          </p>
        </header>
        <ResumeIde profile={profile} skills={skills} />
      </div>
      <ExperienceRuntime />
    </main>
  );
}
