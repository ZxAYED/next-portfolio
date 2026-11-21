"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/** A lightweight accent follows a mouse. The native cursor always stays visible. */
export function ExperienceCursor({ enabled = true }: { enabled?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const node = ref.current;
    const media = gsap.matchMedia();
    media.add("(any-hover: hover) and (any-pointer: fine)", () => {
      const x = gsap.quickTo(node, "x", { duration: 0.22, ease: "power3.out" });
      const y = gsap.quickTo(node, "y", { duration: 0.22, ease: "power3.out" });
      let visible = false;
      const hide = () => {
        visible = false;
        node.dataset.visible = "false";
      };
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" || !(event.target instanceof Element))
          return hide();
        if (
          event.target.closest(
            'input, textarea, select, [contenteditable="true"], [data-cursor-native]',
          )
        )
          return hide();
        node.dataset.interactive = String(
          Boolean(
            event.target.closest('a, button, [role="tab"], [data-cursor]'),
          ),
        );
        if (!visible) {
          x(event.clientX, event.clientX);
          y(event.clientY, event.clientY);
        } else {
          x(event.clientX);
          y(event.clientY);
        }
        visible = true;
        node.dataset.visible = "true";
      };
      const onKey = (event: KeyboardEvent) => {
        if (event.key === "Tab" || event.key === "Escape") hide();
      };
      document.addEventListener("pointermove", move, { passive: true });
      document.documentElement.addEventListener("pointerleave", hide);
      window.addEventListener("blur", hide);
      document.addEventListener("keydown", onKey);
      return () => {
        hide();
        x.tween.kill();
        y.tween.kill();
        document.removeEventListener("pointermove", move);
        document.documentElement.removeEventListener("pointerleave", hide);
        window.removeEventListener("blur", hide);
        document.removeEventListener("keydown", onKey);
      };
    });
    return () => media.revert();
  }, [enabled]);

  return (
    <div className="experience-cursor" ref={ref} aria-hidden="true">
      <span />
    </div>
  );
}
