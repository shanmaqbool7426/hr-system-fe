import { Button, DropDown, Table } from "@/components/elements";
import { FetchEmployees } from "@/store/actions/employee.actions";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateMaintenanceForm from "@/components/forms/procurement/maintenance/create";
import FilterArea from "@/components/includes/FilterArea";
import { Edit, EyeOn, ThreeDotsVertical, Trash } from "@/components/svg";
import Toast from "@/util/toast";


export default function MaintenancePage() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { total_records } = useSelector((state) => state.employee)
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [create, setCreate] = useState(false)
    const [filters, setFilters] = useState({
        search: "",
        status: "",
    })
    const Statuses = [
        { display: "Active", value: "active" },
        { display: "Suspended", value: "Suspended" },
        { display: "Completed", value: "Completed" },
    ]
    const Stations = [
        { display: "Head Office", value: "Head Office" },
    ]
    const departments = [
        { display: "OnBoarding", value: "OnBoarding" },
        { display: "Probation", value: "Probation" },
        { display: "Internship", value: "Internship" },
        { display: "Contract", value: "Contract" },
        { display: "Permenant", value: "Permenant" },
        { display: "Inactive", value: "Inactive" },
    ]
    const filterElements = [
        {
            type: "select",
            name: "status",
            placeholder: "All Status",
            value: filters.status,
            list: Statuses,
            onChange: (status) => {
                let _filter = { ...filters }
                _filter['status'] = status
                setFilters(_filter)
            }
        },
        {
            type: "select",
            name: "stations",
            placeholder: "All Stations",
            value: filters.stations,
            list: Stations,
            onChange: (stations) => {
                let _filter = { ...filters }
                _filter['stations'] = stations
                setFilters(_filter)
            }
        },
        {
            type: "select",
            name: "departments",
            placeholder: "Departments",
            value: filters.departments,
            list: departments,
            onChange: (departments) => {
                let _filter = { ...filters }
                _filter['departments'] = departments
                setFilters(_filter)
            }
        },
    ]
    const headings = [
        { title: t("Issue Title"), col: "IssueTitle" },
        { title: t("Shcedule Type"), col: "ScheduleType" },
        { title: t("Next Schedule"), col: "NextSchedule" },
        { title: t("Maintenance State"), col: "MaintenanceState" },
        { title: t("Created Time"), col: "CreatedTime" },
        { title: t("Action"), col: "Action" },
    ]

    const rows = [
        {
            IssueTitle: "Laptop Issue",
            ScheduleType: "Daily",
            NextSchedule: "31-07-2024 10:30 PM",
            MaintenanceState: "Suspended",
            CreatedTime: "31-07-2024 10:30 PM",
            Action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-[123px]">
                    <li className="!p-0">
                        <a onClick={() => { setView(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><EyeOn /></span>
                            <span>{t("View")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => { setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                Toast.success(t("Quotation deleted successfully"))
                            }, t)
                        }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        },
        {
            IssueTitle: "Laptop Issue",
            ScheduleType: "Daily",
            NextSchedule: "31-07-2024 10:30 PM",
            MaintenanceState: "Suspended",
            CreatedTime: "31-07-2024 10:30 PM",
            Action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-[123px]">
                    <li className="!p-0">
                        <a onClick={() => { setView(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><EyeOn /></span>
                            <span>{t("View")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => { setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                Toast.success(t("Quotation deleted successfully"))
                            }, t)
                        }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        },
    ]
    const pagination = {
        totalRecords: total_records,
        showPerPage: true,
        prevAction: () => page > 1 && setPage(page - 1),
        clickAction: (value) => setPage(value),
        nextAction: () => setPage(page + 1),
    }

    useEffect(() => {
        dispatch(FetchEmployees())
    }, [dispatch])

    return (
        <section className="flex flex-col grow">
            <div className="flex justify-between items-center pb-6">
                <div className="">
                    <h1 className="text-h4 mb-0">{t("Maintenance")}</h1>
                </div>
                <div className="flex items-start gap-2">
                    <Button className={"btn btn-primary"} onClick={() => setCreate(true)}>{t("Request Maintenance")}</Button>
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
                    setSortDir={setSortDir}
                    perPage={perPage}
                    setPerPage={setPerPage}
                    page={page}
                    setPage={setPage}
                    pagination={pagination}
                    className={'zt-employeeRoleTable'}
                />
            </div>

            {create && <CreateMaintenanceForm onClose={() => { setCreate(false) }} />}
        </section>
    )
}