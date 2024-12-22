import { User, Camera } from "lucide-react"


const Profile = () => {
   return (
      <div className="max-w-[900px] mx-auto p-6">
         <div className="bg-white h-[250px] rounded-lg shadow-sm flex items-end justify-end">
            <div className="bg-gray-400 p-[6px] rounded-full m-3 cursor-pointer">
               <Camera className="text-gray-200 h-5 w-5" />
            </div>
         </div>
         <div className="flex justify-center">
            <div className="bg-gray-300 relative w-24 h-24 rounded-full grid place-items-center -mt-[48px] shadow-sm">
               <User className="w-10 h-10" />
               <div className="absolute right-0 bottom-0 bg-gray-400 p-[6px] rounded-full cursor-pointer">
                  <Camera className="text-gray-200 h-5 w-5" />
               </div>
            </div>
         </div>
         <div className="flex justify-between -mt-8">
            <h1 className="text-xl font-medium mt-3">Mary Jane</h1>
            <button className="py-2 px-3 rounded-md bg-blue-500 text-white font-medium">Edit Profile</button>
         </div>
         <div className="bg-white mt-6 rounded-lg p-6 space-y-4">
            <div>
               <h1 className="text-lg font-medium">About</h1>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
            </div>
            <div>
               <h1 className="text-lg font-medium">Country</h1>
               <p>Nigeria</p>
            </div>
         </div>
      </div>
   )
}

export default Profile