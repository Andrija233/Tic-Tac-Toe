import axios from "axios";
import { showToast } from "../utils/toastHelper";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL: API_URL,
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      showToast("Unauthorized! Please log in again.", "ERROR");
    } else if (status === 500) {
      showToast("Server error! Please try later.", "ERROR");
    } else if (status === 404) {
      showToast("Resource not found.", "ERROR");
    } else {
      showToast("Something went wrong.", "ERROR");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
