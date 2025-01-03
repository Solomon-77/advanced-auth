import { Link, Outlet, useLocation } from "react-router-dom"
import SideNav from "./MainfeedComponents/SideNav";
import Friends from "./MainfeedComponents/Friends";

const Mainfeed = () => {
   const location = useLocation();

   const isActive = (path) => {
      return location.pathname === path
         ? "bg-white w-full py-2 rounded-md text-black shadow-sm text-center text-sm font-medium"
         : "w-full py-2 rounded-sm text-neutral-500 text-center text-sm font-medium";
   };
   
   return (
      <div className="max-w-[1200px] mx-auto p-6 grid grid-cols-[250px_1fr_250px] gap-6">
         <SideNav />
         <div className="flex flex-col gap-6">
            <div className="flex gap-6">
               <Link to="/" className={`${isActive("/")}`}>Home</Link>
               <Link to="/watch" className={`${isActive("/watch")}`}>Watch</Link>
               <Link to="/marketplace" className={`${isActive("/marketplace")}`}>Marketplace</Link>
            </div>
            <Outlet />
         </div>
         <Friends />
      </div>
   )
}

export default Mainfeed