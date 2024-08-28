import { Button, SearchSelect, Table } from "@/components/elements";
import PayrollSetupForm from "@/components/forms/payRoll/payrollSetup/create";
import FilterArea from "@/components/includes/FilterArea";
import { Plus } from "@/components/svg";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function CurrencyPage() {
    const { t } = useTranslation()
    const [payrollSetup, setPayrollSetup] = useState(false)
    const { customfield_list } = useSelector(state => state.customfield)

    const [sortCol, setSortCol] = useState(null);
    const [sortDir, setSortDir] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
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
    const Headings = [
        { title: t("Allowance Title"), col: "AllowanceTitle" },
        { title: t("Taxable Allowance"), col: "TaxableAllowance" },
        { title: t("Allowance Type"), col: "AllowanceType" },
        { title: t("Amount / Percentage"), col: "AmountPercentage" },
    ];
    const Rows = [
        {
            AllowanceTitle: <div className="flex justify-center">
                <SearchSelect placeholder={'Medical allowance'} list={[{ display: "Medical allowance", value: "Medical allowance" }]} />
            </div>,
            TaxableAllowance: <div className="flex justify-center">
                <SearchSelect placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
            </div>,
            AllowanceType: <div className="flex justify-center">
                <SearchSelect placeholder={'Fixed Amount'} list={[{ display: "Fixed Amount", value: "Fixed Amount" }, { display: "Flexible Amount", value: "Flexible Amount" }]} />
            </div>,
            AmountPercentage: <div className="flex justify-center">
                <SearchSelect placeholder={'10%'} list={[{ display: "10%", value: "10%" }, { display: "20%", value: "20%" }]} />
            </div>,
        },
    ];
    const RecurringHeadings = [
        { title: t("Deduction Title"), col: "DeductionTitle" },
        { title: t("Deduction Type"), col: "DeductionType" },
        { title: t("Employee Amount / Percentage"), col: "EmployeePercentage" },
        { title: t("Employer's Share"), col: "EmployerShare" },
    ];
    const RecurringRows = [
        {
            DeductionTitle: <div className="flex justify-center">
                <SearchSelect placeholder={'EOBI'} list={[{ display: "EOBI", value: "EOBI" }]} />
            </div>,
            EmployeePercentage: <div className="flex justify-center">
                <SearchSelect placeholder={'320'} list={[{ display: "320", value: "320" }, { display: "420", value: "420" }]} />
            </div>,
            DeductionType: <div className="flex justify-center">
                <SearchSelect placeholder={'Fixed Amount'} list={[{ display: "Fixed Amount", value: "Fixed Amount" }, { display: "Flexible Amount", value: "Flexible Amount" }]} />
            </div>,
            EmployerShare: <div className="flex justify-center">
                <SearchSelect placeholder={'10%'} list={[{ display: "10%", value: "10%" }, { display: "20%", value: "20%" }]} />
            </div>,
        },
    ];
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
                <h2 className="text-lg font-bold">{t('Payslip Items')}</h2>
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <SearchSelect label={'Basic Salary Type'} list={[{ display: "Percentage Based", value: "Percentage Based" }]} />
                    <SearchSelect label={'Basic Salary Percentage'} list={[{ display: "90%", value: "90%" }, { display: "80%", value: "80%" }]} />
                </div>
                <h2 className="text-lg font-bold">{t("Allowances")}</h2>
                <Table
                    headings={Headings}
                    rows={Rows}
                    sortCol={sortCol}
                    setSortCol={setSortCol}
                    sortDir={sortDir}
                    setSortDir={setSortDir}
                    perPage={perPage}
                    setPerPage={setPerPage}
                    page={page}
                    setPage={setPage}
                    className={"zt-employeeTable zt-addAttendanceTable"}
                />
                <Button variant={"dark-outline"}>
                    <Plus /> Add Line
                </Button>
                <h2 className="text-lg font-bold my-6">{t("Recurring Deductions")}</h2>
                <Table
                    headings={RecurringHeadings}
                    rows={RecurringRows}
                    sortCol={sortCol}
                    setSortCol={setSortCol}
                    sortDir={sortDir}
                    setSortDir={setSortDir}
                    perPage={perPage}
                    setPerPage={setPerPage}
                    page={page}
                    setPage={setPage}
                    className={"zt-employeeTable zt-addAttendanceTable"}
                />
                <Button variant={"dark-outline"}>
                    <Plus /> Add Line
                </Button>
            </div>
            {payrollSetup && <PayrollSetupForm onClose={() => setPayrollSetup(false)} />}
        </section>
    )
}