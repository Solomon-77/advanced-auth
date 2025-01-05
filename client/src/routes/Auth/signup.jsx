import { Link } from "react-router-dom";
import { signup } from "../../services/api";
import { useState } from "react";
import { FaCheck } from "react-icons/fa"; // Import check icon

const SignupPage = () => {
   const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
   });

   const [message, setMessage] = useState({ text: '', type: '' });
   const [errors, setErrors] = useState({});

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: '' });
   };

   // Password validation rules
   const isPasswordValid = (password) => {
      const minLength = password.length >= 8;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      return { minLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar };
   };

   const validateForm = () => {
      const newErrors = {};
      if (!formData.username) newErrors.username = "Username is required.";
      if (!formData.email) {
         newErrors.email = "Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
         newErrors.email = "Invalid email format.";
      }
      if (!formData.password) {
         newErrors.password = "Password is required.";
      } else {
         const passwordValidation = isPasswordValid(formData.password);
         if (!Object.values(passwordValidation).every((rule) => rule)) {
            newErrors.password = "Password does not meet the requirements.";
         }
      }
      // Only check for password match if the password is valid
      if (Object.values(isPasswordValid(formData.password)).every((rule) => rule)) {
         if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
         }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      try {
         const userData = {
            username: formData.username,
            email: formData.email,
            password: formData.password
         };
         const response = await signup(userData);

         setMessage({ text: response.message, type: "success" });
         setFormData({ username: '', email: '', password: '', confirmPassword: '' });
         setErrors({});
      } catch (error) {
         setMessage({ text: error.error || "An error occurred during signup.", type: "error" });
      }
   };

   const passwordValidation = isPasswordValid(formData.password);

   return (
      <div className="h-screen grid place-items-center">
         <form onSubmit={handleSubmit} className="flex flex-col max-w-[350px] min-w-0 w-full p-6 gap-4">
            <h1 className="text-xl text-center font-medium">Sign up for your account</h1>
            {message.text && (
               <p className={`p-3 rounded-md text-center ${message.type === "error"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"}`}
               >
                  {message.text}
               </p>
            )}
            <input
               type="text"
               name="username"
               placeholder="Username"
               className={`py-3 px-5 rounded-md outline-none border ${errors.username
                  ? "border-red-500"
                  : "border-neutral-300"}`}
               value={formData.username}
               onChange={handleChange}
            />
            {errors.username && <p className="text-sm text-red-500 -mt-3">{errors.username}</p>}
            <input
               type="text"
               name="email"
               placeholder="Email"
               className={`py-3 px-5 rounded-md outline-none border ${errors.email
                  ? "border-red-500"
                  : "border-neutral-300"}`}
               value={formData.email}
               onChange={handleChange}
            />
            {errors.email && <p className="text-sm text-red-500 -mt-3">{errors.email}</p>}
            <input
               type="password"
               name="password"
               placeholder="Password"
               className={`py-3 px-5 rounded-md outline-none border ${errors.password
                  ? "border-red-500"
                  : "border-neutral-300"}`}
               value={formData.password}
               onChange={handleChange}
            />
            {errors.password && <p className="text-sm text-red-500 -mt-3">{errors.password}</p>}
            {/* Password validation rules with blank circles and checkmarks */}
            <div className="text-sm text-neutral-600">
               <div className="flex items-center gap-2">
                  <span
                     className={`w-4 h-4 flex items-center justify-center rounded-full border ${passwordValidation.minLength
                        ? "border-green-500 bg-green-500"
                        : "border-neutral-400"
                        }`}
                  >
                     {passwordValidation.minLength && (
                        <FaCheck className="text-white text-xs" />
                     )}
                  </span>
                  <p className={passwordValidation.minLength ? "text-green-500" : "text-neutral-600"}>
                     At least 8 characters
                  </p>
               </div>
               <div className="flex items-center gap-2">
                  <span
                     className={`w-4 h-4 flex items-center justify-center rounded-full border ${passwordValidation.hasUpperCase
                        ? "border-green-500 bg-green-500"
                        : "border-neutral-400"
                        }`}
                  >
                     {passwordValidation.hasUpperCase && (
                        <FaCheck className="text-white text-xs" />
                     )}
                  </span>
                  <p className={passwordValidation.hasUpperCase ? "text-green-500" : "text-neutral-600"}>
                     At least one uppercase letter
                  </p>
               </div>
               <div className="flex items-center gap-2">
                  <span
                     className={`w-4 h-4 flex items-center justify-center rounded-full border ${passwordValidation.hasLowerCase
                        ? "border-green-500 bg-green-500"
                        : "border-neutral-400"
                        }`}
                  >
                     {passwordValidation.hasLowerCase && (
                        <FaCheck className="text-white text-xs" />
                     )}
                  </span>
                  <p className={passwordValidation.hasLowerCase ? "text-green-500" : "text-neutral-600"}>
                     At least one lowercase letter
                  </p>
               </div>
               <div className="flex items-center gap-2">
                  <span
                     className={`w-4 h-4 flex items-center justify-center rounded-full border ${passwordValidation.hasNumber
                        ? "border-green-500 bg-green-500"
                        : "border-neutral-400"
                        }`}
                  >
                     {passwordValidation.hasNumber && (
                        <FaCheck className="text-white text-xs" />
                     )}
                  </span>
                  <p className={passwordValidation.hasNumber ? "text-green-500" : "text-neutral-600"}>
                     At least one number
                  </p>
               </div>
               <div className="flex items-center gap-2">
                  <span
                     className={`w-4 h-4 flex items-center justify-center rounded-full border ${passwordValidation.hasSpecialChar
                        ? "border-green-500 bg-green-500"
                        : "border-neutral-400"
                        }`}
                  >
                     {passwordValidation.hasSpecialChar && (
                        <FaCheck className="text-white text-xs" />
                     )}
                  </span>
                  <p className={passwordValidation.hasSpecialChar ? "text-green-500" : "text-neutral-600"}>
                     At least one special character
                  </p>
               </div>
            </div>
            <input
               type="password"
               name="confirmPassword"
               placeholder="Confirm Password"
               className={`py-3 px-5 rounded-md outline-none border ${errors.confirmPassword
                  ? "border-red-500"
                  : "border-neutral-300"}`}
               value={formData.confirmPassword}
               onChange={handleChange}
            />
            {/* Only show "Passwords do not match" error if the password is valid */}
            {errors.confirmPassword && Object.values(isPasswordValid(formData.password)).every((rule) => rule) && (
               <p className="text-sm text-red-500 -mt-3">{errors.confirmPassword}</p>
            )}
            <button className="bg-neutral-700 py-3 text-white font-medium rounded-md">Sign Up</button>
            <div className="flex justify-center text-sm">
               <Link to="/login" className="hover:underline">Already have an account? Login</Link>
            </div>
         </form>
      </div>
   );
};

export default SignupPage;