"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Plus } from "lucide-react";
import type { Project } from "@/lib/portfolio";
import { ExperienceRuntime } from "@/components/experience/ExperienceRuntime";
import "@/styles/projects.css";

export default function ProjectDetail({
  project,
  nextProject,
}: {
  project: Project;
  nextProject?: Project;
}) {
  const [expanded, setExpanded] = useState<number[]>([0]);
  const toggleFeature = (index: number) =>
    setExpanded((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  const sourceLinks = [
    { label: "Frontend source", href: project.links.client },
    { label: "Backend source", href: project.links.server },
  ].filter((link): link is { label: string; href: string } =>
    Boolean(link.href),
  );

  return (
    <main id="main-content" className="case-study" data-theme="dark">
      <div className="container">
        <Link href="/#work" className="case-study__back">
          <ArrowLeft size={17} aria-hidden="true" /> All projects
        </Link>
        <header className="case-study__hero">
          <div data-reveal>
            <p className="eyebrow">{project.category}</p>
            <h1>
              {project.title}
              <span className="case-study__period">.</span>
            </h1>
          </div>
          <div className="case-study__intro" data-reveal>
            <p>{project.tagline}</p>
            {project.links.live && (
              <a
                className="button button--primary"
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit live website{" "}
                <span className="button__icon">
                  <ArrowUpRight aria-hidden="true" />
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
          <dl className="case-study__metadata" data-reveal>
            <div>
              <dt>My role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Product</dt>
              <dd>{project.category}</dd>
            </div>
            {project.timeline && (
              <div>
                <dt>Timeline</dt>
                <dd>{project.timeline}</dd>
              </div>
            )}
          </dl>
        </header>
        <figure className="case-study__cover" data-reveal>
          <div className="case-study__browser-bar" aria-hidden="true">
            <span />
            <span />
            <span />
            <p>{project.title}</p>
            <ArrowUpRight size={16} />
          </div>
          <div className="case-study__image">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              priority
              sizes="(max-width: 800px) 92vw, 90vw"
              style={{ objectPosition: project.cover.position }}
            />
          </div>
          <figcaption>{project.summary}</figcaption>
        </figure>
        <section
          className="case-study__overview"
          aria-labelledby="overview-title"
        >
          <h2 id="overview-title" className="serif" data-reveal>
            The whole picture.
          </h2>
          <div data-reveal>
            <p>{project.description}</p>
            {project.metrics.length > 0 && (
              <dl className="case-study__facts">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt>{metric.label}</dt>
                    <dd>{metric.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </section>
        {project.features.length > 0 && (
          <section className="case-study__build" aria-labelledby="build-title">
            <div className="case-study__section-intro" data-reveal>
              <h2 id="build-title">
                Inside
                <br />
                <span className="serif">the build.</span>
              </h2>
              <p className="muted">
                The features and engineering behind the experience.
              </p>
            </div>
            <div className="case-study__features" data-reveal>
              {project.features.map((feature, index) => {
                const open = expanded.includes(index);
                const panelId = `${project.slug}-feature-${index}`;
                return (
                  <div
                    key={feature.title}
                    className="case-feature"
                    data-open={open}
                  >
                    <h3>
                      <button
                        aria-expanded={open}
                        aria-controls={panelId}
                        id={`${panelId}-trigger`}
                        onClick={() => toggleFeature(index)}
                      >
                        <span className="case-feature__number">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{feature.title}</span>
                        <Plus size={21} aria-hidden="true" />
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      className="case-feature__panel"
                      role="region"
                      aria-labelledby={`${panelId}-trigger`}
                      aria-hidden={!open}
                    >
                      <div>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
        {project.techStack.length > 0 && (
          <section
            className="case-study__stack"
            aria-labelledby="stack-title"
            data-reveal
          >
            <h2 id="stack-title">Tools behind the work.</h2>
            <ul>
              {project.techStack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </section>
        )}
        {project.learnings.length > 0 && (
          <section
            className="case-study__learnings"
            aria-labelledby="learnings-title"
          >
            <h2 id="learnings-title" data-reveal>
              What I took
              <br />
              <span className="serif">forward.</span>
            </h2>
            <ul>
              {project.learnings.map((learning, index) => (
                <li key={learning} data-reveal>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{learning}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
        {sourceLinks.length > 0 && (
          <div className="case-study__source" data-reveal>
            <p className="muted">Explore the implementation.</p>
            <div>
              {sourceLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-study__text-link"
                >
                  {link.label}
                  <ArrowUpRight size={18} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          </div>
        )}
        {nextProject && (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="case-study__next"
            data-reveal
          >
            <span className="eyebrow">Next project</span>
            <span className="case-study__next-title">
              {nextProject.title}
              <ArrowUpRight aria-hidden="true" />
            </span>
            <span className="muted">{nextProject.category}</span>
          </Link>
        )}
      </div>
      <ExperienceRuntime />
    </main>
  );
}
