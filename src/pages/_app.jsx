import '@/styles.scss'

import Head from "next/head"
import DefaultLayout from "@/layouts/DefaultLayout"
import { I18nextProvider } from "react-i18next"
import { Provider } from "react-redux"
import store from "../store"
import { useEffect, useState } from "react"
import i18n from "../util/i18n"

export default function App({ Component, pageProps }) {
    const [ready, setReady] = useState(false)
    useEffect(() => {
        setReady(true)
    }, [])
    const Layout = Component.layout || DefaultLayout;

    return (
        <>
            {ready &&
                <>
                    <Head>
                        <title>Zaffre Tech | Innovative AI HR Solution</title>
                        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
                        <link rel="preconnect" href="https://fonts.googleapis.com" />
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Manrope:wght@200..800&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
                    </Head>
                    <Provider store={store}>
                        <Layout>
                            <I18nextProvider i18n={i18n}>
                                <Component {...pageProps} />
                            </I18nextProvider>
                        </Layout>
                    </Provider>
                </>
            }
        </>
    )
}