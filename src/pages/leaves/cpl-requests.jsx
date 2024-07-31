import { useTranslation } from "next-i18next";
import { Button, DropDown, Table } from "@/components/elements";
import { useState } from "react";
import CreateCPLLeaveForm from "@/components/forms/leaves/create-cpl-request";
import { ThreeDotsVertical } from "@/components/svg";

export default function LeaveCPLRequestsPage() {
  const { t } = useTranslation()
  const [create, setCreate] = useState(false)
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
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
  return (
    <section className="flex flex-col grow">
      <div className="flex justify-between items-center pb-6">
        <div className="">
          <h1 className="text-h4 mb-0">{t("CPL Requests")}</h1>
          <p className="mb-0">{t("Manage your  CPL Requests")}</p>
        </div>
        <div className="flex items-start gap-2">
          <Button className={"btn btn-primary"} onClick={() => setCreate(true)}>{t("Apply Leave")}</Button>
        </div>
      </div>
      <div className="zt-card grow">
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
      {create &&
        <CreateCPLLeaveForm
          title={t('Compensatory Leave Request')}
          type={'Compensatory Leave Request'}
          onClose={() => { setCreate(false) }}
        />
      }
    </section>
  )
}