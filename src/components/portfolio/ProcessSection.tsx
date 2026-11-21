"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ArrowLeft, ArrowRight, MessagesSquare, Users, Target, Route, ListChecks, ClipboardCheck, Map, CalendarDays, Handshake, Database, Cable, Layers3, Code2, GitPullRequest, FlaskConical, PackageCheck, Rocket, BookOpen, MessageSquare, Wrench, GitBranch } from "lucide-react";
import Image from "next/image";
import type { ProcessStep } from "@/lib/portfolio";

const stageFlows: Record<string, readonly [string, string, string]> = {
  discussion: ["Client goals", "User needs", "Shared context"],
  requirements: ["User journeys", "Core workflows", "Acceptance criteria"],
  proposal: ["Solution scope", "Milestones", "Agreed plan"],
  architecture: ["Data model", "API contracts", "System structure"],
  development: ["Build features", "Review together", "Test flows"],
  delivery: ["Release checks", "Product demo", "Handover"],
  support: ["Review feedback", "Fix issues", "Ship improvements"],
};

const stageIcons = {
  discussion: [MessagesSquare, Users, Target],
  requirements: [Users, Route, ListChecks],
  proposal: [Map, CalendarDays, Handshake],
  architecture: [Database, Cable, Layers3],
  development: [Code2, GitPullRequest, FlaskConical],
  delivery: [ClipboardCheck, Rocket, BookOpen],
  support: [MessageSquare, Wrench, PackageCheck],
};

