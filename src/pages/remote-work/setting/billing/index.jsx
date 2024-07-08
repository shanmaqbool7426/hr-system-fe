import { useTranslation } from "next-i18next";

export default function Billing() {
    const { t } = useTranslation()

    return (
        <section className="flex flex-col grow">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex justify-between pb-6">
                <div className="flex flex-col">
                    <h1 className="text-h4 mb-0">{t("Billing")}</h1>
                </div>
            </div>
            <div className="zt-card grow">

            </div>
        </section>
    )
}