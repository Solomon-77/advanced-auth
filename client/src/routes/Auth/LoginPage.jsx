import { Link } from "react-router-dom"


const LoginPage = () => {
   return (
      <div className="h-screen grid place-items-center">
         <form className="flex flex-col max-w-[350px] min-w-0 w-full p-6 gap-4">
            <h1 className="text-xl text-center font-medium">Login to your account</h1>
            <input
               type="email"
               placeholder="Email"
               className="py-3 px-5 rounded-md outline-none border border-neutral-300"
            />
            <input
               type="password"
               placeholder="Password"
               className="py-3 px-5 rounded-md outline-none border border-neutral-300"
            />
            <button className="bg-neutral-700 py-3 text-white font-medium rounded-md">Login</button>
            <div className="flex justify-center gap-2 text-sm">
               <Link to="/signup" className="hover:underline">Sign Up</Link>
               <h1 className="text-neutral-600">or</h1>
               <Link to="/forgot-password" className="hover:underline">Forgot Password?</Link>
            </div>
         </form>
      </div>
   )
}

export default LoginPage