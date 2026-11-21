"use client";

import { useEffect, useRef } from "react";
import { BrandWordmark } from "@/components/portfolio/BrandMark";
import motion from "@/content/motion.json";

/** CSS finishes the introduction even before hydration; input can dismiss it. */
export function BrandIntro() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const finish = () => {
      node.hidden = true;
      detach();
    };
    const onEnd = (event: AnimationEvent) => {
      if (
        event.target === node &&
        event.animationName === "personal-intro-exit"
      )
        finish();
    };
    const detach = () => {
      node.removeEventListener("animationend", onEnd);
      window.removeEventListener("wheel", finish);
      document.removeEventListener("pointerdown", finish, true);
      document.removeEventListener("keydown", finish, true);
    };
    if (getComputedStyle(node).visibility === "hidden") {
      finish();
      return;
    }
    node.addEventListener("animationend", onEnd);
    window.addEventListener("wheel", finish, { passive: true, once: true });
    document.addEventListener("pointerdown", finish, {
      capture: true,
      once: true,
    });
    document.addEventListener("keydown", finish, { capture: true, once: true });
    return detach;
  }, []);

  if (!motion.enabled) return null;
  return (
    <div className="brand-intro" aria-hidden="true" ref={ref}>
      <div className="brand-intro__content">
        <BrandWordmark />
        <span className="brand-intro__line">
          <span />
        </span>
        <span className="brand-intro__caption">
          Full-stack development. With care.
        </span>
      </div>
    </div>
  );
}
