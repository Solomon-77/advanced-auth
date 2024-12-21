import { Bell, MessageCircle, User, House } from 'lucide-react';
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom"

const Navbar = () => {
	return (
		<div className="h-[60px] max-w-[1200px] mx-auto px-6 flex items-center justify-between">
			<div className="flex items-center gap-6 w-full">
				<h1 className='font-medium text-lg'>SOCMED</h1>
				<div className="w-full relative flex items-center">
					<CiSearch className='w-5 h-5 text-gray-400 absolute ml-3' />
					<input
						type="text"
						placeholder="Search"
						className="border border-neutral-300 outline-none focus:ring-1 focus:ring-gray-600 w-full max-w-[300px] rounded-md py-2 pl-10 pr-3"
					/>
				</div>
			</div>
			<div className="flex gap-4 items-center">
				<Link to='/' className='p-2 hover:bg-gray-100 rounded-md cursor-pointer'>
					<House className='w-5 h-5' />
				</Link>
				<div className='p-2 hover:bg-gray-100 rounded-md cursor-pointer'>
					<MessageCircle className='w-5 h-5' />
				</div>
				<div className='p-2 hover:bg-gray-100 rounded-md cursor-pointer'>
					<Bell className='w-5 h-5' />
				</div>
				<div className='p-2 bg-gray-200 rounded-full cursor-pointer'>
					<User className='w-5 h-5' />
				</div>
			</div>
		</div>
	)
}

export default Navbar