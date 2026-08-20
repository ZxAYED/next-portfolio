"use client";

import dynamic from "next/dynamic";
import React from "react";

const AnimatedCursor = dynamic(() => import("react-animated-cursor"), {
  ssr: false,
});

export default function ClientCursor() {
  return (
    <AnimatedCursor
      innerSize={10}
      outerSize={35}
      color="147, 51, 234"
      outerAlpha={0.4}
      innerScale={0.9}
      outerScale={1.5}
    />
  );
}
