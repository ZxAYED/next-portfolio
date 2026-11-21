import Image from "next/image";
import { ArrowRight, ArrowUpRight, Code2, GraduationCap } from "lucide-react";
import { profile, skills, processSteps, collaboration } from "@/lib/portfolio";
import ProjectIndex from "@/components/portfolio/ProjectIndex";
import { projects } from "@/lib/portfolio";
import { HeroVisual } from "./HeroVisual";
import { CapabilitiesSection } from "./CapabilitiesSection";
import { ProcessSection } from "./ProcessSection";
import { ClientCollaboration } from "./ClientCollaboration";
import { WhyChooseMe } from "./WhyChooseMe";
import { LifecycleStrip } from "./LifecycleStrip";
import { ContactSection } from "./ContactSection";
import { ExperienceRuntime } from "@/components/experience/ExperienceRuntime";

export function PortfolioHome() {
  return (
    <main id="main-content">
      <section id="home" className="hero" data-theme="dark">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy" data-reveal-group>
              <p className="hero-introduction">Hi, I’m {profile.fullName}.</p>
              <h1>
                {profile.hero.headline.first}
                <br />
                <span>{profile.hero.headline.second}</span>
              </h1>
              <p className="hero-serif serif accent">
                {profile.hero.signature}
              </p>
              <p className="hero-description">{profile.hero.description}</p>
              <div className="hero-actions">
                <a href="#work" className="button">
                  View my projects
                  <span className="button__icon">
                    <ArrowRight aria-hidden="true" />
                  </span>
                </a>
                <a
                  href={profile.resume.url}
                  className="text-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View my résumé
                  <ArrowUpRight aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
            <HeroVisual src={profile.portrait.src} alt={profile.portrait.alt} />
          </div>
        </div>
      </section>
      <section id="intro" className="section intro-section" data-theme="dark">
        <div className="container">
          <div className="intro-grid">
            <h2 data-reveal>
              From requirements
              <br />
              <span className="highlight">to reliable software.</span>
            </h2>
            <div className="intro-copy" data-reveal>
              <span className="intro-kicker">
                Skills developed through hands-on work
              </span>
              <p>
                My previous role taught me to look beyond an isolated task:
                understand client requirements, contribute to proposals and
                architecture decisions, develop and test, then support delivery.
                I bring that complete workflow into a team.
              </p>
              <a href="#process" className="text-link">
                See my development lifecycle
              </a>
            </div>
          </div>
          <LifecycleStrip steps={processSteps} />
        </div>
      </section>
      <ProjectIndex projects={projects} />
      <CapabilitiesSection groups={skills} />
      <ProcessSection steps={processSteps} />
      <WhyChooseMe principles={profile.principles} />
      <section id="about" className="section about-section" data-theme="dark">
        <div className="container about-grid">
          <div className="about-portrait" data-reveal>
            <Image
              src="/images/fb.jpg"
              alt="Zayed Iqbal in profile, lit by lavender light"
              fill
              sizes="(max-width: 767px) 90vw, 40vw"
            />
            <div className="about-portrait-note">
              <span>Curious by nature.</span>
              <span className="serif">A developer by choice.</span>
            </div>
          </div>
          <div className="about-copy" data-reveal-group>
            <h2>
              A person behind
              <br />
              <span className="serif accent">every line of code.</span>
            </h2>
            <p className="about-lead">{profile.about.paragraphs[0]}</p>
            <p>{profile.about.paragraphs[1]}</p>
            <p>{profile.about.paragraphs[2]}</p>
            <a
              className="button button--secondary"
              href={profile.resume.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.resume.label}
              <span className="button__icon">
                <ArrowUpRight aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </section>
      <section
        id="experience"
        className="section journey-section"
        data-theme="dark"
      >
        <div className="container">
          <div className="section-heading" data-reveal-group>
            <h2>
              Experience that shapes
              <br />
              <span className="serif accent">how I develop.</span>
            </h2>
            <p>
              Hands-on development and an analytical foundation. Both shape the
              way I work.
            </p>
          </div>
          <div className="journey-grid" data-reveal-group>
            {profile.experience.map((item) => (
              <article className="journey-card" key={item.id}>
                <div className="journey-top">
                  <Code2 className="journey-icon" aria-hidden="true" />
                  <p className="eyebrow">{item.period}</p>
                </div>
                <h3>{item.title}</h3>
                <p className="journey-place">{item.company}</p>
                <ul>
                  {item.highlights.slice(0, 4).map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              </article>
            ))}
            {profile.education.map((item) => (
              <article
                className="journey-card journey-card--education"
                key={item.qualification}
              >
                <div className="journey-top">
                  <GraduationCap className="journey-icon" aria-hidden="true" />
                  <p className="eyebrow">{item.period}</p>
                </div>
                <h3>{item.qualification}</h3>
                <p className="journey-place">{item.institution}</p>
                <p className="journey-description">{item.description}</p>
                <p className="education-formula serif" aria-hidden="true">
                  curiosity × craft
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ClientCollaboration content={collaboration} />
      <ContactSection
        profile={{
          location: profile.location,
          email: profile.email,
          socials: profile.socials.filter((social) =>
            ["github", "linkedin"].includes(social.id),
          ),
        }}
      />
      <ExperienceRuntime />
    </main>
  );
}
