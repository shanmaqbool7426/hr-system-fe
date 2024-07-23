import { Button, CheckBox, DropDown, Table } from "@/components/elements";
import CreateTypeForm from "@/components/forms/attendance/createType";
import AddReasonTypeForm from "@/components/forms/attendance/reasonType";
import { CrossClose, Edit, SuccessTick, ThreeDotsVertical } from "@/components/svg";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AttendanceSettingReasonTypePage() {
  const { t } = useTranslation();
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [add, setAdd] = useState(false)
  const [addExemption, setAddExemption] = useState(false)

  const headings = [
    { title: t(""), col: "sr", check: true },
    { title: t("Sr#"), col: "SerailNo" },
    { title: t("Request Type"), col: 'RequestType' },
    { title: t("Reason Name"), col: 'ReasonType' },
    { title: t("Min Working Hrs"), col: "MinWorkingHrs" },
    { title: t("Status"), col: "Status" },
    { title: t("Modified On"), col: "ModifiedOn" },
    { title: t("Action"), col: "action" },
  ]
  const rows = [{
    sr: <div className="flex items-center">
      <CheckBox
        id={`1`}
        size={'sm'}
        variant={'dark'}
      />
    </div>,
    SerailNo: '1',
    RequestType: 'Attendance Request',
    ReasonType: 'Late Night Sitting',
    MinWorkingHrs: "4:00:00 Hours",
    Status: <span className="flex justify-center"><SuccessTick className={'text-tickCussess'} /></span>,
    ModifiedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
      <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
    </div></div>,
    action:
      <DropDown icon={<ThreeDotsVertical />}>
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
              <span><CrossClose /></span>
              <span>{t("Inactive")}</span>
            </a>
          </li>
        </ul>
      </DropDown>,
  },
  {
    
    sr: <div className="flex items-center">
      <CheckBox
        id={`2`}
        size={'sm'}
        variant={'dark'}
      />
    </div>,
    SerailNo: '2',
    RequestType: 'Exemption Request',
    ReasonType: 'Worked on Weekend',
    MinWorkingHrs: "4:00:00 Hours",
    Status: <span className="flex justify-center"><SuccessTick className={'text-tickCussess'} /></span>,
    ModifiedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
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
            <span><CrossClose /></span>
            <span>{t("Inactive")}</span>
          </a>
        </li>
      </ul>
    </DropDown>,
  },
  {
    
    sr: <div className="flex items-center">
      <CheckBox
        id={`3`}
        size={'sm'}
        variant={'dark'}
      />
    </div>,
    SerailNo: '3',
    RequestType: 'Attendance Request',
    ReasonType: 'Special Request',
    MinWorkingHrs: "4:00:00 Hours",
    Status: <span className="flex justify-center"><SuccessTick className={'text-tickCussess'} /></span>,
    ModifiedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
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
            <span><CrossClose /></span>
            <span>{t("Inactive")}</span>
          </a>
        </li>
      </ul>
    </DropDown>,
  },
  ]
  return (
    <section className="flex flex-col grow relative">
      <div className="flex justify-between pb-6">
        <h1 className="text-h4 mb-0">{t("Attendance Settings")}</h1>
        <div className="flex gap-4">
          <Button className={"btn btn-primary"} onClick={() => setAdd(true)}>{t("Add Attendance Type")}</Button>
          <Button className={"btn btn-primary "} onClick={() => setAddExemption(true)}>{t("Add Exemption Type")}</Button>
        </div>
      </div>
      <div className="zt-card grow">
        <div className="flex justify-between pb-6">
          <h2 className="text-h4 mb-0">{t("Attendance/ Exemption Reason Type")}</h2>
        </div>
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
          className={'zt-employeeTable zt-exemptionTable'}
        />
        {addExemption && <CreateTypeForm
          onClose={() => { setAddExemption(false) }}
        />}
        {add && <AddReasonTypeForm
          title={t('New Type')}
          onClose={() => { setAdd(false) }}
        />}
      </div>
    </section>
  );
}
