import { createSlice } from "@reduxjs/toolkit";
import ls from 'localstorage-slim';

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        is_loading: false,
        auth_user: ls?.get('auth_user', { decrypt: true }),
        company: ls?.get('company', { decrypt: true }),
        reset: {
            otp: null,
            email: null,
        }
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload
        },
        setCompany(state, action) {
            state.company = action.payload;
        },
        setAuthUser(state, action) {
            state.auth_user = action.payload;
        },
        setResetEmail(state, action) {
            state.reset.email = action.payload;
        },
        setResetOTP(state, action) {
            state.reset.otp = action.payload;
        },
        clearAuth(state, action) {
            state.company = null
            state.auth_user = null
        }
    },
});

export const {
    setLoading,
    setCompany,
    setAuthUser,
    setResetEmail,
    setResetOTP,
    clearAuth,
} = authSlice.actions;

export default authSlice.reducer;
