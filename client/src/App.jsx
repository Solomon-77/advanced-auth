import {BrowserRouter, Route, Routes} from "react-router-dom"
import LoginPage from "./routes/Auth/LoginPage"
import DashboardPage from "./routes/DashboardPage"

const App = () => {
   return (
      <div>
         <BrowserRouter>
            <Routes>
               <Route path="/login" element={<LoginPage />} />
               <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
         </BrowserRouter>
      </div>
   )
}

export default App