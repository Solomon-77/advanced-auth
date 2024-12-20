import { User } from "lucide-react"


const Friends = () => {

   const friends = [
      {
         pic: "aw",
         name: "Mary Jane"
      },
      {
         pic: "aw",
         name: "Nary Jane"
      },
      {
         pic: "aw",
         name: "Weary Jane"
      },
   ]

   return (
      <div>
         <h1 className="text-center font-medium">Friends</h1>
         <div className="flex flex-col p-6">
            {friends.map((friend, i) => (
               <div key={i} className="flex items-center p-2">
                  <div className="bg-gray-300 rounded-full p-2 text-center mr-4">
                     <User className="w-5 h-5" />
                  </div>
                  <h1>{friend.name}</h1>
               </div>
            ))}
         </div>
      </div>
   )
}

export default Friends