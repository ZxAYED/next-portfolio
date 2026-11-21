"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  Eye,
  FileCode2,
  FileJson,
  FileText,
  GraduationCap,
} from "lucide-react";
import type { Profile, SkillGroup } from "@/lib/portfolio";
import "@/styles/resume.css";

type ResumeTab = "experience" | "skills" | "ethos" | "education";
type ViewMode = "preview" | "code";
type CopyState = "idle" | "copying" | "copied" | "error";
const tabs = [
  {
    id: "experience",
    file: "experience.ts",
    title: "Experience",
    icon: FileCode2,
  },
  { id: "skills", file: "skills.json", title: "Skills", icon: FileJson },
  { id: "ethos", file: "ethos.md", title: "Ethos", icon: FileText },
  {
    id: "education",
    file: "education.ts",
    title: "Education",
    icon: GraduationCap,
  },
] as const;

function ResumePreview({
  tab,
  profile,
  skills,
}: {
  tab: ResumeTab;
  profile: Profile;
  skills: SkillGroup[];
}) {
  if (tab === "experience")
    return (
      <div className="resume-experience">
        {profile.experience.map((job) => (
          <article key={job.id}>
            <div className="resume-experience__heading">
              <div>
                <span className="resume-meta">{job.company}</span>
                <h3>{job.title}</h3>
              </div>
              <p>
                {job.period}
                <br />
                <span>{job.location}</span>
              </p>
            </div>
            <ul className="resume-bullets">
              {job.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <ul className="resume-chips" aria-label="Technologies used">
              {job.techStack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    );
  if (tab === "skills")
    return (
      <div className="resume-cards">
        {skills.map((group, index) => (
          <article key={group.id}>
            <span className="resume-meta">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{group.title}</h3>
            <p>{group.description}</p>
            <ul className="resume-chips">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    );
  if (tab === "ethos")
    return (
      <div className="resume-cards resume-principles">
        {profile.principles.map((principle, index) => (
          <article key={principle.id}>
            <span className="resume-meta">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{principle.title}</h3>
            <p>{principle.description}</p>
          </article>
        ))}
      </div>
    );
  return (
    <div className="resume-education">
      {profile.education.map((education) => (
        <article key={education.qualification}>
          <GraduationCap
            className="resume-education__icon"
            aria-hidden="true"
          />
          <span className="resume-meta">{education.period}</span>
          <h3>{education.qualification}</h3>
          <p className="resume-education__institution">
            {education.institution}
          </p>
          <p>{education.description}</p>
        </article>
      ))}
    </div>
  );
}

export default function ResumeIde({
  profile,
  skills,
}: {
  profile: Profile;
  skills: SkillGroup[];
}) {
  const [activeTab, setActiveTab] = useState<ResumeTab>("experience");
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyRequest = useRef(0);

  const rawContent = useMemo<Record<ResumeTab, string>>(
    () => ({
      experience: `export const workExperience = ${JSON.stringify(profile.experience, null, 2)};`,
      skills: JSON.stringify(
        Object.fromEntries(skills.map((group) => [group.id, group.items])),
        null,
        2,
      ),
      ethos: `# How I approach the work\n\n${profile.principles.map((principle, index) => `## ${index + 1}. ${principle.title}\n\n${principle.description}`).join("\n\n")}`,
      education: `export const education = ${JSON.stringify(profile.education, null, 2)};`,
    }),
    [profile, skills],
  );

  useEffect(
    () => () => {
      copyRequest.current += 1;
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const chooseTab = (tab: ResumeTab) => {
    copyRequest.current += 1;
    if (resetTimer.current) clearTimeout(resetTimer.current);
    setCopyState("idle");
    setActiveTab(tab);
  };
  const handleTabKey = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    chooseTab(tabs[next].id);
    buttonRefs.current[next]?.focus();
  };
  const copyContent = async () => {
    const request = ++copyRequest.current;
    if (resetTimer.current) clearTimeout(resetTimer.current);
    setCopyState("copying");
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(rawContent[activeTab]);
      if (request !== copyRequest.current) return;
      setCopyState("copied");
      resetTimer.current = setTimeout(() => setCopyState("idle"), 2400);
    } catch {
      if (request !== copyRequest.current) return;
      setCopyState("error");
      setViewMode("code");
    }
  };
  const activeFile = tabs.find((tab) => tab.id === activeTab)!.file;

  return (
    <div className="resume-ide" data-reveal>
      <div className="resume-ide__toolbar">
        <div className="resume-ide__window">
          <span aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <p>
            zayed / <strong>{activeFile}</strong>
          </p>
        </div>
        <div className="resume-ide__controls">
          <button
            className="resume-ide__copy"
            onClick={copyContent}
            disabled={copyState === "copying"}
            aria-label={`Copy ${activeFile}`}
            title={`Copy ${activeFile}`}
          >
            {copyState === "copied" ? (
              <Check size={15} aria-hidden="true" />
            ) : (
              <Copy size={15} aria-hidden="true" />
            )}
            <span>
              {copyState === "copied"
                ? "Copied"
                : copyState === "copying"
                  ? "Copying…"
                  : "Copy"}
            </span>
          </button>
          <div
            className="resume-ide__view"
            role="group"
            aria-label="Résumé view"
          >
            <button
              aria-pressed={viewMode === "preview"}
              onClick={() => setViewMode("preview")}
            >
              <Eye size={15} aria-hidden="true" /> UI
            </button>
            <button
              aria-pressed={viewMode === "code"}
              onClick={() => setViewMode("code")}
            >
              <Code2 size={15} aria-hidden="true" /> Code
            </button>
          </div>
        </div>
      </div>
      <div
        className="resume-ide__tabs"
        role="tablist"
        aria-label="Résumé sections"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              buttonRefs.current[index] = element;
            }}
            id={`resume-tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls="resume-panel"
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => chooseTab(tab.id)}
            onKeyDown={(event) => handleTabKey(event, index)}
          >
            <tab.icon size={16} aria-hidden="true" />
            <span className="resume-ide__filename">{tab.file}</span>
            <span className="resume-ide__tab-title">{tab.title}</span>
          </button>
        ))}
      </div>
      <div
        className="resume-ide__content"
        id="resume-panel"
        role="tabpanel"
        aria-labelledby={`resume-tab-${activeTab}`}
        tabIndex={0}
      >
        <div
          className="resume-ide__panel-enter"
          key={`${activeTab}-${viewMode}`}
        >
          {viewMode === "preview" ? (
            <ResumePreview tab={activeTab} profile={profile} skills={skills} />
          ) : (
            <div className="resume-code">
              <div className="resume-code__heading">
                <Code2 size={14} aria-hidden="true" />
                <span>{activeFile}</span>
              </div>
              <pre>
                <code>{rawContent[activeTab]}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
      <div className="resume-ide__status" aria-live="polite" role="status">
        {copyState === "error"
          ? "Copy wasn’t available. Select the code above to copy it manually."
          : copyState === "copied"
            ? `${activeFile} copied to your clipboard.`
            : ""}
      </div>
      <div className="resume-ide__footer">
        <span>
          <span className="resume-ide__status-dot" aria-hidden="true" />{" "}
          {profile.role}
        </span>
        <a href={profile.resume.url} target="_blank" rel="noopener noreferrer">
          {profile.resume.label}
          <ArrowUpRight size={16} aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
