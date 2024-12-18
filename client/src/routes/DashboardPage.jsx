import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DashboardPage = () => {
   return (
      <div className='h-screen flex flex-col'>
         <nav className="fixed w-full bg-white border-b border-neutral-300">
            <Navbar />
         </nav>
         <main className='flex-1 mt-[60px] bg-gray-200 overflow-auto'>
            <Outlet />
         </main>
      </div>
   )
}

export default DashboardPage