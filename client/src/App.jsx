import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./routes/Auth/LoginPage"
import DashboardPage from "./routes/DashboardPage"
import SignupPage from "./routes/Auth/SignupPage"
import ForgotpasswordPage from "./routes/Auth/ForgotpasswordPage"
import Mainfeed from "./components/MainOutlet/Mainfeed"
import Profile from "./components/MainOutlet/Profile"

const App = () => {
   return (
      <div>
         <BrowserRouter>
            <Routes>
               <Route element={<DashboardPage />}>
                  <Route path="/" element={<Mainfeed/>} />
                  <Route path="/profile" element={<Profile/>} />
               </Route>
               <Route path="/login" element={<LoginPage />} />
               <Route path="/signup" element={<SignupPage />} />
               <Route path="/forgot-password" element={<ForgotpasswordPage />} />
            </Routes>
         </BrowserRouter>
      </div>
   )
}

export default App