import axios from "axios";

const axiosConnection = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

axiosConnection.interceptors.request.use((config) => {

    if (config.data instanceof FormData) {

        delete config.headers["Content-Type"];

    } else {
        config.headers["Content-Type"] = "application/json";
    }
    return config;
});

axiosConnection.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default axiosConnection;
