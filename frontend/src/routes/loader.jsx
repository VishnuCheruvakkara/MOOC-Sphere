import { redirect } from "react-router-dom";
import { store } from "../redux/store";

const checkUserAuth = () => {
    const state = store.getState();
    const { isAuthenticated, user } = state.auth;

    return (
        isAuthenticated && user?.is_active && !user?.is_staff
    );
}

export const userAuthLoader = async () => {
    
    if (!checkUserAuth()) {
        return redirect("/login");
    }

    return null;
}

export const publicLoader = async () => {
    
    if (checkUserAuth()) {
        return redirect("/user")
    }
    return null;
}