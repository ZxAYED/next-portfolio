import About from "../about/page";
import Banner from "../banner/Banner";
import FullScreenScroller from "../implementation/FullScreenScroller";
import Projects from "../projects/Projects";
import Footer from "../shared/Footer";
import WhyMe from "../whyMe/page";

const Home = () => {
  return (
    <FullScreenScroller>

      <Banner />
      <About />
      <Projects />
      <WhyMe />
      <Footer />
    </FullScreenScroller>
  );
};

export default Home;
