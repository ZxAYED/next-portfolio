import Footer from "@/components/shared/Footer";
import NavMenu from "@/components/shared/NavMenu";
import Home from "../components/home/page";

export default function Provider() {
  return (
    <div>
      <NavMenu></NavMenu>

      <Home></Home>
      

      <Footer></Footer>
    </div>
  );
}
