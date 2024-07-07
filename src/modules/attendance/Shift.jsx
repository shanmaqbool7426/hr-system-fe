import { Button, CheckBox, DropDown, Table } from "@/components/elements";
import CreateAttendanceForm from "@/components/forms/attendance/create";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ShiftModule() {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [add, setAdd] = useState(false)

    const headings = [
        { title: t("Shift Title"), col: 'shiftTitle', check: true },
        { title: t("Shift Code"), col: 'shiftCode' },
        { title: t("Start Time"), col: "startTime" },
        { title: t("End Time"), col: "endTime" },
        { title: t("Shift End On Next Day"), col: "shiftEnd" },
        { title: t("Action"), col: "action" },
    ]
    const rows = [{
        shiftTitle: <div className="flex items-center">
            <CheckBox
                size={'sm'}
                variant={'dark'}
                labelClass={'text-base leading-none text-themeGrayscale/70'}
                id="night-shift"
                name={"night-shift"}
                label='&nbsp; 1 &nbsp; Night Shift'
            />
        </div>,
        shiftCode: "001",
        startTime: "9:00:00 AM",
        endTime: "6:00:00 PM",
        shiftEnd: "Yes",
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
                        <span><Trash /></span>
                        <span>{t("Delete")}</span>
                    </a>
                </li>
            </ul>
        </DropDown>,
    },
    {
        shiftTitle: <div className="flex items-center">
        <CheckBox
            size={'sm'}
            variant={'dark'}
            labelClass={'text-base leading-none text-themeGrayscale/70'}
            id="ramadan-shift"
            name={"ramadan-shift"}
            label='&nbsp; 2 &nbsp; Ramadan Flexible'
        /></div>,
        shiftCode: "002",
        startTime: "9:00:00 AM",
        endTime: "6:00:00 PM",
        shiftEnd: "No",
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
                        <span><Trash /></span>
                        <span>{t("Delete")}</span>
                    </a>
                </li>
            </ul>
        </DropDown>,
    },
    {
        shiftTitle: <div className="flex items-center">
        <CheckBox
            size={'sm'}
            variant={'dark'}
            labelClass={'text-base leading-none text-themeGrayscale/70'}
            id="day-shift"
            name={"day-shift"}
            label='&nbsp; 3 &nbsp; Day Shift'
        /></div>,
        shiftCode: "003",
        startTime: "9:00:00 AM",
        endTime: "6:00:00 PM",
        shiftEnd: "No",
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
                        <span><Trash /></span>
                        <span>{t("Delete")}</span>
                    </a>
                </li>
            </ul>
        </DropDown>,
    },
    {
        shiftTitle: <div className="flex items-center">
        <CheckBox
            size={'sm'}
            variant={'dark'}
            labelClass={'text-base leading-none text-themeGrayscale/70'}
            id="ramadan-shift-9-4"
            name={"ramadan-shift-9-4"}
            label='&nbsp; 4 &nbsp; Ramadan Flexible 9-4'
        /></div>,
        shiftCode: "004",
        startTime: "9:00:00 AM",
        endTime: "6:00:00 PM",
        shiftEnd: "No",
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
                        <span><Trash /></span>
                        <span>{t("Delete")}</span>
                    </a>
                </li>
            </ul>
        </DropDown>,
    },
    {
        shiftTitle: <div className="flex items-center">
        <CheckBox
            size={'sm'}
            variant={'dark'}
            labelClass={'text-base leading-none text-themeGrayscale/70'}
            id="ramadan-shift-5-5"
            name={"ramadan-shift-5-5"}
            label='&nbsp; 5 &nbsp; Ramadan Flexible 5-5'
        /></div>,
        shiftCode: "005",
        startTime: "9:00:00 AM",
        endTime: "6:00:00 PM",
        shiftEnd: "No",
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
                        <span><Trash /></span>
                        <span>{t("Delete")}</span>
                    </a>
                </li>
            </ul>
        </DropDown>,
    },
    {
        shiftTitle: <div className="flex items-center">
        <CheckBox
            size={'sm'}
            variant={'dark'}
            labelClass={'text-base leading-none text-themeGrayscale/70'}
            id="day-shift-11-7"
            name={"day-shift-11-7"}
            label='&nbsp; 6 &nbsp; Day Shift 11-7'
        /></div>,
        shiftCode: "006",
        startTime: "9:00:00 AM",
        endTime: "6:00:00 PM",
        shiftEnd: "No",
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
                        <span><Trash /></span>
                        <span>{t("Delete")}</span>
                    </a>
                </li>
            </ul>
        </DropDown>,
    },
    {
        shiftTitle: <div className="flex items-center">
        <CheckBox
            size={'sm'}
            variant={'dark'}
            labelClass={'text-base leading-none text-themeGrayscale/70'}
            id="day-shift-9-6"
            name={"day-shift-9-6"}
            label='&nbsp; 7 &nbsp; Day Shift 9-6'
        /></div>,
        shiftCode: "007",
        startTime: "9:00:00 AM",
        endTime: "6:00:00 PM",
        shiftEnd: "No",
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
                        <span><Trash /></span>
                        <span>{t("Delete")}</span>
                    </a>
                </li>
            </ul>
        </DropDown>,
    },
    {
        shiftTitle: <div className="flex items-center">
        <CheckBox
            size={'sm'}
            variant={'dark'}
            labelClass={'text-base leading-none text-themeGrayscale/70'}
            id="night-shift-7-3"
            name={"night-shift-7-3"}
            label='&nbsp; 8 &nbsp; Night Shift 7-3'
        /></div>,
        shiftCode: "008",
        startTime: "9:00:00 AM",
        endTime: "6:00:00 PM",
        shiftEnd: "No",
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
                        <span><Trash /></span>
                        <span>{t("Delete")}</span>
                    </a>
                </li>
            </ul>
        </DropDown>,
    },
    ]

    return (
        <div className="zt-card grow">
            {/* <div className="flex justify-between items-center pb-6">
				<div className="">
					<h1 className="text-h4 mb-0">{t("Manage Employee Roles")}</h1>
					<p className="mb-0">{t("Manage your employees Role")}</p>
				</div>
				<div className="flex items-start gap-2">
					<Button className={"btn btn-dark-outline"}>{t("Export")}</Button>
					<Button className={"btn btn-dark-outline"}>{t("Import")}</Button>
					<Button className={"btn btn-primary"} onClick={() => setCreate('roles')}>{t("Create New Role")}</Button>
				</div>
			</div> */}
            <div className="flex justify-between pb-6">
                <h2 className="text-h4 mb-0">{t("Shift Plan")}</h2>
                <Button className={"btn btn-primary absolute top-4 right-4"} onClick={() => setAdd(true)}>{t("Add New Shift")}</Button>
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
        </div>
    )
}
