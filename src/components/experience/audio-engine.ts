type AudioWindow = Window &
  typeof globalThis & { webkitAudioContext?: typeof AudioContext };
type Voice = { oscillator: OscillatorNode; gain: GainNode };
const files = {
  intro: "01_TechQuell_Logo_Intro.mp3",
  click: "02_Button_Click.mp3",
  project: "03_Project_Hover.mp3",
  chapter: "04_Chapter_Transition.mp3",
  confirmation: "05_Contact_Confirmation.mp3",
} as const;

export type SoundCue = keyof typeof files;
export const cueEvent = "studio:sound-cue";

export function requestSound(cue: SoundCue) {
  document.dispatchEvent(new CustomEvent(cueEvent, { detail: cue }));
}

export class StudioAudio {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private voices = new Set<Voice>();
  private generation = 0;
  private buffers = new Map<SoundCue, Promise<AudioBuffer>>();
  private sources = new Map<SoundCue, AudioBufferSourceNode>();
  private lastCue = new Map<SoundCue, number>();
  private disposed = false;

  constructor(
    private readonly volume: number,
    private readonly ambient: boolean,
  ) {}

  async enable(): Promise<boolean> {
    if (this.disposed) return false;
    const generation = ++this.generation;
    if (!this.context) {
      const AudioConstructor =
        window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
      if (!AudioConstructor)
        throw new Error("This browser does not support audio.");
      this.context = new AudioConstructor();
      this.master = this.context.createGain();
      this.master.gain.value = 0;
      this.master.connect(this.context.destination);
      if (this.ambient) this.createAmbient();
    }
    await this.context.resume();
    if (generation !== this.generation || this.disposed) return false;
    if (this.context.state !== "running")
      throw new Error("Audio could not be started.");
    // A short master fade lets the activation chime speak clearly. The pad has its
    // own slow envelope, so it never masks that confirmation or starts abruptly.
    this.fadeTo(this.volume, 0.08);
    return true;
  }

  async mute(): Promise<void> {
    const generation = ++this.generation;
    this.fadeTo(0, 0.08);
    await new Promise<void>((resolve) => setTimeout(resolve, 100));
    if (generation !== this.generation || this.disposed) return;
    await this.pause();
  }

  async pause(): Promise<void> {
    this.generation += 1;
    this.stopCues();
    if (this.context && this.context.state !== "closed")
      await this.context.suspend();
  }

  async cue(kind: SoundCue): Promise<void> {
    const context = this.context;
    const master = this.master;
    if (!context || !master || context.state !== "running" || this.disposed)
      return;
    const now = context.currentTime;
    const cooldown = kind === "chapter" ? 0.65 : 0.12;
    if (now - (this.lastCue.get(kind) ?? -Infinity) < cooldown) return;
    this.lastCue.set(kind, now);
    const generation = this.generation;
    let buffer = this.buffers.get(kind);
    if (!buffer) {
      buffer = fetch("/sound/" + files[kind])
        .then((response) => {
          if (!response.ok) throw new Error("Sound unavailable");
          return response.arrayBuffer();
        })
        .then((bytes) => context.decodeAudioData(bytes));
      this.buffers.set(kind, buffer);
    }
    try {
      const sample = await buffer;
      if (
        this.generation !== generation ||
        this.lastCue.get(kind) !== now ||
        document.hidden
      )
        return;
      this.sources.get(kind)?.stop();
      const source = context.createBufferSource();
      source.buffer = sample;
      source.connect(master);
      this.sources.set(kind, source);
      source.onended = () => {
        source.disconnect();
        if (this.sources.get(kind) === source) this.sources.delete(kind);
      };
      source.start();
    } catch {
      // An unavailable asset can retry on the next interaction.
      if (this.buffers.get(kind) === buffer) this.buffers.delete(kind);
    }
  }

  private stopCues() {
    this.sources.forEach((source) => source.stop());
    this.sources.clear();
    this.lastCue.clear();
  }

  dispose(): void {
    this.disposed = true;
    this.stopCues();
    this.buffers.clear();
    this.generation += 1;
    this.voices.forEach(({ oscillator, gain }) => {
      oscillator.onended = null;
      oscillator.stop();
      oscillator.disconnect();
      gain.disconnect();
    });
    this.voices.clear();
    this.master?.disconnect();
    if (this.context && this.context.state !== "closed")
      void this.context.close().catch(() => {});
    this.master = null;
    this.context = null;
  }

  private fadeTo(value: number, seconds: number): void {
    if (!this.context || !this.master) return;
    const now = this.context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(
      Math.min(0.25, Math.max(0, value)),
      now + seconds,
    );
  }

  private createVoice(): Voice | null {
    if (!this.context || !this.master) return null;
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();
    const voice = { oscillator, gain };
    oscillator.type = "sine";
    oscillator.connect(gain).connect(this.master);
    this.voices.add(voice);
    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
      this.voices.delete(voice);
    };
    return voice;
  }

  private createAmbient(): void {
    const context = this.context;
    if (!context) return;
    const now = context.currentTime;
    // A soft, consonant A/E texture stays below the short interaction cues.
    const notes = [
      { frequency: 220, level: 0.15 },
      { frequency: 329.63, level: 0.06 },
      { frequency: 440.2, level: 0.025 },
    ];
    notes.forEach(({ frequency, level }) => {
      const voice = this.createVoice();
      if (!voice) return;
      voice.oscillator.frequency.value = frequency;
      voice.gain.gain.setValueAtTime(0, now);
      voice.gain.gain.linearRampToValueAtTime(level, now + 2.4);
      voice.oscillator.start(now);
    });
  }
}
