import { Button, DropDown, Table } from '@/components/elements'
import StatusSelect from '@/components/elements/SelectStatus'
import ApplyLeaveEncashmentForm from '@/components/forms/payRoll/leaveEncashement/create'
import FilterArea from '@/components/includes/FilterArea'
import { Edit, EyeOn, ThreeDotsVertical, Trash } from '@/components/svg'
import Toast from '@/util/toast'
import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

export default function LeaveEncashementPage() {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [create, setcreate] = useState(false)
    const [view, setView] = useState(false)
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
    const months = [
        { display: 'January 2024', value: "January 2024" },
        { display: 'February 2024', value: "February 2024" },
        { display: 'March 2024', value: "March 2024" },
        { display: 'April 2024', value: "April 2024" },
        { display: 'May 2024', value: "May 2024" },
        { display: 'June 2024', value: "June 2024" },
        { display: 'July 2024', value: "July 2024" },
        { display: 'August 2024', value: "August 2024" },
        { display: 'September 2024', value: "September 2024" },
        { display: 'October 2024', value: "October 2024" },
        { display: 'November 2024', value: "November 2024" },
        { display: 'December 2024', value: "December 2024" },
    ]
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
            placeholder: "Select Month",
            name: "month",
            value: filters.month,
            list: months,
            onChange: (month) => {
                let _filter = { ...filters }
                _filter['month'] = month
                setFilters(_filter)
            }
        },
        {
            type: "select",
            placeholder: "Station",
            name: "Station",
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
        { title: t("Leave Encashment Date"), col: "Date", },
        { title: t("Status"), col: "Status" },
        { title: t("Total Encashment"), col: "TotalEncashment", },
        { title: t("Leave Details"), col: "LeaveDetails" },
        { title: t("Approvals"), col: "Approvals", },
        { title: t("Modified On"), col: "ModifiedOn" },
        { title: t("Action"), col: "action" }
    ]
    const options = [
        { value: 'success', label: 'Approved', className: 'zt-tag-success' },
        { value: 'danger', label: 'Rejected', className: 'zt-tag-danger' },
        { value: 'purple', label: 'Pending', className: 'zt-tag-purple' },
    ];

    const item = { status: 'success' };
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
            LeaveDetails: "-",
            Date: '23 May 2024',
            Status: <StatusSelect item={item} options={options} />,
            Approvals: "-",
            TotalEncashment: "10",
            ModifiedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-[123px]">
                    <li className="!p-0">
                        <a onClick={() => { setView(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><EyeOn /></span>
                            <span>{t("View")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => { setcreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                Toast.success(t("Asset Type deleted successfully"))
                            }, t)
                        }} className={'no-underline flex items-center gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
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
            LeaveDetails: "-",
            Date: '23 May 2024',
            Status: <StatusSelect item={item} options={options} />,

            Approvals: "-",
            TotalEncashment: "10",
            ModifiedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-[123px]">
                    <li className="!p-0">
                        <a onClick={() => { setView(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><EyeOn /></span>
                            <span>{t("View")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => { setcreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                Toast.success(t("Asset Type deleted successfully"))
                            }, t)
                        }} className={'no-underline flex items-center gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
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
            LeaveDetails: "-",
            Date: '23 May 2024',
            Status: <StatusSelect item={item} options={options} />,

            Approvals: "-",
            TotalEncashment: "10",
            ModifiedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-[123px]">
                    <li className="!p-0">
                        <a onClick={() => { setView(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><EyeOn /></span>
                            <span>{t("View")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => { setcreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                Toast.success(t("Asset Type deleted successfully"))
                            }, t)
                        }} className={'no-underline flex items-center gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
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
                <h1 className="text-h4 mb-0">{t("Leave Encashment Request")}</h1>
                <div className="flex items-start gap-2">
                    <Button onClick={() => { setcreate(true) }} className={"btn btn-primary"}>{t("Create Encashment")}</Button>
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
            {create && <ApplyLeaveEncashmentForm onClose={() => { setcreate(false) }} />}
        </section>
    )
}