import { useState, useEffect, useRef } from "react";
import { Bell, MessageCircle, User, House, LogOut, ChevronRight } from "lucide-react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const Navbar = () => {
   const [open, setOpen] = useState(false);
   const dropdownRef = useRef(null);

   const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
         setOpen(false);
      }
   };

   useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   return (
      <div className="h-[60px] max-w-[1200px] mx-auto px-6 flex items-center justify-between">
         <div className="flex items-center gap-6 w-full">
            <h1 className="font-medium text-lg">SOCMED</h1>
            <div className="w-full relative flex items-center">
               <CiSearch className="w-5 h-5 text-gray-400 absolute ml-3" />
               <input
                  type="text"
                  placeholder="Search"
                  className="border border-neutral-300 outline-none focus:ring-1 focus:ring-gray-600 w-full max-w-[300px] rounded-md py-2 pl-10 pr-3"
               />
            </div>
         </div>
         <div className="flex gap-4 items-center">
            <Link to="/" className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
               <House className="w-5 h-5" />
            </Link>
            <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
               <MessageCircle className="w-5 h-5" />
            </div>
            <div className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
               <Bell className="w-5 h-5" />
            </div>
            <div className="relative" ref={dropdownRef}>
               <div
                  onClick={() => setOpen((prev) => !prev)}
                  className="p-2 bg-gray-200 rounded-full cursor-pointer"
               >
                  <User className="w-5 h-5" />
               </div>
               {open && (
                  <div className="absolute bg-white space-y-3 right-0 p-4 rounded-lg mt-4 border border-gray-300 shadow-sm">
                     <Link to='/profile' onClick={() => setOpen(false)} className="flex items-center justify-between cursor-pointer hover:bg-gray-200 p-2 rounded-md">
                        <div className="flex items-center">
                           <User className="h-5 w-5 mr-3" />
                           <h1>Profile</h1>
                        </div>
                        <ChevronRight className="-mr-1" />
                     </Link>
                     <div className="flex items-center justify-between cursor-pointer hover:bg-gray-200 p-2 rounded-md">
                        <div className="flex items-center mr-7">
                           <LogOut className="h-5 w-5 mr-3" />
                           <h1>Logout</h1>
                        </div>
                        <ChevronRight className="-mr-1" />
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default Navbar;
