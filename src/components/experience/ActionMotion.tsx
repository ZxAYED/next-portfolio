"use client";

import { useEffect } from "react";
import gsap from "gsap";

const actionSelector = ".button";
const controlSelector =
  "button, a.button, a[data-sound], .site-nav a, .site-mobile-nav a";

/** Delegation also covers dialogs and tabs mounted after the initial render. */
export function ActionMotion({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;
    const touched = new Set<HTMLElement>();
    let pressed: HTMLElement | null = null;
    const clearControl = (element: HTMLElement) => {
      gsap.killTweensOf(
        element,
        "--action-fill,--action-rotation,--control-press",
      );
      ["--action-fill", "--action-rotation", "--control-press"].forEach(
        (property) => element.style.removeProperty(property),
      );
      delete element.dataset.actionReady;
      delete element.dataset.pressReady;
      touched.delete(element);
      if (pressed === element) pressed = null;
    };
    const forgetDetached = (element: HTMLElement) => {
      if (!element.isConnected) clearControl(element);
    };
    const track = (element: HTMLElement) => {
      // Dialog controls are replaced after closing. Prune them on interaction,
      // rather than retaining detached nodes for the lifetime of the page.
      touched.forEach(forgetDetached);
      touched.add(element);
    };
    const find = (target: EventTarget | null, selector: string) =>
      target instanceof Element ? target.closest<HTMLElement>(selector) : null;
    const canAnimate = (element: HTMLElement | null): element is HTMLElement =>
      Boolean(
        element?.isConnected &&
        !element.matches(':disabled, [aria-disabled="true"]'),
      );

    function animateAction(element: HTMLElement, active: boolean) {
      if (!canAnimate(element)) return;
      if (!element.hasAttribute("data-action-ready")) {
        gsap.set(element, { "--action-fill": 0, "--action-rotation": 0 });
        element.dataset.actionReady = "true";
      }
      track(element);
      gsap.to(element, {
        "--action-fill": active ? 1 : 0,
        "--action-rotation": active ? 45 : 0,
        duration: active ? 0.62 : 0.48,
        ease: "power2.out",
        overwrite: "auto",
        onComplete: () => forgetDetached(element),
      });
    }

    const onOver = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const element = find(event.target, actionSelector);
      if (
        element &&
        !(
          event.relatedTarget instanceof Node &&
          element.contains(event.relatedTarget)
        )
      )
        animateAction(element, true);
    };
    const onOut = (event: PointerEvent) => {
      const element = find(event.target, actionSelector);
      if (
        !element ||
        (event.relatedTarget instanceof Node &&
          element.contains(event.relatedTarget))
      )
        return;
      if (!element.matches(":focus-visible")) animateAction(element, false);
    };
    const onFocus = (event: FocusEvent) => {
      const element = find(event.target, actionSelector);
      if (element?.matches(":focus-visible")) animateAction(element, true);
    };
    const onBlur = (event: FocusEvent) => {
      const element = find(event.target, actionSelector);
      if (element && !element.matches(":hover")) animateAction(element, false);
    };
    const release = () => {
      if (!pressed) return;
      const element = pressed;
      if (!element.isConnected) {
        clearControl(element);
        return;
      }
      gsap.to(element, {
        "--control-press": 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.65)",
        overwrite: "auto",
        onComplete: () => forgetDetached(element),
      });
      if (
        element.matches(actionSelector) &&
        !element.matches(":hover, :focus-visible")
      ) {
        animateAction(element, false);
      }
      pressed = null;
    };
    const press = (target: EventTarget | null) => {
      const element = find(target, controlSelector);
      if (!canAnimate(element)) return;
      release();
      pressed = element;
      track(element);
      element.dataset.pressReady = "true";
      gsap.to(element, {
        "--control-press": 0.975,
        duration: 0.14,
        ease: "power2.out",
        overwrite: "auto",
        onComplete: () => forgetDetached(element),
      });
      if (element.matches(actionSelector)) animateAction(element, true);
    };
    const onDown = (event: PointerEvent) => press(event.target);
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.repeat && (event.key === "Enter" || event.key === " "))
        press(event.target);
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") release();
    };
    const reset = () => {
      touched.forEach(clearControl);
      pressed = null;
    };
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", onBlur);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerup", release);
    document.addEventListener("pointercancel", release);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", reset);
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", onBlur);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", release);
      document.removeEventListener("pointercancel", release);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", reset);
      reset();
    };
  }, [enabled]);
  return null;
}
