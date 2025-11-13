'use client';
import About from "../about/page";
import Banner from "../banner/Banner";
import MySelfSection from "../experience/MySelfSection";
import Projects from "../projects/Projects";
import Footer from "../shared/Footer";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";
import WhyMe from "../whyMe/page";

const Home = () => {
  return (
    <div>
      <BackgroundBeamsWithCollision className="block    h-full min-h-[200dvh] md:min-h-full  bg-transparent w-full min-w relative overflow-hidden ">

        {/* <FullScreenScroller> */}
        <Banner />
      </BackgroundBeamsWithCollision>
      <div className="md:mt-40">
        <About />
      </div>

      <Projects />

      <MySelfSection />
      <WhyMe />
      {/* </FullScreenScroller> */}

      {/* Footer OUTSIDE scroll controller */}

      <Footer />

    </div>
  );
};

export default Home;
