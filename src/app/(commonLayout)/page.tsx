import NavMenu from '@/components/shared/NavMenu';
import Home from "../../components/home/page";
export default function Provider() {

  return (
    <div className=""> 
            <NavMenu ></NavMenu>                    
      <Home></Home> 
    </div>
  );
}
