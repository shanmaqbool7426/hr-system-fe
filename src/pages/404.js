import { useTranslation } from "next-i18next";
import ls from 'localstorage-slim';
import Link from "next/link";

const user = ls?.get('auth_user', { decrypt: true })

export default function NotFound() {
    const { t } = useTranslation()

    return (
        <>
            {user ?
                <div className="flex items-center justify-center w-full h-full">
                    <div className="flex flex-col">
                        <h1>404</h1>
                        <h2>{t("errors.notfound")}</h2>
                        <Link href="/dashboard">Back to dashboard</Link>
                    </div>
                </div> :
                <div className="p-4 w-full max-w-xl rounded-lg space-y-5">
                    {t("errors.notfound")}
                </div>
            }
        </>
    );
}
// NotFound.layout = Layout