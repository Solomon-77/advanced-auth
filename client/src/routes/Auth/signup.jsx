import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { signup } from "../../services/api";

const SignupPage = () => {
   const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
   });

   const [message, setMessage] = useState({ text: '', type: '' });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (formData.password !== formData.confirmPassword) {
         setMessage({ text: "Passwords do not match", type: "error" });
         return;
      }

      try {
         const response = await signup({
            username: formData.username,
            email: formData.email,
            password: formData.password
         });

         setMessage({ text: response.message, type: "success" });
         setFormData({ username: '', email: '', password: '', confirmPassword: '' });

         // Redirect to login after 3 seconds
         setTimeout(() => {
            window.location.href = "/login";
         }, 3000);
      } catch (error) {
         setMessage({ text: error.error || "An error occurred during signup.", type: "error" });
      }
   };

   // Auto-dismiss messages after 5 seconds
   useEffect(() => {
      if (message.text) {
         const timer = setTimeout(() => {
            setMessage({ text: '', type: '' });
         }, 5000);
         return () => clearTimeout(timer);
      }
   }, [message.text]);

   return (
      <div className="h-screen grid place-items-center">
         <form onSubmit={handleSubmit} className="flex flex-col max-w-[350px] min-w-0 w-full p-6 gap-4">
            <h1 className="text-xl text-center font-medium">Sign up for your account</h1>

            {message.text && (
               <div
                  className={`p-3 rounded-md text-center ${
                     message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
               >
                  {message.text}
               </div>
            )}

            <input
               type="text"
               name="username"
               placeholder="Username"
               className="py-3 px-5 rounded-md outline-none border border-neutral-300"
               value={formData.username}
               onChange={handleChange}
               required
            />
            <input
               type="email"
               name="email"
               placeholder="Email"
               className="py-3 px-5 rounded-md outline-none border border-neutral-300"
               value={formData.email}
               onChange={handleChange}
               required
            />
            <input
               type="password"
               name="password"
               placeholder="Password"
               className="py-3 px-5 rounded-md outline-none border border-neutral-300"
               value={formData.password}
               onChange={handleChange}
               required
            />
            <input
               type="password"
               name="confirmPassword"
               placeholder="Confirm Password"
               className="py-3 px-5 rounded-md outline-none border border-neutral-300"
               value={formData.confirmPassword}
               onChange={handleChange}
               required
            />
            <button type="submit" className="bg-neutral-700 py-3 text-white font-medium rounded-md">Sign Up</button>
            <div className="flex justify-center text-sm">
               <Link to="/login" className="hover:underline">Already have an account? Login</Link>
            </div>
         </form>
      </div>
   );
};

export default SignupPage;