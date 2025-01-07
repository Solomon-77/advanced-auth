import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { validateToken } from "../../services/api";

const ValidateToken = () => {
   const { token } = useParams(); // Get the token from the URL
   const navigate = useNavigate();
   const [isValid, setIsValid] = useState(null); // Track token validity

   useEffect(() => {
      const validateTokenAndNavigate = async () => {
         try {
            // Call the validateToken API
            const response = await validateToken(token);

            if (response.message === "Token is valid.") {
               setIsValid(true);
               navigate(`/auth/verify/${token}`);
            }
         } catch (error) {
            setIsValid(false);
            console.error("Token validation failed:", error);
         }
      };

      validateTokenAndNavigate();
   }, [token, navigate]);

   // Display loading state while validating
   if (isValid === null) {
      return (
         <div className="h-screen grid place-items-center">
            <div className="text-center">
               <h1 className="text-2xl font-bold text-neutral-700">Validating Token...</h1>
               <p className="mt-4 text-neutral-600">Please wait while we validate your token.</p>
            </div>
         </div>
      );
   }

   // Display invalid token message if validation fails
   if (isValid === false) {
      return (
         <div className="h-screen grid place-items-center">
            <div className="text-center">
               <h1 className="text-2xl font-bold text-red-600">Invalid or Expired Token</h1>
               <p className="mt-4 text-neutral-600">The verification link is invalid or has expired. Please sign up again.</p>
               <a
                  href="/signup"
                  className="mt-6 inline-block bg-neutral-700 text-white py-2 px-4 rounded-md hover:bg-neutral-800"
               >
                  Sign Up
               </a>
            </div>
         </div>
      );
   }

   return null;
};

export default ValidateToken;