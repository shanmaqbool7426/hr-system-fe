import { useRouter } from "next/router"
import { Fragment } from "react"

import LandingPage from "@/layouts/LandingPage"
import Banner from "@/components/web/Banner"
import HRSolution from "@/components/web/HRSolution"
import HRStrategy from "@/components/web/HRStrategy"
import HRSystems from "@/components/web/HRSystems"
import JobManagement from "@/components/web/JobManagement"
import APIEnabled from "@/components/web/APIEnabled"
import HRProcess from "@/components/web/HRProcess"

export default function Home() {
    const router = useRouter()
    const pageName = router.pathname.substring(1);

    return (
        <Fragment>
            <Banner />
            <main id="main" className={`main page landingPageLayout grow flex flex-col py-12 md:py-20 page-${pageName}`}>
                <HRSolution />
                <HRStrategy />
                <HRSystems />
                <JobManagement />
                <APIEnabled />
                <HRProcess />
            </main>
        </Fragment>
    );
}

Home.layout = LandingPage;
