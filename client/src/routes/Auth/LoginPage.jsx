import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/api";

const LoginPage = () => {
   const [formData, setFormData] = useState({ email: "", password: "" });
   const [errors, setErrors] = useState({});
   const [message, setMessage] = useState({ text: "", type: "" });
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
   };

   const validateForm = () => {
      const newErrors = {};
      if (!formData.email.trim()) newErrors.email = "Email is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format.";
      if (!formData.password.trim()) newErrors.password = "Password is required.";
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;
      setLoading(true);
      try {
         const response = await login(formData);
         setMessage({ text: response.message, type: "success" });
         navigate("/");
      } catch (error) {
         setMessage({ text: error.error || "An error occurred during login.", type: "error" });
         if (error.error === "Invalid email or password.") {
            setErrors({ email: "Invalid email or password.", password: "Invalid email or password." });
         }
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="h-screen grid place-items-center">
         <form onSubmit={handleSubmit} className="flex flex-col max-w-[350px] min-w-0 w-full p-6 gap-4">
            <h1 className="text-xl text-center font-medium">Login to your account</h1>
            {message.text && (
               <p className={`p-3 rounded-md text-center ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                  {message.text}
               </p>
            )}
            <input
               type="text"
               name="email"
               placeholder="Email"
               className={`py-3 px-5 rounded-md outline-none border ${errors.email ? "border-red-500" : "border-neutral-300"}`}
               value={formData.email}
               onChange={handleChange}
            />
            {errors.email && <p className="text-sm text-red-500 -mt-3">{errors.email}</p>}
            <input
               type="password"
               name="password"
               placeholder="Password"
               className={`py-3 px-5 rounded-md outline-none border ${errors.password ? "border-red-500" : "border-neutral-300"}`}
               value={formData.password}
               onChange={handleChange}
            />
            {errors.password && <p className="text-sm text-red-500 -mt-3">{errors.password}</p>}
            <button type="submit" className="bg-neutral-700 py-3 text-white font-medium rounded-md disabled:opacity-50" disabled={loading}>
               {loading ? "Logging in..." : "Login"}
            </button>
            <div className="flex justify-center gap-2 text-sm">
               <Link to="/signup" className="hover:underline">Sign Up</Link>
               <h1 className="text-neutral-600">or</h1>
               <Link to="/forgot-password" className="hover:underline">Forgot Password?</Link>
            </div>
         </form>
      </div>
   );
};

export default LoginPage;