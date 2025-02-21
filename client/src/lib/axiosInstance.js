import axios from "axios";

const axiosInstance = axios.create({
  baseURL: window.location.hostname === "localhost" ? "http://localhost:5000" : "https://zentask-server.vercel.app", 
  timeout: 10000,
});

export default axiosInstance;
