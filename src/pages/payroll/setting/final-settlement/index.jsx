import { Button, Datepicker, SearchSelect, Textarea } from "@/components/elements";
import PayrollSetupForm from "@/components/forms/payRoll/payrollSetup/create";
import FilterArea from "@/components/includes/FilterArea";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function FinalSettlementPage() {
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
                <h2 className="text-lg font-bold">{t("Final Settlement")}</h2>
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <SearchSelect label={'Include PF Deduction of FnF Month?'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Is it Necessary to Serve Notice Period?'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                </div>
                <h2 className="text-lg font-bold">{t("Gratuity")}</h2>
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <SearchSelect label={'Do You Want To Implement Gratuity Policy?'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Gratuity Applicable From'} placeholder={'Start From Joining Date'} list={[{ display: "Start From Joining Date", value: "Start From Joining Date" }]} />
                    <SearchSelect label={'Gratuity Start After Specific Month'} placeholder={'0'} list={[{ display: "0", value: "0" }, { display: "1", value: "1" }]} />
                    <SearchSelect label={'Calculate Gratuity From Beginning'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Gratuity Calculation Method'} placeholder={'Basic Salary'} list={[{ display: "Basic Salary", value: "Basic Salary" }]} />
                    <SearchSelect label={"Employee's Salary Calculation Method"} placeholder={'Monthly Salary / Fixed Day'} list={[{ display: "Monthly Salary / Fixed Day", value: "Monthly Salary / Fixed Day" }]} />
                    <SearchSelect label={'Days'} placeholder={'26'} list={[{ display: "26", value: "26" }]} />
                    <Datepicker label={'Gratuity Policy Implementation Date'} />
                    <SearchSelect label={'Calculate Gratuity Method'} placeholder={'Month Wise'} list={[{ display: "Month Wise", value: "Month Wise" }]} />
                    <SearchSelect label={'Calculate Gratuity Via Actual Spent Time?'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Minimum Days To Be Considered For Month'} placeholder={'1'} list={[{ display: "1", value: "1" }]} />
                    <SearchSelect label={'Deductible Allowance'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                </div>
                <h2 className="text-lg font-bold">{t("Footer")}</h2>
                <Textarea label={'Final Settlement Footer:'} placeholder='-'/>
            </div>
            {payrollSetup && <PayrollSetupForm onClose={() => setPayrollSetup(false)} />}
        </section>
    )
}