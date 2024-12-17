import { Link } from "react-router-dom"

const SignupPage = () => {
   return (
      <div className="h-screen grid place-items-center">
         <form className="flex flex-col max-w-[350px] min-w-0 w-full p-6 gap-4">
            <h1 className="text-xl text-center font-medium">Sign up for your account</h1>
            <input
               type="text"
               placeholder="Username"
               className="py-3 px-5 rounded-md outline-none border border-neutral-300"
            />
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
            <input
               type="password"
               placeholder="Confirm Password"
               className="py-3 px-5 rounded-md outline-none border border-neutral-300"
            />
            <button className="bg-neutral-700 py-3 text-white font-medium rounded-md">Sign Up</button>
            <div className="flex justify-center text-sm">
               <Link to="/login" className="hover:underline">Already have an account? Login</Link>
            </div>
         </form>
      </div>
   )
}

export default SignupPage