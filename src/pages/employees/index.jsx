
import DefaultLayout from "@/layouts/DefaultLayout"
import { useTranslation } from "next-i18next";
import ls from 'localstorage-slim';



export default function EmployeesPage() {
    const { t } = useTranslation()

    return (
        <section className="flex flex-col grow">
            {/* {is_loading && <PageLoader/>} */}
            <div className="">
                <h1 className="text-h4 mb-0">{t("Employees")}</h1>
                <p className="mb-0">{t("Manage your employee")}</p>
            </div>

            <div className=" zt-card grow">
            </div>
        </section>
    )
}