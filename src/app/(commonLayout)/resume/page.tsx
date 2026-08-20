"use client"

import MorphingNavigation from "@/components/implementation/MorphingNavbar"
import { AnimatePresence, motion } from "framer-motion"
import { Briefcase, Code2, FileText, GraduationCap } from "lucide-react"
import { useState } from "react"

const tabs = [
  { id: "experience", label: "experience.ts", icon: Briefcase },
  { id: "skills", label: "skills.json", icon: Code2 },
  { id: "education", label: "education.ts", icon: GraduationCap },
  { id: "soft_skills", label: "soft_skills.md", icon: FileText },
] as const

type TabId = (typeof tabs)[number]["id"]

// Syntax highlighting helpers
const Keyword = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#c678dd] font-medium">{children}</span>
)
const Str = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#98c379]">{children}</span>
)
const Prop = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#e06c75] font-medium">{children}</span>
)
const Bracket = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#56b6c2]">{children}</span>
)
const Num = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#d19a66]">{children}</span>
)
const MdHeading = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#61afef] font-bold">{children}</span>
)
const Comment = ({ children }: { children: React.ReactNode }) => (
  <span className="text-gray-500 italic">{children}</span>
)

function LineNum({ n }: { n: number }) {
  return <span className="text-gray-600 select-none mr-6 inline-block w-6 text-right font-mono text-xs md:text-sm">{n}</span>
}

function ExperienceContent() {
  return (
    <div className="font-mono text-xs md:text-sm leading-6 md:leading-8">
      <div><LineNum n={1} /><Keyword>export interface</Keyword> <span className="text-[#e5c07b]">Experience</span> <Bracket>{"{"}</Bracket></div>
      <div><LineNum n={2} />  <Prop>company</Prop>: <Keyword>string</Keyword>;</div>
      <div><LineNum n={3} />  <Prop>role</Prop>: <Keyword>string</Keyword>;</div>
      <div><LineNum n={4} />  <Prop>period</Prop>: <Keyword>string</Keyword>;</div>
      <div><LineNum n={5} />  <Prop>achievements</Prop>: <Keyword>string</Keyword><Bracket>{"[]"}</Bracket>;</div>
      <div><LineNum n={6} /><Bracket>{"}"}</Bracket></div>
      <div><LineNum n={7} /></div>
      <div><LineNum n={8} /><Keyword>const</Keyword> careerHistory: <span className="text-[#e5c07b]">Experience</span><Bracket>{"[]"}</Bracket> = <Bracket>{"["}</Bracket></div>
      <div><LineNum n={9} />  <Bracket>{"{"}</Bracket></div>
      <div><LineNum n={10} />    <Prop>company</Prop>: <Str>&quot;Softvence Agency&quot;</Str>,</div>
      <div><LineNum n={11} />    <Prop>role</Prop>: <Str>&quot;Full Stack Engineer&quot;</Str>,</div>
      <div><LineNum n={12} />    <Prop>period</Prop>: <Str>&quot;June 2025 – July 2026&quot;</Str>,</div>
      <div><LineNum n={13} />    <Prop>achievements</Prop>: <Bracket>{"["}</Bracket></div>
      <div><LineNum n={14} />      <Str>&quot;Engineered and shipped 18+ high-performance web applications and backends&quot;</Str>,</div>
      <div><LineNum n={15} />      <Str>&quot;Architected resilient REST & WebSocket APIs with Nest.js, Express, and Prisma&quot;</Str>,</div>
      <div><LineNum n={16} />      <Str>&quot;Optimized PostgreSQL database queries and implemented Redis caching layers&quot;</Str>,</div>
      <div><LineNum n={17} />      <Str>&quot;Led full-cycle product delivery and direct technical client communication&quot;</Str>,</div>
      <div><LineNum n={18} />    <Bracket>{"]"}</Bracket>,</div>
      <div><LineNum n={19} />  <Bracket>{"}"}</Bracket>,</div>
      <div><LineNum n={20} />  <Bracket>{"{"}</Bracket></div>
      <div><LineNum n={21} />    <Prop>company</Prop>: <Str>&quot;Independent Solutions & Client Projects&quot;</Str>,</div>
      <div><LineNum n={22} />    <Prop>role</Prop>: <Str>&quot;Senior Full Stack Consultant&quot;</Str>,</div>
      <div><LineNum n={23} />    <Prop>period</Prop>: <Str>&quot;Present&quot;</Str>,</div>
      <div><LineNum n={24} />    <Prop>achievements</Prop>: <Bracket>{"["}</Bracket></div>
      <div><LineNum n={25} />      <Str>&quot;End-to-end architecture and rapid MVP development for global clients&quot;</Str>,</div>
      <div><LineNum n={26} />      <Str>&quot;Performance tuning, distributed caching, and micro-frontend development&quot;</Str>,</div>
      <div><LineNum n={27} />    <Bracket>{"]"}</Bracket>,</div>
      <div><LineNum n={28} />  <Bracket>{"}"}</Bracket>,</div>
      <div><LineNum n={29} /><Bracket>{"]"}</Bracket>;</div>
      <div><LineNum n={30} /></div>
      <div><LineNum n={31} /><Keyword>export default</Keyword> careerHistory;</div>
    </div>
  )
}

