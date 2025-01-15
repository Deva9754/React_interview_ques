import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';

// Create store using configureStore
const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;