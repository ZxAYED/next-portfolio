import About from "../about/page";
import Banner from "../banner/Banner";

import Projects from "../projects/page";
import WhyMe from "../whyMe/page";
const Home = () => {
  return (
    <div className="mx-auto overflow-hidden mx-w-7xl">
      <Banner></Banner>
      <About></About>
      <Projects></Projects>
      <WhyMe></WhyMe>
    </div>
  );
};

export default Home;
