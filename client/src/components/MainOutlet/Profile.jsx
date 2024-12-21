import { User } from "lucide-react"


const Profile = () => {
   return (
      <div className="max-w-[900px] mx-auto p-6">
         <div className="bg-white h-[250px] rounded-lg shadow-sm">background photo</div>
         <div className="flex justify-center">
            <div className="bg-gray-300 z-10 w-24 h-24 rounded-full grid place-items-center -mt-[48px] shadow-sm">
               <User className="w-10 h-10" />
            </div>
         </div>
         <div className="flex justify-between -mt-8">
            <h1 className="text-xl font-medium mt-3">Mary Jane</h1>
            <button className="py-2 px-3 rounded-md bg-blue-500 text-white font-medium">Edit Profile</button>
         </div>
         <div className="bg-white mt-6 rounded-lg p-6">
            <div>About</div>
            <div>Country</div>
         </div>
      </div>
   )
}

export default Profile