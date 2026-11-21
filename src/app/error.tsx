"use client";
import { RotateCw } from "lucide-react";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main-content" className="error-page">
      <p className="eyebrow">An unexpected pause</p>
      <h1>
        Let’s give that <span className="serif accent">another try.</span>
      </h1>
      <p>
        The page couldn’t load completely. Your browser can try again without
        losing your place.
      </p>
      <button type="button" className="button" onClick={reset}>
        Try again
        <span className="button__icon">
          <RotateCw aria-hidden="true" />
        </span>
      </button>
    </main>
  );
}
