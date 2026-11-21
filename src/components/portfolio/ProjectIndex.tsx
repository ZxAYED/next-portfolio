"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import type { Project } from "@/lib/portfolio";
import { requestSound } from "@/components/experience/audio-engine";
import "@/styles/projects.css";

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export default function ProjectIndex({ projects }: { projects: Project[] }) {
  const portalReady = useSyncExternalStore(subscribe, clientReady, serverReady);
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const currentId = useRef<string | null>(null);
  const [selection, setSelection] = useState<{
    active: string | null;
    displayed: string | null;
  }>({ active: null, displayed: null });

  const select = useCallback((id: string | null) => {
    if (currentId.current === id) return;
    currentId.current = id;
    if (id !== null) requestSound("project");
    setSelection((previous) => ({
      active: id,
      displayed: id ?? previous.displayed,
    }));
  }, []);

  useEffect(() => {
    if (!portalReady) return;
    const media = gsap.matchMedia();
    media.add(
      "(min-width: 901px) and (hover: hover) and (pointer: fine)",
      () => {
        const area = listRef.current;
        const card = previewRef.current;
        if (!area || !card) return;
        const moveX = gsap.quickTo(card, "x", {
          duration: 0.32,
          ease: "power3.out",
        });
        const moveY = gsap.quickTo(card, "y", {
          duration: 0.32,
          ease: "power3.out",
        });
        const rotate = gsap.quickTo(card, "rotation", {
          duration: 0.55,
          ease: "power3.out",
        });
        const settle = gsap.delayedCall(0.15, () => rotate(0)).pause();
        let pointer: { x: number; y: number } | null = null;
        let dismissedPointer: { x: number; y: number } | null = null;
        let positioned = false;
        let dismissed = false;
        let scrollFrame = 0;
        let lastMove = 0;
        let cardWidth = card.offsetWidth;
        let cardHeight = card.offsetHeight;

        const rowFor = (element: Element | null) => {
          const row = element?.closest<HTMLElement>("[data-project-id]");
          return row && area.contains(row) ? row : null;
        };
        const focusedRow = () => {
          const focused = document.activeElement;
          if (!focused?.matches(":focus-visible")) return null;
          const row = rowFor(focused);
          if (!row) return null;
          const rect = row.getBoundingClientRect();
          return rect.bottom > 88 && rect.top < window.innerHeight ? row : null;
        };
        const position = (x: number, y: number) => {
          const nextX = gsap.utils.clamp(
            16,
            Math.max(16, document.documentElement.clientWidth - cardWidth - 16),
            x - cardWidth / 2,
          );
          const nextY = gsap.utils.clamp(
            88,
            Math.max(88, window.innerHeight - cardHeight - 16),
            y - cardHeight / 2,
          );
          if (!positioned) {
            moveX(nextX, nextX);
            moveY(nextY, nextY);
            positioned = true;
          } else {
            moveX(nextX);
            moveY(nextY);
          }
          card.dataset.positioned = "true";
        };
        const clear = () => {
          pointer = null;
          positioned = false;
          lastMove = 0;
          select(null);
          settle.pause(0);
          rotate(0);
          cancelAnimationFrame(scrollFrame);
          scrollFrame = 0;
        };
        const positionFocus = (row: HTMLElement) => {
          const rect = row.getBoundingClientRect();
          position(rect.right - cardWidth / 2 - 48, rect.top + rect.height / 2);
          select(row.dataset.projectId ?? null);
          rotate(0);
        };
        const onPointer = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          if (dismissed) {
            if (
              event.type !== "pointermove" ||
              (event.clientX === dismissedPointer?.x &&
                event.clientY === dismissedPointer.y)
            )
              return;
            dismissed = false;
            dismissedPointer = null;
          }
          const row = rowFor(
            event.target instanceof Element ? event.target : null,
          );
          if (!row) return;
          const previous = pointer;
          const elapsed = Math.max(16, event.timeStamp - lastMove);
          lastMove = event.timeStamp;
          pointer = { x: event.clientX, y: event.clientY };
          position(pointer.x, pointer.y);
          select(row.dataset.projectId ?? null);
          if (previous) {
            rotate(
              gsap.utils.clamp(
                -2.5,
                2.5,
                ((pointer.x - previous.x) / elapsed) * 2,
              ),
            );
            settle.restart(true);
          }
        };
        const onLeave = () => {
          const row = focusedRow();
          if (row && !dismissed) {
            pointer = null;
            positionFocus(row);
          } else clear();
        };
        const onFocus = (event: FocusEvent) => {
          if (
            !(event.target instanceof Element) ||
            !event.target.matches(":focus-visible")
          )
            return;
          const row = rowFor(event.target);
          if (!row) return;
          dismissed = false;
          pointer = null;
          positionFocus(row);
        };
        const onFocusOut = (event: FocusEvent) => {
          if (
            !(event.relatedTarget instanceof Node) ||
            !area.contains(event.relatedTarget)
          )
            clear();
        };
        const onScroll = () => {
          if (dismissed || scrollFrame || !currentId.current) return;
          scrollFrame = requestAnimationFrame(() => {
            scrollFrame = 0;
            const row = pointer
              ? rowFor(document.elementFromPoint(pointer.x, pointer.y))
              : focusedRow();
            if (!row) return clear();
            if (!pointer) positionFocus(row);
            else select(row.dataset.projectId ?? null);
          });
        };
        const onEscape = (event: KeyboardEvent) => {
          if (event.key !== "Escape" || !currentId.current) return;
          dismissed = true;
          dismissedPointer = pointer;
          clear();
        };
        const onVisibility = () => {
          if (document.hidden) clear();
        };
        const onResize = () => {
          cardWidth = card.offsetWidth;
          cardHeight = card.offsetHeight;
          if (pointer) position(pointer.x, pointer.y);
          onScroll();
        };
        const resizeObserver = new ResizeObserver(onResize);
        resizeObserver.observe(card);
        area.addEventListener("pointerover", onPointer, { passive: true });
        area.addEventListener("pointermove", onPointer, { passive: true });
        area.addEventListener("pointerleave", onLeave);
        area.addEventListener("focusin", onFocus);
        area.addEventListener("focusout", onFocusOut);
        area.addEventListener("click", clear);
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize, { passive: true });
        window.addEventListener("blur", clear);
        window.addEventListener("keydown", onEscape);
        document.addEventListener("visibilitychange", onVisibility);
        return () => {
          area.removeEventListener("pointerover", onPointer);
          area.removeEventListener("pointermove", onPointer);
          area.removeEventListener("pointerleave", onLeave);
          area.removeEventListener("focusin", onFocus);
          area.removeEventListener("focusout", onFocusOut);
          area.removeEventListener("click", clear);
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onResize);
          window.removeEventListener("blur", clear);
          window.removeEventListener("keydown", onEscape);
          document.removeEventListener("visibilitychange", onVisibility);
          resizeObserver.disconnect();
          cancelAnimationFrame(scrollFrame);
          moveX.tween.kill();
          moveY.tween.kill();
          rotate.tween.kill();
          settle.kill();
          select(null);
          delete card.dataset.positioned;
        };
      },
    );
    return () => media.revert();
  }, [portalReady, select]);

  if (projects.length === 0) return null;

  return (
    <section
      id="work"
      className="project-index"
      aria-labelledby="work-title"
      data-theme="dark"
    >
      <div className="container">
        <div className="project-index__heading" data-reveal>
          <h2 id="work-title" className="serif">
            Made with intent.
          </h2>
          <p className="muted">
            A few products I’ve helped bring to life. Explore the interfaces,
            the systems, and the decisions behind them.
          </p>
        </div>
        <div
          className="project-index__list"
          ref={listRef}
          data-hovering={Boolean(selection.active)}
        >
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="project-index__entry"
              data-project-id={project.id}
              data-active={selection.active === project.id}
            >
              <Link
                className="project-index__row"
                href={`/projects/${project.slug}`}
                aria-label={`View the ${project.title} project`}
                data-cursor="View project"
              >
                <span className="project-index__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="project-index__name">{project.title}</span>
                <span className="project-index__category">
                  {project.category}
                </span>
                <ArrowUpRight
                  className="project-index__arrow"
                  aria-hidden="true"
                />
                <span className="project-index__mobile-image">
                  <Image
                    src={project.cover.src}
                    alt={project.cover.alt}
                    fill
                    sizes="(max-width: 600px) 90vw, 50vw"
                    style={{ objectPosition: project.cover.position }}
                  />
                  <span>
                    View project{" "}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
      {portalReady &&
        createPortal(
          <div
            className="project-preview"
            ref={previewRef}
            data-visible={Boolean(selection.active)}
            aria-hidden="true"
          >
            <div className="project-preview__surface">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="project-preview__slide"
                  data-active={selection.displayed === project.id}
                >
                  <Image
                    src={project.cover.src}
                    alt=""
                    fill
                    sizes="380px"
                    loading="eager"
                    style={{ objectPosition: project.cover.position }}
                  />
                  <span className="project-preview__label">
                    {project.title}
                  </span>
                </div>
              ))}
              <span className="project-preview__action">
                View
                <br />
                project <ArrowUpRight size={15} />
              </span>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
