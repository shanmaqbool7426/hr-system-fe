import { Button, Table } from '@/components/elements'
import CreateAttendanceRequestForm from '@/components/forms/attendance/create-attendance-request'
import ViewAttendanceForm from '@/components/forms/attendance/view'
import FilterArea from '@/components/includes/FilterArea'
import { ThreeDotsVertical } from '@/components/svg'
import Toast from '@/util/toast'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { FetchRequests } from '@/store/actions/attendance-request.actions'
import { usePagination } from '@/hooks/usePagination'
export default function AttendanceRequestsPage() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [create, setCreate] = useState(false)
    const [view, setView] = useState(false)
    const [edit, setEdit] = useState(false)
    const { request_list } = useSelector(state => state.attendancerequest)
    const paginatedData = usePagination(request_list, page, perPage, sortCol, sortDir)
    const [filters, setFilters] = useState({
        search: "",
        project: null,
        department: null,
        status: null,
    })

    useEffect(() => {
        dispatch(FetchRequests())
    }, [dispatch])

    const pagination = {
        totalRecords: request_list.length,
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
        }
    ]

    const headings = [
        { title: t("Employee"), col: "employee", /* sort: true */ },
        { title: t("Attendance Date"), col: "date", /* sort: true */ },
        { title: t("Change Type"), col: "changeType", /* sort: true */ },
        { title: t("Status"), col: "status" },
        { title: t("Modified On"), col: "modifiedOn" },
        { title: t("Action"), col: "action" }
    ]

    const rows = paginatedData.map((item) => ({
        employee: item.employee.firstName + " " + item.employee.lastName,
        date: item.date,
        changeType: item.changeType,
        status: item.status,
        modifiedOn: item.modifiedOn,
        action: ""
    }))

    return (
        <section className="flex flex-col grow">
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

            {create && <CreateAttendanceRequestForm object={edit} onClose={() => { setCreate(false) }} />}
        </section>
    )
}