import { Button, SearchSelect } from "@/components/elements";
import PayrollSetupForm from "@/components/forms/payRoll/payrollSetup/create";
import FilterArea from "@/components/includes/FilterArea"; 
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function SalarySettingPage() {
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
                <h2 className="text-lg font-bold">{t('Advance Salary')}</h2>
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <SearchSelect placeholder={'Yes'} label={'Advance Salary Only For Present Days ?'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect placeholder={'0'} label={'Advance Salary Restatement After Specific Months'} list={[{ display: "0", value: "0" }, { display: "1", value: "1" }]} />
                    <SearchSelect placeholder={'100%'} label={'Avail Advance Salary Upto Percentage:'} list={[{ display: "100%", value: "100%" }, { display: "90%", value: "90%" }]} />
                    <SearchSelect placeholder={'10'} label={'Advance Salary Request Limit In Fiscal Year'} list={[{ display: "10", value: "10" }, { display: "1", value: "1" }]} />
                    <SearchSelect placeholder={'0'} label={'Advance Salary Request After Specific Days From Payroll Start Date'} list={[{ display: "0", value: "0" }, { display: "1", value: "1" }]} />
                    <SearchSelect placeholder={'0'} label={'Advance Salary Request After Specific Month From Joining Date'} list={[{ display: "0", value: "0" }, { display: "1", value: "1" }]} />
                </div>
                <h2 className="text-lg font-bold">{t("Salary Changes")}</h2>
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <SearchSelect placeholder={'0'} label={'Is Apply Increment/Decrement From Salary Change Date'} list={[{ display: "0", value: "0" }, { display: "1", value: "1" }]} />
                    <SearchSelect placeholder={'0'} label={'Is Apply Salary Changes For Previous Month'} list={[{ display: "0", value: "0" }, { display: "1", value: "1" }]} />
                </div>
            </div>
            {payrollSetup && <PayrollSetupForm onClose={() => setPayrollSetup(false)} />}
        </section>
    )
}