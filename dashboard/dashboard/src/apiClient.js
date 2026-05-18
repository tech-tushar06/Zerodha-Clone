import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:3002",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;