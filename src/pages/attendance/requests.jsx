import { Button, DropDown, Table } from '@/components/elements'
import AddRequestForm from '@/components/forms/attendance/addRequest'
import ViewAttendanceForm from '@/components/forms/attendance/view'
import FilterArea from '@/components/includes/FilterArea'
import { ThreeDotsVertical } from '@/components/svg'
import Toast from '@/util/toast'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'

export default function Requests() {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [create, setCreate] = useState(false)
    const [view, setView] = useState(false)
    const [edit, setEdit] = useState(false)
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
            placeholder: "All Departments",
            name: "All Departments",
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
            placeholder: "All Job Titles",
            name: "All Job Titles",
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
            name: "All Status",
            placeholder: "All Status",
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

        { title: t("Employee"), col: "Employee", /* sort: true */ },
        { title: t("Employee Details"), col: "EmployeeDetails" },
        { title: t("Attendance Date"), col: "AttendanceDate", /* sort: true */ },
        { title: t("Change Type"), col: "ChangeType", /* sort: true */ },
        { title: t("Status"), col: "status" },
        { title: t("Modified On"), col: "ModifiedOn" },
        { title: t("Action"), col: "action" }
    ]

    const rows = [
        {

            Employee: <div className="flex items-center justify-center gap-4 grow">
                <div className={'flex flex-col gap-1 text-left'}>
                    <strong className={'text-themeGrayscale text-sm'}>{t('Kelli Lebsack')}</strong>
                    <span className={'text-themeGrayscale500 '}>{t('10202325')}</span>
                </div>
            </div>,
            EmployeeDetails: <div className='flex gap-4 justify-center'>
                <div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Station')}</span> <span>{t('Departement')}</span></div>
                <div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('Canda')}</span> <span>{t('Design')}</span></div>
            </div>,
            AttendanceDate: '23 May 2024',
            ChangeType: "Change in Signing",
            status: <span className='zt-tag zt-tag-danger'>Rejected</span>,
            ModifiedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-[123px]">
                    <li className="!p-0">
                        <a onClick={() => { setView(true) }} className={'no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span>{t("View")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                Toast.success(t("Asset Type deleted successfully"))
                            }, t)
                        }} className={'no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span>{t("Accept")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                Toast.success(t("Asset Type deleted successfully"))
                            }, t)
                        }} className={'no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                            <span>{t("Reject")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        },
        {

            Employee: <div className="flex items-center justify-center gap-4 grow">
                <div className={'flex flex-col gap-1 text-left'}>
                    <strong className={'text-themeGrayscale text-sm'}>{t('Kelli Lebsack')}</strong>
                    <span className={'text-themeGrayscale500 '}>{t('10202325')}</span>
                </div>
            </div>,
            EmployeeDetails: <div className='flex gap-4  justify-center'>
                <div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Station')}</span> <span>{t('Departement')}</span></div>
                <div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('Canda')}</span> <span>{t('Design')}</span></div>
            </div>,
            AttendanceDate: '23 May 2024',
            ChangeType: "Change in Signing",
            status: <span className='zt-tag zt-tag-success'>Approved</span>,
            ModifiedOn: <div className="flex justify-center"><div className="flex flex-col  items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-[123px]">
                    <li className="!p-0">
                        <a onClick={() => { setView(true) }} className={'no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span>{t("View")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                Toast.success(t("Asset Type deleted successfully"))
                            }, t)
                        }} className={'no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span>{t("Accept")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                Toast.success(t("Asset Type deleted successfully"))
                            }, t)
                        }} className={'no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                            <span>{t("Reject")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        },
        {

            Employee: <div className="flex items-center justify-center gap-4 grow">
                <div className={'flex flex-col gap-1 text-left'}>
                    <strong className={'text-themeGrayscale text-sm'}>{t('Kelli Lebsack')}</strong>
                    <span className={'text-themeGrayscale500 '}>{t('10202325')}</span>
                </div>
            </div>,
            EmployeeDetails: <div className='flex gap-4  justify-center'>
                <div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Station')}</span> <span>{t('Departement')}</span></div>
                <div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('Canda')}</span> <span>{t('Design')}</span></div>
            </div>,
            AttendanceDate: '23 May 2024',
            ChangeType: "Change in Signing",
            status: <span className='zt-tag zt-tag-purple'>Pending</span>,
            ModifiedOn: <div className="flex justify-center"><div className="flex flex-col  items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-[123px]">
                    <li className="!p-0">
                        <a onClick={() => { setView(true) }} className={'no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span>{t("View")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                Toast.success(t("Asset Type deleted successfully"))
                            }, t)
                        }} className={'no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span>{t("Accept")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                Toast.success(t("Asset Type deleted successfully"))
                            }, t)
                        }} className={'no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                            <span>{t("Reject")}</span>
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
                <h1 className="text-h4 mb-0">{t("Attendance Request")}</h1>
                <Button className={"btn btn-primary"} onClick={() => setCreate(true)}>{t("Add Request")}</Button>
            </div>

            <div className="zt-card grow">
                <FilterArea title={t("Attendance")}
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
                    className={'zt-employeeTable zt-attendanceRequestsTable'}
                />
            </div>
            {view && <ViewAttendanceForm
                onClose={() => { setView(false); setEdit(null) }}
                object={edit}
            />}

            {create && <AddRequestForm onClose={() => { setCreate(false) }} />}
        </section>
    )
}