import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../redux/Slices/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})