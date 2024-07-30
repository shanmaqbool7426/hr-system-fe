import { Button } from '@/components/elements'
import AddNewShiftForm from '@/components/forms/attendance/addNewShift'
import FilterArea from '@/components/includes/FilterArea'
import { CloseCross, InputErrorInfo, Trash } from '@/components/svg'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

export default function AddNewSchedule() {
    const { t } = useTranslation()
    const [page, setPage] = useState(1)
    const [newShift, setNewShift] = useState(false)
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
            placeholder: t("Search"),
            className: "xl:col-span-2",
            onChange: (event) => {
                let _filter = { ...filters }
                _filter['search'] = event.target.value
                setFilters(_filter)
            }
        },
        {
            type: "select",
            name: "Year",
            placeholder: "Year",
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
            placeholder: "Month",
            name: "Month",
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
    const newSchduleData = [
        { date: "29", className: "bg-themeGrayscale50", del: "none" },
        { date: "30", className: "bg-themeGrayscale50", del: "none" },
        { date: "1", shift: "09 AM - 06 PM -Morning", break: "Break Time 12:00AM - 1:00 PM" },
        { date: "2", shift: "09 AM - 06 PM -Morning", break: "Break Time 12:00AM - 1:00 PM" },
        { date: "3", shift: "09 AM - 06 PM -Morning", break: "Break Time 12:00AM - 1:00 PM" },
        { date: "6", shift: "09 AM - 06 PM -Morning", break: "Break Time 12:00AM - 1:00 PM" },
        { date: "7", btn: "Add New Shift", del: "none" },
        { date: "8", shift: "09 AM - 06 PM -Morning", break: "Break Time 12:00AM - 1:00 PM" },
        { date: "9", shift: "09 AM - 06 PM -Morning", break: "Break Time 12:00AM - 1:00 PM" },
        { date: "10", shift: "09 AM - 06 PM -Morning", break: "Break Time 12:00AM - 1:00 PM" },
        { date: "13", shift: "09 AM - 06 PM -Morning", break: "Break Time 12:00AM - 1:00 PM" },
        { date: "14", shift: "09 AM - 06 PM -Morning", break: "Break Time 12:00AM - 1:00 PM" },
        { date: "15", shift: "09 AM - 06 PM -Morning", break: "Break Time 12:00AM - 1:00 PM" },
        { date: "16", shift: "09 AM - 06 PM -Morning", break: "Break Time 12:00AM - 1:00 PM" },
        { date: "17", shift: "09 AM - 06 PM -Morning", break: "Break Time 12:00AM - 1:00 PM" },
        { date: "20", shift: "09 AM - 06 PM -Morning", break: "Break Time 12:00AM - 1:00 PM" },
        { date: "21", shift: "09 AM - 06 PM -Morning", break: "Break Time 12:00AM - 1:00 PM" },
        { date: "22", shift: "09 AM - 06 PM -Morning", break: "Break Time 12:00AM - 1:00 PM" },
        { date: "23", shift: "09 AM - 06 PM -Morning", break: "Break Time 12:00AM - 1:00 PM" },
        { date: "24", shift: "09 AM - 06 PM -Morning", break: "Break Time 12:00AM - 1:00 PM" },
        { date: "27", shift: "09 AM - 06 PM -Morning", break: "Break Time 12:00AM - 1:00 PM" },
        { date: "28", shift: "09 AM - 06 PM -Morning", break: "Break Time 12:00AM - 1:00 PM" },
        { date: "29", shift: "09 AM - 06 PM -Morning", break: "Break Time 12:00AM - 1:00 PM" },
        { date: "30", shift: "09 AM - 06 PM -Morning", break: "Break Time 12:00AM - 1:00 PM" },
        { date: "31", shift: "09 AM - 06 PM -Morning", break: "Break Time 12:00AM - 1:00 PM" },
    ]
    return (
        <section className="flex flex-col grow">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex justify-between pb-6">
                <h1 className="text-h4 mb-0">{t("Add New Schedule")}</h1>
            </div>
            <div className=" zt-card grow">
                <FilterArea title={t("Add New Schedule")}
                    elements={filterElements}
                    filters={filters}
                    setFilters={setFilters}
                />
                <h2 className='font-medium text-xl mb-3'>{t("May 2024")}</h2>
                <div className='grid grid-cols-5'>
                    <span className='zt-addScheduleSpan'>{t("Mon")}</span>
                    <span className='zt-addScheduleSpan'>{t("Tue")}</span>
                    <span className='zt-addScheduleSpan'>{t("Wed")}</span>
                    <span className='zt-addScheduleSpan'>{t("Thu")}</span>
                    <span className='zt-addScheduleSpan'>{t("Fri")}</span>
                    {newSchduleData.map((ele, i) => (
                        <div key={i} className={`${ele.className} p-2 flex flex-col justify-between items-start border border-themeGrayscale300`}>
                            <div className='flex w-full justify-between mb-3'>
                                <span className='text-xs text-themeGrayscale font-medium'>{ele.date}</span>
                                {!ele.del && <span><Trash height={14} width={14} className='text-themeDanger' /></span>}
                            </div>
                            {ele.shift &&
                                <div className='flex flex-col text-themeGrayscale600 text-xs mb-8'>
                                    <span>{ele.shift}</span>
                                    <span >{ele.break}</span>
                                </div>
                            }
                            {ele.btn && <Button onClick={() => setNewShift(true)} className={"btn-dark !text-xs !px-6 !py-2"}>{t("Add New Shift")}</Button>}
                        </div>
                    ))}
                </div>
                {newShift && <AddNewShiftForm  
                    onClose={() => { setNewShift(false) }} 
                />
                }
            </div>
        </section>
    )
}