import { Button, CheckBox, DropDown, Table } from '@/components/elements'
import { CloseCross, CrossClose, Edit, SuccessTick, ThreeDotsVertical, Trash } from '@/components/svg'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const LeaveTypeSetting = () => {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const headings = [
        { title: t("Title"), col: "Title", check: true },
        { title: t("Leave Entitled"), col: "LeaveEntitled" },
        { title: t("Leave Encashment"), col: "LeaveEncashment" },
        { title: t("Prorate Based"), col: "ProrateBased" },
        { title: t("Carry Forward"), col: "CarryForward" },
        { title: t("Modified On"), col: "ModifiedOn" },
        { title: t("Action"), col: "action" },
    ]
    const rows = [
        {
            Title: <div className="flex items-center">
                <CheckBox
                    size={'sm'}
                    variant={'dark'}
                    labelClass={'text-base leading-none text-themeGrayscale/70'}
                    id="night-shift"
                    name={"night-shift"}
                    label='&nbsp; 1 &nbsp; Maternity Leave'
                />
            </div>,
            LeaveEntitled: "45",
            LeaveEncashment: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ProrateBased: <span className='flex justify-center'><SuccessTick /></span>,
            CarryForward: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ModifiedOn: <div className="flex justify-center"><div className="flex flex-col text-xs items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-1">

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
            Title: <div className="flex items-center">
                <CheckBox
                    size={'sm'}
                    variant={'dark'}
                    labelClass={'text-base leading-none text-themeGrayscale/70'}
                    id="InternshipLeave"
                    name={"InternshipLeave"}
                    label='&nbsp; 2 &nbsp; Internship Leave'
                />
            </div>,
            LeaveEntitled: "45",
            LeaveEncashment: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ProrateBased: <span className='flex justify-center'><SuccessTick /></span>,
            CarryForward: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ModifiedOn: <div className="flex justify-center"><div className="flex flex-col text-xs items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-1">

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
            Title: <div className="flex items-center">
                <CheckBox
                    size={'sm'}
                    variant={'dark'}
                    labelClass={'text-base leading-none text-themeGrayscale/70'}
                    id="Compensatoryleave"
                    name={"Compensatoryleave"}
                    label='&nbsp; 3 &nbsp; Compensatory leave'
                />
            </div>,
            LeaveEntitled: "45",
            LeaveEncashment: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ProrateBased: <span className='flex justify-center'><SuccessTick /></span>,
            CarryForward: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ModifiedOn: <div className="flex justify-center"><div className="flex flex-col text-xs items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-1">

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
            Title: <div className="flex items-center">
                <CheckBox
                    size={'sm'}
                    variant={'dark'}
                    labelClass={'text-base leading-none text-themeGrayscale/70'}
                    id="MarriageLeave"
                    name={"MarriageLeave"}
                    label='&nbsp; 4 &nbsp; Marriage Leave'
                />
            </div>,
            LeaveEntitled: "45",
            LeaveEncashment: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ProrateBased: <span className='flex justify-center'><SuccessTick /></span>,
            CarryForward: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ModifiedOn: <div className="flex justify-center"><div className="flex flex-col text-xs items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-1">

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
            Title: <div className="flex items-center">
                <CheckBox
                    size={'sm'}
                    variant={'dark'}
                    labelClass={'text-base leading-none text-themeGrayscale/70'}
                    id="ProbationLeave"
                    name={"ProbationLeave"}
                    label='&nbsp; 5 &nbsp; Probation Leave'
                />
            </div>,
            LeaveEntitled: "45",
            LeaveEncashment: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ProrateBased: <span className='flex justify-center'><SuccessTick /></span>,
            CarryForward: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ModifiedOn: <div className="flex justify-center"><div className="flex flex-col text-xs items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-1">

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
            Title: <div className="flex items-center">
                <CheckBox
                    size={'sm'}
                    variant={'dark'}
                    labelClass={'text-base leading-none text-themeGrayscale/70'}
                    id="CasualLeave"
                    name={"CasualLeave"}
                    label='&nbsp; 6 &nbsp; Casual Leave'
                />
            </div>,
            LeaveEntitled: "45",
            LeaveEncashment: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ProrateBased: <span className='flex justify-center'><SuccessTick /></span>,
            CarryForward: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ModifiedOn: <div className="flex justify-center"><div className="flex flex-col text-xs items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-1">

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
            Title: <div className="flex items-center">
                <CheckBox
                    size={'sm'}
                    variant={'dark'}
                    labelClass={'text-base leading-none text-themeGrayscale/70'}
                    id="SickLeave"
                    name={"SickLeave"}
                    label='&nbsp; 7 &nbsp; Sick Leave'
                />
            </div>,
            LeaveEntitled: "45",
            LeaveEncashment: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ProrateBased: <span className='flex justify-center'><SuccessTick /></span>,
            CarryForward: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ModifiedOn: <div className="flex justify-center"><div className="flex flex-col text-xs items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-1">

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
            Title: <div className="flex items-center">
                <CheckBox
                    size={'sm'}
                    variant={'dark'}
                    labelClass={'text-base leading-none text-themeGrayscale/70'}
                    id="AnnualLeave"
                    name={"AnnualLeave"}
                    label='&nbsp; 8 &nbsp; Annual Leave'
                />
            </div>,
            LeaveEntitled: "45",
            LeaveEncashment: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ProrateBased: <span className='flex justify-center'><SuccessTick /></span>,
            CarryForward: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ModifiedOn: <div className="flex justify-center"><div className="flex flex-col text-xs items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-1">

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
    return (
        <div className='zt-card grow'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-lg font-bold'>{t("Leave Type Settings")}</h2>
                <Button className={'btn btn-dark'}>{t("Add Leave Type")}</Button>
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
                className={'zt-employeeTable zt-leaveTable'} />
        </div>
    )
}

export default LeaveTypeSetting
