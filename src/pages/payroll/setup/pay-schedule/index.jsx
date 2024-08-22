import { Button, SearchSelect } from "@/components/elements";
import PayrollSetupForm from "@/components/forms/payRoll/payrollSetup/create";
import FilterArea from "@/components/includes/FilterArea";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function PaySchedulePage() {
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
				<h2 className="text-lg font-bold">{t("Pay Schedule")}</h2>
				<div className="grid grid-cols-2 gap-6">
					<SearchSelect label={'Pay Schedule'} list={[{display:"Monthly",value:"Monthly"},{display:"Yearly",value:"Yearly"}]}/>
					<SearchSelect label={'Month Start Day'} list={[{display:"First Day Of Every Month",value:"First Day Of Every Month"},{display:"Second Day Of Every Month",value:"Second Day Of Every Month"}]}/>
					<SearchSelect label={'Month End Day'} list={[{display:"Last Day Of Every Month",value:"Last Day Of Every Month"},{display:"Second Last Day Of Every Month",value:"Second Last Day Of Every Month"}]}/>
				</div>
			</div>
			{payrollSetup && <PayrollSetupForm onClose={() => setPayrollSetup(false)} />}
		</section>
	)
}