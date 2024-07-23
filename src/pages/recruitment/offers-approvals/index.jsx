import { Button, CheckBox, DropDown, Table } from "@/components/elements";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useState } from "react";
// import { Button } from "@/components/elements";

export default function OffersPage() {
	const { t } = useTranslation()
	const [sortCol, setSortCol] = useState(null)
	const [sortDir, setSortDir] = useState(null)
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(10)
	const headings = [
		
		{ title: t("Name"), col: "name", /* sort: true */ },
		{ title: t("Job Title"), col: "jobTitle", className: "" },
		{ title: t("Job Type"), col: "JobType", /* sort: true */ },
		{ title: t("Pay"), col: "Pay", /* sort: true */ },
		{ title: t("Annual IP"), col: "AnnualIP" },
		{ title: t("Long Term IP"), col: "LongTermIP" },
		{ title: t("Status"), col: "Status" },
		{ title: t("Action"), col: "action" }
	]

	const rows = [
		{
			
			name: <div className="flex items-center justify-center gap-3 grow">
				<figure className={'overflow-hidden rounded-full shrink-0'}>
					<Image src={'/assets/images/users/user-01.jpg'} height={24} width={24} alt="Profile" />
				</figure>
				<div className={'flex flex-col text-left'}>
					<strong className={'text-themeGrayscale900 text-xs'}>{t('Kelli Lebsack')}</strong>
					<span className={'text-themeGrayscale500 text-xs'}>{t('Designer')}</span>
				</div>
			</div>,
			jobTitle: 'Manager',
			JobType: 'Permanent',
			Pay: '$ 2500',
			AnnualIP: '15 %',
			LongTermIP: 'No',
			Status: <span className='zt-tag zt-tag-danger'>Rejected</span>,
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
			
			name: <div className="flex items-center justify-center gap-3 grow">
				<figure className={'overflow-hidden rounded-full shrink-0'}>
					<Image src={'/assets/images/users/user-01.jpg'} height={24} width={24} alt="Profile" />
				</figure>
				<div className={'flex flex-col text-left'}>
					<strong className={'text-themeGrayscale900 text-xs'}>{t('Kelli Lebsack')}</strong>
					<span className={'text-themeGrayscale500 text-xs'}>{t('Designer')}</span>
				</div>
			</div>,
			jobTitle: 'Manager',
			JobType: 'Permanent',
			Pay: '$ 2500',
			AnnualIP: '15 %',
			LongTermIP: 'No',
			Status: <span className='zt-tag zt-tag-success'>Approved</span>,
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
			
			name: <div className="flex items-center justify-center gap-3 grow">
				<figure className={'overflow-hidden rounded-full shrink-0'}>
					<Image src={'/assets/images/users/user-01.jpg'} height={24} width={24} alt="Profile" />
				</figure>
				<div className={'flex flex-col text-left'}>
					<strong className={'text-themeGrayscale900 text-xs'}>{t('Kelli Lebsack')}</strong>
					<span className={'text-themeGrayscale500 text-xs'}>{t('Designer')}</span>
				</div>
			</div>,
			jobTitle: 'Manager',
			JobType: 'Permanent',
			Pay: '$ 2500',
			AnnualIP: '15 %',
			LongTermIP: 'No',
			Status: <span className='zt-tag zt-tag-danger'>Rejected</span>,
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
			
			name: <div className="flex items-center justify-center gap-3 grow">
				<figure className={'overflow-hidden rounded-full shrink-0'}>
					<Image src={'/assets/images/users/user-01.jpg'} height={24} width={24} alt="Profile" />
				</figure>
				<div className={'flex flex-col text-left'}>
					<strong className={'text-themeGrayscale900 text-xs'}>{t('Kelli Lebsack')}</strong>
					<span className={'text-themeGrayscale500 text-xs'}>{t('Designer')}</span>
				</div>
			</div>,
			jobTitle: 'Manager',
			JobType: 'Permanent',
			Pay: '$ 2500',
			AnnualIP: '15 %',
			LongTermIP: 'No',
			Status: <span className='zt-tag zt-tag-success'>Approved</span>,
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
					{/* <p className="mb-0">{t("Manage all candidates")}</p> */}
				</div>
			</div>
			<div className="zt-card grow">
				<h2 className="text-lg">{t("Offer Approvals")}</h2>
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