import React from 'react'
import { useTranslation } from 'react-i18next'

export default function CandidateDetailPage () {
  const { t } = useTranslation()

  return (
    <section className="flex flex-col grow">
			{/* {is_loading && <PageLoader/>} */}
			<div className="flex justify-between pb-6">
				<h1 className="text-h4 mb-0">{t("Candidate Detail")}</h1>
			</div>

			<div className="w-full bg-white p-6 rounded-lg grow">
				
			</div>
		</section>
  )
}