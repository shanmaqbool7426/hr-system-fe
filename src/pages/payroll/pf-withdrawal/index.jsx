import { useTranslation } from "next-i18next";
import ls from 'localstorage-slim';
// import { Button } from "@/components/elements";

export default function PFWithdrawalRequestPage() {
	const { t } = useTranslation()

  return (
    <section className="flex flex-col grow">
			{/* {is_loading && <PageLoader/>} */}
			<div className="flex justify-between pb-6">
				<div className="flex flex-col">
					<h1 className="text-h4 mb-0">{t("PF Withdrawal Request")}</h1>
				</div>
				{/* <div className="flex items-start gap-2">
					<Button className={"btn btn-dark-outline"}>{t("Add Candidate")}</Button>
					<Button className={"btn btn-dark"}>{t("Add Job")}</Button>
				</div> */}
			</div>

			<div className=" zt-card grow">
				
			</div>
		</section>
  )
}