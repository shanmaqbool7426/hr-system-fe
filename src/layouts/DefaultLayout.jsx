import { Fragment, useEffect } from "react"
import { useRouter } from "next/router"
import ls from 'localstorage-slim'

import Header from "@/components/includes/Header"
import Sidebar from "@/components/includes/Sidebar-new"
import { useDispatch } from "react-redux"
import { FetchCustomfields } from "@/store/actions/customfield.actions"

export default function DefaultLayout({ children }) {
    const router = useRouter()
    const pageName = router.pathname.substring(1);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(FetchCustomfields())
    }, [dispatch])

    useEffect(() => {
        if (!ls.get('access_token')) {
            router.push('/sign-in')
        }
    }, [router])

    return (
        <Fragment>
            <Header />
            <main id="zt-main" className={`zt-main zt-defaultLayout zt-page  max-h-[calc(100vh_-_70px)] zt-page-${pageName}`}>
                <Sidebar />
                <div className="zt-customScrollbar zt-content">
                    {children}
                </div>
            </main>
        </Fragment>
    );
}