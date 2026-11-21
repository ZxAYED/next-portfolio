"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  FileCheck2,
  MessageSquareText,
  RadioTower,
} from "lucide-react";
import type { Collaboration } from "@/lib/portfolio";

const icons = {
  understand: MessageSquareText,
  communicate: RadioTower,
  support: FileCheck2,
};

/** Timed highlights support the story; every stage stays readable at all times. */
export function ClientCollaboration({ content }: { content: Collaboration }) {
  const root = useRef<HTMLElement>(null);
  const visibleStages = useRef(new Set<number>());
  const [sequence, setSequence] = useState({ index: 0, cycle: 0 });
  const active = sequence.index;
  const stageOrder = content.stages.map((stage) => stage.id).join("|");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const cards = Array.from(element.querySelectorAll(".client-stage"));
    const indices = new Map(cards.map((card, index) => [card, index]));
    const visibleIndices = visibleStages.current;
    const sync = () => {
      const ordered = [...visibleIndices].sort((a, b) => a - b);
      setVisible(ordered.length > 0 && !document.hidden);
      if (ordered.length) {
        setSequence((current) =>
          visibleIndices.has(current.index)
            ? current
            : { index: ordered[0], cycle: current.cycle + 1 },
        );
      }
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = indices.get(entry.target);
          if (index === undefined) continue;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15)
            visibleIndices.add(index);
          else visibleIndices.delete(index);
        }
        sync();
      },
      { threshold: [0, 0.15] },
    );
    cards.forEach((card) => observer.observe(card));
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      visibleIndices.clear();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [stageOrder]);

  return (
    <section
      id="craft"
      className="section client-section"
      ref={root}
      data-theme="dark"
    >
      <div className="container">
        <div className="section-heading" data-reveal-group>
          <h2>
            {content.title}
            <br />
            <span className="serif accent">{content.emphasis}</span>
          </h2>
          <div className="client-intro">
            <p>{content.description}</p>
          </div>
        </div>
        <div
          className="client-stages"
          data-running={visible}
          data-reveal-group
        >
          {content.stages.map((stage, index) => {
            const Icon = icons[stage.id];
            return (
              <article
                className="client-stage"
                data-active={active === index}
                key={stage.id}
              >
                <div className="client-stage__top">
                  <Icon aria-hidden="true" />
                  <span className="client-stage__phase">{stage.phase}</span>
                </div>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
                <ul>
                  {stage.items.map((item, itemIndex) => (
                    <li
                      key={item}
                      style={
                        { "--item-index": itemIndex } as React.CSSProperties
                      }
                    >
                      <Check aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="client-stage__result">{stage.result}</p>
                <span
                  className="client-stage__progress"
                  key={active === index ? sequence.cycle : -1}
                  aria-hidden="true"
                  onAnimationEnd={(event) => {
                    if (
                      event.animationName === "client-progress" &&
                      event.target === event.currentTarget
                    ) {
                      setSequence((current) => {
                        // Ignore an animation event from a card that just left
                        // view. The visible cards are the only clock targets.
                        if (current.index !== index) return current;
                        const ordered = [...visibleStages.current].sort(
                          (a, b) => a - b,
                        );
                        const next =
                          ordered.find((value) => value > current.index) ??
                          ordered[0] ??
                          current.index;
                        // A new progress node repeats a completed cycle even
                        // when only one card is visible.
                        return { index: next, cycle: current.cycle + 1 };
                      });
                    }
                  }}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
