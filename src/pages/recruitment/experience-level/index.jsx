import LandingPage from "@/layouts/LandingPage"
import DefaultLayout from "@/layouts/DefaultLayout"
import { useTranslation } from "next-i18next";
import ls from 'localstorage-slim';
import { Button, DropDown, Table } from "@/components/elements";
import { useState } from "react";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import AddJob from "@/components/forms/organization/jobs/AddJob";

const user = ls?.get('auth_user', { decrypt: true })
const Layout = user ? DefaultLayout : LandingPage

export default function ExperienceLevelPage() {
	const { t } = useTranslation()
	const [create, setCreate] = useState(false)
	const [sortCol, setSortCol] = useState(null)
	const [sortDir, setSortDir] = useState(null)
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(10)
	const headings = [
		{ title: t("S#"), col: "Sr", },
		{ title: t("Experience"), col: "Experience" },
		{ title: t("Status"), col: "Status", },
		{ title: t("Action"), col: "action" }
	]

	const rows = [
		{
			Sr: '1',
			Experience: '1-2 Years',
			Status: <span className="zt-tag zt-tag-success !rounded-md">{t("Active")}</span>,
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
			Experience: '1-2 Years',
			Status: <span className="zt-tag zt-tag-danger !rounded-md">{t("Unactive")}</span>,
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
			Experience: '1-2 Years',
			Status: <span className="zt-tag zt-tag-success !rounded-md">{t("Active")}</span>,
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
			Experience: '1-2 Years',
			Status: <span className="zt-tag zt-tag-danger !rounded-md">{t("Unactive")}</span>,
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
			Experience: '1-2 Years',
			Status: <span className="zt-tag zt-tag-danger !rounded-md">{t("Unactive")}</span>,
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
			Experience: '1-2 Years',
			Status: <span className="zt-tag zt-tag-danger !rounded-md">{t("Unactive")}</span>,
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
			Experience: '1-2 Years',
			Status: <span className="zt-tag zt-tag-success !rounded-md">{t("Active")}</span>,
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
			Experience: '1-2 Years',
			Status: <span className="zt-tag zt-tag-success !rounded-md">{t("Active")}</span>,
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
				<h2 className="text-lg">{t("Experience Level")}</h2>
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