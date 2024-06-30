import { useRouter } from "next/router"
import { Fragment, useEffect } from "react"
import Auth from "@/layouts/Auth"
import ls from 'localstorage-slim';

export default function Home() {
    const router = useRouter()
    useEffect(() => {
        if (!ls.get('auth_user')) {
            router.push('/sign-in')
        }
    }, [router])
    return (<>Loading</>);
}
Home.layout = Auth;
