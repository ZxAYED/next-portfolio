'use client'
import MorphingNavigation from '@/components/implementation/MorphingNavbar';
import Home from "../../components/home/page";
export default function Provider() {

  return (
    <div className="relative">

      <MorphingNavigation />
      <Home />


    </div>
  );
}
