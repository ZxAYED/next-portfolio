"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectCardSkeleton({ index }: { index: number }) {
  return (
    <Card
      className="w-full border shadow-lg lg:p-6 backdrop-blur-sm rounded-2xl xl:mx-auto animate-pulse"
      data-aos={index % 2 === 1 ? "fade-left" : "fade-right"}
      data-aos-easing="ease-in-back"
      data-aos-duration="1000"
    >
      <div
        className={`flex flex-col justify-center lg:justify-start lg:flex-row gap-6 ${
          index % 2 === 1 ? "lg:flex-row-reverse" : ""
        }`}
      >
     
        <div className="w-full p-4 mt-4 md:p-1 lg:p-0 xl:w-1/2">
          <div className="bg-gray-300 dark:bg-gray-700 rounded-xl w-full h-48 md:h-64 lg:h-40 xl:h-48" />
        </div>

     
        <div className="flex flex-col justify-between w-full xl:w-1/2">
          <CardHeader>
          
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4" />
          </CardHeader>

          <CardContent>
            
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
            </div>
          </CardContent>

          <CardFooter className="flex items-center gap-8 mt-8 justify-center lg:justify-start">
          
            <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
