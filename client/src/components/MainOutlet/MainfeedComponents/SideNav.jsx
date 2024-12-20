import { Shield, Bookmark, MessageSquareMore, Store, Settings } from 'lucide-react';
import { PiRanking } from "react-icons/pi";

const SideNav = () => {
   return (
      <div>
         <ul className='space-y-3'>
            <div className="flex py-2 px-3 font-medium rounded-md items-center">
               <Shield className='w-5 h-5' />
               <li className="ml-2">Guild</li>
            </div>
            <div className="flex py-2 px-3 font-medium rounded-md items-center">
               <PiRanking className='w-5 h-5' />
               <li className="ml-2">Rank</li>
            </div>
            <div className="flex py-2 px-3 font-medium rounded-md items-center">
               <Bookmark className='w-5 h-5' />
               <li className="ml-2">Bookmarks</li>
            </div>
            <div className="flex py-2 px-3 font-medium rounded-md items-center">
               <MessageSquareMore className='w-5 h-5' />
               <li className="ml-2">Ask</li>
            </div>
            <div className="flex py-2 px-3 font-medium rounded-md items-center">
               <Store className='w-5 h-5' />
               <li className="ml-2">Shop</li>
            </div>
            <div className="flex py-2 px-3 font-medium rounded-md items-center">
               <Settings className='w-5 h-5' />
               <li className="ml-2">Settings</li>
            </div>
         </ul>
      </div>
   )
}

export default SideNav