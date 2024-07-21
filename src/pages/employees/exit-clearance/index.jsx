
import { useTranslation } from "next-i18next";

export default function ExitClearance() {
    const { t } = useTranslation()
    return (
        <section className="flex flex-col gap-6 grow">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex justify-between items-center">
                <h1 className="text-h4 mb-0">{t("Exit Clearance")}</h1>
            </div>

            <div className="zt-card grow">

            </div>
        </section>
    )
}