function SkillsContent() {
  return (
    <div className="font-mono text-xs md:text-sm leading-6 md:leading-8">
      <div><LineNum n={1} /><Bracket>{"{"}</Bracket></div>
      <div><LineNum n={2} />  <Prop>&quot;frontend&quot;</Prop>: <Bracket>{"["}</Bracket></div>
      <div><LineNum n={3} />    <Str>&quot;Next.js (App Router, Turbopack)&quot;</Str>, <Str>&quot;React.js&quot;</Str>, <Str>&quot;TypeScript&quot;</Str>,</div>
      <div><LineNum n={4} />    <Str>&quot;Tailwind CSS&quot;</Str>, <Str>&quot;ShadCN UI&quot;</Str>, <Str>&quot;Framer Motion&quot;</Str>, <Str>&quot;Redux Toolkit&quot;</Str></div>
      <div><LineNum n={5} />  <Bracket>{"]"}</Bracket>,</div>
      <div><LineNum n={6} /></div>
      <div><LineNum n={7} />  <Prop>&quot;backend&quot;</Prop>: <Bracket>{"["}</Bracket></div>
      <div><LineNum n={8} />    <Str>&quot;Node.js&quot;</Str>, <Str>&quot;Express.js&quot;</Str>, <Str>&quot;Nest.js&quot;</Str>, <Str>&quot;Prisma ORM&quot;</Str>,</div>
      <div><LineNum n={9} />    <Str>&quot;WebSocket (ws)&quot;</Str>, <Str>&quot;RESTful API Design&quot;</Str>, <Str>&quot;JWT & OAuth&quot;</Str></div>
      <div><LineNum n={10} />  <Bracket>{"]"}</Bracket>,</div>
      <div><LineNum n={11} /></div>
      <div><LineNum n={12} />  <Prop>&quot;databases_and_caching&quot;</Prop>: <Bracket>{"["}</Bracket></div>
      <div><LineNum n={13} />    <Str>&quot;PostgreSQL&quot;</Str>, <Str>&quot;MongoDB&quot;</Str>, <Str>&quot;Redis&quot;</Str>, <Str>&quot;Supabase&quot;</Str></div>
      <div><LineNum n={14} />  <Bracket>{"]"}</Bracket>,</div>
      <div><LineNum n={15} /></div>
      <div><LineNum n={16} />  <Prop>&quot;devops_and_tools&quot;</Prop>: <Bracket>{"["}</Bracket></div>
      <div><LineNum n={17} />    <Str>&quot;Git&quot;</Str>, <Str>&quot;GitHub Actions&quot;</Str>, <Str>&quot;Vercel&quot;</Str>, <Str>&quot;Netlify&quot;</Str>, <Str>&quot;Render&quot;</Str>,</div>
      <div><LineNum n={18} />    <Str>&quot;AWS S3&quot;</Str>, <Str>&quot;Cloudinary&quot;</Str>, <Str>&quot;Postman&quot;</Str>, <Str>&quot;Docker&quot;</Str></div>
      <div><LineNum n={19} />  <Bracket>{"]"}</Bracket>,</div>
      <div><LineNum n={20} /></div>
      <div><LineNum n={21} />  <Prop>&quot;metrics&quot;</Prop>: <Bracket>{"{"}</Bracket></div>
      <div><LineNum n={22} />    <Prop>&quot;deliveredProjects&quot;</Prop>: <Num>18</Num>,</div>
      <div><LineNum n={23} />    <Prop>&quot;corePhilosophy&quot;</Prop>: <Str>&quot;Performance-first, clean architecture, zero bloat&quot;</Str></div>
      <div><LineNum n={24} />  <Bracket>{"}"}</Bracket></div>
      <div><LineNum n={25} /><Bracket>{"}"}</Bracket></div>
    </div>
  )
}

