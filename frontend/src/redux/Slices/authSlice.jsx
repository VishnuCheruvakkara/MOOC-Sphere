import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,
    bootstrapped: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.bootstrapped = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.bootstrapped = true;
        },
        setBootstrapped: (state) => {
            state.bootstrapped = true;
        },
    },
});

export const { loginSuccess, logout,setBootstrapped } = authSlice.actions;
export default authSlice.reducer;
