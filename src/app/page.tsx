import Footer from "@/components/shared/Footer";
import Home from "./home/page";

export default function Provider() {
  return (
    <div>
      <div className=" mx-auto max-w-7xl">
        <Home></Home>
      </div>
      <Footer></Footer>
    </div>
  );
}
