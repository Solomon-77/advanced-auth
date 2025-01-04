import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const signup = async (userData) => {
   try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
      return response.data;
   } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
   }
};

export const verifyEmail = async (token) => {
   try {
      const response = await axios.get(`${API_BASE_URL}/auth/verify/${token}`);
      return response.data;
   } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
   }
};

export const login = async (credentials) => {
   try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
      return response.data;
   } catch (error) {
      throw error.response ? error.response.data : new Error("Network Error");
   }
};
