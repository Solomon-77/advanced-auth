import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
      setLoading(false);
   }, []);

   const login = (token) => {
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
   };

   const logout = () => {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      navigate('/login');
   };

   return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);