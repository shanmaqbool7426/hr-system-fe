import { Button, Table } from "@/components/elements";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useState } from "react";
// import { Button } from "@/components/elements";

export default function ScheduleInterviewPage() {
	const { t } = useTranslation()
	const [sortCol, setSortCol] = useState(null)
	const [sortDir, setSortDir] = useState(null)
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(10)
	const headings = [
		{ title: t("Name"), col: "name", },
		{ title: t("Job Title"), col: "jobTitle", },
		{ title: t("Candidate Available Time"), col: "CandidateAvailableTime", },
		{ title: t("Schedule timing"), col: "Scheduletiming" },
	]

	const rows = [
		{
			name: <div className="flex items-center justify-start gap-3 grow">
				<figure className={'overflow-hidden rounded-full shrink-0'}>
					<Image src={'/assets/images/users/user-01.jpg'} height={24} width={24} alt="Profile" />
				</figure>
				<div className={'flex flex-col text-left'}>
					<strong className={'text-themeGrayscale900 text-xs'}>{t('Kelli Lebsack')}</strong>
					<span className={'text-themeGrayscale500 text-xs'}>{t('Designer')}</span>
				</div>
			</div>,
			jobTitle: 'Manager',
			CandidateAvailableTime: <div className="flex flex-col items-center text-sm">
				<span>{t("11-03-2020 - 11:00 AM-12:00 PM")}</span>
				<span>{t("12-03-2020 - 10:00 AM-11:00 AM")}</span>
			</div>,
			Scheduletiming: <Button className='btn btn-purple'>Schedule time</Button>,
		},
		{
			name: <div className="flex items-center justify-start gap-3 grow">
				<figure className={'overflow-hidden rounded-full shrink-0'}>
					<Image src={'/assets/images/users/user-01.jpg'} height={24} width={24} alt="Profile" />
				</figure>
				<div className={'flex flex-col text-left'}>
					<strong className={'text-themeGrayscale900 text-xs'}>{t('Kelli Lebsack')}</strong>
					<span className={'text-themeGrayscale500 text-xs'}>{t('Designer')}</span>
				</div>
			</div>,
			jobTitle: 'Orchestrator',
			CandidateAvailableTime: <div className="flex flex-col items-center text-sm">
				<span>{t("11-03-2020 - 11:00 AM-12:00 PM")}</span>
				<span>{t("12-03-2020 - 10:00 AM-11:00 AM")}</span>
			</div>,
			Scheduletiming: <Button className='btn btn-purple'>Schedule time</Button>,
		},
		{
			name: <div className="flex items-center justify-start gap-3 grow">
				<figure className={'overflow-hidden rounded-full shrink-0'}>
					<Image src={'/assets/images/users/user-01.jpg'} height={24} width={24} alt="Profile" />
				</figure>
				<div className={'flex flex-col text-left'}>
					<strong className={'text-themeGrayscale900 text-xs'}>{t('Kelli Lebsack')}</strong>
					<span className={'text-themeGrayscale500 text-xs'}>{t('Designer')}</span>
				</div>
			</div>,
			jobTitle: 'Manager',
			CandidateAvailableTime: <div className="flex flex-col items-center text-sm">
				<span>{t("11-03-2020 - 11:00 AM-12:00 PM")}</span>
				<span>{t("12-03-2020 - 10:00 AM-11:00 AM")}</span>
			</div>,
			Scheduletiming: <Button className='btn btn-purple'>Schedule time</Button>,
		},
		{
			name: <div className="flex items-center justify-start gap-3 grow">
				<figure className={'overflow-hidden rounded-full shrink-0'}>
					<Image src={'/assets/images/users/user-01.jpg'} height={24} width={24} alt="Profile" />
				</figure>
				<div className={'flex flex-col text-left'}>
					<strong className={'text-themeGrayscale900 text-xs'}>{t('Kelli Lebsack')}</strong>
					<span className={'text-themeGrayscale500 text-xs'}>{t('Designer')}</span>
				</div>
			</div>,
			jobTitle: 'Orchestrator',
			CandidateAvailableTime: <div className="flex flex-col items-center text-sm">
				<span>{t("11-03-2020 - 11:00 AM-12:00 PM")}</span>
				<span>{t("12-03-2020 - 10:00 AM-11:00 AM")}</span>
			</div>,
			Scheduletiming: <Button className='btn btn-purple'>Schedule time</Button>,
		},
	]

	return (
		<section className="flex flex-col grow">
			{/* {is_loading && <PageLoader/>} */}
			<div className="flex justify-between pb-6">
				<div className="flex flex-col">
					<h1 className="text-h4 mb-0">{t("Recruitment")}</h1>
					{/* <p className="mb-0">{t("Manage all candidates")}</p> */}
				</div>
			</div>
			<div className="zt-card grow">
				<h2 className="text-lg">{t("Schedule timing")}</h2>
				<Table
					headings={headings}
					rows={rows}
					sortCol={sortCol}
					setSortCol={setSortCol}
					sortDir={sortDir}
					setSortDir={setSortDir}
					perPage={perPage}
					setPerPage={setPerPage}
					page={page}
					setPage={setPage}
					className={'zt-employeeTable zt-recruitmentTable'}
				/>
			</div>
		</section>
	)
}