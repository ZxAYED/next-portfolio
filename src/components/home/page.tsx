import About from "../about/page";
import Banner from "../banner/Banner";
import Projects from "../projects/Projects";
import WhyMe from "../whyMe/page";
import FullScreenScroller from "../implementation/FullScreenScroller";
import Footer from "../shared/Footer";

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
