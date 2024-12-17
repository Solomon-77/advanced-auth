import { Link } from "react-router-dom"


const ForgotpasswordPage = () => {
   return (
      <div className="h-screen grid place-items-center">
         <form className="flex flex-col max-w-[350px] min-w-0 w-full p-6 gap-4">
            <h1 className="text-xl text-center font-medium">Forgot Password</h1>
            <input
               type="email"
               placeholder="Email"
               className="py-3 px-5 rounded-md outline-none border border-neutral-300"
            />
            <button className="bg-neutral-700 py-3 text-white font-medium rounded-md">Reset Password</button>
            <div className="flex justify-center text-sm">
               <Link to="/login" className="hover:underline">Back to Login</Link>
            </div>
         </form>
      </div>
   )
}

export default ForgotpasswordPage