
import DefaultLayout from "@/layouts/DefaultLayout"
import { useTranslation } from "next-i18next";
import ls from 'localstorage-slim';
import { Button, DropDown, Table } from "@/components/elements";
import { useState } from "react";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import AddJob from "@/components/forms/organization/jobs/AddJob";



export default function EvaluationPage() {
	const { t } = useTranslation()
	const [create, setCreate] = useState(false)
	const [sortCol, setSortCol] = useState(null)
	const [sortDir, setSortDir] = useState(null)
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(10)
	const headings = [
		{ title: t("S#"), col: "Sr", /* sort: true */ },
		{ title: t("Question"), col: "Question"},
		{ title: t("Option A"), col: "OptionA", /* sort: true */ },
		{ title: t("Option B"), col: "OptionB" },
		{ title: t("Option C"), col: "OptionC" },
		{ title: t("Option D"), col: "OptionD" },
		{ title: t("Correct Ans"), col: "CorrectAns" },
		{ title: t("Action"), col: "action" }
	]

	const rows = [
		{
			Sr: '1',
			Question: <span className="text-start block">{t('Can you walk me through your design process from start to finish?')}</span>,
			OptionA: <span className="whitespace-nowrap">{t('Design Facilities')}</span>,
			OptionB: <span className="whitespace-nowrap">{t('Design Facilities')}</span>,
			OptionC: <span className="whitespace-nowrap">{t('Lack of portability')}</span>,
			OptionD: <span className="whitespace-nowrap">{t('Inability to perform')}</span>,
			CorrectAns: 'A', 
			action: <DropDown icon={<ThreeDotsVertical />}>
				<ul className="zt-themeDropDownList zt-sm gap-4">
					<li className="!p-0">
						<a onClick={() => { setEdit(true); setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
							<span><Edit /></span>
							<span>{t("Edit")}</span>
						</a>
					</li>
					<li className="!p-0">
						<a onClick={() => {
							Toast.confirmDelete(() => {
								dispatch(DeleteCustomfield(item._id, () => {
									Toast.success(t("Asset Type deleted successfully"))
								}))
							}, t)
						}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
							<span><Trash /></span>
							<span>{t("Delete")}</span>
						</a>
					</li>
				</ul>
			</DropDown>
		},
		{
			Sr: '2',
			Question: <span className="text-start block">{t('What tools and software do you prefer to use in your design work, and why?')}</span>,
			OptionA: <span className="whitespace-nowrap">{t('Design Facilities')}</span>,
			OptionB: <span className="whitespace-nowrap">{t('Design Facilities')}</span>,
			OptionC: <span className="whitespace-nowrap">{t('Lack of portability')}</span>,
			OptionD: <span className="whitespace-nowrap">{t('Inability to perform')}</span>,
			CorrectAns: 'A', 
			action: <DropDown icon={<ThreeDotsVertical />}>
				<ul className="zt-themeDropDownList zt-sm gap-4">
					<li className="!p-0">
						<a onClick={() => { setEdit(true); setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
							<span><Edit /></span>
							<span>{t("Edit")}</span>
						</a>
					</li>
					<li className="!p-0">
						<a onClick={() => {
							Toast.confirmDelete(() => {
								dispatch(DeleteCustomfield(item._id, () => {
									Toast.success(t("Asset Type deleted successfully"))
								}))
							}, t)
						}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
							<span><Trash /></span>
							<span>{t("Delete")}</span>
						</a>
					</li>
				</ul>
			</DropDown>
		},
		{
			Sr: '3',
			Question: <span className="text-start block">{t('How do you ensure that your designs are user-centered and meet the needs of the target audience?')}</span>,
			OptionA: <span className="whitespace-nowrap">{t('Design Facilities')}</span>,
			OptionB: <span className="whitespace-nowrap">{t('Design Facilities')}</span>,
			OptionC: <span className="whitespace-nowrap">{t('Lack of portability')}</span>,
			OptionD: <span className="whitespace-nowrap">{t('Inability to perform')}</span>,
			CorrectAns: 'A', 
			action: <DropDown icon={<ThreeDotsVertical />}>
				<ul className="zt-themeDropDownList zt-sm gap-4">
					<li className="!p-0">
						<a onClick={() => { setEdit(true); setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
							<span><Edit /></span>
							<span>{t("Edit")}</span>
						</a>
					</li>
					<li className="!p-0">
						<a onClick={() => {
							Toast.confirmDelete(() => {
								dispatch(DeleteCustomfield(item._id, () => {
									Toast.success(t("Asset Type deleted successfully"))
								}))
							}, t)
						}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
							<span><Trash /></span>
							<span>{t("Delete")}</span>
						</a>
					</li>
				</ul>
			</DropDown>
		},
		{
			Sr: '4',
			Question: <span className="text-start block">{t('Can you discuss a time when you had to incorporate user feedback into your designs?')}</span>,
			OptionA: <span className="whitespace-nowrap">{t('Design Facilities')}</span>,
			OptionB: <span className="whitespace-nowrap">{t('Design Facilities')}</span>,
			OptionC: <span className="whitespace-nowrap">{t('Lack of portability')}</span>,
			OptionD: <span className="whitespace-nowrap">{t('Inability to perform')}</span>,
			CorrectAns: 'A', 
			action: <DropDown icon={<ThreeDotsVertical />}>
				<ul className="zt-themeDropDownList zt-sm gap-4">
					<li className="!p-0">
						<a onClick={() => { setEdit(true); setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
							<span><Edit /></span>
							<span>{t("Edit")}</span>
						</a>
					</li>
					<li className="!p-0">
						<a onClick={() => {
							Toast.confirmDelete(() => {
								dispatch(DeleteCustomfield(item._id, () => {
									Toast.success(t("Asset Type deleted successfully"))
								}))
							}, t)
						}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
							<span><Trash /></span>
							<span>{t("Delete")}</span>
						</a>
					</li>
				</ul>
			</DropDown>
		},
		{
			Sr: '5',
			Question: <span className="text-start block">{t('What techniques do you use to stay updated with the latest UI/UX trends and best practices?')}</span>,
			OptionA: <span className="whitespace-nowrap">{t('Design Facilities')}</span>,
			OptionB: <span className="whitespace-nowrap">{t('Design Facilities')}</span>,
			OptionC: <span className="whitespace-nowrap">{t('Lack of portability')}</span>,
			OptionD: <span className="whitespace-nowrap">{t('Inability to perform')}</span>,
			CorrectAns: 'A', 
			action: <DropDown icon={<ThreeDotsVertical />}>
				<ul className="zt-themeDropDownList zt-sm gap-4">
					<li className="!p-0">
						<a onClick={() => { setEdit(true); setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
							<span><Edit /></span>
							<span>{t("Edit")}</span>
						</a>
					</li>
					<li className="!p-0">
						<a onClick={() => {
							Toast.confirmDelete(() => {
								dispatch(DeleteCustomfield(item._id, () => {
									Toast.success(t("Asset Type deleted successfully"))
								}))
							}, t)
						}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
							<span><Trash /></span>
							<span>{t("Delete")}</span>
						</a>
					</li>
				</ul>
			</DropDown>
		},
		{
			Sr: '6',
			Question: <span className="text-start block">{t('Have you ever worked in a cross-functional team environment?')}</span>,
			OptionA: <span className="whitespace-nowrap">{t('Design Facilities')}</span>,
			OptionB: <span className="whitespace-nowrap">{t('Design Facilities')}</span>,
			OptionC: <span className="whitespace-nowrap">{t('Lack of portability')}</span>,
			OptionD: <span className="whitespace-nowrap">{t('Inability to perform')}</span>,
			CorrectAns: 'A', 
			action: <DropDown icon={<ThreeDotsVertical />}>
				<ul className="zt-themeDropDownList zt-sm gap-4">
					<li className="!p-0">
						<a onClick={() => { setEdit(true); setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
							<span><Edit /></span>
							<span>{t("Edit")}</span>
						</a>
					</li>
					<li className="!p-0">
						<a onClick={() => {
							Toast.confirmDelete(() => {
								dispatch(DeleteCustomfield(item._id, () => {
									Toast.success(t("Asset Type deleted successfully"))
								}))
							}, t)
						}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
							<span><Trash /></span>
							<span>{t("Delete")}</span>
						</a>
					</li>
				</ul>
			</DropDown>
		},
		{
			Sr: '7',
			Question: <span className="text-start block">{t('How do you approach accessibility in your designs?')}</span>,
			OptionA: <span className="whitespace-nowrap">{t('Design Facilities')}</span>,
			OptionB: <span className="whitespace-nowrap">{t('Design Facilities')}</span>,
			OptionC: <span className="whitespace-nowrap">{t('Lack of portability')}</span>,
			OptionD: <span className="whitespace-nowrap">{t('Inability to perform')}</span>,
			CorrectAns: 'A', 
			action: <DropDown icon={<ThreeDotsVertical />}>
				<ul className="zt-themeDropDownList zt-sm gap-4">
					<li className="!p-0">
						<a onClick={() => { setEdit(true); setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
							<span><Edit /></span>
							<span>{t("Edit")}</span>
						</a>
					</li>
					<li className="!p-0">
						<a onClick={() => {
							Toast.confirmDelete(() => {
								dispatch(DeleteCustomfield(item._id, () => {
									Toast.success(t("Asset Type deleted successfully"))
								}))
							}, t)
						}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
							<span><Trash /></span>
							<span>{t("Delete")}</span>
						</a>
					</li>
				</ul>
			</DropDown>
		},
		{
			Sr: '8',
			Question: <span className="text-start block">{t('What steps do you take to ensure that your designs are inclusive and accessible to all users?')}</span>,
			OptionA: <span className="whitespace-nowrap">{t('Design Facilities')}</span>,
			OptionB: <span className="whitespace-nowrap">{t('Design Facilities')}</span>,
			OptionC: <span className="whitespace-nowrap">{t('Lack of portability')}</span>,
			OptionD: <span className="whitespace-nowrap">{t('Inability to perform')}</span>,
			CorrectAns: 'A', 
			action: <DropDown icon={<ThreeDotsVertical />}>
				<ul className="zt-themeDropDownList zt-sm gap-4">
					<li className="!p-0">
						<a onClick={() => { setEdit(true); setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
							<span><Edit /></span>
							<span>{t("Edit")}</span>
						</a>
					</li>
					<li className="!p-0">
						<a onClick={() => {
							Toast.confirmDelete(() => {
								dispatch(DeleteCustomfield(item._id, () => {
									Toast.success(t("Asset Type deleted successfully"))
								}))
							}, t)
						}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
							<span><Trash /></span>
							<span>{t("Delete")}</span>
						</a>
					</li>
				</ul>
			</DropDown>
		},
	]
	return (
		<section className="flex flex-col grow">
			{/* {is_loading && <PageLoader/>} */}
			<div className="flex justify-between pb-6">
				<div className="flex flex-col">
					<h1 className="text-h4 mb-0">{t("Recruitment")}</h1> 
				</div> 
			</div>
			<div className="zt-card grow">
				<h2 className="text-lg">{t("Employee Evaluation")}</h2>
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
			{create && <AddJob
                title={t('Job')}
                onClose={() => { setCreate(false) }}
            />}
		</section>
	)
}