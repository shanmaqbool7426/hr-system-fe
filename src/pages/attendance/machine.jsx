import { Button, CheckBox, DropDown, Table } from "@/components/elements"; 
import AddReasonTypeForm from "@/components/forms/attendance/reasonType";
import { CrossClose, Edit, SuccessTick, ThreeDotsVertical, Tick, Trash } from "@/components/svg";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AttendanceMachineModule () {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [add, setAdd] = useState(false)

    const headings = [
        { title: t("IP Address"), col: 'ipAddress'},
        { title: t("Port"), col: "port" },
        { title: t("Action"), col: "action" },
    ]

    const rows = [{
        ipAddress: '192.168.0.0',
        port: '8000',
        action: <DropDown icon={<ThreeDotsVertical />}>
            <ul className="zt-themeDropDownList zt-sm gap-4">
                <li className="!p-0">
                    <a onClick={() => { setEdit(item); setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                        <span><Edit /></span>
                        <span>{t("Sync")}</span>
                    </a>
                </li>
                {/* <li className="!p-0">
                    <a onClick={() => {
                        Toast.confirmDelete(() => {
                            dispatch(DeleteCustomfield(item._id, () => {
                                Toast.success(t("Allowance Title deleted successfully"))
                            }))
                        }, t)
                    }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                        <span><CrossClose/></span>
                        <span>{t("Inactive")}</span>
                    </a>
                </li> */}
            </ul>
        </DropDown>
    },
    {
        ipAddress: '192.168.0.0',
        port: '8000',
        action: <DropDown icon={<ThreeDotsVertical />}>
            <ul className="zt-themeDropDownList zt-sm gap-4">
                <li className="!p-0">
                    <a onClick={() => { setEdit(item); setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                        <span><Edit /></span>
                        <span>{t("Sync")}</span>
                    </a>
                </li>
                {/* <li className="!p-0">
                    <a onClick={() => {
                        Toast.confirmDelete(() => {
                            dispatch(DeleteCustomfield(item._id, () => {
                                Toast.success(t("Allowance Title deleted successfully"))
                            }))
                        }, t)
                    }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                        <span><CrossClose/></span>
                        <span>{t("Inactive")}</span>
                    </a>
                </li> */}
            </ul>
        </DropDown>
    },]

    return (
        <div className="zt-card grow">
            <h2 className="font-bold text-xl">Attendance Machine</h2>
            <Button className={"btn btn-primary absolute top-4 right-4"} onClick={() => setAdd(true)}>{t("Add New Type")}</Button>
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
                className={'zt-employeeTable zt-attendanceTable'}
            />
            {add && <AddReasonTypeForm
                    title={t('New Type')}
                    onClose={() => { setAdd(false) }}
            />}
        </div>
    )
}