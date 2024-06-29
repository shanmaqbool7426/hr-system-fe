import { Button, CheckBox, DropDown, Table } from "@/components/elements"; 
import AddReasonTypeForm from "@/components/forms/attendance/reasonType";
import { CrossClose, Edit, SuccessTick, ThreeDotsVertical, Tick, Trash } from "@/components/svg";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AttendanceModule() {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [add, setAdd] = useState(false)

    const headings = [
        { title: t("Reason Type"), col: 'ReasonType', check: true }, 
        { title: t("Status"), col: "Status" },
        { title: t("Modified On"), col: "ModifiedOn" },
        { title: t("Action"), col: "action" },
    ]
    const rows = [{
        ReasonType: <div className="flex items-center">
            <CheckBox
                size={'sm'}
                variant={'dark'}
                labelClass={'text-base leading-none text-themeGrayscale/70'}
                id="night-shift"
                name={"night-shift"}
                label='&nbsp; 1 &nbsp; Other'
            />
        </div>, 
        Status: <span className="flex justify-center"><SuccessTick /></span>,
        ModifiedOn: <div className="flex justify-center"><div className="flex flex-col text-xs items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
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
                        <span><CrossClose/></span>
                        <span>{t("Inactive")}</span>
                    </a>
                </li>
            </ul>
        </DropDown>,
    },
    {
        ReasonType: <div className="flex items-center">
            <CheckBox
                size={'sm'}
                variant={'dark'}
                labelClass={'text-base leading-none text-themeGrayscale/70'}
                id="ramadan-shift"
                name={"ramadan-shift"}
                label='&nbsp; 2 &nbsp; Forgot to Mark the Attendance'
            /></div>, 
        Status: <span className="flex justify-center"><SuccessTick /></span>,
        ModifiedOn: <div className="flex justify-center"><div className="flex flex-col text-xs items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
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
                        <span><CrossClose/></span>
                        <span>{t("Inactive")}</span>
                    </a>
                </li>
            </ul>
        </DropDown>,
    }, 
    ]

    return (
        <div className="zt-card grow">
            <h2 className="font-bold text-xl">Attendance Reason Type</h2>
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
