import { useTranslation } from "next-i18next";
import { Button, CheckBox, DropDown, Table } from "@/components/elements";
import FilterArea from "@/components/includes/FilterArea";
import { useEffect, useState } from "react";
import CreateLeaveForm from "@/components/forms/leaves/create";
import { useDispatch, useSelector } from "react-redux";
import { DeletePolicy, FetchLeavePolicies } from "@/store/actions/leave-policy.actions";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import Toast from "@/util/toast";

export default function LeavesPage() {
  const { t } = useTranslation()
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(null)
  const dispatch = useDispatch()
  const { leave_policies } = useSelector(state => state.leavepolicy)
  const headings = [
   
    { title: t("Title"), col: "name", sort: true },
    { title: t("Entitled Days"), col: "entitled", sort: false },
    { title: t("Encashable"), col: "encashable", sort: false },
    { title: t("Carry Forward"), col: "carryForward", sort: false },
    { title: t("Entitled To"), col: "entitledToStatus", sort: false },
    { title: t("Action"), col: "action" },
  ]
  const rows = leave_policies.map((item, i) => {
    return { 
      name: item.name,
      entitled: item.entitled,
      encashable: item.encashable ? "Yes" : "No",
      carryForward: item.carryForward ? "Yes" : "No",
      entitledToStatus: <div className="flex gap-x-2 items-center justify-center">{item.entitledToStatus.map((value) =>
        <span key={value._id} className="px-4 py-2 text-white bg-themePurple/90 rounded-full">{value.name}</span>)}</div>,
      action: <DropDown icon={<ThreeDotsVertical />}>
        <ul className="zt-themeDropDownList zt-sm gap-4">
          <li className="!p-0">
            <a onClick={() => { setEdit(item); setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
              <span><Edit /></span>
              <span>Edit</span>
            </a>
          </li>
          <li className="!p-0">
            <a onClick={() => {
              Toast.confirmDelete(() => {
                dispatch(DeletePolicy(item._id, () => {
                  Toast.success(t("Leave policy deleted successfully"))
                }))
              }, t)
            }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
              <span><Trash /></span>
              <span>Delete</span>
            </a>
          </li>
        </ul>
      </DropDown>
    }
  })
  const pagination = {
    totalRecords: 0,
    showPerPage: true,
    prevAction: () => page > 1 && setPage(page - 1),
    clickAction: (value) => setPage(value),
    nextAction: () => setPage(page + 1),
  }

  useEffect(() => {
    dispatch(FetchLeavePolicies())
  }, [dispatch])
  return (
    <section className="flex flex-col grow">
      <div className="flex justify-between items-center pb-6">
        <div className="">
          <h1 className="text-h4 mb-0">{t("Leave Policies")}</h1>
          <p className="mb-0">{t("Manage your leaves")}</p>
        </div>
        <div className="flex items-start gap-2">
          <Button className={"btn btn-primary"} onClick={() => setCreate(true)}>{t("Add Leave")}</Button>
        </div>
      </div>

      <div className=" zt-card grow">
        <FilterArea title={t("Leave Policies")}
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
      {create && <CreateLeaveForm onClose={() => { setCreate(false); setEdit(null) }} leave={edit} />}
    </section>
  )
}
