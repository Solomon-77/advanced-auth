import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { verifyEmail } from "../../services/api";

const VerifyEmail = () => {
   const { token } = useParams();

   useEffect(() => {
      const verifyUserEmail = async () => {
         try {
            await verifyEmail(token);
         } catch (error) {
            console.error("Email verification failed:", error);
         }
      };

      verifyUserEmail();
   }, [token]);

   return (
      <div className="h-screen grid place-items-center">
         <div className="text-center">
            <h1 className="text-2xl font-bold text-green-600">Email Verified Successfully!</h1>
            <div className="mt-4 flex justify-center">
               <p className="text-neutral-600 mr-1">You may now proceed to</p>
               <Link className="underline" to="/login">login</Link>
            </div>
         </div>
      </div>
   );
};

export default VerifyEmail;