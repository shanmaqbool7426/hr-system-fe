import React from 'react'
import { useTranslation } from 'react-i18next';

export default function EmployeeSettingPage () {
	const { t } = useTranslation();

	return (
		<section className="flex flex-col grow">
			{/* {is_loading && <PageLoader/>} */}
			<div className="flex flex-col pb-6">
				<h1 className="text-h4 mb-0">{t("Employee Setting Page")}</h1>
				<p className="mb-0">{t("Manage your employee settings")}</p>
			</div>

			<div className="w-full bg-white p-12 rounded-lg grow">

			</div>
		</section>
	)
}