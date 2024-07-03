import { useTranslation } from "next-i18next";
import { Button, DropDown, Table } from "@/components/elements";
import { useState } from "react";
import CreateGazetedLeaveForm from "@/components/forms/leaves/create-gazetted";
import { Edit, EyeOn, ThreeDotsVertical, Trash } from "@/components/svg";

export default function LeaveGazettedHolidaysPage() {
  const { t } = useTranslation()
  const [create, setCreate] = useState(false)
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const headings = [
    { title: t("Holiday Name"), col: "HolidayName" },
    { title: t("Date"), col: "Date" },
    { title: t("Day"), col: "Day" },
    { title: t("Action"), col: "action" },
  ]
  const rows = [
    {
      HolidayName: "Eid Holiday",
      Date: "25 March 2024",
      Day: "Monday",
      action: <DropDown icon={<ThreeDotsVertical />}>
        <ul className="zt-themeDropDownList zt-sm gap-1">
          <li className="!p-0">
            <a onClick={() => setView(true)} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themePrimary'}>
              <span><EyeOn /></span>
              <span>{t("View")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
              <span><Edit /></span>
              <span>{t("Edit")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
              <span><Trash /></span>
              <span>{t("Delete")}</span>
            </a>
          </li>
        </ul>
      </DropDown>,
    },
    {
      HolidayName: "Eid Holiday",
      Date: "25 March 2024",
      Day: "Monday",
      action: <DropDown icon={<ThreeDotsVertical />}>
        <ul className="zt-themeDropDownList zt-sm gap-1">
          <li className="!p-0">
            <a onClick={() => setView(true)} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themePrimary'}>
              <span><EyeOn /></span>
              <span>{t("View")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
              <span><Edit /></span>
              <span>{t("Edit")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
              <span><Trash /></span>
              <span>{t("Delete")}</span>
            </a>
          </li>
        </ul>
      </DropDown>,
    },
    {
      HolidayName: "Eid Holiday",
      Date: "25 March 2024",
      Day: "Monday",
      action: <DropDown icon={<ThreeDotsVertical />}>
        <ul className="zt-themeDropDownList zt-sm gap-1">
          <li className="!p-0">
            <a onClick={() => setView(true)} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themePrimary'}>
              <span><EyeOn /></span>
              <span>{t("View")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
              <span><Edit /></span>
              <span>{t("Edit")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
              <span><Trash /></span>
              <span>{t("Delete")}</span>
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
          <h1 className="text-h4 mb-0">{t("Gazetted Holidays")}</h1>
        </div>
        <div className="flex items-start gap-2">
          <Button className={"btn btn-primary"} onClick={() => setCreate(true)}>{t("Add Gazetted Holidays")}</Button>
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
          className={'zt-employeeTable zt-leaveTable'} />
      </div>
      {
        create && <CreateGazetedLeaveForm
          title={t('Add Gazetted Holidays')}
          type={'Add Gazetted Holidays'}
          onClose={() => { setCreate(false) }}
        />
      }
    </section>
  )
}