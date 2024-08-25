import { Button, Input, SearchSelect, Table, Tabs } from "@/components/elements";
import PayrollSetupForm from "@/components/forms/payRoll/payrollSetup/create";
import FilterArea from "@/components/includes/FilterArea";
import { Plus } from "@/components/svg";
import { Tab } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function OvertimePage() {
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
        { title: t("Minutes (From)"), col: "MinutesFrom" },
        { title: t("Minutes (To)"), col: "MinutesTo" },
        { title: t("Overtime Amount"), col: "OvertimeAmount" },
        { title: t("Calculate From Beginning"), col: "CalculateFromBeginning" },
    ];
    const Rows = [
        {
            MinutesFrom: <div className="flex justify-center">
                <Input placeholder={'90'} />
            </div>,
            MinutesTo: <div className="flex justify-center">
                <Input placeholder={'999'} />
            </div>,
            OvertimeAmount: <div className="flex justify-center">
                <SearchSelect placeholder={'Overtime Rate x1.25'} list={[{ display: "Overtime Rate x1.25", value: "Overtime Rate x1.25" }]} />
            </div>,
            CalculateFromBeginning: <div className="flex justify-center">
                <SearchSelect placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
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
                <h2 className="text-lg font-bold">{t('Overtime')}</h2>
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <SearchSelect label={'Calculate OverTime ?'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Apply Auto OverTime'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Per Day Salary Calculation Method'} placeholder={'Monthly Gross Salary/Fixed Day'} list={[{ display: "Monthly Gross Salary/Fixed Day", value: "Monthly Gross Salary/Fixed Day" }]} />
                    <SearchSelect label={'Days'} placeholder={'30'} list={[{ display: "30", value: "30" }, { display: "20", value: "20" }]} />
                    <SearchSelect label={'Hour Salary Calculation Method'} placeholder={'9'} list={[{ display: "9", value: "9" }, { display: "8", value: "8" }]} />
                    <SearchSelect label={'Calculate Overtime From Scheduled Out Time'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Round Off Overtime'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Include OT Before Shift'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Taxable'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Validate OT With Working Hours'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                    <SearchSelect label={'Limit Overtime'} placeholder={'Yes'} list={[{ display: "Yes", value: "Yes" }, { display: "No", value: "No" }]} />
                </div>
                <Tabs
                    containerClasses={'zt-themeTabsV2 grow col-span-2'}
                    tabNavClasses={'zt-themeTabNav mt-4'}
                    tabs={["Working Day Overtime", "Non Working Day Overtime"]}
                >
                    <Tab.Panels className={`zt-themeTabPanels zt-employeeTabsPanel !bg-transparent !p-0`}>
                        <Tab.Panel className={'zt-themeTabPanel'}>
                            <h2 className="text-lg font-bold">{t("Working Day Overtime")}</h2>
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
                            <Button className={'w-max'} variant={"dark-outline"}>
                                <Plus /> Add Line
                            </Button>
                        </Tab.Panel>
                        <Tab.Panel className={'zt-themeTabPanel'}>
                            <h2 className="text-lg font-bold">{t("Non Working Day Overtime")}</h2>
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
                            <Button className={'w-max'} variant={"dark-outline"}>
                                <Plus /> Add Line
                            </Button>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tabs>

            </div>
            {payrollSetup && <PayrollSetupForm onClose={() => setPayrollSetup(false)} />}
        </section>
    )
}