function EducationContent() {
  return (
    <div className="font-mono text-xs md:text-sm leading-6 md:leading-8">
      <div><LineNum n={1} /><Keyword>interface</Keyword> <span className="text-[#e5c07b]">AcademicProfile</span> <Bracket>{"{"}</Bracket></div>
      <div><LineNum n={2} />  <Prop>degree</Prop>: <Keyword>string</Keyword>;</div>
      <div><LineNum n={3} />  <Prop>institution</Prop>: <Keyword>string</Keyword>;</div>
      <div><LineNum n={4} />  <Prop>foundation</Prop>: <Keyword>string</Keyword>;</div>
      <div><LineNum n={5} /><Bracket>{"}"}</Bracket></div>
      <div><LineNum n={6} /></div>
      <div><LineNum n={7} /><Keyword>const</Keyword> academicHistory: <span className="text-[#e5c07b]">AcademicProfile</span> = <Bracket>{"{"}</Bracket></div>
      <div><LineNum n={8} />  <Prop>degree</Prop>: <Str>&quot;BSc in Physics&quot;</Str>,</div>
      <div><LineNum n={9} />  <Prop>institution</Prop>: <Str>&quot;Govt Titumir College&quot;</Str>,</div>
      <div><LineNum n={10} />  <Prop>foundation</Prop>: <Str>&quot;Rigorous mathematical reasoning, analytical modeling, and algorithmic mindset applied to scalable software engineering.&quot;</Str>,</div>
      <div><LineNum n={11} /><Bracket>{"}"}</Bracket>;</div>
      <div><LineNum n={12} /></div>
      <div><LineNum n={13} /><Keyword>export default</Keyword> academicHistory;</div>
    </div>
  )
}

function SoftSkillsContent() {
  return (
    <div className="font-mono text-xs md:text-sm leading-6 md:leading-8 space-y-4">
      <div><LineNum n={1} /><MdHeading># Engineering Mindset & Soft Skills</MdHeading></div>
      <div><LineNum n={2} /><p className="pl-4"><Comment>{"// Core philosophy: Hard work over raw talent"}</Comment></p></div>
      
      <div className="pl-4 space-y-2">
        <div><LineNum n={3} /><MdHeading>## 1. Relentless Determination</MdHeading></div>
        <div><LineNum n={4} /><p className="text-gray-300 pl-4">I believe disciplined execution and deep work consistently outperform unapplied raw talent. When facing complex architectural roadblocks, I persist until an optimal, clean solution is engineered.</p></div>
      </div>

      <div className="pl-4 space-y-2">
        <div><LineNum n={5} /><MdHeading>## 2. Logic-Driven & Systematic</MdHeading></div>
        <div><LineNum n={6} /><p className="text-gray-300 pl-4">Derived from a rigorous BSc in Physics background, I approach software engineering from first principles: breaking complex distributed systems into verifiable, testable, and deterministic units.</p></div>
      </div>

      <div className="pl-4 space-y-2">
        <div><LineNum n={7} /><MdHeading>## 3. Strict Accountability & Ownership</MdHeading></div>
        <div><LineNum n={8} /><p className="text-gray-300 pl-4">I treat every client project as a mission-critical product. From upfront scope definition to transparent communication and zero-downtime deployment, I maintain 100% end-to-end accountability.</p></div>
      </div>

      <div className="pl-4 space-y-2">
        <div><LineNum n={9} /><MdHeading>## 4. High-Velocity Adaptability</MdHeading></div>
        <div><LineNum n={10} /><p className="text-gray-300 pl-4">Whether optimizing SQL execution plans, implementing real-time streaming protocols, or refining 60fps micro-interactions, I master and apply modern paradigms with extreme speed.</p></div>
      </div>
    </div>
  )
}

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState<TabId>("experience")

  return (
    <div className="relative min-h-screen">
      <MorphingNavigation />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="min-h-screen pt-32 pb-24 px-4 flex items-start justify-center"
      >
        <div className="w-full max-w-4xl">
          {/* IDE Window */}
          <div className="rounded-3xl border border-white/15 overflow-hidden shadow-2xl shadow-purple-950/40 bg-[#1e1e2e]/90 backdrop-blur-2xl">
            {/* Window chrome */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#181825]/95 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#f38ba8]" />
                <span className="w-3 h-3 rounded-full bg-[#f9e2af]" />
                <span className="w-3 h-3 rounded-full bg-[#a6e3a1]" />
              </div>
              <span className="text-xs text-gray-400 font-mono tracking-wide">zayed_portfolio_ide — v2.0</span>
              <div className="w-16" />
            </div>

            {/* Tab bar */}
            <div className="flex border-b border-white/10 bg-[#181825]/70 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-3.5 text-xs md:text-sm font-mono border-r border-white/10 transition-all duration-150 cursor-pointer whitespace-nowrap select-none ${
                      isActive
                        ? "bg-[#1e1e2e] text-white border-t-2 border-t-[#9333EA] shadow-inner font-semibold"
                        : "text-gray-400 hover:text-gray-200 hover:bg-white/5 border-t-2 border-t-transparent"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#9333EA]" />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Code content */}
            <div className="p-6 md:p-8 font-mono overflow-x-auto min-h-[440px] bg-[#1e1e2e]/95">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                >
                  {activeTab === "experience" && <ExperienceContent />}
                  {activeTab === "skills" && <SkillsContent />}
                  {activeTab === "education" && <EducationContent />}
                  {activeTab === "soft_skills" && <SoftSkillsContent />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-5 py-2.5 bg-[#181825]/95 border-t border-white/10 text-xs text-gray-400 font-mono">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
                <span>UTF-8</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-purple-300">TypeScript · Markdown</span>
                <span>Spaces: 2</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}