import {BrowserRouter, Route, Routes} from "react-router-dom"
import LoginPage from "./routes/Auth/LoginPage"
import DashboardPage from "./routes/DashboardPage"
import SignupPage from "./routes/Auth/SignupPage"
import ResetpasswordPage from "./routes/Auth/ResetpasswordPage"

const App = () => {
   return (
      <div>
         <BrowserRouter>
            <Routes>
               <Route path="/login" element={<LoginPage />} />
               <Route path="/signup" element={<SignupPage />} />
               <Route path="/reset-password" element={<ResetpasswordPage />} />
               <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
         </BrowserRouter>
      </div>
   )
}

export default App