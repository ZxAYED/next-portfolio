"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { BrandWordmark } from "./BrandMark";
import { SoundControl } from "@/components/experience/SoundControl";

export function SiteHeader({ resumeUrl }: { resumeUrl: string }) {
  const navigation = [
    { label: "Work", href: "/#work", external: false },
    { label: "Skills", href: "/#expertise", external: false },
    { label: "Process", href: "/#process", external: false },
    { label: "Résumé", href: resumeUrl, external: true },
  ] as const;
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [compact, setCompact] = useState(false);
  const [menu, setMenu] = useState({ path: pathname, open: false });
  const open = menu.open && menu.path === pathname;
  const close = () => setMenu({ path: pathname, open: false });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setCompact(window.scrollY > 48);
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.dataset.menuOpen = "true";
    window.dispatchEvent(
      new CustomEvent("portfolio:overlay", { detail: { open: true } }),
    );
    const dismiss = () => setMenu({ path: pathname, open: false });
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismiss();
        menuButton.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !ref.current?.contains(event.target))
        dismiss();
    };
    const focusOutside = (event: FocusEvent) => {
      // This is a navigation disclosure, not a modal. Let Tab follow the
      // document order and release the scroll lock when focus leaves it.
      if (event.target instanceof Node && !ref.current?.contains(event.target))
        dismiss();
    };
    const media = window.matchMedia("(min-width: 901px)");
    const wide = () => {
      if (media.matches) dismiss();
    };
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    document.addEventListener("focusin", focusOutside);
    media.addEventListener("change", wide);
    return () => {
      document.body.style.overflow = previousOverflow;
      delete document.documentElement.dataset.menuOpen;
      window.dispatchEvent(
        new CustomEvent("portfolio:overlay", { detail: { open: false } }),
      );
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("focusin", focusOutside);
      media.removeEventListener("change", wide);
    };
  }, [open, pathname]);

  return (
    <header
      className="site-header"
      ref={ref}
      data-compact={compact}
      data-menu-open={open}
    >
      <div className="site-header__inner">
        <Link
          className="site-brand"
          href="/"
          aria-label="Zayed Iqbal — home"
          onClick={close}
        >
          <BrandWordmark />
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              aria-current={item.href === pathname ? "page" : undefined}
            >
              {item.label}
              {item.external && (
                <span className="sr-only"> (opens in a new tab)</span>
              )}
            </Link>
          ))}
        </nav>
        <div className="site-header__actions">
          <SoundControl />
          <Link
            href="/#contact"
            className="button button--small site-header__cta"
            onClick={close}
          >
            <span>Contact me</span>
            <span className="button__icon">
              <ArrowUpRight aria-hidden="true" />
            </span>
          </Link>
          <button
            ref={menuButton}
            className="site-menu-button"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-controls="site-mobile-navigation"
            aria-expanded={open}
            onClick={() => setMenu({ path: pathname, open: !open })}
          >
            <span aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>
      <nav
        id="site-mobile-navigation"
        className="site-mobile-nav"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        inert={!open}
        data-lenis-prevent
      >
        <div className="site-mobile-nav__links">
          {navigation.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              onClick={close}
              style={{ "--nav-index": index } as React.CSSProperties}
            >
              <span>{item.label}</span>
              {item.external && (
                <span className="sr-only"> (opens in a new tab)</span>
              )}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={close}
            style={{ "--nav-index": navigation.length } as React.CSSProperties}
          >
            <span>Contact me</span>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
        <p>
          Based in Dhaka.
          <br />
          Building for what’s next.
        </p>
      </nav>
    </header>
  );
}
