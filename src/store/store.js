// // src/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import { auth } from '../firebase/Firebase'
// import authReducer, { loginSuccess, logout } from '../slices/authSlice';

// // Create store using configureStore
// const store = configureStore({
//     reducer: {
//         auth: authReducer,
//     },
// });

// // Listen for Firebase auth state changes and dispatch actions to update Redux store
// auth.onAuthStateChanged((user) => {
//     if (user) {
//         // If the user is logged in, dispatch loginSuccess with user data
//         store.dispatch(loginSuccess(user));
//     } else {
//         // If the user is logged out, dispatch logout action
//         store.dispatch(logout());
//     }
// });

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import { auth } from '../firebase/Firebase'; // Firebase auth import
import authReducer, { loginSuccess, logout } from '../slices/authSlice';

// Create store using configureStore
const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

// Listen for Firebase auth state changes and dispatch actions to update Redux store
auth.onAuthStateChanged((user) => {
    if (user) {
        // If the user is logged in, dispatch loginSuccess with user data (only necessary fields)
        store.dispatch(loginSuccess({
            uid: user.uid,
            displayName: user.displayName || 'No username', // Fallback for displayName if it's not set
        }));
    } else {
        // If the user is logged out, dispatch logout action
        store.dispatch(logout());
    }
});

export default store;