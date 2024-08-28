import { Button, Table } from '@/components/elements'
import StatusSelect from '@/components/elements/SelectStatus'
import SendEmailForm from '@/components/forms/payRoll/runPayroll/sendEmail'
import FilterArea from '@/components/includes/FilterArea'
import { ChevronDown } from '@/components/svg'
import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

export default function RunPayrollPage() {
	const { t } = useTranslation()
	const [sortCol, setSortCol] = useState(null)
	const [sortDir, setSortDir] = useState(null)
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(10)
	const [create, setcreate] = useState(false)
	const [send, setSend] = useState(false)
	const { customfield_list } = useSelector(state => state.customfield)
	const [filters, setFilters] = useState({
		search: "",
		project: null,
		department: null,
		status: null,
	})
	const pagination = {
		totalRecords: 5,
		showPerPage: true,
		prevAction: () => page > 1 && setPage(page - 1),
		clickAction: (value) => setPage(value),
		nextAction: () => setPage(page + 1),
	}
	const months = [
		{ display: 'January 2024', value: "January 2024" },
		{ display: 'February 2024', value: "February 2024" },
		{ display: 'March 2024', value: "March 2024" },
		{ display: 'April 2024', value: "April 2024" },
		{ display: 'May 2024', value: "May 2024" },
		{ display: 'June 2024', value: "June 2024" },
		{ display: 'July 2024', value: "July 2024" },
		{ display: 'August 2024', value: "August 2024" },
		{ display: 'September 2024', value: "September 2024" },
		{ display: 'October 2024', value: "October 2024" },
		{ display: 'November 2024', value: "November 2024" },
		{ display: 'December 2024', value: "December 2024" },
	]
	const filterElements = [
		{
			type: "search",
			name: "search",
			value: filters.search,
			placeholder: t("Search employee"),
			onChange: (event) => {
				let _filter = { ...filters }
				_filter['search'] = event.target.value
				setFilters(_filter)
			}
		},
		{
			type: "select",
			name: "year",
			placeholder: "Select Year",
			value: filters.status,
			list: [{ dislay: "2024", value: "2024" }],
		},
		{
			type: "select",
			placeholder: "Select Month",
			name: "month",
			value: filters.month,
			list: months,
			onChange: (month) => {
				let _filter = { ...filters }
				_filter['month'] = month
				setFilters(_filter)
			}
		},
		{
			type: "select",
			placeholder: "Station",
			name: "Station",
			value: filters.status,
			list: customfield_list.filter(item => item.type === 'employee_status').map(item => {
				return { value: item._id, display: item.name }
			}),
			onChange: (status) => {
				let _filter = { ...filters }
				_filter['status'] = status
				setFilters(_filter)
			}
		},
		{
			type: "select",
			placeholder: "Payslip Period",
			name: "payslipPeriod",
			value: filters.status,
			list: [{ display: "Monthly", value: "Monthly" }]
		},
	]

	const headings = [
		{ title: t("Employee"), col: "Employee" },
		{ title: t("Employee Details"), col: "EmployeeDetails" },
		{ title: t("Payroll Setup"), col: "PayrollSetup", },
		{ title: t("Payslip Month"), col: "PayslipMonth", },
		{ title: t("Gross Salary"), col: "view", },
		{ title: t("Deductions"), col: "Deductions", },
		{ title: t("Modified On"), col: "ModifiedOn" },
		{ title: t("Status"), col: "Status" },
		{ title: t("Action"), col: "action" }
	]
	const options = [
		{ value: 'primary', label: 'Save', className: 'zt-tag-primary' },
		{ value: 'secondary', label: 'Disburse', className: 'zt-tag-secondary' },
		{ value: 'success', label: 'Approved', className: 'zt-tag-success' },
		{ value: 'danger', label: 'Rejected', className: 'zt-tag-danger' },
		{ value: 'purple', label: 'Pending', className: 'zt-tag-purple' },
	];

	const item = { status: 'success' };
	const rows = [
		{
			Employee: <div className="flex  items-center justify-center gap-3">
				<figure>
					<Image alt="profile" height={32} width={32} src={'/assets/images/users/user-01.jpg'} className="rounded-full" /></figure>
				<div className="flex flex-col">
					<span className="font-semibold">{t("Jhon Carter")}</span>
					<span className="text-themeGrayscale500">{t("10202325")}</span>
				</div>
			</div>,
			EmployeeDetails: <div className='flex gap-4 justify-center'>
				<div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Station')}</span> <span>{t('Departement')}</span></div>
				<div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('Canda')}</span> <span>{t('Design')}</span></div>
			</div>,
			PayrollSetup: 'Management',
			PayslipMonth: 'August 2024',
			view: <button className='flex'>$1200 <ChevronDown /></button>,
			discloureContent: <div className='grid custom__grid gap-8'>
				<div className='flex  flex-col justify-between'>
					<div className='flex flex-col gap-1'>
						<span className='font-bold text-lg text-start'>{t("Earning")}</span>
						<div className='flex justify-between'>
							<span>{t("Basic Salary")}</span>
							<span>{t("162.00")}</span>
						</div>
						<div className='flex justify-between'>
							<span>{t("Medical")}</span>
							<span>{t("18.00")}</span>
						</div>
					</div>
					<div className='flex justify-between border-t'>
						<span>{t("Total")}</span>
						<span>{t("200.00")}</span>
					</div>
				</div>
				<div className='flex flex-col justify-between'>
					<span className='font-bold text-lg text-start'>{t("Deduction")}</span>
					<div className='flex justify-between'>
						<span>{t("Loan")}</span>
						<span>{t("162.00")}</span>
					</div>
					<div className='flex justify-between'>
						<span>{t("Tax")}</span>
						<span>{t("18.00")}</span>
					</div>
					<div className='flex justify-between'>
						<span>{t("Penalty(1000.00 x 1 (1 Late))")}</span>
						<span>{t("1000")}</span>
					</div>
					<div className='flex justify-between'>
						<span>{t("EOBI")}</span>
						<span>{t("370")}</span>
					</div>
					<div className='flex justify-between'>
						<span>{t("Absent Deduction (12.00 Days)")}</span>
						<span>{t("370")}</span>
					</div>
					<div className='flex justify-between border-t'>
						<span>{t("Total")}</span>
						<span>{t("200.00")}</span>
					</div>
				</div>
				<div className='flex  flex-col justify-between'>
					<div className='flex flex-col gap-1'>
						<span className='font-bold text-lg text-start'>{t("Others")}</span>
						<div className='flex justify-between'>
							<span>{t("Employee PF ")}</span>
							<span>{t(" 125000")}</span>
						</div>
						<div className='flex justify-between'>
							<span>{t("Employer PF ")}</span>
							<span>{t(" 125000")}</span>
						</div>
					</div>
					<div className='flex justify-between border-t'>
						<span>{t("Home Loan")}</span>
						<span>{t("200.00")}</span>
					</div>
				</div>
			</div>,
			Deductions: '$1200',
			Status: <span className='zt-tag zt-tag-purple'>{t('Pending')}</span>,
			ModifiedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
				<span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
			</div></div>,
			action: <StatusSelect item={item} options={options} />,
		},
	]

	return (
		<section className="flex flex-col grow">
			{/* {is_loading && <PageLoader/>} */}
			<div className="flex justify-between pb-6">
				<h1 className="text-h4 mb-0">{t("Run Payroll")}</h1>
				<div className="flex items-start gap-2">
					<Button onClick={() => setSend(true)} className={"btn btn-dark-outline"}>{t("Send Payroll Email")}</Button>
					<Button onClick={() => { setcreate(true) }} className={"btn btn-primary"}>{t("Run Payroll")}</Button>
				</div>
			</div>
			<div className="zt-card grow">
				<FilterArea
					elements={filterElements}
					filters={filters}
					setFilters={setFilters}
				/>
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
					className={'zt-employeeTable zt-payrollTable'}
				/>
			</div>
			{send && <SendEmailForm onClose={() => { setSend(false) }} />}
		</section>
	)
}