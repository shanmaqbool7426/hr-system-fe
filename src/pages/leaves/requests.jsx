import { useTranslation } from "next-i18next";
import { Button,  DropDown, Table } from "@/components/elements";
import FilterArea from "@/components/includes/FilterArea";
import { useEffect, useState } from "react";
import CreateLeaveRequestForm from "@/components/forms/leaves/create-request";
import { useDispatch, useSelector } from "react-redux";
import { FetchLeavePolicies } from "@/store/actions/leave-policy.actions";
import { FetchLeaveRequests } from "@/store/actions/leave-request.actions"; 
import { ThreeDotsVertical } from "@/components/svg";
import CreateLeaveDetailForm from "@/components/forms/leaves/create-request-detail";

export default function LeaveRequestsPage() {
  const { t } = useTranslation()
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [create, setCreate] = useState(false)
  const dispatch = useDispatch()
  const [view, setView] = useState(false)
  const { customfield_list } = useSelector(state => state.customfield)
  const [filters, setFilters] = useState({
    search: "",
    project: null,
    department: null,
    status: null,
  })
  const filterElements = [
    {
      type: "search",
      name: "search",
      value: filters.search,
      placeholder: t("Search Employee"),
      onChange: (event) => {
        let _filter = { ...filters }
        _filter['search'] = event.target.value
        setFilters(_filter)
      }
    },
    {
      type: "select",
      name: "CreateFilters",
      placeholder: "Create Filters",
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
      placeholder: "Department",
      name: "Department",
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
    {
      type: "date",
      placeholder: "From Date",
      name: "FromDate",
      onChange: (status) => {
        let _filter = { ...filters }
        _filter['status'] = status
        setFilters(_filter)
      }
    },
    {
      type: "date",
      placeholder: "To Date",
      name: "ToDate",
      onChange: (status) => {
        let _filter = { ...filters }
        _filter['status'] = status
        setFilters(_filter)
      }
    },
  ]
  const headings = [
    { title: t("Employee"), col: "employee" },
    { title: t("Department"), col: "department" },
    { title: t("From"), col: "fromDate" },
    { title: t("To"), col: "toDate" },
    { title: t("Working Days"), col: "workingDays" },
    { title: t("Status"), col: "status" },
    { title: t("Action"), col: "action" },
  ]
  const rows = [
    
  ]

  const pagination = {
    totalRecords: 0,
    showPerPage: true,
    prevAction: () => page > 1 && setPage(page - 1),
    clickAction: (value) => setPage(value),
    nextAction: () => setPage(page + 1),
  }
  useEffect(() => {
    dispatch(FetchLeavePolicies())
    dispatch(FetchLeaveRequests())
  }, [dispatch])
  return (
    <section className="flex flex-col grow">
      <div className="flex justify-between items-center pb-6">
        <div className="">
          <h1 className="text-h4 mb-0">{t("Leave Request")}</h1>
        </div>
        <div className="flex items-start gap-2">
          <Button className={"btn btn-primary"} onClick={() => setCreate(true)}>{t("Apply Leave")}</Button>
        </div>
      </div>
      <div className="zt-card grow">
        <FilterArea title={t("Leave Request")}
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
          className={'zt-employeeTable zt-leaveTable'}
        />
      </div>
      {create && <CreateLeaveRequestForm onClose={() => { setCreate(false) }} />}
      {view && <CreateLeaveDetailForm onClose={() => { setView(false) }} />}
    </section>
  )
}
