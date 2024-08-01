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
   
    { title: t("S# Employee"), col: "SEmployee" },
    { title: t("Employee Details"), col: "Employee_Details", },
    { title: t("Leave Details"), col: "Leave_Details" },
    { title: t("Status"), col: "Status" },
    { title: t("Modified On"), col: "Modified_On" },
    { title: t("Action"), col: "action" },
  ]
  const rows = [
    {
     
      SEmployee: <div className="flex flex-col items-center justify-center">
        <span className="font-medium">{t("Jhon Carter")}</span>
        <span className="text-themeGrayscale500">{t("10202325")}</span>
      </div>,
      Employee_Details:
        <div className="flex justify-center">
          <div className="grid grid-cols-2  gap-y-1 gap-x-4">
            <span className="text-themeGrayscale600 text-start">{t("Station")}</span>
            <span className="text-themeGrayscale900 text-start font-semibold">{t("Head Office ")}</span>
            <span className="text-themeGrayscale600 text-start">{t("Department")}</span>
            <span className="text-themeGrayscale900 text-start font-semibold">{t("Design")}</span>
          </div>
        </div>,
      Leave_Details:
        <div className="flex justify-center">
          <div className="grid grid-cols-2  gap-y-1 gap-x-4">
            <span className="text-themeGrayscale600 text-start">{t("Leave From")}</span>
            <span className="text-themeGrayscale900 text-start font-semibold">{t("05 March 2024 (Friday)")}</span>
            <span className="text-themeGrayscale600 text-start">{t("Leave To")}</span>
            <span className="text-themeGrayscale900 text-start font-semibold">{t("05 March 2024 (Friday)")}</span>
            <span className="text-themeGrayscale600 text-start">{t("Leave Type")}</span>
            <span className="text-themeGrayscale900 text-start font-semibold">{t("Sick Leave")}</span>
            <span className="text-themeGrayscale600 text-start">{t("Duration")}</span>
            <span className="text-themeGrayscale900 text-start font-semibold">{t("1.00 Day Leave")}</span>
          </div>
        </div>,
      Status: <span className="zt-tag zt-tag-success uppercase !rounded-md">{t("APPROVED")}</span>,
      Modified_On: <div className="flex justify-center"><div className="flex flex-col  items-start"><span>{t("22 March 2024")}<span className="text-themeGrayscale500">{t("7:00PM")}</span></span>
        <span className="text-themeGrayscale500">{t("By")} <span className="text-[#7239EA]">{t("Jhon Carter")}</span></span>
      </div></div>,
      action: <DropDown icon={<ThreeDotsVertical />}>
        <ul className="zt-themeDropDownList zt-sm text-sm gap-1 w-44">
          <li className="!p-0">
            <a onClick={() => setView(true)} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themePrimary'}>
              {/* <span><EyeOn /></span> */}
              <span>{t("View")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
              {/* <span><Edit /></span> */}
              <span>{t("Edit")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
              {/* <span><Edit /></span> */}
              <span>{t("Approved")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
              {/* <span><Edit /></span> */}
              <span>{t("Reject")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
              {/* <span><Edit /></span> */}
              <span>{t("Cancel")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
              {/* <span><Edit /></span> */}
              <span>{t("Forcefully approved")}</span>
            </a>
          </li>
        </ul>
      </DropDown>,
    },
    {
      SEmployee: <div className="flex flex-col items-center justify-center">
        <span className="font-medium">{t("Jhon Carter")}</span>
        <span className="text-themeGrayscale500">{t("10202325")}</span>
      </div>,
      Employee_Details:
        <div className="flex justify-center">
          <div className="grid grid-cols-2  gap-y-1 gap-x-4">
            <span className="text-themeGrayscale600 text-start">{t("Station")}</span>
            <span className="text-themeGrayscale900 text-start font-semibold">{t("Head Office ")}</span>
            <span className="text-themeGrayscale600 text-start">{t("Department")}</span>
            <span className="text-themeGrayscale900 text-start font-semibold">{t("Design")}</span>
          </div>
        </div>,
      Leave_Details:
        <div className="flex justify-center">
          <div className="grid grid-cols-2  gap-y-1 gap-x-4">
            <span className="text-themeGrayscale600 text-start">{t("Leave From")}</span>
            <span className="text-themeGrayscale900 text-start font-semibold">{t("05 March 2024 (Friday)")}</span>
            <span className="text-themeGrayscale600 text-start">{t("Leave To")}</span>
            <span className="text-themeGrayscale900 text-start font-semibold">{t("05 March 2024 (Friday)")}</span>
            <span className="text-themeGrayscale600 text-start">{t("Leave Type")}</span>
            <span className="text-themeGrayscale900 text-start font-semibold">{t("Sick Leave")}</span>
            <span className="text-themeGrayscale600 text-start">{t("Duration")}</span>
            <span className="text-themeGrayscale900 text-start font-semibold">{t("1.00 Day Leave")}</span>
          </div>
        </div>,
      Status: <span className="zt-tag zt-tag-warning uppercase !rounded-md">{t("PENDING")}</span>,
      Modified_On: <div className="flex justify-center"><div className="flex flex-col  items-start"><span>{t("22 March 2024")}<span className="text-themeGrayscale500">{t("7:00PM")}</span></span>
        <span className="text-themeGrayscale500">{t("By")} <span className="text-[#7239EA]">{t("Jhon Carter")}</span></span>
      </div></div>,
      action: <DropDown icon={<ThreeDotsVertical />}>
        <ul className="zt-themeDropDownList zt-sm text-sm gap-1 w-44">
          <li className="!p-0">
            <a onClick={() => setView(true)} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themePrimary'}>
              {/* <span><EyeOn /></span> */}
              <span>{t("View")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
              {/* <span><Edit /></span> */}
              <span>{t("Edit")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
              {/* <span><Edit /></span> */}
              <span>{t("Approved")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
              {/* <span><Edit /></span> */}
              <span>{t("Reject")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
              {/* <span><Edit /></span> */}
              <span>{t("Cancel")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
              {/* <span><Edit /></span> */}
              <span>{t("Forcefully approved")}</span>
            </a>
          </li>
        </ul>
      </DropDown>,
    },
    {
      
      SEmployee: <div className="flex flex-col items-center justify-center">
        <span className="font-medium">{t("Jhon Carter")}</span>
        <span className="text-themeGrayscale500">{t("10202325")}</span>
      </div>,
      Employee_Details:
        <div className="flex justify-center">
          <div className="grid grid-cols-2  gap-y-1 gap-x-4">
            <span className="text-themeGrayscale600 text-start">{t("Station")}</span>
            <span className="text-themeGrayscale900 text-start font-semibold">{t("Head Office ")}</span>
            <span className="text-themeGrayscale600 text-start">{t("Department")}</span>
            <span className="text-themeGrayscale900 text-start font-semibold">{t("Design")}</span>
          </div>
        </div>,
      Leave_Details:
        <div className="flex justify-center">
          <div className="grid grid-cols-2  gap-y-1 gap-x-4">
            <span className="text-themeGrayscale600 text-start">{t("Leave From")}</span>
            <span className="text-themeGrayscale900 text-start font-semibold">{t("05 March 2024 (Friday)")}</span>
            <span className="text-themeGrayscale600 text-start">{t("Leave To")}</span>
            <span className="text-themeGrayscale900 text-start font-semibold">{t("05 March 2024 (Friday)")}</span>
            <span className="text-themeGrayscale600 text-start">{t("Leave Type")}</span>
            <span className="text-themeGrayscale900 text-start font-semibold">{t("Sick Leave")}</span>
            <span className="text-themeGrayscale600 text-start">{t("Duration")}</span>
            <span className="text-themeGrayscale900 text-start font-semibold">{t("1.00 Day Leave")}</span>
          </div>
        </div>,
      Status: <span className="zt-tag zt-tag-danger uppercase !rounded-md">{t("CANCELLED")}</span>,
      Modified_On: <div className="flex justify-center"><div className="flex flex-col  items-start"><span>{t("22 March 2024")}<span className="text-themeGrayscale500">{t("7:00PM")}</span></span>
        <span className="text-themeGrayscale500">{t("By")} <span className="text-[#7239EA]">{t("Jhon Carter")}</span></span>
      </div></div>,
      action: <DropDown icon={<ThreeDotsVertical />}>
        <ul className="zt-themeDropDownList zt-sm text-sm gap-1 w-44">
          <li className="!p-0">
            <a onClick={() => setView(true)} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themePrimary'}>
              {/* <span><EyeOn /></span> */}
              <span>{t("View")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
              {/* <span><Edit /></span> */}
              <span>{t("Edit")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
              {/* <span><Edit /></span> */}
              <span>{t("Approved")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
              {/* <span><Edit /></span> */}
              <span>{t("Reject")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
              {/* <span><Edit /></span> */}
              <span>{t("Cancel")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
              {/* <span><Edit /></span> */}
              <span>{t("Forcefully approved")}</span>
            </a>
          </li>
        </ul>
      </DropDown>,
    },
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
