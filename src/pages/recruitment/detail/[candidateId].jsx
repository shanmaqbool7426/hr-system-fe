import CandidateDetail from '@/modules/recruitment/cndidateDetail/CandidateDetail'
import CandidateProfile from '@/modules/recruitment/cndidateDetail/CandidateProfile'
import React from 'react'
import { useTranslation } from 'next-i18next'

export default function CandidateDetailPage() {

	return (
		<section className="flex flex-col grow gap-6">
			<CandidateProfile/>			
			<CandidateDetail/>
		</section>
	)
}