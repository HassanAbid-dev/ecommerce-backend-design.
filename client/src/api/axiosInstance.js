import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://ecommerce-backend-design-production-2550.up.railway.app/api",
  withCredentials: true, // allows cookies to be sent with requests, which is necessary for authentication to work properly since we're using cookies to store the token
});

export default axiosInstance;
