import { Button, Dialog, DisplayDate, DropDown, ModifiedBy, Table, Textarea } from '@/components/elements'
import CreateRemoteWorkRequestForm from '@/components/forms/attendance/create-remote-work-request'
import ViewRemoteWorkForm from '@/components/forms/attendance/viewRemoteWork'
import FilterArea from '@/components/includes/FilterArea'
import { CrossClose, Edit, EyeOn, ThreeDotsVertical, Tick, Trash } from '@/components/svg'
import { FetchEmployees } from '@/store/actions/employee.actions'
import { DeleteRemoteWorkRequest, FetchRemoteWorkRequests, UpdateRemoteRequestStatus } from '@/store/actions/remote-request.actions'
import { FetchRemoteTeams } from '@/store/actions/remote-team.actions'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

export default function RemoteWorkRequestPage() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [create, setCreate] = useState(false)
    const [view, setView] = useState(false)
    const [edit, setEdit] = useState(null)
    const [action, setAction] = useState(null)
    const [reason, setReason] = useState("")
    const { request_list } = useSelector(state => state.remoterequest)
    const { team_list } = useSelector(state => state.remoteteam)
    const [selected, setSelected] = useState([])
    const [filters, setFilters] = useState({
        search: "",
        team: null,
        status: null,
    })
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
        },
        {
            type: "select",
            placeholder: "All Teams",
            name: "All Teams",
            value: filters.team,
            list: team_list.map(item => {
                return { value: item._id, display: item.name }
            }),
            onChange: (status) => {
                let _filter = { ...filters }
                _filter['team'] = status
                setFilters(_filter)
            }
        },
        {
            type: "select",
            name: "All Status",
            placeholder: "All Status",
            value: filters.status,
            list: [{ display: 'Pending', value: 'pending' }, { display: 'Approved', value: 'approved' }, { display: 'Rejected', value: 'rejected' }],
            onChange: (status) => {
                let _filter = { ...filters }
                _filter['status'] = status
                setFilters(_filter)
            }
        },
    ]

    const headings = [

        { title: t("Employee"), col: "employee", },
        { title: t("Team"), col: "team", },
        { title: t("Start Date"), col: "startDate", },
        { title: t("End Date"), col: "endDate", },
        { title: t("Status"), col: "status" },
        { title: t("Modified On"), col: "modifiedBy" },
        { title: t("Action"), col: "action" }
    ]

    let filteredRows = request_list?.filter((item) => (!filters.search || item.employee.firstName.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.employee.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.employee.employeeCode.toLowerCase().includes(filters.search.toLowerCase())
    ))
        .filter((item) => !filters.team || item.team?._id === filters.team)
        .filter((item) => !filters.status || item.status === filters.status)
        .sort((a, b) => {
            if (!sortCol) return 0;
            if (sortDir === "asc") return a[sortCol]?.localeCompare(b[sortCol]);
            else return b[sortCol]?.localeCompare(a[sortCol]);
        });

    const indexOfLastItem = page * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const paginatedData = filteredRows?.slice(indexOfFirstItem, indexOfLastItem);

    const rows = paginatedData?.map((item) => ({
        _id: item._id,
        employee: <div className="flex items-center justify-center gap-4 grow">
            <div className={'flex flex-col gap-1 text-left'}>
                <strong className={''}>{item.user.firstName} {item.user.lastName}</strong>
                <span className={'text-themeGrayscale500 '}>{item.user.employeeCode}</span>
            </div>
        </div>,
        team: item.team ? item.team.name : "-------",
        startDate: <DisplayDate date={item.startDate} />,
        endDate: item.endDate ? <DisplayDate date={item.endDate} /> : "-------",
        status: <span className={`zt-tag zt-tag-${item.status === 'pending' ? 'warning' : item.status === 'approved' ? 'success' : 'danger'}`}>{item.status}</span>,
        modifiedBy: item.modifiedBy ? <ModifiedBy user={item.modifiedBy} date={item.updatedAt} /> : "-------",
        action: <DropDown icon={<ThreeDotsVertical />}>
            <ul className="zt-themeDropDownList zt-sm gap-4 w-[123px]">
                <li className="!p-0">
                    <a onClick={() => { setView(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                        <span><EyeOn /></span>
                        <span>{t("View")}</span>
                    </a>
                </li>
                {item.status === "pending" && <>
                    <li className="!p-0">
                        <a onClick={() => { setEdit(item); setCreate(true); }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            setAction("approve")
                            setEdit(item)
                        }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Tick /></span>
                            <span>{t("Approve")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            setAction("reject")
                            setEdit(item)
                        }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                            <span><CrossClose /></span>
                            <span>{t("Reject")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() =>
                            Toast.confirmDelete(() => {
                                dispatch(DeleteRemoteWorkRequest(item._id, () => {
                                    Toast.success(t("Remote Work Request deleted successfully"))
                                }))
                            }, t)
                        } className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </>}
            </ul>
        </DropDown>
    }))

    const approveHandler = () => {
        dispatch(UpdateRemoteRequestStatus(edit._id, { status: "approved", reason: reason }, () => {
            setAction(null)
            setEdit(null)
            setReason("")
            Toast.success(t("Remote Work Request approved successfully"))
        }))
    }
    const rejectHandler = () => {
        dispatch(UpdateRemoteRequestStatus(edit._id, { status: "rejected", reason: reason }, () => {
            setAction(null)
            setEdit(null)
            setReason("")
            Toast.success(t("Remote Work Request rejected successfully"))
        }))
    }
    useEffect(() => {
        dispatch(FetchRemoteWorkRequests())
        dispatch(FetchRemoteTeams())
        dispatch(FetchEmployees())
    }, [dispatch])
    return (
        <section className="flex flex-col grow">
            <div className="flex justify-between pb-6">
                <h1 className="text-h4 mb-0">{t("Remote Work Request")}</h1>
                <Button className={"btn btn-primary"} onClick={() => setCreate(true)}>{t("Add Remote Work Request")}</Button>
            </div>

            <div className="zt-card grow">
                <FilterArea title={t("Remote Work Request")}
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
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>
            {view && <ViewRemoteWorkForm
                onClose={() => { setView(false); setEdit(null) }}
                object={edit}
            />}

            {create && <CreateRemoteWorkRequestForm
                onClose={() => { setCreate(false); setEdit(null) }}
                object={edit}
            />}
            {action === 'approve' && <Dialog
                onClose={() => { setAction(null); setEdit(null); setReason("") }}
                title={t("Approve Remote Work Request")}
            >
                <article className="space-y-4">
                    <Textarea
                        label={t("Reason")}
                        name="reason"
                        value={reason}
                        onChange={(e) => { setReason(e.target.value) }}
                    />
                    <div className="flex justify-end gap-4">
                        <Button onClick={() => { setAction(null); setEdit(null); setReason("") }}>{t("Cancel")}</Button>
                        <Button variant={"primary"} onClick={approveHandler}>{t("Approve")}</Button>
                    </div>
                </article>
            </Dialog>}
            {action === 'reject' && <Dialog
                onClose={() => { setAction(null); setEdit(null) }}
                title={t("Reject Remote Work Request")}
            >
                <article className="space-y-4">
                    <Textarea
                        label={t("Reason")}
                        name="reason"
                        value={reason}
                        onChange={(e) => { setReason(e.target.value) }}
                    />
                    <div className="flex justify-end gap-4">
                        <Button onClick={() => { setAction(null); setEdit(null); setReason("") }}>{t("Cancel")}</Button>
                        <Button variant={"danger"} onClick={rejectHandler}>{t("Reject")}</Button>
                    </div>
                </article>
            </Dialog>}
        </section>
    )
}