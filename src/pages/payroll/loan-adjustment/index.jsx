import { Button, DropDown, Table } from "@/components/elements";
import StatusSelect from "@/components/elements/SelectStatus";
import BonusForm from "@/components/forms/payRoll/bonus/create";
import LoanApprovalForm from "@/components/forms/payRoll/loan/approve";
import LoanRequestForm from "@/components/forms/payRoll/loan/create";
import ReimbursementRequestForm from "@/components/forms/payRoll/reimbursement/create";
import FilterArea from "@/components/includes/FilterArea";
import { CrossClose, Edit, EyeOn, SuccessTick, ThreeDotsVertical, Trash, WarningIcon } from "@/components/svg";
import Toast from "@/util/toast";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function LoanAdjustmentPage() {
	const { t } = useTranslation()
	const [sortCol, setSortCol] = useState(null)
	const [sortDir, setSortDir] = useState(null)
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(10)
	const [create, setCreate] = useState(false)
	const [approve, setApprove] = useState(false)
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
			className: "xl:col-span-2",
			onChange: (event) => {
				let _filter = { ...filters }
				_filter['search'] = event.target.value
				setFilters(_filter)
			}
		},
		{
			type: "select",
			name: "Request Type",
			placeholder: "Request Type",
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
			placeholder: "Status",
			name: "Status",
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
	]

	const headings = [
		{ title: t("Employee"), col: "Employee" },
		{ title: t("Employee Details"), col: "EmployeeDetails" },
		{ title: t("Title"), col: "Title", },
		{ title: t("Adj  Details"), col: "AdjDetails" },
		{ title: t("Amount Details"), col: "AmountDetails" },
		{ title: t("Status"), col: "Status" },
		{ title: t("Modified On"), col: "ModifiedOn" },
		{ title: t("Action"), col: "action" }
	]
	const options = [
		{ value: 'success', label: 'Approved', className: 'zt-tag-success' },
		{ value: 'danger', label: 'Canceled', className: 'zt-tag-danger' },
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
			AdjDetails: <div className='flex gap-4 justify-center'>
				<div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Type')}</span> <span>{t('Loan Type')}</span></div>
				<div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('Complete Loan')}</span> <span>{t('PF Loan')}</span></div>
			</div>,
			AmountDetails: <div className='flex gap-4 justify-center'>
				<div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Rep Amount')}</span> <span>{t('Loan Amount')}</span></div>
				<div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('$300')}</span> <span>{t('$0')}</span></div>
			</div>,
			Title: "Loan Repayment",
			Status: <StatusSelect item={item} options={options} />,
			ModifiedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
				<span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
			</div></div>,
			action: <DropDown icon={<ThreeDotsVertical />}>
				<ul className="zt-themeDropDownList zt-sm gap-4 w-[123px]">
					<li className="!p-0">
						<a onClick={() => { setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
							<span><EyeOn /></span>
							<span>{t("View")}</span>
						</a>
					</li>
					<li className="!p-0">
						<a onClick={() => setApprove(true)} className={'no-underline flex items-center gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
							<span><SuccessTick /></span>
							<span>{t("Approve")}</span>
						</a>
					</li>
					<li className="!p-0">
						<a onClick={() => {
							Toast.confirmDelete(() => {
								Toast.success(t("Loan Cancel successfully"))
							}, t)
						}} className={'no-underline flex items-center gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
							<span><CrossClose /></span>
							<span>{t("Cancel")}</span>
						</a>
					</li>
				</ul>
			</DropDown>
		},
		{
			Employee: <div className="flex  items-center justify-center gap-3">
				<figure>
					<Image alt="profile" height={32} width={32} src={'/assets/images/users/user-02.jpg'} className="rounded-full" /></figure>
				<div className="flex flex-col">
					<span className="font-semibold">{t("Jhon Carter")}</span>
					<span className="text-themeGrayscale500">{t("10202325")}</span>
				</div>
			</div>,
			EmployeeDetails: <div className='flex gap-4 justify-center'>
				<div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Station')}</span> <span>{t('Departement')}</span></div>
				<div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('Canda')}</span> <span>{t('Design')}</span></div>
			</div>,
			AdjDetails: <div className='flex gap-4 justify-center'>
				<div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Type')}</span> <span>{t('Loan Type')}</span></div>
				<div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('Complete Loan')}</span> <span>{t('PF Loan')}</span></div>
			</div>,
			AmountDetails: <div className='flex gap-4 justify-center'>
				<div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Rep Amount')}</span> <span>{t('Loan Amount')}</span></div>
				<div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('$300')}</span> <span>{t('$0')}</span></div>
			</div>,
			Title: "Loan Repayment",
			Status: <StatusSelect item={item} options={options} />,
			ModifiedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
				<span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
			</div></div>,
			action: <DropDown icon={<ThreeDotsVertical />}>
				<ul className="zt-themeDropDownList zt-sm gap-4 w-[123px]">
					<li className="!p-0">
						<a onClick={() => { setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
							<span><EyeOn /></span>
							<span>{t("View")}</span>
						</a>
					</li>
					<li className="!p-0">
						<a onClick={() => setApprove(true)} className={'no-underline flex items-center gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
							<span><SuccessTick /></span>
							<span>{t("Approve")}</span>
						</a>
					</li>
					<li className="!p-0">
						<a onClick={() => {
							Toast.confirmDelete(() => {
								Toast.success(t("Loan Cancel successfully"))
							}, t)
						}} className={'no-underline flex items-center gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
							<span><CrossClose /></span>
							<span>{t("Cancel")}</span>
						</a>
					</li>
				</ul>
			</DropDown>
		},
		{
			Employee: <div className="flex  items-center justify-center gap-3">
				<figure>
					<Image alt="profile" height={32} width={32} src={'/assets/images/users/user-03.jpg'} className="rounded-full" /></figure>
				<div className="flex flex-col">
					<span className="font-semibold">{t("Jhon Carter")}</span>
					<span className="text-themeGrayscale500">{t("10202325")}</span>
				</div>
			</div>,
			EmployeeDetails: <div className='flex gap-4 justify-center'>
				<div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Station')}</span> <span>{t('Departement')}</span></div>
				<div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('Canda')}</span> <span>{t('Design')}</span></div>
			</div>,
			AdjDetails: <div className='flex gap-4 justify-center'>
				<div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Type')}</span> <span>{t('Loan Type')}</span></div>
				<div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('Complete Loan')}</span> <span>{t('PF Loan')}</span></div>
			</div>,
			AmountDetails: <div className='flex gap-4 justify-center'>
				<div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Rep Amount')}</span> <span>{t('Loan Amount')}</span></div>
				<div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('$300')}</span> <span>{t('$0')}</span></div>
			</div>,
			Title: "Loan Repayment",
			Status: <StatusSelect item={item} options={options} />,
			ModifiedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
				<span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
			</div></div>,
			action: <DropDown icon={<ThreeDotsVertical />}>
				<ul className="zt-themeDropDownList zt-sm gap-4 w-[123px]">
					<li className="!p-0">
						<a onClick={() => { setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
							<span><EyeOn /></span>
							<span>{t("View")}</span>
						</a>
					</li>
					<li className="!p-0">
						<a onClick={() => setApprove(true)} className={'no-underline flex items-center gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
							<span><SuccessTick /></span>
							<span>{t("Approve")}</span>
						</a>
					</li>
					<li className="!p-0">
						<a onClick={() => {
							Toast.confirmDelete(() => {
								Toast.success(t("Loan Cancel successfully"))
							}, t)
						}} className={'no-underline flex items-center gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
							<span><CrossClose /></span>
							<span>{t("Cancel")}</span>
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
					<h1 className="text-h4 mb-0">{t("Loan Adjustment Request")}</h1>
				</div>
				<div className="flex items-start gap-2">
					<Button onClick={() => { setCreate(true) }} className={"btn btn-primary"}>{t("Apply For Loan Adjustment")}</Button>
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
			{create && <LoanRequestForm onClose={() => setCreate(false)} />}
			{approve && <LoanApprovalForm onClose={() => setApprove(false)} />}

		</section>
	)
}