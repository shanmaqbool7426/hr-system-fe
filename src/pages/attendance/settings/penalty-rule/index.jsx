import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, CheckBox, DropDown, Table } from "@/components/elements";
import AddPenaltyForm from "@/components/forms/attendance/addPenaltyRule";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
export default function AttendancePenaltyRuleSettingPage() {
    const { t } = useTranslation();
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [add, setAdd] = useState(false)

    const headings = [
        { title: t(""), col: "sr", check: true },
        { title: t("Sr#"), col: "SerailNo" },
        { title: t("Reason Name"), col: 'ReasonName', },
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
            sr: <div className="flex items-center">
                <CheckBox
                    id={`1`}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            SerailNo: '1',
            ReasonName: 'Late Penalty',
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
            sr: <div className="flex items-center">
                <CheckBox
                    id={`2`}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            SerailNo: '2',
            ReasonName: 'Half Day Penalty',
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
            sr: <div className="flex items-center">
                <CheckBox
                    id={`3`}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            SerailNo: '3',
            ReasonName: 'Early',
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
            sr: <div className="flex items-center">
                <CheckBox
                    id={`4`}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            SerailNo: '4',
            ReasonName: ' Short Day Simple',
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
            sr: <div className="flex items-center">
                <CheckBox
                    id={`5`}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            SerailNo: '5',
            ReasonName: 'Absent for Short TIme',
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
            sr: <div className="flex items-center">
                <CheckBox
                    id={`6`}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            SerailNo: '6',
            ReasonName: 'Absent',
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
            sr: <div className="flex items-center">
                <CheckBox
                    id={`7`}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            SerailNo: '7',
            ReasonName: 'Missing Attendance',
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
            sr: <div className="flex items-center">
                <CheckBox
                    id={`8`}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            SerailNo: '8',
            ReasonName: 'Short Day Flexible',
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
        <section className="flex flex-col grow relative">
            <div className="flex justify-between pb-6">
                <h1 className="text-h4 mb-0">{t("Attendance Settings")}</h1>
                <Button className={"btn btn-primary "} onClick={() => setAdd(true)}>{t("Add New Rule")}</Button>
            </div>
            <div className="zt-card grow">
                <div className="flex justify-between pb-6">
                    <h2 className="text-h4 mb-0">{t("Attendance Penalty Rule")}</h2>
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

        </section>
    );
}
