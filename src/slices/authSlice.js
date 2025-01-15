import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null, // Store user data here (username, email)
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signUp: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload; // Store user data (username, email) on sign-up
        },
        login: (state, action) => {
            state.isAuthenticated = true;
            // Don't modify the username here. Just use the username from the sign-up action
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null; // Clear user data on logout
        },
    },
});

export const { signUp, login, logout } = authSlice.actions;
export default authSlice.reducer;