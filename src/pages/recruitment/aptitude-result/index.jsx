import { Button, DropDown, Table } from "@/components/elements";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useState } from "react";
// import { Button } from "@/components/elements";

export default function ApptitudeResultPage() {
	const { t } = useTranslation()
	const [sortCol, setSortCol] = useState(null)
	const [sortDir, setSortDir] = useState(null)
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(10)
	const headings = [
		{ title: t("Name"), col: "name", },
		{ title: t("Job Title"), col: "jobTitle", },
		{ title: t("Departments"), col: "Departments", },
		{ title: t("Category Wise Mark"), col: "CategoryWiseMark", },
		{ title: t("Total Mark"), col: "TotalMark" },
		{ title: t("Status"), col: "Status" },
		{ title: t("Action"), col: "action" }
	]

	const rows = [
		{
			name: <div className="flex items-center justify-start gap-3 grow">
				<figure className={'overflow-hidden rounded-full shrink-0'}>
					<Image src={'/assets/images/users/user-01.jpg'} height={24} width={24} alt="Profile" />
				</figure>
				<strong className={'text-themeGrayscale900 text-xs'}>{t('Kelli Lebsack')}</strong>
			</div>,
			jobTitle: 'Manager',
			Departments: 'Outdoors',
			CategoryWiseMark: <div className="flex flex-col text-sm items-center">
				<span>{t("Design System = 1")}</span>
				<span>{t("Landing Page Design = 1")}</span>
			</div>,
			TotalMark: '1',
			Status: <span className='zt-tag zt-tag-success !rounded-md'>Resume Selected</span>,
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
			name: <div className="flex items-center justify-start gap-3 grow">
				<figure className={'overflow-hidden rounded-full shrink-0'}>
					<Image src={'/assets/images/users/user-01.jpg'} height={24} width={24} alt="Profile" />
				</figure>
				<strong className={'text-themeGrayscale900 text-xs'}>{t('Gertrude Kuphal')}</strong>
			</div>,
			jobTitle: 'Manager',
			Departments: 'Outdoors',
			CategoryWiseMark: <div className="flex flex-col text-sm items-center">
				<span>{t("Design System = 1")}</span>
				<span>{t("Landing Page Design = 1")}</span>
			</div>,
			TotalMark: '1',
			Status: <span className='zt-tag zt-tag-danger !rounded-md'>Resume Rejected</span>,
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
			name: <div className="flex items-center justify-start gap-3 grow">
				<figure className={'overflow-hidden rounded-full shrink-0'}>
					<Image src={'/assets/images/users/user-01.jpg'} height={24} width={24} alt="Profile" />
				</figure>
				<strong className={'text-themeGrayscale900 text-xs'}>{t('Ms. Clayton Grant')}</strong>
			</div>,
			jobTitle: 'Manager',
			Departments: 'Outdoors',
			CategoryWiseMark: <div className="flex flex-col text-sm items-center">
				<span>{t("Design System = 1")}</span>
				<span>{t("Landing Page Design = 1")}</span>
			</div>,
			TotalMark: '1',
			Status: <span className='zt-tag zt-tag-warning !rounded-md'>Aptitude Selected</span>,
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
			name: <div className="flex items-center justify-start gap-3 grow">
				<figure className={'overflow-hidden rounded-full shrink-0'}>
					<Image src={'/assets/images/users/user-01.jpg'} height={24} width={24} alt="Profile" />
				</figure>
				<strong className={'text-themeGrayscale900 text-xs'}>{t('Ms. Clayton Grant')}</strong>
			</div>,
			jobTitle: 'Manager',
			Departments: 'Outdoors',
			CategoryWiseMark: <div className="flex flex-col text-sm items-center">
				<span>{t("Design System = 1")}</span>
				<span>{t("Landing Page Design = 1")}</span>
			</div>,
			TotalMark: '1',
			Status: <span className='zt-tag zt-tag-danger !rounded-md'>Aptitude Rejected</span>,
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
				<h2 className="text-lg">{t("Aptitude Result")}</h2>
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