import publicAxios from "../api/publicAxios";

export const signupUser = async (data) => {
    const response = await publicAxios.post("/accounts/register/", data);
    return response.data;
}