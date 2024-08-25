import { Button, SearchSelect } from "@/components/elements";
import PayrollSetupForm from "@/components/forms/payRoll/payrollSetup/create";
import FilterArea from "@/components/includes/FilterArea";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function PFPolicyPage() {
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
                <h2 className="text-lg font-bold">{t("Provident Fund")}</h2>
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <SearchSelect label={'Implement PF Policy Automatically'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Apply Arrears'} placeholder={'Count Wise'} list={[{ display: "Count Wise", value: "Count Wise" }]} />
                    <SearchSelect label={'Pro Rata'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Policy Applicable from'} placeholder={'Joining  Date'} list={[{ display: "Joining  Date", value: "Joining  Date" }]} />
                    <SearchSelect label={'Provident Fund Type'} placeholder={'Percentage Of Basic Salary'} list={[{ display: "Percentage Of Basic Salary", value: "Percentage Of Basic Salary" }]} />
                    <SearchSelect label={'Employee Share'} placeholder={'6%'} list={[{ display: "6%", value: "6%" }]} />
                    <SearchSelect label={"Employer's Share"} placeholder={'6%'} list={[{ display: "6%", value: "6%" }]} />
                    <SearchSelect label={'Include in Tax'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Calculate From Salary Change Date'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                </div>
            </div>
            {payrollSetup && <PayrollSetupForm onClose={() => setPayrollSetup(false)} />}
        </section>
    )
}