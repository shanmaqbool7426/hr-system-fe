import { useTranslation } from "next-i18next"; 
export default function  ProcurementDashboardPage() {
	const { t } = useTranslation()
 
	return (
		<section className="flex flex-col grow">
			<div className="flex justify-between items-center pb-6">
				<div className="">
					<h1 className="text-h4 mb-0">{t("Dashboard")}</h1> 
				</div> 
			</div>

			<div className=" zt-card grow">
			 
			</div>
 
		</section>
	)
}