import { Link } from "react-router-dom";
import { signup } from "../../services/api";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

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

      // Realtime username validation (only if the field is not blank)
      if (name === 'username' && value.trim() !== '') {
         const usernameError = validateUsername(value);
         setErrors((prevErrors) => ({ ...prevErrors, username: usernameError }));
      } else {
         setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
      }
   };

   const validateUsername = (username) => {
      const minLength = 3;
      const maxLength = 20;
      const allowedChars = /^[a-zA-Z0-9_-]+$/; // Alphanumeric, underscores, and hyphens

      if (username.length < minLength) return "Username must be at least 3 characters long.";
      if (username.length > maxLength) return "Username must be no more than 20 characters long.";
      if (!allowedChars.test(username)) return "Username can only contain letters, numbers, underscores, and hyphens.";

      return null;
   };

   const isPasswordValid = (password) => ({
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
   });

   const validateForm = () => {
      const newErrors = {};

      // Username validation (only check for "required" on submit)
      if (!formData.username.trim()) {
         newErrors.username = "Username is required.";
      } else {
         const usernameError = validateUsername(formData.username);
         if (usernameError) newErrors.username = usernameError;
      }

      // Email validation
      if (!formData.email) {
         newErrors.email = "Email is required.";
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
         newErrors.email = "Invalid email format.";
      }

      // Password validation
      if (!formData.password) {
         newErrors.password = "Password is required.";
      } else {
         const passwordValidation = isPasswordValid(formData.password);
         if (!Object.values(passwordValidation).every((rule) => rule)) {
            newErrors.password = "Password does not meet the requirements.";
         }
      }

      // Confirm password validation
      if (Object.values(isPasswordValid(formData.password)).every((rule) => rule)
         && formData.password !== formData.confirmPassword) {
         newErrors.confirmPassword = "Passwords do not match.";
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
         if (error.error === "Email already taken") {
            setErrors((prevErrors) => ({ ...prevErrors, email: "Email is already taken." }));
         } else {
            setMessage({ text: error.error || "An error occurred during signup.", type: "error" });
         }
      }
   };

   const passwordValidation = isPasswordValid(formData.password);

   const validationRules = [
      { key: 'minLength', label: 'At least 8 characters' },
      { key: 'hasUpperCase', label: 'At least one uppercase letter' },
      { key: 'hasLowerCase', label: 'At least one lowercase letter' },
      { key: 'hasNumber', label: 'At least one number' },
      { key: 'hasSpecialChar', label: 'At least one special character' },
   ];

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
               className={`py-3 px-5 rounded-md outline-none border ${errors.username ? "border-red-500" : "border-neutral-300"}`}
               value={formData.username}
               onChange={handleChange}
            />
            {errors.username && <p className="text-sm text-red-500 -mt-3">{errors.username}</p>}
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
            <div className="text-sm text-neutral-600">
               {validationRules.map((rule) => (
                  <div key={rule.key} className="flex items-center gap-2">
                     <span className={`w-4 h-4 flex items-center justify-center rounded-full border ${passwordValidation[rule.key]
                        ? "border-green-500 bg-green-500"
                        : "border-neutral-400"}`}
                     >
                        {passwordValidation[rule.key] && <FaCheck className="text-white text-xs" />}
                     </span>
                     <p className={passwordValidation[rule.key]
                        ? "text-green-500"
                        : "text-neutral-600"}
                     >
                        {rule.label}
                     </p>
                  </div>
               ))}
            </div>
            <input
               type="password"
               name="confirmPassword"
               placeholder="Confirm Password"
               className={`py-3 px-5 rounded-md outline-none border ${errors.confirmPassword ? "border-red-500" : "border-neutral-300"}`}
               value={formData.confirmPassword}
               onChange={handleChange}
            />
            {errors.confirmPassword && Object.values(isPasswordValid(formData.password))
               .every((rule) => rule) && (
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