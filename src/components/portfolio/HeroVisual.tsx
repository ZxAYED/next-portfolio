"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroVisual({ src, alt }: { src: string; alt: string }) {
  const root = useRef<HTMLDivElement>(null);
  const portrait = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = root.current;
    const panel = portrait.current;
    if (
      !target ||
      !panel ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    const ctx = gsap.context(() => {
      const rotateX = gsap.quickTo(panel, "rotationX", {
        duration: 0.9,
        ease: "power3.out",
      });
      const rotateY = gsap.quickTo(panel, "rotationY", {
        duration: 0.9,
        ease: "power3.out",
      });
      const move = (event: PointerEvent) => {
        const rect = target.getBoundingClientRect();
        rotateY(
          ((event.clientX - rect.left - rect.width / 2) / rect.width) * 7,
        );
        rotateX(
          (-(event.clientY - rect.top - rect.height / 2) / rect.height) * 7,
        );
      };
      const leave = () => {
        rotateX(0);
        rotateY(0);
      };
      target.addEventListener("pointermove", move);
      target.addEventListener("pointerleave", leave);
      return () => {
        target.removeEventListener("pointermove", move);
        target.removeEventListener("pointerleave", leave);
      };
    }, target);
    return () => ctx.revert();
  }, []);
  return (
    <div className="hero-visual" ref={root} data-reveal>
      <div className="portrait-composition" ref={portrait}>
        <div
          className="portrait-orbit portrait-orbit--one"
          aria-hidden="true"
        />
        <div
          className="portrait-orbit portrait-orbit--two"
          aria-hidden="true"
        />
        <div className="portrait-panel">
          <div className="portrait-grid" aria-hidden="true" />
          <span className="portrait-watermark" aria-hidden="true">
            Z.
          </span>
          <Image
            src={src}
            alt={alt}
            fill
            priority
            quality={90}
            sizes="(max-width: 767px) 80vw, 38vw"
            className="hero-portrait"
          />
        </div>
      </div>
      <p className="portrait-caption">
        <span className="serif">Ready for the next chapter.</span>
      </p>
    </div>
  );
}
