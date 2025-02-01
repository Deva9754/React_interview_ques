// // src/slices/authSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     user: null,
//     loading: false,
//     error: null,
// };

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         loginStart: (state) => {
//             state.loading = true;
//         },
//         loginSuccess: (state, action) => {
//             state.loading = false;
//             state.user = action.payload;
//         },
//         loginFailure: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//         logout: (state) => {
//             state.user = null;
//         },
//         // Add any extra actions if needed for Google login or other authentication methods
//         setUser: (state, action) => {
//             state.user = action.payload;
//         },
//     },
// });

// // Export the actions
// export const { loginStart, loginSuccess, loginFailure, logout, setUser } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            // Store only relevant data like uid and username
            state.user = {
                uid: action.payload.uid,
                username: action.payload.displayName || 'No username', // Using displayName or default value
            };
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, setUser } = authSlice.actions;
export default authSlice.reducer;