import { DropDown, Table } from '@/components/elements'
import ApplyPaneltyForm from '@/components/forms/attendance/applyPanelty'
import AttendanceRepostForm from '@/components/forms/attendance/repostAttendance'
import { Edit, ExitIcon, ThreeDotsVertical } from '@/components/svg'
import Toast from '@/util/toast'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function MonthClose() {
	const { t } = useTranslation()
	const [sortCol, setSortCol] = useState(null)
	const [sortDir, setSortDir] = useState(null)
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(10)
	const [amend, setAmend] = useState(false)
	const [panelty, setPanelty] = useState(false)
	const [edit, setEdit] = useState(false)

	const pagination = {
		totalRecords: 5,
		showPerPage: true,
		prevAction: () => page > 1 && setPage(page - 1),
		clickAction: (value) => setPage(value),
		nextAction: () => setPage(page + 1),
	}
	const headings = [
		{ title: t("Employee"), col: "Employee", },
		{ title: t("Employee Details"), col: "EmployeeDetails" },
		{ title: t("Payroll Setup"), col: "PayrollSetup", },
		{ title: t("Payslip Period"), col: "PayslipPeriod", },
		{ title: t("Added On"), col: "AddedOn" },
		{ title: t("Action"), col: "action" }
	]
	const rows = [
		{
			Employee: <div className="flex items-center justify-center gap-4 grow">
				<div className={'flex flex-col gap-1 text-left'}>
					<strong className={'text-themeGrayscale text-sm'}>{t('Kelli Lebsack')}</strong>
					<span className={'text-themeGrayscale500 '}>{t('10202325')}</span>
				</div>
			</div>,
			EmployeeDetails: <div className='flex gap-4  justify-center'>
				<div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Station')}</span> <span>{t('Departement')}</span></div>
				<div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('Canda')}</span> <span>{t('Design')}</span></div>
			</div>,
			PayrollSetup: "Management",
			PayslipPeriod: <div className='flex gap-4  justify-center'>
				<div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Start Date')}</span> <span>{t('End Date')}</span></div>
				<div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('03 May 2024')}</span> <span>{t('30 May 2024')}</span></div>
			</div>,
			AddedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
				<span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
			</div></div>,
			action:
				<DropDown icon={<ThreeDotsVertical />}>
					<ul className="zt-themeDropDownList zt-sm gap-4">
						<li className="!p-0">
							<a onClick={() => {
								Toast.dynamicTitle(() => {
									Toast.success(t("Payroll deleted successfully"))
								}, t, 'Do you want to delete payroll of Kelli Lebsack?')
							}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
								<span><ExitIcon /></span>
								<span>{t("Rollback")}</span>
							</a>
						</li>
					</ul>
				</DropDown>,
		},
		{
			Employee: <div className="flex items-center justify-center gap-4 grow">
				<div className={'flex flex-col gap-1 text-left'}>
					<strong className={'text-themeGrayscale text-sm'}>{t('Kelli Lebsack')}</strong>
					<span className={'text-themeGrayscale500 '}>{t('10202325')}</span>
				</div>
			</div>,
			EmployeeDetails: <div className='flex gap-4  justify-center'>
				<div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Station')}</span> <span>{t('Departement')}</span></div>
				<div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('Canda')}</span> <span>{t('Design')}</span></div>
			</div>,
			PayrollSetup: "Employee",
			PayslipPeriod: <div className='flex gap-4  justify-center'>
				<div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Start Date')}</span> <span>{t('End Date')}</span></div>
				<div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('03 May 2024')}</span> <span>{t('30 May 2024')}</span></div>
			</div>,
			AddedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
				<span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
			</div></div>,
			action:
				<DropDown icon={<ThreeDotsVertical />}>
					<ul className="zt-themeDropDownList zt-sm gap-4">
						<li className="!p-0">
							<a onClick={() => {
								Toast.dynamicTitle(() => {
									Toast.success(t("Payroll deleted successfully"))
								}, t, 'Do you want to delete payroll of Kelli Lebsack?')
							}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
								<span><ExitIcon /></span>
								<span>{t("Rollback")}</span>
							</a>
						</li>
					</ul>
				</DropDown>,
		},
	]

	return (
		<section className="flex flex-col grow">
			{/* {is_loading && <PageLoader/>} */}
			<div className="flex justify-between pb-6">
				<h1 className="text-h4 mb-0">{t("Month Close")}</h1>
			</div>
			<div className="zt-card grow">
				<Table
					headings={headings}
					rows={rows}
					sortCol={sortCol}
					setSortCol={setSortCol}
					sortDir={sortDir}
					pagination={pagination}
					setSortDir={setSortDir}
					perPage={perPage}
					setPerPage={setPerPage}
					page={page}
					setPage={setPage}
					className={'zt-employeeTable zt-amendAttendanceTable'}
				/>
			</div>
			{amend && <AttendanceRepostForm
				onClose={() => { setAmend(false); setEdit(null) }}
				object={edit}
			/>}
			{panelty && <ApplyPaneltyForm
				onClose={() => { setPanelty(false); setEdit(null) }}
				object={edit}
			/>}
		</section>
	)
}