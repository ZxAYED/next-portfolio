"use client";

import React, { useState } from "react";
import {
  FileCode2,
  FileJson,
  FileText,
  GraduationCap,
  Eye,
  Code2,
  Copy,
  Check,
  Download,
  GitBranch,
  CheckCircle2,
  Building2,
  Calendar,
  MapPin,
} from "lucide-react";

type TabType = "experience.ts" | "skills.json" | "ethos.md" | "education.ts";
type ViewMode = "preview" | "code";

const RAW_CONTENT: Record<TabType, string> = {
  "experience.ts": `export const workExperience = [
  {
    role: "Jr Full Stack Developer",
    company: "SoftVence Agency",
    period: "June 2025 – July 2026",
    location: "Dhaka, Bangladesh (Hybrid)",
    responsibilities: [
      "Built full-stack web applications with React, Next.js, Redux, Nest.js, and Node.js",
      "Implemented real-time WebSocket communication and automated background tasks with node-cron",
      "Designed database schemas and caching layers with PostgreSQL, Prisma, MongoDB, and Redis",
      "Integrated Stripe and SSLCommerz payment gateways with webhook handling"
    ],
    techStack: ["Next.js", "TypeScript", "Node.js", "Nest.js", "PostgreSQL", "Prisma", "Redis", "Docker"]
  }
];`,

  "skills.json": `{
  "frontend": ["JavaScript", "TypeScript", "React", "Next.js", "Redux", "Tailwind CSS", "Material UI", "ShadCN", "Lightswind UI"],
  "backend": ["Node.js", "Nest.js", "Express.js", "WebSockets", "REST APIs"],
  "databases": ["PostgreSQL", "MongoDB", "Prisma ORM", "Mongoose", "Redis", "Supabase"],
  "devops_and_tools": ["Docker", "GitHub Actions", "AWS (SES, EC2, SQS, S3)", "BullMQ", "Firebase", "Postman", "Vercel", "Render"]
}`,

  "ethos.md": `# Engineering Ethos & Principles

## 1. Extreme Ownership
I treat codebases with full accountability, taking initiatives from scope definition to production deployment without requiring constant supervision.

## 2. Disciplined Execution Over Raw Talent
I believe structured, focused work consistently solves architectural blockers that raw talent alone cannot.

## 3. High-EQ Alignment & Teamwork
Clear technical communication, empathetic code reviews, and low-ego alignment across engineering and business goals.

## 4. Uncompromising Ethics & Code Integrity
Non-negotiable standards on data security, maintainability, and honesty in technical retrospectives.`,

  "education.ts": `export const education = {
  degree: "BSc Honours in Physics",
  institution: "Govt Titumir College",
  period: "2021 – 2025",
  foundation: "First-principles reasoning, computational modeling, and deterministic problem-solving"
};`,
};

