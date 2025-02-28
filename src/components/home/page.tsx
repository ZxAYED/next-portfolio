import About from "../about/page";
import Banner from "../banner/page";
import Projects from "../projects/page";
import WhyMe from "../whyMe/page";
const Home = () => {
  return (
    <div className="mt-16 mx-w-7xl mx-auto ">
      <Banner></Banner>
      <About></About>
      <Projects></Projects>
      <WhyMe></WhyMe>
    </div>
  );
};

export default Home;
