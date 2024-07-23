import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, CheckBox, DropDown, Table } from "@/components/elements";
import CreateAttendanceForm from "@/components/forms/attendance/create";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import Toast from "@/util/toast";
import { useDispatch } from "react-redux";

export default function AttendanceSettingShiftPlanPage() {
    const { t } = useTranslation();
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [add, setAdd] = useState(false)
    const [edit, setEdit] = useState(false)
    const dispatch = useDispatch()
    const headings = [
    
        { title: t("Shift Title"), col: 'shiftTitle' },
        { title: t("Start Time"), col: "startTime" },
        { title: t("End Time"), col: "endTime" },
        { title: t("Shift End On Next Day"), col: "shiftEnd" },
        { title: t("Break"), col: 'Break' },
        { title: t("Break Countable"), col: 'BreakCountable' },
        { title: t("Action"), col: "action" },
    ]
    const rows = [
        {
          
            shiftTitle: 'Night Shift',
            Break: "No",
            BreakCountable: "No",
            startTime: "9:00:00 AM",
            endTime: "6:00:00 PM",
            shiftEnd: "Yes",
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4">
                    <li className="!p-0">
                        <a onClick={() => { setEdit(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                // dispatch(DeleteCustomfield(item._id, () => {
                                Toast.success(t("Allowance Title deleted successfully"))
                                // }))
                            }, t)
                        }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>,
        },
        {
        
            shiftTitle: 'Ramadan Flexible',
            Break: "yes",
            BreakCountable: "yes",
            startTime: "9:00:00 AM",
            endTime: "6:00:00 PM",
            shiftEnd: "No",
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4">
                    <li className="!p-0">
                        <a onClick={() => { setEdit(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
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
            </DropDown>,
        },
        {
           
            shiftTitle: 'Day Shift',
            Break: "yes",
            BreakCountable: "yes",
            startTime: "9:00:00 AM",
            endTime: "6:00:00 PM",
            shiftEnd: "No",
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4">
                    <li className="!p-0">
                        <a onClick={() => { setEdit(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
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
            </DropDown>,
        },
        {
          
            shiftTitle: ' Ramadan Flexible 9-4',
            Break: "yes",
            BreakCountable: "yes",
            startTime: "9:00:00 AM",
            endTime: "6:00:00 PM",
            shiftEnd: "No",
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4">
                    <li className="!p-0">
                        <a onClick={() => { setEdit(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
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
            </DropDown>,
        },
        {
         
            shiftTitle: 'Ramadan Flexible 5-5',
            Break: "yes",
            BreakCountable: "yes",
            startTime: "9:00:00 AM",
            endTime: "6:00:00 PM",
            shiftEnd: "No",
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4">
                    <li className="!p-0">
                        <a onClick={() => { setEdit(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
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
            </DropDown>,
        },
        {
          
            shiftTitle: 'Day Shift 11-7',
            Break: "yes",
            BreakCountable: "yes",
            startTime: "9:00:00 AM",
            endTime: "6:00:00 PM",
            shiftEnd: "No",
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4">
                    <li className="!p-0">
                        <a onClick={() => { setEdit(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
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
            </DropDown>,
        },
        {
          
            shiftTitle: 'Day Shift 9-6',
            Break: "yes",
            BreakCountable: "yes",
            startTime: "9:00:00 AM",
            endTime: "6:00:00 PM",
            shiftEnd: "No",
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4">
                    <li className="!p-0">
                        <a onClick={() => { setEdit(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
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
            </DropDown>,
        },
        {
           
            shiftTitle: 'Night Shift 7-3',
            Break: "yes",
            BreakCountable: "yes",
            startTime: "9:00:00 AM",
            endTime: "6:00:00 PM",
            shiftEnd: "No",
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4">
                    <li className="!p-0">
                        <a onClick={() => setEdit(true)} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
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
            </DropDown>,
        },
    ]
    return (
        <section className="flex flex-col grow relative">
            <div className="flex justify-between pb-6">
                <h1 className="text-h4 mb-0">{t("Attendance Settings")}</h1>
                <Button className={"btn btn-primary "} onClick={() => setAdd(true)}>{t("Add New Shift")}</Button>
            </div>
            <div className="zt-card grow">
                <div className="flex justify-between pb-6">
                    <h2 className="text-h4 mb-0">{t("Shift Plan")}</h2>
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
                    className={'zt-employeeTable zt-attendanceShiftTable'}
                />

                {add && <CreateAttendanceForm
                    onClose={() => { setAdd(false) }}
                />}

                {edit && <CreateAttendanceForm
                    onClose={() => { setEdit(false) }} object={true}
                />}
            </div>
        </section>
    );
}
