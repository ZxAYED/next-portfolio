import type { SVGProps } from "react";

/**
 * ZI: an original Zayed Iqbal monogram.
 * The diagonal Z connects two level rails; the I reads like a text caret.
 * Keep this geometry in sync with the standalone marks in public/brand.
 */
export function BrandMark({
  className = "",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 60 56"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`brand-mark ${className}`.trim()}
      {...props}
    >
      <path
        className="brand-mark__z"
        d="M7 10H39V17L18 39H39V46H7V39L28 17H7V10Z"
        fill="currentColor"
      />
      <path
        className="brand-mark__i"
        d="M45 10H53V46H45V10Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function BrandWordmark({
  className = "",
  fullName = false,
}: {
  className?: string;
  fullName?: boolean;
}) {
  return (
    <span className={`brand-wordmark ${className}`.trim()}>
      <BrandMark />
      <span className="brand-wordmark__name">
        zayed
        {fullName && <span className="brand-wordmark__surname"> iqbal</span>}
      </span>
    </span>
  );
}
