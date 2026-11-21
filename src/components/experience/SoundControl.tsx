"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import motion from "@/content/motion.json";
type SoundSettings = typeof motion.sound;
import { cueEvent, StudioAudio, type SoundCue } from "./audio-engine";

/**
 * The control reflects the intended default state. Browsers may still require
 * the first user interaction before audio can actually start.
 */
export function SoundControl({
  settings = motion.sound,
}: { settings?: SoundSettings } = {}) {
  if (!settings.enabled) return null;
  return (
    <SoundSwitch
      key={`${settings.volume}:${settings.ambient}:${settings.defaultOn}`}
      settings={settings}
    />
  );
}

function SoundSwitch({ settings }: { settings: SoundSettings }) {
  const [on, setOn] = useState(settings.defaultOn);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const audio = useRef<StudioAudio | null>(null);
  const enabled = useRef(false);
  const mounted = useRef(false);
  const pendingAutoStart = useRef(settings.defaultOn);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const announce = useCallback((message: string) => {
    clearTimeout(noticeTimer.current);
    setNotice(message);
    noticeTimer.current = setTimeout(() => {
      if (mounted.current) setNotice("");
    }, 3000);
  }, []);

  const startAudio = useCallback(
    async ({
      announceOnStart,
      cue = "intro",
    }: { announceOnStart?: boolean; cue?: SoundCue } = {}) => {
      audio.current ??= new StudioAudio(settings.volume, settings.ambient);
      const started = await audio.current.enable();
      if (!mounted.current) return false;
      if (!started || document.hidden) {
        await audio.current.pause();
        return false;
      }
      enabled.current = true;
      pendingAutoStart.current = false;
      setOn(true);
      if (announceOnStart) announce("Sound on");
      void audio.current.cue(cue);
      return true;
    },
    [announce, settings.ambient, settings.volume],
  );

  useEffect(() => {
    mounted.current = true;
    const bootstrap = async () => {
      if (!pendingAutoStart.current || enabled.current || document.hidden)
        return;
      try {
        await startAudio();
      } catch {
        // Some browsers require a gesture. Keep the UI in its intended on state
        // and wait for the first interaction to unlock audio.
      }
    };
    void bootstrap();

    const onFirstInteraction = (event: Event) => {
      if (!pendingAutoStart.current || enabled.current || document.hidden)
        return;
      // The toggle click has its own start action. Running both creates
      // a start/stop race on the visitor's very first interaction.
      if (event.target instanceof Element && event.target.closest(".sound-control"))
        return;
      if (event instanceof KeyboardEvent && !["Enter", " ", "Spacebar"].includes(event.key))
        return;
      void startAudio({ announceOnStart: true }).catch(() => {
        enabled.current = false;
        if (mounted.current) {
          setOn(false);
          pendingAutoStart.current = false;
          announce("Sound is unavailable in this browser.");
        }
      });
    };

    const onClick = (event: MouseEvent) => {
      if (
        !enabled.current ||
        document.hidden ||
        !(event.target instanceof Element)
      )
        return;
      const target = event.target.closest<HTMLElement>(
        "button, a[href], [data-sound]",
      );
      if (
        !target ||
        target.matches('.sound-control, [type="submit"], :disabled')
      )
        return;
      void audio.current?.cue(
        target.matches(".site-brand") ? "intro" :
          target.dataset.sound === "chapter" ? "chapter" : "click",
      );
    };
    const onCue = (event: Event) => {
      if (enabled.current && !document.hidden)
        void audio.current?.cue((event as CustomEvent<SoundCue>).detail);
    };
    const onVisibility = () => {
      if (document.hidden) {
        void audio.current?.pause().catch(() => {});
      } else if (enabled.current) {
        void audio.current?.enable().catch(() => {
          enabled.current = false;
          if (mounted.current) {
            setOn(false);
            announce("Sound paused. Tap to resume.");
          }
        });
      } else if (pendingAutoStart.current) {
        void bootstrap();
      }
    };
    document.addEventListener(cueEvent, onCue);
    document.addEventListener("click", onClick);
    document.addEventListener("pointerdown", onFirstInteraction, {
      passive: true,
    });
    document.addEventListener("keydown", onFirstInteraction);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      mounted.current = false;
      enabled.current = false;
      pendingAutoStart.current = false;
      clearTimeout(noticeTimer.current);
      document.removeEventListener(cueEvent, onCue);
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointerdown", onFirstInteraction);
      document.removeEventListener("keydown", onFirstInteraction);
      document.removeEventListener("visibilitychange", onVisibility);
      audio.current?.dispose();
      audio.current = null;
    };
  }, [announce, settings.defaultOn, startAudio]);

  const toggle = async () => {
    if (busy) return;
    clearTimeout(noticeTimer.current);
    setNotice("");
    if (enabled.current) {
      enabled.current = false;
      pendingAutoStart.current = false;
      setOn(false);
      announce("Sound off");
      void audio.current?.mute().catch(() => {});
      return;
    }

    setBusy(true);
    try {
      const started = await startAudio({ announceOnStart: true });
      if (!started && mounted.current) setOn(false);
    } catch {
      enabled.current = false;
      pendingAutoStart.current = false;
      if (mounted.current) {
        setOn(false);
        announce("Sound is unavailable in this browser.");
      }
    } finally {
      if (mounted.current) setBusy(false);
    }
  };

  return (
    <span className="sound-switch">
      <button
        className={`sound-control${on ? " is-on" : ""}`}
        type="button"
        onClick={() => void toggle()}
        aria-pressed={on}
        aria-busy={busy}
        disabled={busy}
        aria-label={on ? "Turn sound off" : "Turn sound on"}
        title={on ? "Mute sound" : "Enable sound"}
      >
        <span className="sound-bars" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="sound-label">Sound {on ? "on" : "off"}</span>
      </button>
      <span
        className="sound-notice"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {notice}
      </span>
    </span>
  );
}
