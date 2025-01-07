import { useEffect } from "react";
import { useParams } from "react-router-dom";
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
            <p className="mt-4 text-neutral-600">You will be redirected to the login page in a few seconds.</p>
         </div>
      </div>
   );
};

export default VerifyEmail;