export default function ResumeIde() {
  const [activeTab, setActiveTab] = useState<TabType>("experience.ts");
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
  const [copied, setCopied] = useState(false);

  const tabs: { id: TabType; label: string; name: string; icon: React.ReactNode }[] = [
    { id: "experience.ts", label: "experience.ts", name: "Experience", icon: <FileCode2 className="w-4 h-4 lg:w-4.5 lg:h-4.5 text-cyan-400 shrink-0" /> },
    { id: "skills.json", label: "skills.json", name: "Skills", icon: <FileJson className="w-4 h-4 lg:w-4.5 lg:h-4.5 text-amber-400 shrink-0" /> },
    { id: "ethos.md", label: "ethos.md", name: "Ethos", icon: <FileText className="w-4 h-4 lg:w-4.5 lg:h-4.5 text-purple-400 shrink-0" /> },
    { id: "education.ts", label: "education.ts", name: "Education", icon: <GraduationCap className="w-4 h-4 lg:w-4.5 lg:h-4.5 text-emerald-400 shrink-0" /> },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(RAW_CONTENT[activeTab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto">
      {/* IDE Container: Glassmorphic translucent blur background */}
      <div className="flex flex-col w-full h-auto md:h-[660px] rounded-2xl border border-white/15 bg-[#0b0f19]/75 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden text-sm lg:text-base">
        
        {/* Top Window Bar */}
        <div className="flex items-center justify-between gap-2 px-3.5 sm:px-4 lg:px-5 py-2.5 lg:py-3 bg-[#070a12]/80 backdrop-blur-md border-b border-white/10 select-none">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            </div>
            <span className="font-mono text-xs lg:text-sm text-gray-400 truncate">
              <span className="hidden sm:inline">zayed_workspace / src / resume / </span>
              <span className="text-cyan-300 font-semibold">{activeTab}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 lg:py-1.5 rounded bg-white/5 border border-white/10 text-xs lg:text-sm font-mono text-gray-300 hover:bg-white/10 transition-colors cursor-pointer active:scale-95"
              title="Copy active code"
            >
              {copied ? <Check className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 lg:w-4 lg:h-4" />}
              <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
            </button>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-black/40 p-0.5 rounded border border-white/10">
              <button
                onClick={() => setViewMode("preview")}
                className={`flex items-center gap-1 px-2 sm:px-2.5 lg:px-3 py-1 lg:py-1.5 rounded text-xs lg:text-sm font-mono transition-all cursor-pointer ${
                  viewMode === "preview"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-medium shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Eye className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                <span>UI</span>
              </button>
              <button
                onClick={() => setViewMode("code")}
                className={`flex items-center gap-1 px-2 sm:px-2.5 lg:px-3 py-1 lg:py-1.5 rounded text-xs lg:text-sm font-mono transition-all cursor-pointer ${
                  viewMode === "code"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 font-medium shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Code2 className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                <span>Code</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile File Navigation Menu (Grid Pills on small screens) */}
        <div className="grid grid-cols-2 gap-1.5 p-2 bg-[#080d17]/70 backdrop-blur-md border-b border-white/10 md:hidden">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 py-2 px-2.5 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                  isActive
                    ? "bg-cyan-950/50 text-white border border-cyan-500/40 shadow-sm font-semibold"
                    : "bg-white/[0.04] text-gray-400 border border-white/5 hover:bg-white/10 hover:text-gray-200"
                }`}
              >
                {tab.icon}
                <span className="truncate">{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop Tab Header Bar (md and larger screens) */}
        <div className="hidden md:flex items-center bg-[#090d16]/75 backdrop-blur-md border-b border-white/10 overflow-x-auto no-scrollbar select-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 lg:px-5 py-2.5 lg:py-3 font-mono text-xs lg:text-sm border-r border-white/10 transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                activeTab === tab.id
                  ? "bg-[#0b0f19]/80 text-white border-t-2 border-t-cyan-400 font-medium"
                  : "text-gray-400 hover:bg-white/5 hover:text-gray-200 border-t-2 border-t-transparent"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Editor & Content Viewport (Translucent with backdrop blur) */}
        <div className="w-full flex-1 p-4 sm:p-6 lg:p-8 bg-[#0b0f19]/40 backdrop-blur-md overflow-y-visible md:overflow-y-auto custom-scrollbar">
          {viewMode === "code" ? (
            /* Code View (Glass container + horizontal scroll) */
            <div className="w-full rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-4 sm:p-5 font-mono text-xs sm:text-sm lg:text-[15px] leading-relaxed lg:leading-7 overflow-x-auto custom-scrollbar pb-2 shadow-inner">
              {activeTab === "experience.ts" && (
                <pre className="text-gray-300 whitespace-pre">
                  <span className="text-cyan-400">export const</span> <span className="text-purple-400">workExperience</span> = &#91;{`\n`}
                  {`  {\n`}
                  {`    role: `}<span className="text-emerald-400">&quot;Jr Full Stack Developer&quot;</span>,{`\n`}
                  {`    company: `}<span className="text-emerald-400">&quot;SoftVence Agency&quot;</span>,{`\n`}
                  {`    period: `}<span className="text-amber-400">&quot;June 2025 – July 2026&quot;</span>,{`\n`}
                  {`    location: `}<span className="text-emerald-400">&quot;Dhaka, Bangladesh (Hybrid)&quot;</span>,{`\n`}
                  {`    responsibilities: [\n`}
                  {`      `}<span className="text-emerald-400">&quot;Built full-stack web applications with React, Next.js, Redux, Nest.js, and Node.js&quot;</span>,{`\n`}
                  {`      `}<span className="text-emerald-400">&quot;Implemented real-time WebSocket communication and automated background tasks with node-cron&quot;</span>,{`\n`}
                  {`      `}<span className="text-emerald-400">&quot;Designed database schemas and caching layers with PostgreSQL, Prisma, MongoDB, and Redis&quot;</span>,{`\n`}
                  {`      `}<span className="text-emerald-400">&quot;Integrated Stripe and SSLCommerz payment gateways with webhook handling&quot;</span>{`\n`}
                  {`    ],\n`}
                  {`    techStack: [&quot;Next.js&quot;, &quot;TypeScript&quot;, &quot;Node.js&quot;, &quot;Nest.js&quot;, &quot;PostgreSQL&quot;, &quot;Prisma&quot;, &quot;Redis&quot;, &quot;Docker&quot;]\n`}
                  {`  }\n`}&#93;;
                </pre>
              )}

              {activeTab === "skills.json" && (
                <pre className="text-gray-300 whitespace-pre">
                  {`{\n`}
                  {`  `}<span className="text-cyan-400">&quot;frontend&quot;</span>: [<span className="text-emerald-400">&quot;JavaScript&quot;</span>, <span className="text-emerald-400">&quot;TypeScript&quot;</span>, <span className="text-emerald-400">&quot;React&quot;</span>, <span className="text-emerald-400">&quot;Next.js&quot;</span>, <span className="text-emerald-400">&quot;Redux&quot;</span>, <span className="text-emerald-400">&quot;Tailwind CSS&quot;</span>, <span className="text-emerald-400">&quot;ShadCN&quot;</span>, <span className="text-emerald-400">&quot;Lightswind UI&quot;</span>],{`\n`}
                  {`  `}<span className="text-cyan-400">&quot;backend&quot;</span>: [<span className="text-emerald-400">&quot;Node.js&quot;</span>, <span className="text-emerald-400">&quot;Nest.js&quot;</span>, <span className="text-emerald-400">&quot;Express.js&quot;</span>, <span className="text-emerald-400">&quot;WebSockets&quot;</span>, <span className="text-emerald-400">&quot;REST APIs&quot;</span>],{`\n`}
                  {`  `}<span className="text-cyan-400">&quot;databases&quot;</span>: [<span className="text-emerald-400">&quot;PostgreSQL&quot;</span>, <span className="text-emerald-400">&quot;MongoDB&quot;</span>, <span className="text-emerald-400">&quot;Prisma ORM&quot;</span>, <span className="text-emerald-400">&quot;Mongoose&quot;</span>, <span className="text-emerald-400">&quot;Redis&quot;</span>, <span className="text-emerald-400">&quot;Supabase&quot;</span>],{`\n`}
                  {`  `}<span className="text-cyan-400">&quot;devops_and_tools&quot;</span>: [<span className="text-emerald-400">&quot;Docker&quot;</span>, <span className="text-emerald-400">&quot;GitHub Actions&quot;</span>, <span className="text-emerald-400">&quot;AWS (SES, EC2, SQS, S3)&quot;</span>, <span className="text-emerald-400">&quot;BullMQ&quot;</span>, <span className="text-emerald-400">&quot;Firebase&quot;</span>, <span className="text-emerald-400">&quot;Postman&quot;</span>, <span className="text-emerald-400">&quot;Vercel&quot;</span>, <span className="text-emerald-400">&quot;Render&quot;</span>]{`\n`}
                  {`}`}
                </pre>
              )}

              {activeTab === "ethos.md" && (
                <pre className="text-gray-300 whitespace-pre-wrap font-mono">
                  <span className="text-gray-500"># Engineering Ethos &amp; Principles</span>{`\n\n`}
                  <span className="text-cyan-400 font-semibold">## 1. Extreme Ownership</span>{`\n`}
                  I treat codebases with full accountability, taking initiatives from scope definition to production deployment without requiring constant supervision.{`\n\n`}
                  <span className="text-cyan-400 font-semibold">## 2. Disciplined Execution Over Raw Talent</span>{`\n`}
                  I believe structured, focused work consistently solves architectural blockers that raw talent alone cannot.{`\n\n`}
                  <span className="text-cyan-400 font-semibold">## 3. High-EQ Alignment &amp; Teamwork</span>{`\n`}
                  Clear technical communication, empathetic code reviews, and low-ego alignment across engineering and business goals.{`\n\n`}
                  <span className="text-cyan-400 font-semibold">## 4. Uncompromising Ethics &amp; Integrity</span>{`\n`}
                  Non-negotiable standards on data security, system maintainability, and honesty in technical retrospectives.
                </pre>
              )}

              {activeTab === "education.ts" && (
                <pre className="text-gray-300 whitespace-pre">
                  <span className="text-cyan-400">export const</span> <span className="text-purple-400">education</span> = &#123;{`\n`}
                  {`  degree: `}<span className="text-emerald-400">&quot;BSc Honours in Physics&quot;</span>,{`\n`}
                  {`  institution: `}<span className="text-emerald-400">&quot;Govt Titumir College&quot;</span>,{`\n`}
                  {`  period: `}<span className="text-amber-400">&quot;2021 – 2025&quot;</span>,{`\n`}
                  {`  foundation: `}<span className="text-emerald-400">&quot;First-principles reasoning, computational modeling, and deterministic problem-solving&quot;</span>{`\n`}
                  &#125;;
                </pre>
              )}
            </div>
          ) : (
            /* UI View: Translucent Glass Cards with Backdrop Blur */
            <div className="w-full space-y-6">
              {/* Experience View */}
              {activeTab === "experience.ts" && (
                <div className="w-full rounded-2xl border border-white/15 bg-[#0f172a]/40 backdrop-blur-xl p-4 sm:p-6 lg:p-7 space-y-5 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white">Jr Full Stack Developer</h3>
                      <div className="flex items-center gap-2 text-cyan-400 text-xs lg:text-sm mt-1">
                        <Building2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 shrink-0" />
                        <span>SoftVence Agency</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:items-end text-xs lg:text-sm text-gray-400 gap-1">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4 shrink-0" />
                        <span>June 2025 – July 2026</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 lg:w-4 lg:h-4 shrink-0" />
                        <span>Dhaka, Bangladesh (Hybrid)</span>
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm lg:text-base text-gray-300 list-disc list-inside leading-relaxed lg:leading-7 font-light">
                    <li>Developed full-stack web solutions using Next.js, React, Redux, Nest.js, Node.js, Express.js, PostgreSQL, MongoDB, and Redis.</li>
                    <li>Built full-stack features including real-time communication (WebSockets), background jobs (node-cron), and secure payment workflows (Stripe, SSLCommerz).</li>
                    <li>Designed and implemented database schemas with Prisma ORM and Mongoose.</li>
                    <li>Key projects contributed: Scene Ads (interactive map ads platform) and Next Event (event management platform).</li>
                  </ul>

                  <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2">
                    {["Next.js", "TypeScript", "Node.js", "Nest.js", "PostgreSQL", "Prisma", "Redis", "Docker"].map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] sm:text-xs lg:text-sm font-mono text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills View */}
              {activeTab === "skills.json" && (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                  <div className="rounded-2xl border border-white/15 bg-[#0f172a]/40 backdrop-blur-xl p-4 sm:p-5 lg:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                    <h4 className="text-sm lg:text-base font-semibold text-cyan-400 mb-2.5">Frontend Engineering</h4>
                    <p className="text-xs lg:text-sm text-gray-300 leading-relaxed lg:leading-6 font-light">
                      JavaScript, TypeScript, React, Next.js, Redux, Tailwind CSS, Material UI, ShadCN, Lightswind UI
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-[#0f172a]/40 backdrop-blur-xl p-4 sm:p-5 lg:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                    <h4 className="text-sm lg:text-base font-semibold text-purple-400 mb-2.5">Backend &amp; APIs</h4>
                    <p className="text-xs lg:text-sm text-gray-300 leading-relaxed lg:leading-6 font-light">
                      Node.js, Nest.js, Express.js, WebSockets, REST APIs
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-[#0f172a]/40 backdrop-blur-xl p-4 sm:p-5 lg:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                    <h4 className="text-sm lg:text-base font-semibold text-amber-400 mb-2.5">Databases &amp; ORM</h4>
                    <p className="text-xs lg:text-sm text-gray-300 leading-relaxed lg:leading-6 font-light">
                      PostgreSQL, MongoDB, Prisma ORM, Mongoose, Redis, Supabase
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-[#0f172a]/40 backdrop-blur-xl p-4 sm:p-5 lg:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                    <h4 className="text-sm lg:text-base font-semibold text-emerald-400 mb-2.5">DevOps, Cloud &amp; Tools</h4>
                    <p className="text-xs lg:text-sm text-gray-300 leading-relaxed lg:leading-6 font-light">
                      Docker, GitHub Actions, AWS (SES, EC2, SQS, S3), BullMQ, Firebase, Postman, Vercel, Render
                    </p>
                  </div>
                </div>
              )}

              {/* Ethos View */}
              {activeTab === "ethos.md" && (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                  <div className="rounded-2xl border border-white/15 bg-[#0f172a]/40 backdrop-blur-xl p-4 sm:p-5 lg:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                    <h4 className="text-sm lg:text-base font-semibold text-white mb-2.5">Extreme Ownership</h4>
                    <p className="text-xs lg:text-sm text-gray-300 leading-relaxed lg:leading-6 font-light">
                      I take complete accountability for code quality, architectural consistency, and delivering production features on schedule without requiring constant supervision.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-[#0f172a]/40 backdrop-blur-xl p-4 sm:p-5 lg:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                    <h4 className="text-sm lg:text-base font-semibold text-white mb-2.5">Disciplined Execution Over Raw Talent</h4>
                    <p className="text-xs lg:text-sm text-gray-300 leading-relaxed lg:leading-6 font-light">
                      Complex technical problems require deep focus, first-principles logic, and structured debugging rather than relying on guesswork.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-[#0f172a]/40 backdrop-blur-xl p-4 sm:p-5 lg:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                    <h4 className="text-sm lg:text-base font-semibold text-white mb-2.5">High-EQ Alignment &amp; Teamwork</h4>
                    <p className="text-xs lg:text-sm text-gray-300 leading-relaxed lg:leading-6 font-light">
                      Clear and low-ego technical communication. I translate complex architectural details cleanly for team members and stakeholders.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-[#0f172a]/40 backdrop-blur-xl p-4 sm:p-5 lg:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                    <h4 className="text-sm lg:text-base font-semibold text-white mb-2.5">Uncompromising Ethics &amp; Integrity</h4>
                    <p className="text-xs lg:text-sm text-gray-300 leading-relaxed lg:leading-6 font-light">
                      Strict adherence to data privacy, system reliability, security best practices, and transparent technical retrospectives.
                    </p>
                  </div>
                </div>
              )}

              {/* Education View */}
              {activeTab === "education.ts" && (
                <div className="w-full rounded-2xl border border-white/15 bg-[#0f172a]/40 backdrop-blur-xl p-4 sm:p-6 lg:p-7 space-y-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/10 pb-3.5">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white">BSc Honours in Physics</h3>
                    <span className="text-xs lg:text-sm text-amber-400 font-mono">2021 – 2025</span>
                  </div>
                  <p className="text-xs lg:text-sm text-cyan-400 font-mono">Govt Titumir College</p>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-300 leading-relaxed lg:leading-7 font-light">
                    Trained in mathematical modeling, computational reasoning, and systematic problem decomposition. This analytical foundation directly supports my approach to software architecture and debugging distributed systems.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 sm:px-4 lg:px-5 py-2.5 lg:py-3 bg-[#070a12]/80 backdrop-blur-md border-t border-white/10 font-mono text-[11px] sm:text-xs lg:text-sm text-gray-400 select-none">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1.5 text-purple-400">
              <GitBranch className="w-3.5 h-3.5 lg:w-4 lg:h-4" /> main
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 lg:w-4 lg:h-4" /> 0 errors
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <span className="hidden sm:inline">TypeScript 5.8</span>
            <span className="hidden sm:inline">UTF-8</span>
            <a
              href="https://drive.google.com/file/d/12283il_bd_l65VfUOEWS12c2DSIVm-4v/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <span>Resume.pdf</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
