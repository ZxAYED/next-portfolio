"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
// import { useTheme } from "@/components/theme/ThemeProvider";

export default function SinglePageSkeleton() {
  // const { theme } = useTheme();


  const cardBorder = "border-cyan-500/20"
  const cardShadow = "shadow-cyan-500/10"
  const bgPulse = "bg-gray-700"

  return (
    <div className="min-h-screen pt-32 pb-40 mx-auto animate-pulse">

      <div className={`w-full mx-auto max-w-7xl h-[40vh] md:h-[60vh] relative ${bgPulse} rounded-md`} />

      <div className="relative z-20 px-4 mx-auto max-w-7xl sm:px-6 lg:px-0">
        <Card className={`border backdrop-blur-md ${cardBorder} ${cardShadow}`}>
          <div className="p-6 md:p-8 lg:p-10 space-y-10">


            <div className="space-y-4 pb-6 mb-8 border-b border-gray-400/30">
              <div className={`h-10 w-2/3 rounded ${bgPulse}`} />
              <div className={`h-5 w-full rounded ${bgPulse}`} />
              <div className={`h-5 w-5/6 rounded ${bgPulse}`} />
              <div className="flex flex-wrap gap-4 pt-4">
                <div className={`h-10 w-32 rounded ${bgPulse}`} />
                <div className={`h-10 w-36 rounded ${bgPulse}`} />
                <div className={`h-10 w-36 rounded ${bgPulse}`} />
              </div>
            </div>


            <div className="space-y-4">
              <div className={`h-8 w-40 rounded ${bgPulse}`} />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full ${bgPulse}`} />
                    <div className={`h-4 w-5/6 rounded ${bgPulse}`} />
                  </div>
                ))}
              </div>
            </div>


            <div>
              <div className={`h-8 w-40 rounded ${bgPulse} mb-4`} />
              <div className="flex flex-wrap gap-4">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <Badge
                    key={idx}
                    className={`${bgPulse} text-transparent capitalize`}
                  >
                    Loading
                  </Badge>
                ))}
              </div>
            </div>


            <div className="mt-12 space-y-4">
              <div className={`h-8 w-40 rounded ${bgPulse}`} />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full ${bgPulse}`} />
                    <div className={`h-4 w-5/6 rounded ${bgPulse}`} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Card>
      </div>
    </div>
  );
}
