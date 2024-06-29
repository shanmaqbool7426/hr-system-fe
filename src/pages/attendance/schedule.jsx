import { Button, DropDown, Table } from '@/components/elements'
import FilterArea from '@/components/includes/FilterArea'
import { CloseCross, Edit, InputErrorInfo, ThreeDotsVertical, Trash } from '@/components/svg'
import { DeleteCustomfield } from '@/store/actions/customfield.actions'
import Toast from '@/util/toast'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
export default function Schedule() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [create, setCreate] = useState(false)
    const [hide, setHide] = useState(false)
    const [edit, setEdit] = useState(false)
    const router=useRouter()
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

    const headings = [
        { title: t("Schedule Name"), col: "ScheduleName", },
        { title: t("Year"), col: "Year" },
        { title: t("Month"), col: "Month", },
        { title: t("Employee"), col: "Employee", },
        { title: t("Modified On"), col: "ModifiedOn" },
        { title: t("Action"), col: "action" }
    ]
    const rows = [
        {
            ScheduleName: "9:00AM To 6:00PM",
            Year: "2024",
            Month: 'May',
            Employee: "26",
            ModifiedOn: <div className="flex justify-center"><div className="flex flex-col text-xs items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4">
                    <li className="!p-0">
                        <a onClick={() => { setEdit(item); setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                dispatch(DeleteCustomfield(item._id, () => {
                                    Toast.success(t("Allowance Title deleted successfully"))
                                }))
                            }, t)
                        }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        },
        {
            ScheduleName: "9:00AM To 6:00PM",
            Year: "2024",
            Month: 'May',
            Employee: "26",
            ModifiedOn: <div className="flex justify-center"><div className="flex flex-col text-xs items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4">
                    <li className="!p-0">
                        <a onClick={() => { setEdit(item); setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                dispatch(DeleteCustomfield(item._id, () => {
                                    Toast.success(t("Allowance Title deleted successfully"))
                                }))
                            }, t)
                        }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
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
                <h1 className="text-h4 mb-0">{t("Schedule")}</h1>
                <Button onClick={()=>router.push('/attendance/add-new-schedule')} className={"btn btn-primary"}>{t("Add New Schedule")}</Button>
            </div>

            <div className="zt-card grow">
                <FilterArea title={t("Schedule")}
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
                    className={'zt-employeeTable zt-attendanceScheduleTable'}
                />
            </div>
        </section>
    )
}