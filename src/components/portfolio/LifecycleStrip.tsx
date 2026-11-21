import type { ProcessStep } from "@/lib/portfolio";

/** The introduction and detailed journey read from the same lifecycle content. */
export function LifecycleStrip({ steps }: { steps: ProcessStep[] }) {
  if (!steps.length) return null;
  return (
    <ol
      className="lifecycle-strip"
      aria-label="My client-led software development lifecycle"
      data-reveal
    >
      {steps.map((step) => (
        <li key={step.id}>
          <span className="lifecycle-step" aria-hidden="true">
            {step.number}
          </span>
          <span>{step.label}</span>
        </li>
      ))}
    </ol>
  );
}
