import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_SUBNET_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;
