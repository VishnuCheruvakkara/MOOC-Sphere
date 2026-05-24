import publicAxios from "../api/publicAxios";

export const signupUser = async (data) => {
    const response = await publicAxios.post("/accounts/signup/", data);
    return response.data;
}

export const loginUser = async (data) => {
    const response = await publicAxios.post("/auth/login", data);
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await publicAxios.get(
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
