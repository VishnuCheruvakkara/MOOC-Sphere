import publicAxios from "../api/publicAxios";
import privateAxios from "../api/privateAxios";

export const signupUser = async (data) => {
    const response = await publicAxios.post("/accounts/signup/", data);
    return response.data;
}

export const loginUser = async (data) => {
    const response = await publicAxios.post("/accounts/login/", data);
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await privateAxios.get(
        "/accounts/me/"
    );
    return response.data;
}

export const logoutuser = async () => {
    const response = await publicAxios.post(
        "/accounts/logout/"
    );
    return response.data;
}
