import { useTranslation } from "next-i18next";
import { Button, Table } from "@/components/elements";
import FilterArea from "@/components/includes/FilterArea";
import { useEffect, useState } from "react";
import CreateLeaveRequestForm from "@/components/forms/leaves/create-request";
import { useDispatch } from "react-redux";
import { FetchLeavePolicies } from "@/store/actions/leave-policy.actions";
import { FetchLeaveRequests } from "@/store/actions/leave-request.actions";

export default function LeaveRequestsPage() {
  const { t } = useTranslation()
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [create, setCreate] = useState(false)
  const dispatch = useDispatch()
  const headings = [
    { title: t("Employee"), col: "employee", sort: true },
    { title: t("Leave Type"), col: "leave_type", sort: false },
    { title: t("Duration"), col: "duration", sort: false },
    { title: t("Applied at"), col: "applied_at", sort: false },
    { title: t("Status"), col: "status", sort: false },
    { title: t("Action"), col: "action" },
  ]
  const rows = []
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
          <h1 className="text-h4 mb-0">{t("Leave Requests")}</h1>
          <p className="mb-0">{t("Manage your leaves")}</p>
        </div>
        <div className="flex items-start gap-2">
          <Button className={"btn btn-primary"} onClick={() => setCreate(true)}>{t("Apply Leave")}</Button>
        </div>
      </div>

      <div className="w-full bg-white p-6 rounded-lg grow">
        <FilterArea title={t("Leave Requests")}
          elements={[]}
          filters={[]}
          setFilters={() => { }}
          filterHandler={() => { }}
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
          className={'zt-employeeTable'}
        />
      </div>
      {create && <CreateLeaveRequestForm onClose={() => { setCreate(false) }} />}
    </section>
  )
}
