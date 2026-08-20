"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

type MouseTiltProps = {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  pull?: number;
  scale?: number;
  perspective?: number;
};

export default function MouseTilt({
  children,
  className = "",
  maxTilt = 13,
  pull = 6,
  scale = 1.02,
  perspective = 1100,
}: MouseTiltProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const scaleValue = useMotionValue(1);

  const rotateX = useTransform(pointerY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(pointerX, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const translateX = useTransform(pointerX, [-0.5, 0.5], [-pull, pull]);
  const translateY = useTransform(pointerY, [-0.5, 0.5], [-pull, pull]);

  const springConfig = { stiffness: 240, damping: 22, mass: 0.55 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);
  const smoothTranslateX = useSpring(translateX, springConfig);
  const smoothTranslateY = useSpring(translateY, springConfig);
  const smoothScale = useSpring(scaleValue, springConfig);
  const transform = useMotionTemplate`translate3d(${smoothTranslateX}px, ${smoothTranslateY}px, 0) rotateX(${smoothRotateX}deg) rotateY(${smoothRotateY}deg) scale(${smoothScale})`;

  const reset = () => {
    pointerX.set(0);
    pointerY.set(0);
    scaleValue.set(1);
  };

  const updateTilt = (
    event: React.MouseEvent<HTMLDivElement> | React.PointerEvent<HTMLDivElement>
  ) => {
    if ("pointerType" in event && event.pointerType === "touch") {
      return;
    }

    const element = containerRef.current;
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return;
    }

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    pointerX.set(Math.min(Math.max(x - 0.5, -0.5), 0.5));
    pointerY.set(Math.min(Math.max(y - 0.5, -0.5), 0.5));
    scaleValue.set(scale);
  };

  const handlePress = (
    event: React.MouseEvent<HTMLDivElement> | React.PointerEvent<HTMLDivElement>
  ) => {
    if ("pointerType" in event && event.pointerType === "touch") {
      return;
    }

    scaleValue.set(1.01);
  };

  const handleRelease = (
    event: React.MouseEvent<HTMLDivElement> | React.PointerEvent<HTMLDivElement>
  ) => {
    if ("pointerType" in event && event.pointerType === "touch") {
      return;
    }

    scaleValue.set(scale);
  };

  return (
    <div
      ref={containerRef}
      data-mouse-tilt
      className={`block h-full w-full ${className}`.trim()}
      style={{
        perspective,
        transformStyle: "preserve-3d",
      }}
      onPointerEnter={updateTilt}
      onPointerMove={updateTilt}
      onPointerLeave={reset}
      onPointerDown={handlePress}
      onPointerUp={handleRelease}
      onMouseEnter={updateTilt}
      onMouseMove={updateTilt}
      onMouseLeave={reset}
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
    >
      <motion.div
        data-mouse-tilt-plane
        className="h-full w-full"
        style={{
          transform,
          transformOrigin: "center center",
          transformStyle: "preserve-3d",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