function StageFlow({ stage, playing }: { stage: string; playing: boolean }) {
  const labels = stageFlows[stage];
  if (!labels) return null;
  const icons = stageIcons[stage as keyof typeof stageIcons] ?? [GitBranch, Code2, Rocket];
  return (
    <ol className="stage-flow" data-playing={playing} aria-label="How this stage works">
      {labels.map((label, index) => {
        const Icon = icons[index];
        return (
          <li key={label}>
            <span className="stage-flow__icon" aria-hidden="true">
              {playing
                ? <Image src={`/images/process/${stage}-${index + 1}.gif`} width={80} height={80} alt="" unoptimized loading="eager" />
                : <Icon />}
            </span>
            <span>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

export function ProcessSection({ steps }: { steps: ProcessStep[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentRef = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => () => {
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
  }, []);

  useEffect(() => {
    const navigation = navigationRef.current;
    const button = navigation?.children[active] as HTMLElement | undefined;
    if (!navigation || !button) return;
    navigation.scrollTo({
      left: button.offsetLeft - (navigation.clientWidth - button.clientWidth) / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }, [active]);

  useEffect(() => {
    const section = sectionRef.current;
    const scene = sceneRef.current;
    const track = trackRef.current;
    if (!section || !scene || !track || !steps.length) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    let overhang = 0;
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      const last = steps.length - 1;
      let index = 0;
      if (section.dataset.layout === "pinned") {
        const travel = bounds.height - scene.offsetHeight;
        const progress = Math.max(0, Math.min(1, (-bounds.top - overhang) / Math.max(1, travel)));
        track.style.setProperty("--track-offset", `${-100 * last * progress}%`);
        index = Math.round(progress * last);
      } else {
        const readingLine = window.innerHeight * 0.48;
        Array.from(track.children).forEach((card, i) => {
          if (card.getBoundingClientRect().top <= readingLine) index = i;
        });
      }
      if (index !== currentRef.current) {
        currentRef.current = index;
        setActive(index);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      // Desktop always gets a single horizontal track. Decide the compact
      // fallback against that same horizontal layout, never a stacked list.
      section.dataset.layout = "pinned";
      overhang = Math.max(0, scene.offsetHeight - window.innerHeight);
      if (steps.length < 2 || (!desktop.matches && overhang > 1)) {
        section.dataset.layout = "stacked";
        overhang = 0;
      }
      scene.style.setProperty("--scene-overhang", `${overhang}px`);
      onScroll();
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(track);
    resize.observe(scene);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      resize.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(frame);
      scene.style.removeProperty("--scene-overhang");
      track.style.removeProperty("--track-offset");
    };
  }, [steps.length]);

  if (!steps.length) return null;

  const goToStage = (index: number) => {
    const section = sectionRef.current;
    const scene = sceneRef.current;
    const track = trackRef.current;
    const card = track?.children[index];
    if (!section || !scene || !card) return;
    const top = section.dataset.layout === "pinned"
      ? window.scrollY + section.getBoundingClientRect().top +
        Math.max(0, scene.offsetHeight - window.innerHeight) +
        index / Math.max(1, steps.length - 1) * (section.offsetHeight - scene.offsetHeight)
      : window.scrollY + card.getBoundingClientRect().top -
        (document.querySelector("header")?.getBoundingClientRect().height ?? 72) - 12;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top, behavior: "instant" });
      return;
    }
    if (section.dataset.layout === "pinned" && track) {
      // Clicks jump to the matching scroll position while the card track
      // slides to it. Ordinary page scrolling remains directly scrubbed.
      section.dataset.tabTransition = "true";
      void track.getBoundingClientRect();
      track.style.setProperty("--track-offset", `${-100 * index}%`);
      currentRef.current = index;
      setActive(index);
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
      transitionTimer.current = setTimeout(() => {
        delete section.dataset.tabTransition;
        transitionTimer.current = null;
      }, 720);
      const request = new CustomEvent("portfolio:scroll-to", {
        detail: { top, immediate: true }, cancelable: true,
      });
      if (window.dispatchEvent(request)) window.scrollTo({ top, behavior: "instant" });
      return;
    }
    const request = new CustomEvent("portfolio:scroll-to", { detail: { top }, cancelable: true });
    if (window.dispatchEvent(request)) window.scrollTo({ top, behavior: "smooth" });
  };

  const handleKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    const targets: Record<string, number> = {
      ArrowLeft: Math.max(0, currentRef.current - 1),
      ArrowRight: Math.min(steps.length - 1, currentRef.current + 1),
      Home: 0,
      End: steps.length - 1,
    };
    if (!Object.hasOwn(targets, event.key)) return;
    event.preventDefault();
    goToStage(targets[event.key]);
  };

  return (
    <section id="process" className="section sdlc-section" ref={sectionRef}
      data-theme="light" data-layout="pinned" aria-labelledby="process-heading"
      style={{ "--stage-intervals": steps.length - 1, "--active-offset": `${-100 * active}%` } as CSSProperties}>
      <div className="sdlc-scene" ref={sceneRef}>
      <div className="container sdlc-container">
        <div className="section-heading sdlc-heading" data-reveal-group>
          <h2 id="process-heading">
            From the client brief
            <br />
            <span className="serif highlight title-highlight">to ongoing support.</span>
          </h2>
          <p>
            Seven stages from my previous role. I helped teams clarify the brief,
            build the product, and support it after launch.
          </p>
        </div>

        <nav className="sdlc-navigation" aria-label="Development stages" ref={navigationRef}
          style={{ "--stage-index": active, "--stage-count": steps.length } as CSSProperties}>
          {steps.map((step, index) => (
            <button type="button" key={step.id}
              data-sound="chapter"
              aria-label={`Show stage ${index + 1}: ${step.label}`}
              aria-current={active === index ? "step" : undefined}
              aria-controls="sdlc-journey"
              onClick={() => goToStage(index)}>
              <span>{step.number}</span><span>{step.label}</span>
            </button>
          ))}
        </nav>

        <div id="sdlc-journey" className="sdlc-viewport"
          tabIndex={0} role="region" aria-label="Development stages. Use arrow keys or stage buttons."
          onKeyDown={handleKeys}>
          <div className="sdlc-track" ref={trackRef}>
            {steps.map((step, index) => (
              <article className="sdlc-card" data-active={active === index}
                aria-labelledby={`sdlc-heading-${step.id}`} key={step.id}>
                <div className="sdlc-card-copy">
                  <p className="sdlc-step-label"><span>{step.number}</span>{step.label}</p>
                  <h3 id={`sdlc-heading-${step.id}`}>{step.title}</h3>
                  <p className="sdlc-description">{step.description}</p>
                  <div className="sdlc-takeaway"><span>Deliverable</span><p>{step.deliverables[0]}</p></div>
                </div>
                <div className="sdlc-card-output">
                  <StageFlow stage={step.id} playing={active === index} />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="sdlc-controls" aria-label="Stage navigation">
          <p className="sdlc-count">
            <strong>{String(active + 1).padStart(2, "0")}</strong>
            <span>/ {String(steps.length).padStart(2, "0")}</span>
            <span className="sdlc-controls-label">{steps[active]?.label}</span>
          </p>
          <div className="sdlc-controls-actions">
            <button type="button" data-sound="chapter" disabled={active === 0} onClick={() => goToStage(active - 1)}>
              <ArrowLeft aria-hidden="true" /><span>Previous</span>
            </button>
            <button type="button" data-sound="chapter" disabled={active === steps.length - 1}
              onClick={() => goToStage(active + 1)}>
              <span>Next</span><ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
