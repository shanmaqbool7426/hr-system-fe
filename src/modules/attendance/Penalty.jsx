import { Button, CheckBox, DropDown, Table } from "@/components/elements";
import AddPenaltyForm from "@/components/forms/attendance/addPenaltyRule"; 
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function PenaltyModule() {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [add, setAdd] = useState(false)

    const headings = [
        { title: t("Reason Name"), col: 'ReasonName', check: true },
        { title: t("Flag"), col: 'Flag' },
        { title: t("Flag Count"), col: "FlagCount" },
        { title: t("Exempted Count"), col: "ExemptedCount" },
        { title: t("Effect Frequency"), col: "EffectFrequency" },
        { title: t("Exemption"), col: "Exemption" },
        { title: t("Effect Quantity"), col: "EffectQuantity" },
        { title: t("Modified On"), col: "ModifiedOn" },
        { title: t("Action"), col: "action" },
    ]
    const rows = [
        {
            ReasonName: <div className="flex items-center">
                <CheckBox
                    size={'sm'}
                    variant={'dark'}
                    labelClass={'text-base leading-none text-themeGrayscale/70'}
                    id="night-shift"
                    name={"night-shift"}
                    label='&nbsp; 1 &nbsp; Late Penalty'
                />
            </div>,
            Flag: "Late",
            FlagCount: "2",
            ExemptedCount: "2",
            EffectFrequency: "Every",
            Exemption: "-",
            EffectQuantity: "0.25",
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
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>,
        },
        {
            ReasonName: <div className="flex items-center">
                <CheckBox
                    size={'sm'}
                    variant={'dark'}
                    labelClass={'text-base leading-none text-themeGrayscale/70'}
                    id="night-shift"
                    name={"night-shift"}
                    label='&nbsp; 2 &nbsp; Half Day Penalty'
                />
            </div>,
            Flag: "Half Day",
            FlagCount: "2",
            ExemptedCount: "2",
            EffectFrequency: "Every",
            Exemption: "-",
            EffectQuantity: "0.25",
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
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>,
        },
        {
            ReasonName: <div className="flex items-center">
                <CheckBox
                    size={'sm'}
                    variant={'dark'}
                    labelClass={'text-base leading-none text-themeGrayscale/70'}
                    id="night-shift"
                    name={"night-shift"}
                    label='&nbsp; 3 &nbsp; Early'
                />
            </div>,
            Flag: "Early",
            FlagCount: "2",
            ExemptedCount: "2",
            EffectFrequency: "Every",
            Exemption: "-",
            EffectQuantity: "0.25",
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
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>,
        },
        {
            ReasonName: <div className="flex items-center">
                <CheckBox
                    size={'sm'}
                    variant={'dark'}
                    labelClass={'text-base leading-none text-themeGrayscale/70'}
                    id="night-shift"
                    name={"night-shift"}
                    label='&nbsp; 4 &nbsp; Short Day Simple'
                />
            </div>,
            Flag: "Short Day",
            FlagCount: "2",
            ExemptedCount: "2",
            EffectFrequency: "Every",
            Exemption: "-",
            EffectQuantity: "0.25",
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
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>,
        },
        {
            ReasonName: <div className="flex items-center">
                <CheckBox
                    size={'sm'}
                    variant={'dark'}
                    labelClass={'text-base leading-none text-themeGrayscale/70'}
                    id="night-shift"
                    name={"night-shift"}
                    label='&nbsp; 5 &nbsp; Absent for Short TIme'
                />
            </div>,
            Flag: "Absent for Short TIme",
            FlagCount: "2",
            ExemptedCount: "2",
            EffectFrequency: "Every",
            Exemption: "-",
            EffectQuantity: "0.25",
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
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>,
        },
        {
            ReasonName: <div className="flex items-center">
                <CheckBox
                    size={'sm'}
                    variant={'dark'}
                    labelClass={'text-base leading-none text-themeGrayscale/70'}
                    id="night-shift"
                    name={"night-shift"}
                    label='&nbsp; 6 &nbsp; Absent'
                />
            </div>,
            Flag: "Absent",
            FlagCount: "2",
            ExemptedCount: "2",
            EffectFrequency: "Every",
            Exemption: "-",
            EffectQuantity: "0.25",
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
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>,
        },
        {
            ReasonName: <div className="flex items-center">
                <CheckBox
                    size={'sm'}
                    variant={'dark'}
                    labelClass={'text-base leading-none text-themeGrayscale/70'}
                    id="night-shift"
                    name={"night-shift"}
                    label='&nbsp; 7 &nbsp; Missing Attendance'
                />
            </div>,
            Flag: "Missing Entry",
            FlagCount: "2",
            ExemptedCount: "2",
            EffectFrequency: "Every",
            Exemption: "-",
            EffectQuantity: "0.25",
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
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>,
        },
        {
            ReasonName: <div className="flex items-center">
                <CheckBox
                    size={'sm'}
                    variant={'dark'}
                    labelClass={'text-base leading-none text-themeGrayscale/70'}
                    id="night-shift"
                    name={"night-shift"}
                    label='&nbsp; 8 &nbsp; Short Day Flexible'
                />
            </div>,
            Flag: "Short Day",
            FlagCount: "2",
            ExemptedCount: "2",
            EffectFrequency: "Every",
            Exemption: "-",
            EffectQuantity: "0.25",
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
            <div className="flex justify-between pb-6">
                <h2 className="text-h4 mb-0">{t("Attendance Penalty Rule")}</h2>
                <Button className={"btn btn-primary absolute top-4 right-4"} onClick={() => setAdd(true)}>{t("Add New Rule")}</Button>
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
                className={'zt-employeeTable zt-attendancePaneltyTable'}
            />

            {add && <AddPenaltyForm 
                onClose={() => { setAdd(false) }}
            />}
        </div>
    )
}
