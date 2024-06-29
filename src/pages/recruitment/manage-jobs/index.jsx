import LandingPage from "@/layouts/LandingPage"
import DefaultLayout from "@/layouts/DefaultLayout"
import { useTranslation } from "next-i18next";
import ls from 'localstorage-slim';
import { Button } from "@/components/elements";

const user = ls?.get('auth_user', { decrypt: true })
const Layout = user ? DefaultLayout : LandingPage

export default function ManageJobsPage() {
	const { t } = useTranslation()

  return (
    <section className="flex flex-col grow">
			{/* {is_loading && <PageLoader/>} */}
			<div className="flex justify-between pb-6">
				<div className="flex flex-col">
					<h1 className="text-h4 mb-0">{t("Manage Jobs Page")}</h1>
					<p className="mb-0">{t("Manage all candidates")}</p>
				</div>
				<div className="flex items-start gap-2">
					<Button className={"btn btn-dark-outline"}>{t("Add New Job")}</Button>
				</div>
			</div>

			<div className="w-full bg-white p-6 rounded-lg grow">
				
			</div>
		</section>
  )
}