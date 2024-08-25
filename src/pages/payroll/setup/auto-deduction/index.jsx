import { Button, SearchSelect } from "@/components/elements";
import PayrollSetupForm from "@/components/forms/payRoll/payrollSetup/create";
import FilterArea from "@/components/includes/FilterArea";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function AutoDeductionPage() {
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
                <h2 className="text-lg font-bold">{t("Auto Deduction Rule's For Attendance Flags")}</h2>

                <div className="grid sm:grid-cols-3 gap-6 mb-6">
                    <SearchSelect label={'Apply Auto Deduction(s)'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Deduction Rule'} placeholder={'Count Wise'} list={[{ display: "Count Wise", value: "Count Wise" }]} />
                    <SearchSelect label={'Apply Auto OverTime'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                </div>
                <h2 className="text-lg font-bold">{t("Auto Deductions for Absence")}</h2>
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <SearchSelect label={'Apply Auto Deduction for Absence'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Count For Absence Deduction'} placeholder={'1'} list={[{ display: "1", value: "1" }, { display: "2", value: "2" }]} />
                    <SearchSelect label={'Exempted Absent Days'} placeholder={'0'} list={[{ display: "0", value: "0" }, { display: "2", value: "2" }]} />
                    <SearchSelect label={'Show Employees W.R.T Absent Deduction In Absent Report'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Apply Deduction For Missing Attendance'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Is Penalty Applied on Missing Attendence'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Sandwich Days'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Count For Missing Deduction'} placeholder={'1'} list={[{ display: "1", value: "1" }, { display: "2", value: "2" }]} />
                    <SearchSelect label={'Check Leave Deduction(s) Rule First'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Club Days'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                </div>
                <h2 className="text-lg font-bold">{t("Auto Deductions For Short Time")}</h2>
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <SearchSelect label={'Apply Auto Deduction For Short Time'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                </div>
                <h2 className="text-lg font-bold">{t("Auto Deductions For Pre Joining Date")}</h2>
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <SearchSelect label={'Apply Auto Deduction For Pre Joining Date'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Calculate For Deduction Or Allowance?'} placeholder={'Dedication'} list={[{ display: "Dedication", value: "Dedication" }]} />
                    <SearchSelect label={'Calculate For Holidays?'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Calculate For Gazzetted Holidays?'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
               </div>
               <h2 className="text-lg font-bold">{t("Auto Deductions For Post Leaving Date")}</h2>
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <SearchSelect label={'Apply Auto Deduction For Post Leaving Date'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Calculate For Deduction Or Allowance?'} placeholder={'Dedication'} list={[{ display: "Dedication", value: "Dedication" }]} />
                    <SearchSelect label={'Calculate For Holidays?'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Calculate For Gazzetted Holidays?'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
               </div>
            </div>
            {payrollSetup && <PayrollSetupForm onClose={() => setPayrollSetup(false)} />}
        </section>
    )
}