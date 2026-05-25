import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/Slices/authSlice";

let isRefreshing = false;

const privateAxios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

privateAxios.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if (!originalRequest || originalRequest._retry) {
            return Promise.reject(error);
        }

        const status = error.response?.status;
        const data = error.response?.data || {};
        const code = data.code;
        const requestUrl = originalRequest.url || "";

        const isRefreshCall = requestUrl.includes("/accounts/refresh/");

        // If refresh API itself fails then logout
        if (isRefreshCall) {
            store.dispatch(logout());
            window.location.href = "/login";
            return Promise.reject(error);
        }

        // No refresh token OR invalid refresh then logout
        if (
            (status === 401 && code === "REFRESH_TOKEN_MISSING") ||
            (status === 403 && code === "REFRESH_TOKEN_INVALID")
        ) {
            store.dispatch(logout());
            window.location.href = "/login";
            return Promise.reject(error);
        }

        // Access token expired then try refresh once
        if (status === 401 && !originalRequest._retry && !isRefreshCall) {
            if (isRefreshing) return Promise.reject(error);

            isRefreshing = true;
            originalRequest._retry = true;

            try {
                await privateAxios.post("/accounts/refresh/");
                isRefreshing = false;
                return privateAxios(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                store.dispatch(logout());
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default privateAxios;