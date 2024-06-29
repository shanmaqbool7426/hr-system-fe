import React, { Fragment } from "react"
import { useRouter } from "next/router"

import LandingPage from "@/layouts/LandingPage"
import Banner from "@/components/web/Banner"

export default function PartnerWithUsPage () {
  const router = useRouter()
  const pageName = router.pathname.substring(1);

    return (
        <Fragment>
          <Banner />
          <main id="main" className={`main page landingPageLayout grow flex flex-col py-12 md:py-20 page-${pageName}`}>
            <div className={'container'}>
              <h1>Partner With Us Page</h1>
            </div>
          </main>
        </Fragment>
    );
}

PartnerWithUsPage.layout = LandingPage;