"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";
import motion from "@/content/motion.json";
import { resolveSamePageAnchor } from "@/lib/anchor-navigation";
import { ActionMotion } from "./ActionMotion";
import { ExperienceCursor } from "./ExperienceCursor";
import { requestSound } from "./audio-engine";

gsap.registerPlugin(ScrollTrigger);
type Theme = "dark" | "light";
const paletteKeys = [
  "canvas",
  "fg",
  "fg-muted",
  "line",
  "surface",
  "accent",
] as const;
type Palette = Record<(typeof paletteKeys)[number], string>;

function luminance(color: string) {
  const [r = 0, g = 0, b = 0] = gsap.utils.splitColor(color).map((channel) => {
    const v = channel / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return r * 0.2126 + g * 0.7152 + b * 0.0722;
}

/** One GSAP ticker coordinates wheel smoothing, scroll scenes and palette changes. */
export function ExperienceRuntime() {
  const pathname = usePathname();
  const owner = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    // Mount inside the page boundary, after its markup, and enhance only that
    // page. A root-layout effect may run before a streamed page has hydrated.
    const main = owner.current?.closest("main");
    if (!main) return;
    let disposed = false;
    let smoother: Lenis | undefined;
    let ticker: ((seconds: number) => void) | undefined;
    let refreshTimer: ReturnType<typeof setTimeout> | undefined;
    let initialFrame = 0;
    let navigationFrame = 0;
    let pendingAnchor: HTMLElement | undefined;
    let activeTheme: Theme | undefined;
    let paletteTween: gsap.core.Tween | undefined;
    const styles = getComputedStyle(root);
    const palettes = Object.fromEntries(
      (["dark", "light"] as const).map((theme) => [
        theme,
        Object.fromEntries(
          paletteKeys.map((key) => [
            key,
            styles.getPropertyValue(`--theme-${theme}-${key}`).trim(),
          ]),
        ),
      ]),
    ) as Record<Theme, Palette>;
    const sections = [
      ...main.querySelectorAll<HTMLElement>("[data-theme]"),
    ].map((node) => ({
      node,
      theme:
        node.dataset.theme === "light" ? ("light" as const) : ("dark" as const),
      top: 0,
    }));
    const measure = () => {
      sections.forEach((section) => {
        section.top = section.node.getBoundingClientRect().top + window.scrollY;
      });
    };
    const settlePalette = (theme: Theme) => {
      for (const key of paletteKeys)
        root.style.setProperty(`--${key}`, palettes[theme][key]);
      root.style.colorScheme = theme;
      root.dataset.themeTransition = "settled";
    };
    const readableInk = () => {
      const canvas = luminance(root.style.getPropertyValue("--canvas"));
      // Opposing background/text crossfades would meet at the same grey.
      const inkTheme: Theme = canvas > 0.179 ? "light" : "dark";
      const fallback = inkTheme === "light" ? "#000000" : "#ffffff";
      for (const key of ["fg", "fg-muted", "accent"] as const) {
        const ink = palettes[inkTheme][key];
        const light = luminance(ink);
        const contrast =
          (Math.max(canvas, light) + 0.05) / (Math.min(canvas, light) + 0.05);
        root.style.setProperty(`--${key}`, contrast >= 4.5 ? ink : fallback);
      }
    };
    const updateTheme = (immediate = false) => {
      const readingPoint = window.scrollY + window.innerHeight * 0.48;
      let active = sections[0];
      for (const section of sections) {
        if (section.top <= readingPoint) active = section;
        else break;
      }
      const theme = active?.theme ?? "dark";
      root.dataset.currentSection = active?.node.id ?? "";
      if (theme === activeTheme) return;
      const previous = activeTheme;
      activeTheme = theme;
      root.dataset.activeTheme = theme;
      paletteTween?.kill();
      if (!motion.enabled || immediate) {
        settlePalette(theme);
        return;
      }
      if (previous) requestSound("chapter");
      root.dataset.themeTransition = "running";
      paletteTween = gsap.to(root, {
        "--canvas": palettes[theme].canvas,
        "--surface": palettes[theme].surface,
        "--line": palettes[theme].line,
        duration: motion.themeDuration,
        ease: "sine.inOut",
        overwrite: "auto",
        onUpdate: readableInk,
        onComplete: () => {
          if (!disposed && activeTheme === theme) settlePalette(theme);
        },
      });
    };
    const revealTargets = [
      ...main.querySelectorAll<HTMLElement>(
        "[data-reveal], [data-reveal-group] > *",
      ),
    ].filter(
      (node, index, nodes) =>
        nodes.indexOf(node) === index &&
        !nodes.some((other) => other !== node && other.contains(node)),
    );
    const context = gsap.context(() => {
      measure();
      updateTheme(true);
      root.dataset.motionEnhanced = "true";
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          root.style.setProperty("--page-progress", String(self.progress));
          updateTheme();
        },
        onRefresh: () => {
          measure();
          updateTheme();
        },
      });
      if (!motion.enabled) return;
      const upcoming = revealTargets.filter(
        (node) =>
          node.getBoundingClientRect().top >= window.innerHeight &&
          !node.closest('[aria-hidden="true"], [inert]'),
      );
      if (!upcoming.length) return;
      gsap.set(upcoming, { opacity: 0, y: 34 });
      upcoming.forEach((node) => {
        node.dataset.entrance = "pending";
      });
      ScrollTrigger.batch(upcoming, {
        start: "top 92%",
        once: true,
        interval: 0.08,
        batchMax: 5,
        onEnter: (nodes) => {
          context.add(() =>
            gsap.to(nodes, {
              opacity: 1,
              y: 0,
              duration: 1.1,
              stagger: 0.12,
              ease: "power3.out",
              clearProps: "opacity,transform",
              onComplete: () =>
                nodes.forEach((node) =>
                  node.setAttribute("data-entrance", "shown"),
                ),
            }),
          );
        },
      });
    }, main);
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>(
        '[data-entrance="pending"]',
      );
      if (target) {
        gsap.killTweensOf(target, "opacity,y");
        gsap.set(target, { clearProps: "opacity,transform" });
        target.dataset.entrance = "shown";
      }
    };
    const headerOffset = () =>
      Math.min(
        124,
        (document.querySelector("header")?.getBoundingClientRect().height ??
          76) + 30,
      );
    const focusTarget = (target: HTMLElement) => {
      if (!target.isConnected) return;
      const temporary = !target.hasAttribute("tabindex");
      if (temporary) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      if (temporary)
        target.addEventListener(
          "blur",
          () => target.removeAttribute("tabindex"),
          { once: true },
        );
    };
    const scrollTo = (
      target: HTMLElement,
      focus = false,
      immediate = false,
    ) => {
      const top = Math.max(
        0,
        target.getBoundingClientRect().top + window.scrollY - headerOffset(),
      );
      if (smoother) {
        smoother.scrollTo(top, {
          duration: motion.anchorDuration,
          immediate,
          force: true,
          onComplete: () => {
            if (focus) focusTarget(target);
          },
        });
      } else {
        window.scrollTo({ top, behavior: immediate ? "instant" : "smooth" });
        if (focus) focusTarget(target);
      }
    };
    const onAnchor = (event: MouseEvent) => {
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (!link) return;
      const destination = resolveSamePageAnchor({
        href: link.href,
        currentHref: window.location.href,
        target: link.getAttribute("target"),
        download: link.hasAttribute("download"),
        button: event.button,
        defaultPrevented: event.defaultPrevented,
        altKey: event.altKey,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        shiftKey: event.shiftKey,
      });
      const target = destination
        ? document.getElementById(destination.id)
        : null;
      if (!destination || !target) return;
      event.preventDefault();
      if (destination.href !== window.location.href)
        window.history.pushState(window.history.state, "", destination.href);
      // Closing the mobile menu restarts Lenis, which resets an active tween.
      // Begin this navigation only after that overlay has released its lock.
      if (root.dataset.menuOpen === "true") pendingAnchor = target;
      else scrollTo(target, true);
    };
    const refresh = () => {
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => {
        if (disposed) return;
        smoother?.resize();
        ScrollTrigger.refresh();
      }, 140);
    };
    const onOverlay = (event: Event) => {
      if ((event as CustomEvent<{ open: boolean }>).detail.open)
        smoother?.stop();
      else {
        smoother?.start();
        const target = pendingAnchor;
        pendingAnchor = undefined;
        if (target) {
          cancelAnimationFrame(navigationFrame);
          navigationFrame = requestAnimationFrame(() => {
            if (!disposed && target.isConnected) scrollTo(target, true);
          });
        }
      }
    };
    const onScrollRequest = (event: Event) => {
      const detail = (event as CustomEvent<{ top?: number; immediate?: boolean }>).detail;
      const top = detail?.top;
      if (typeof top !== "number" || !Number.isFinite(top)) return;
      event.preventDefault();
      const destination = Math.max(0, top);
      if (smoother)
        smoother.scrollTo(destination, {
          ...(detail.immediate ? { immediate: true } : { duration: motion.anchorDuration }),
          force: true,
        });
      else window.scrollTo({ top: destination, behavior: detail.immediate ? "instant" : "smooth" });
    };
    const resize = new ResizeObserver(refresh);
    resize.observe(main);
    window.addEventListener("resize", refresh, { passive: true });
    document.addEventListener("load", refresh, true);
    document.addEventListener("click", onAnchor, true);
    document.addEventListener("focusin", onFocus);
    window.addEventListener("portfolio:overlay", onOverlay);
    window.addEventListener("portfolio:scroll-to", onScrollRequest);
    void document.fonts.ready.then(() => {
      if (!disposed) refresh();
    });

    if (motion.enabled && motion.smoothScroll) {
      void import("lenis")
        .then(({ default: LenisConstructor }) => {
          if (disposed) return;
          smoother = new LenisConstructor({
            autoRaf: false,
            lerp: motion.wheelLerp,
            smoothWheel: true,
            syncTouch: false,
            allowNestedScroll: true,
            anchors: false,
            respectReducedMotion: false,
          });
          smoother.on("scroll", ScrollTrigger.update);
          ticker = (seconds) => smoother?.raf(seconds * 1000);
          gsap.ticker.add(ticker);
          gsap.ticker.lagSmoothing(0);
          root.dataset.smooth = "true";
          if (root.dataset.menuOpen === "true") smoother.stop();
        })
        .catch(() => {
          if (!disposed) root.dataset.smooth = "fallback";
        });
    }
    initialFrame = requestAnimationFrame(() => {
      if (disposed || !window.location.hash) return;
      try {
        const target = document.getElementById(
          decodeURIComponent(window.location.hash.slice(1)),
        );
        if (target) scrollTo(target, false, true);
      } catch {
        /* Leave malformed fragments to the browser. */
      }
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(initialFrame);
      cancelAnimationFrame(navigationFrame);
      clearTimeout(refreshTimer);
      resize.disconnect();
      window.removeEventListener("resize", refresh);
      document.removeEventListener("load", refresh, true);
      document.removeEventListener("click", onAnchor, true);
      document.removeEventListener("focusin", onFocus);
      window.removeEventListener("portfolio:overlay", onOverlay);
      window.removeEventListener("portfolio:scroll-to", onScrollRequest);
      if (ticker) gsap.ticker.remove(ticker);
      smoother?.destroy();
      paletteTween?.kill();
      context.revert();
      revealTargets.forEach((node) => {
        delete node.dataset.entrance;
      });
      delete root.dataset.motionEnhanced;
      delete root.dataset.smooth;
      delete root.dataset.currentSection;
      delete root.dataset.themeTransition;
      root.dataset.activeTheme = "dark";
      for (const key of paletteKeys) root.style.removeProperty(`--${key}`);
      root.style.removeProperty("--page-progress");
      root.style.removeProperty("color-scheme");
    };
  }, [pathname]);

  return (
    <>
      <span ref={owner} hidden data-motion-root />
      <div className="page-progress" aria-hidden="true" />
      <ExperienceCursor enabled={motion.enabled} />
      <ActionMotion enabled={motion.enabled} />
    </>
  );
}
