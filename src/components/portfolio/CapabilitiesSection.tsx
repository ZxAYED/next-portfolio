"use client";
import { useState } from "react";
import Link from "next/link";
import { Braces, Check, Cloud, Database, Layers3, Plus } from "lucide-react";
import type { SkillGroup } from "@/lib/portfolio";

const icons = [Layers3, Braces, Database, Cloud];
export function CapabilitiesSection({ groups }: { groups: SkillGroup[] }) {
  const [active, setActive] = useState(0);
  return (
    <section
      id="expertise"
      className="section capabilities-section"
      data-theme="light"
    >
      <div className="container">
        <div className="section-heading" data-reveal-group>
          <h2>
            The right tools.
            <br />
            <span className="highlight title-highlight">For the whole product.</span>
          </h2>
          <p>
            I choose technology around the product’s requirements and
            constraints, with attention to what the team can maintain after
            delivery.
          </p>
        </div>
        <div className="capability-grid">
          <div className="capability-list" data-reveal>
            {groups.map((group, index) => {
              const Icon = icons[index % icons.length];
              const open = active === index;
              return (
                <div
                  className="capability-item"
                  key={group.id}
                  data-open={open}
                >
                  <button
                    className="capability-trigger"
                    type="button"
                    onClick={() => setActive(index)}
                    aria-expanded={open}
                    aria-controls={"capability-" + group.id}
                  >
                    <Icon aria-hidden="true" />
                    <span>{group.title}</span>
                    <Plus className="capability-plus" aria-hidden="true" />
                  </button>
                  <div
                    className="capability-panel"
                    id={"capability-" + group.id}
                    inert={!open}
                  >
                    <div>
                      <p>{group.description}</p>
                      <ul>
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="capability-visual" data-reveal>
            <div className="application-panel" key={active}>
              <p className="application-panel__label">How I apply it</p>
              <h3>{groups[active].application.title}</h3>
              <ol className="application-flow">
                {groups[active].application.flow.map((item, index) => (
                  <li
                    key={item}
                    style={{ "--flow-index": index } as React.CSSProperties}
                  >
                    <span className="application-flow__node" aria-hidden="true">
                      <Check />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
              <p className="application-panel__detail">
                {groups[active].application.detail}
              </p>
              <Link
                className="text-link"
                href={groups[active].application.href}
              >
                {groups[active].application.example}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
