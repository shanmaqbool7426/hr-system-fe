import { Button, Input, SearchSelect, Table } from "@/components/elements";
import PayrollSetupForm from "@/components/forms/payRoll/payrollSetup/create";
import FilterArea from "@/components/includes/FilterArea";
import { Minus, Plus } from "@/components/svg";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function TaxRulesPage() {
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
        { title: t("Salary From"), col: "SalaryFrom" },
        { title: t("Salary To"), col: "SalaryTo" },
        { title: t("Tax %"), col: "Tax" },
        { title: t("Exempted Tax Amount"), col: "ExemptedTaxAmount" },
        { title: t("Additional Tax Amount"), col: "AdditionalTaxAmount" },
    ];
    const Rows = [
        {
            SalaryFrom: <div className="flex justify-center">
                <SearchSelect placeholder={'1'} list={[{ display: "1", value: "1" }]} />
            </div>,
            SalaryTo: <div className="flex justify-center">
                <SearchSelect placeholder={'600000'} list={[{ display: "600000", value: "600000" }, { display: "700000", value: "700000" }]} />
            </div>,
            ExemptedTaxAmount: <div className="flex justify-center">
                <SearchSelect placeholder={'600000'} list={[{ display: "600000", value: "600000" }, { display: "800000", value: "800000" }]} />
            </div>,
            Tax: <div className="flex justify-center">
                <SearchSelect placeholder={'10%'} list={[{ display: "10%", value: "10%" }, { display: "20%", value: "20%" }]} />
            </div>,
            AdditionalTaxAmount: <div className="flex justify-center">
                <SearchSelect placeholder={'10'} list={[{ display: "10", value: "10" }, { display: "20", value: "20" }]} />
            </div>,
        },
        {
            SalaryFrom: <div className="flex justify-center">
                <SearchSelect placeholder={'1'} list={[{ display: "1", value: "1" }]} />
            </div>,
            SalaryTo: <div className="flex justify-center">
                <SearchSelect placeholder={'600000'} list={[{ display: "600000", value: "600000" }, { display: "700000", value: "700000" }]} />
            </div>,
            ExemptedTaxAmount: <div className="flex justify-center">
                <SearchSelect placeholder={'600000'} list={[{ display: "600000", value: "600000" }, { display: "800000", value: "800000" }]} />
            </div>,
            Tax: <div className="flex justify-center">
                <SearchSelect placeholder={'10%'} list={[{ display: "10%", value: "10%" }, { display: "20%", value: "20%" }]} />
            </div>,
            AdditionalTaxAmount: <div className="flex justify-center">
                <SearchSelect placeholder={'10'} list={[{ display: "10", value: "10" }, { display: "20", value: "20" }]} />
            </div>,
        },
        {
            SalaryFrom: <div className="flex justify-center">
                <SearchSelect placeholder={'1'} list={[{ display: "1", value: "1" }]} />
            </div>,
            SalaryTo: <div className="flex justify-center">
                <SearchSelect placeholder={'600000'} list={[{ display: "600000", value: "600000" }, { display: "700000", value: "700000" }]} />
            </div>,
            ExemptedTaxAmount: <div className="flex justify-center">
                <SearchSelect placeholder={'600000'} list={[{ display: "600000", value: "600000" }, { display: "800000", value: "800000" }]} />
            </div>,
            Tax: <div className="flex justify-center">
                <SearchSelect placeholder={'10%'} list={[{ display: "10%", value: "10%" }, { display: "20%", value: "20%" }]} />
            </div>,
            AdditionalTaxAmount: <div className="flex justify-center">
                <SearchSelect placeholder={'10'} list={[{ display: "10", value: "10" }, { display: "20", value: "20" }]} />
            </div>,
        },
        {
            SalaryFrom: <div className="flex justify-center">
                <SearchSelect placeholder={'1'} list={[{ display: "1", value: "1" }]} />
            </div>,
            SalaryTo: <div className="flex justify-center">
                <SearchSelect placeholder={'600000'} list={[{ display: "600000", value: "600000" }, { display: "700000", value: "700000" }]} />
            </div>,
            ExemptedTaxAmount: <div className="flex justify-center">
                <SearchSelect placeholder={'600000'} list={[{ display: "600000", value: "600000" }, { display: "800000", value: "800000" }]} />
            </div>,
            Tax: <div className="flex justify-center">
                <SearchSelect placeholder={'10%'} list={[{ display: "10%", value: "10%" }, { display: "20%", value: "20%" }]} />
            </div>,
            AdditionalTaxAmount: <div className="flex justify-center">
                <SearchSelect placeholder={'10'} list={[{ display: "10", value: "10" }, { display: "20", value: "20" }]} />
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
                <h2 className="text-lg font-bold">{t('Tax Rules')}</h2>
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
            </div>
            {payrollSetup && <PayrollSetupForm onClose={() => setPayrollSetup(false)} />}
        </section>
    )
}