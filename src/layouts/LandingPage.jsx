import { Fragment } from "react"

import Header from "@/components/includes/Header";
import Footer from "@/components/includes/Footer";

export default function LandingPage({ children }) {

    return (
        <Fragment>
            <Header />
            {children}
            <Footer />
        </Fragment>
    );
}