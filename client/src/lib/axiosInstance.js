import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Replace with your API
//   timeout: 5000, // Timeout in milliseconds
//   headers: {
//     "Content-Type": "application/json",
//   },
});

export default axiosInstance;
