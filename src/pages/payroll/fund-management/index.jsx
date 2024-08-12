import { Button, DropDown, Table } from "@/components/elements";
import ProvidentFundForm from "@/components/forms/payRoll/fundManagement/createProvidentFund";
import VPSForm from "@/components/forms/payRoll/fundManagement/createVPS";
import FilterArea from "@/components/includes/FilterArea";
import { Edit, SuccessTick, ThreeDotsVertical, Trash, WarningIcon } from "@/components/svg";
import Toast from "@/util/toast";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function FundManagementPage() {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [create, setCreate] = useState(false)
    const [vps, setVps] = useState(false)
    const { customfield_list } = useSelector(state => state.customfield)
    const [filters, setFilters] = useState({
        search: "",
        project: null,
        department: null,
        status: null,
    })
    const pagination = {
        totalRecords: 5,
        showPerPage: true,
        prevAction: () => page > 1 && setPage(page - 1),
        clickAction: (value) => setPage(value),
        nextAction: () => setPage(page + 1),
    }
    const filterElements = [
        {
            type: "search",
            name: "search",
            value: filters.search,
            placeholder: t("Search employee"),
            className: "xl:col-span-2",
            onChange: (event) => {
                let _filter = { ...filters }
                _filter['search'] = event.target.value
                setFilters(_filter)
            }
        },
        {
            type: "select",
            name: "Request Type",
            placeholder: "Request Type",
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
        {
            type: "select",
            placeholder: "Select date",
            name: "date",
            value: filters.date,
            list: [{ display: '1st January 2024', value: "1st January 2024" },
            { display: '2nd February 2024', value: "February 2024" },
            { display: '3rd March 2024', value: "March 2024" },],
        },
        {
            type: "select",
            placeholder: "Status",
            name: "Status",
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

    const headings = [
        { title: t("Employee"), col: "Employee" },
        { title: t("Employee Details"), col: "EmployeeDetails" },
        { title: t("Fund Detail"), col: "FundDetail" },
        { title: t("Employee Share"), col: "EmployeeShare", },
        { title: t("Organization  Share"), col: "OrganizationShare", },
        { title: t("Active"), col: "Active" },
        { title: t("Modified On"), col: "ModifiedOn" },
        { title: t("Action"), col: "action" }
    ]
    const rows = [
        {
            Employee: <div className="flex  items-center justify-center gap-3">
                <figure>
                    <Image alt="profile" height={32} width={32} src={'/assets/images/users/user-01.jpg'} className="rounded-full" /></figure>
                <div className="flex flex-col">
                    <span className="font-semibold">{t("Jhon Carter")}</span>
                    <span className="text-themeGrayscale500">{t("10202325")}</span>
                </div>
            </div>,
            EmployeeDetails: <div className='flex gap-4 justify-center'>
                <div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Station')}</span> <span>{t('Departement')}</span></div>
                <div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('Canda')}</span> <span>{t('Design')}</span></div>
            </div>,
            FundDetail: <div className='flex flex-col items-start '>
                <div className="flex justify-between w-full">
                    <span className="text-themeGrayscale500">{t('Deduction Method')}</span>
                    <span>{t('Percentage')}</span>
                </div>
                <span>{t('Of Basic Salary')}</span>
                <div className="flex justify-between w-full">
                    <span className="text-themeGrayscale500">{t('Fund Type')}</span>
                    <span>{t('Provident')}</span>
                </div>
                <span>{t('Fund')}</span>
            </div>,
            EmployeeShare: "6",
            OrganizationShare: "6",
            Active: <div className="flex justify-center"><SuccessTick className={'text-themeSuccess'} /></div>,
            ModifiedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-[123px]">
                    <li className="!p-0">
                        <a onClick={() => { setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                Toast.success(t("Loan Cancel successfully"))
                            }, t)
                        }} className={'no-underline flex items-center gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                Toast.success(t("Loan Cancel successfully"))
                            }, t)
                        }} className={'no-underline flex items-center gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                            <span><WarningIcon /></span>
                            <span>{t("Inactive")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        },
        {
            Employee: <div className="flex  items-center justify-center gap-3">
                <figure>
                    <Image alt="profile" height={32} width={32} src={'/assets/images/users/user-02.jpg'} className="rounded-full" /></figure>
                <div className="flex flex-col">
                    <span className="font-semibold">{t("Jhon Carter")}</span>
                    <span className="text-themeGrayscale500">{t("10202325")}</span>
                </div>
            </div>,
            EmployeeDetails: <div className='flex gap-4 justify-center'>
                <div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Station')}</span> <span>{t('Departement')}</span></div>
                <div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('Canda')}</span> <span>{t('Design')}</span></div>
            </div>,
            FundDetail: <div className='flex flex-col items-start '>
                <div className="flex justify-between w-full">
                    <span className="text-themeGrayscale500">{t('Deduction Method')}</span>
                    <span>{t('Percentage')}</span>
                </div>
                <span>{t('Of Basic Salary')}</span>
                <div className="flex justify-between w-full">
                    <span className="text-themeGrayscale500">{t('Fund Type')}</span>
                    <span>{t('Provident')}</span>
                </div>
                <span>{t('Fund')}</span>
            </div>,
            EmployeeShare: "6",
            OrganizationShare: "6",
            Active: <div className="flex justify-center"><SuccessTick className={'text-themeSuccess'} /></div>,
            ModifiedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-[123px]">
                    <li className="!p-0">
                        <a onClick={() => { setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                Toast.success(t("Loan Cancel successfully"))
                            }, t)
                        }} className={'no-underline flex items-center gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                Toast.success(t("Loan Cancel successfully"))
                            }, t)
                        }} className={'no-underline flex items-center gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                            <span><WarningIcon /></span>
                            <span>{t("Inactive")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        },
        {
            Employee: <div className="flex  items-center justify-center gap-3">
                <figure>
                    <Image alt="profile" height={32} width={32} src={'/assets/images/users/user-03.jpg'} className="rounded-full" /></figure>
                <div className="flex flex-col">
                    <span className="font-semibold">{t("Jhon Carter")}</span>
                    <span className="text-themeGrayscale500">{t("10202325")}</span>
                </div>
            </div>,
            EmployeeDetails: <div className='flex gap-4 justify-center'>
                <div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Station')}</span> <span>{t('Departement')}</span></div>
                <div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('Canda')}</span> <span>{t('Design')}</span></div>
            </div>,
            FundDetail: <div className='flex flex-col items-start '>
                <div className="flex justify-between w-full">
                    <span className="text-themeGrayscale500">{t('Deduction Method')}</span>
                    <span>{t('Percentage')}</span>
                </div>
                <span>{t('Of Basic Salary')}</span>
                <div className="flex justify-between w-full">
                    <span className="text-themeGrayscale500">{t('Fund Type')}</span>
                    <span>{t('Provident')}</span>
                </div>
                <span>{t('Fund')}</span>
            </div>,
            EmployeeShare: "6",
            OrganizationShare: "6",
            Active: <div className="flex justify-center"><SuccessTick className={'text-themeSuccess'} /></div>,
            ModifiedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-[123px]">
                    <li className="!p-0">
                        <a onClick={() => { setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                Toast.success(t("Loan Cancel successfully"))
                            }, t)
                        }} className={'no-underline flex items-center gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                Toast.success(t("Loan Cancel successfully"))
                            }, t)
                        }} className={'no-underline flex items-center gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                            <span><WarningIcon /></span>
                            <span>{t("Inactive")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        },
    ]
    return (
        <section className="flex flex-col grow">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex justify-between pb-6">
                <div className="flex flex-col">
                    <h1 className="text-h4 mb-0">{t("Fund Management")}</h1>
                </div>
                <div className="flex items-start gap-2">
                    <Button onClick={() => { setVps(true) }} className={"btn btn-dark-outline"}>{t("Add VPS")}</Button>
                    <Button onClick={() => { setCreate(true) }} className={"btn btn-primary"}>{t("Add Provident Fund")}</Button>
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
                    pagination={pagination}
                    setSortDir={setSortDir}
                    perPage={perPage}
                    setPerPage={setPerPage}
                    page={page}
                    setPage={setPage}
                    className={'zt-employeeTable zt-payrollTable'}
                />
            </div>
            {vps && <VPSForm onClose={() => setVps(false)} />}
            {create && <ProvidentFundForm onClose={() => setCreate(false)} />}

        </section>
    )
}