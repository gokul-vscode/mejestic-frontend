import axios from "axios";

const api = axios.create({
  baseURL: "https://mejestic-backend.onrender.com",
  withCredentials: false,
});

export default api;
