import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // allows cookies to be sent with requests, which is necessary for authentication to work properly since we're using cookies to store the token
});

export default axiosInstance;
