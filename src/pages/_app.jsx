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