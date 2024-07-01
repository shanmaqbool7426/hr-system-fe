
import DefaultLayout from "@/layouts/DefaultLayout"
import { useTranslation } from "next-i18next";
import ls from 'localstorage-slim';
import { Button, DropDown, Table } from "@/components/elements";
import { useState } from "react";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import AddJob from "@/components/forms/organization/jobs/AddJob";



export default function ManageResumePage() {
	const { t } = useTranslation()
	const [create, setCreate] = useState(false)
	const [sortCol, setSortCol] = useState(null)
	const [sortDir, setSortDir] = useState(null)
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(10)
	const headings = [
		{ title: t("Job Title"), col: "JobTitle", /* sort: true */ },
		{ title: t("Departments"), col: "departments", /* sort: true */ },
		{ title: t("Start Date"), col: "StartDate", /* sort: true */ },
		{ title: t("Expire Date"), col: "ExpireDate" },
		{ title: t("Job Types"), col: "JobTypes" },
		{ title: t("Status"), col: "Status" },
		{ title: t("Applicant"), col: "Applicant" },
		{ title: t("Action"), col: "action" }
	]

	const rows = [
		{
			JobTitle: 'Manager',
			departments: 'Outdoors',
			StartDate: '12 May 2024',
			ExpireDate: '12 May 2024',
			JobTypes: <span className="zt-tag zt-tag-success !rounded-lg">{t("Full Time")}</span>,
			Status: <span className="zt-tag zt-tag-danger !rounded-lg">{t("Close")}</span>,
			Applicant: <Button type="button" variant={'purple'} className={'!py-1 !px-4'}>
				{t('3 Candidates')}
			</Button>,
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
			JobTitle: 'Orchestrator',
			departments: 'Tools',
			StartDate: '12 May 2024',
			ExpireDate: '12 May 2024',
			JobTypes: <span className="zt-tag zt-tag-danger !rounded-lg">{t("Part Time")}</span>,
			Status: <span className="zt-tag zt-tag-success !rounded-lg">{t("Open")}</span>,
			Applicant: <Button type="button" variant={'purple'} className={'!py-1 !px-4'}>
				{t('3 Candidates')}
			</Button>,
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
			JobTitle: 'Developer',
			departments: 'Home',
			StartDate: '12 May 2024',
			ExpireDate: '12 May 2024',
			JobTypes: <span className="zt-tag zt-tag-warning !rounded-lg">{t("Contract")}</span>,
			Status: <span className="zt-tag zt-tag-success !rounded-lg">{t("Open")}</span>,
			Applicant: <Button type="button" variant={'purple'} className={'!py-1 !px-4'}>
				{t('3 Candidates')}
			</Button>,
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
			JobTitle: 'Manager',
			departments: 'Outdoors',
			StartDate: '12 May 2024',
			ExpireDate: '12 May 2024',
			JobTypes: <span className="zt-tag zt-tag-success !rounded-lg">{t("Full Time")}</span>,
			Status: <span className="zt-tag zt-tag-danger !rounded-lg">{t("Close")}</span>,
			Applicant: <Button type="button" variant={'purple'} className={'!py-1 !px-4'}>
				{t('3 Candidates')}
			</Button>,
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
			JobTitle: 'Orchestrator',
			departments: 'Tools',
			StartDate: '12 May 2024',
			ExpireDate: '12 May 2024',
			JobTypes: <span className="zt-tag zt-tag-danger !rounded-lg">{t("Part Time")}</span>,
			Status: <span className="zt-tag zt-tag-success !rounded-lg">{t("Open")}</span>,
			Applicant: <Button type="button" variant={'purple'} className={'!py-1 !px-4'}>
				{t('3 Candidates')}
			</Button>,
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
			JobTitle: 'Developer',
			departments: 'Home',
			StartDate: '12 May 2024',
			ExpireDate: '12 May 2024',
			JobTypes: <span className="zt-tag zt-tag-warning !rounded-lg">{t("Contract")}</span>,
			Status: <span className="zt-tag zt-tag-success !rounded-lg">{t("Open")}</span>,
			Applicant: <Button type="button" variant={'purple'} className={'!py-1 !px-4'}>
				{t('3 Candidates')}
			</Button>,
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
				<h2 className="text-lg">{t("Manage Resume")}</h2>
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