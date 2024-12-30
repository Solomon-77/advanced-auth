import axios from "axios";

const API_BASE_URL = import.meta.env.API_URL; // Replace with your base URL

const apiClient = axios.create({
   baseURL: API_BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
});

// Signup API
export const signupUser = async (userData) => {
   return apiClient.post("/signup", userData);
};

// Add other APIs like login, verify, etc.
export const loginUser = async (credentials) => {
   return apiClient.post("/login", credentials);
};

export const verifyEmail = async (token) => {
   return apiClient.get(`/verify/${token}`);
};