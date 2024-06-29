import React, { useEffect } from "react";
import Auth from "@/layouts/Auth"
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearAuth } from "@/store/slices/auth.slice";
import ls from "localstorage-slim"
export default function SignOutPage() {
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        ls.remove('auth_user')
        ls.remove('access_token')
        ls.remove('refresh_token')
        dispatch(clearAuth())
        router.push('/sign-in')

    }, [router, dispatch])

    return null;
}

SignOutPage.layout = Auth;
