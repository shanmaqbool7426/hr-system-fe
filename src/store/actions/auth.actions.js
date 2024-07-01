
import axios from '@/util/axios';
import { setLoading, setAuthUser, setResetEmail, setResetOTP, clearAuth } from '../slices/auth.slice'
import ls from "localstorage-slim"
export const signIn = (payload) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/auth/sign-in`, payload)
        dispatch(setAuthUser(data.user))
        ls.set("access_token", data.access_token, { encrypt: true })
        ls.set("refresh_token", data.refresh_token, { encrypt: true })
        ls.set("auth_user", data.user, { encrypt: true })
        return true
    } catch (err) { }
    finally {
        dispatch(setLoading(false))
    }
};
export const forgotPassword = (payload, router = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/auth/forgot-password`, payload)
        dispatch(setResetEmail(payload.email))
        if (router) router.push('/otp-verification')
        return data
    } catch (err) { }
    finally {
        dispatch(setLoading(false))
    }
};
export const verifyOtp = (payload, router = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/auth/verify-otp`, payload)
        dispatch(setResetOTP(payload.otp))
        if (router) router.push('/reset-password')
        return data
    } catch (err) { }
    finally {
        dispatch(setLoading(false))
    }
};
export const resetPassword = (payload, setOpen) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/auth/reset-password`, payload)
        setOpen(true)
        return data
    } catch (err) { }
    finally {
        dispatch(setLoading(false))
    }
};
export const auth = (payload) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/auth`, payload)

    } catch (err) { }
    finally {
        dispatch(setLoading(false))
    }
};