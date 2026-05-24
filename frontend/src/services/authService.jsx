import publicAxios from "../api/publicAxios";

export const signupUser = async (data) => {
    const response = await publicAxios.post("/accounts/signup/", data);
    return response.data;
}

export const loginUser = async (data) => {
    const response = await publicAxios.post("/auth/login", data);
    return response.data;
};