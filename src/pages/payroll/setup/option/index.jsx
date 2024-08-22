import { Button, SearchSelect } from "@/components/elements"; 
import ImageUpload from "@/components/elements/ImadeUploader";
import PayrollSetupForm from "@/components/forms/payRoll/payrollSetup/create";
import FilterArea from "@/components/includes/FilterArea";
import { Minus, Plus } from "@/components/svg";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function PayRollOptionsPage() {
	const { t } = useTranslation()
	const [payrollSetup, setPayrollSetup] = useState(false) 
	const { customfield_list } = useSelector(state => state.customfield)

	const [filters, setFilters] = useState({
		search: "",
		project: null,
		department: null,
		status: null,
	})
	const filterElements = [

		{
			type: "select",
			name: "General",
			placeholder: "General",
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
	return (
		<section className="flex flex-col grow">
			{/* {is_loading && <PageLoader/>} */}
			<div className="flex justify-between pb-6">
				<div className="flex flex-col">
					<h1 className="text-h4 mb-0">{t("Payroll Setup")}</h1>
				</div>
				<div className="flex items-start gap-2">
					<Button onClick={() => { setPayrollSetup(true) }} className={"btn btn-primary"}>{t("Add Payroll Setup")}</Button>
				</div>
			</div>

			<div className="zt-card grow">
				<FilterArea
					elements={filterElements}
					filters={filters}
					setFilters={setFilters}
				/>
				<h2 className="text-lg font-bold">{t("Options")}</h2>
				<div className="grid grid-cols-2 gap-6 mb-6">
					<SearchSelect label={'No Of Days To Delete Payroll'} list={[{ display: "30", value: "30" }, { display: "20", value: "20" }]} />
					<SearchSelect label={'No Of Days To Un Disbursed Payroll'} list={[{ display: "30", value: "30" }, { display: "20", value: "20" }]} />
					<SearchSelect label={"Employee's Per Day Salary Calculation Method"} list={[{ display: "Monthly Gross salary / Fixed Salary", value: "Monthly Gross salary / Fixed Salary" }]} />
					<SearchSelect label={'Days'} list={[{ display: "Bank Central Asia", value: "Bank Central Asia" }]} />
					<SearchSelect label={'Pro-Rata Salary Calculation Method'} list={[{ display: "Based On Total Monthly Salary", value: "Based On Total Monthly Salary" }]} />
				</div>
				<h2 className="text-lg font-bold">{t("Payslip Options")}</h2>
				<div className="grid grid-cols-2 gap-6 mb-6">
					<SearchSelect label={'Payslip Format'} list={[{ display: "Standard Format", value: "Standard Format" }]} />
					<SearchSelect label={'Show leave Balance'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
					<SearchSelect label={'Add Signature area at bottom'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
					<SearchSelect label={'Show Date Range'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
					<SearchSelect label={'Show PF Contribution'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
					<SearchSelect label={'Show VPS Contribution'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
					<SearchSelect label={'Loan Type Wise'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
					<SearchSelect label={'PaySlip Signature Count'} list={[{ display: "1", value: "1" }, { display: "2", value: "2" }]} />
					<SearchSelect label={'Signature One'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
					<SearchSelect label={'Show Autogenerate Signature'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
					<SearchSelect label={'Payslip Footer'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
					<SearchSelect label={'Show Autogenerate Signature'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
				</div>
				<ImageUpload label={'Upload Logo'} />
				<h2 className="text-lg font-bold mt-6">{t("Payroll Summary Options")}</h2>
				<div className="grid grid-cols-2 gap-6 mb-6">
					<div className="zt-formGroup">
						<span className="text-sm">{t("Number of Signatures")}</span>
						<div className="flex items-center max-h-12 justify-between zt-themeInput">
							<Button className={'btn btn-gray !p-2'}><Minus /></Button>
							<span>1</span>
							<Button className={'btn btn-gray !p-2'}><Plus className='h-4 w-4'/></Button>
						</div>
					</div>
					<SearchSelect label={'No Of Days To Delete Payroll'} list={[{ display: "30", value: "30" }, { display: "20", value: "20" }]} />
				</div>
			</div>
			{payrollSetup && <PayrollSetupForm onClose={() => setPayrollSetup(false)} />}
		</section>
	)
}