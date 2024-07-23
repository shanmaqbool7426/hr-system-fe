import { Button, CheckBox, Table } from '@/components/elements'
import ApplyPaneltyForm from '@/components/forms/attendance/applyPanelty'
import AttendanceRepostForm from '@/components/forms/attendance/repostAttendance'
import FilterArea from '@/components/includes/FilterArea'
import { CloseCross, InputErrorInfo } from '@/components/svg'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

export default function AmmendAttendance() {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [amend, setAmend] = useState(false)
    const [panelty, setPanelty] = useState(false)
    const [hide, setHide] = useState(false)
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
    
        { title: t("Employee"), col: "Employee", },
        { title: t("Employee Details"), col: "EmployeeDetails" },
        { title: t("Schedule Details"), col: "ScheduleDetails", },
        { title: t("Date In"), col: "DateIn", },
        { title: t("Date Out"), col: "DateOut" },
        { title: t("Time In"), col: "TimeIn" },
        { title: t("Time Out"), col: "TimeOut" },
        { title: t("Remote Work"), col: "RemoteWork" },
        { title: t("Status"), col: "Status" }
    ]
    const rows = [
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
            ScheduleDetails: <div className='flex gap-4  justify-center'>
                <div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Day')}</span> <span>{t('Shift')}</span></div>
                <div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('Monday')}</span> <span>{t('Morning')}</span></div>
            </div>,
            DateIn: "23 May 2024",
            DateOut: "23 May 2024",
            TimeIn: "09:15:00 AM",
            TimeOut: "06:35:00 AM",
            RemoteWork: "Yes",
            Status: <span className='zt-tag zt-tag-danger'> Absent</span>,
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
            ScheduleDetails: <div className='flex gap-4  justify-center'>
                <div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Day')}</span> <span>{t('Shift')}</span></div>
                <div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('Monday')}</span> <span>{t('Morning')}</span></div>
            </div>,
            DateIn: "23 May 2024",
            DateOut: "23 May 2024",
            TimeIn: "09:15:00 AM",
            TimeOut: "06:35:00 AM",
            RemoteWork: "Yes",
            Status: <span className='zt-tag zt-tag-success'> Present</span>,
        },
    ]

    return (
        <section className="flex flex-col grow">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex justify-between pb-6">
                <h1 className="text-h4 mb-0">{t("Amend Attendance")}</h1>
                <div className="flex items-start gap-2">
                    <Button className={"btn btn-dark-outline"}>{t("Upload Excel")}</Button>
                    <Button className={"btn btn-dark-outline"} onClick={() => setPanelty(true)}>{t("Apply Plenty")}</Button>
                    <Button className={"btn btn-primary"} onClick={() => setAmend(true)}>{t("Attendance Repost")}</Button>
                </div>
            </div>

            <div className="zt-card grow">
                <FilterArea title={t("Attendance")}
                    elements={filterElements}
                    filters={filters}
                    setFilters={setFilters}
                />
                {!hide && <div className="p-2 bg-themeBlue/30 rounded-lg mb-4 text-themeBlue/80 flex items-center justify-between">
                    <div className='flex items-center gap-2'><InputErrorInfo /><strong> {t("Note")}</strong> {t('You cannot change predefined values')}</div>
                    <CloseCross className={'cursor-pointer'}
                        onClick={(() => setHide(true))}
                    />
                </div>}

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
                    className={'zt-employeeTable zt-amendAttendanceTable'}
                />
            </div>
            {amend && <AttendanceRepostForm
                onClose={() => { setAmend(false); setEdit(null) }}
                object={edit}
            />}
            {panelty && <ApplyPaneltyForm
                onClose={() => { setPanelty(false); setEdit(null) }}
                object={edit}
            />}
        </section>
    )
}