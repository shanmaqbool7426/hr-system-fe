import { useTranslation } from "next-i18next";
import { Button, CheckBox, DropDown, Table } from '@/components/elements'
import { CloseCross, Edit, SuccessTick, ThreeDotsVertical, Trash } from '@/components/svg'
import React, { useState } from 'react'

export default function LeaveTypeSettingsPage() {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const headings = [
        { title: t(""), col: "sr", check: true },
        { title: t("Sr#"), col: "SerailNo" },
        { title: t("Title"), col: "Title" },
        { title: t("Leave Entitled"), col: "LeaveEntitled" },
        { title: t("Leave Encashment"), col: "LeaveEncashment" },
        { title: t("Prorate Based"), col: "ProrateBased" },
        { title: t("Carry Forward"), col: "CarryForward" },
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
            Title: 'Maternity Leave',
            LeaveEntitled: "45",
            LeaveEncashment: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ProrateBased: <span className='flex justify-center'><SuccessTick className={'text-tickCussess'} /></span>,
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
            sr: <div className="flex items-center">
                <CheckBox
                    id={`2`}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            SerailNo: '2',
            Title: 'Internship Leave',
            LeaveEntitled: "45",
            LeaveEncashment: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ProrateBased: <span className='flex justify-center'><SuccessTick className={'text-tickCussess'} /></span>,
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
            sr: <div className="flex items-center">
                <CheckBox
                    id={`3`}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            SerailNo: '3',
            Title: 'Compensatory leave',
            LeaveEntitled: "45",
            LeaveEncashment: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ProrateBased: <span className='flex justify-center'><SuccessTick className={'text-tickCussess'} /></span>,
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
            sr: <div className="flex items-center">
                <CheckBox
                    id={`4`}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            SerailNo: '4',
            Title: 'Marriage Leave',
            LeaveEntitled: "45",
            LeaveEncashment: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ProrateBased: <span className='flex justify-center'><SuccessTick className={'text-tickCussess'} /></span>,
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
            sr: <div className="flex items-center">
                <CheckBox
                    id={`5`}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            SerailNo: '5',
            Title: 'Probation Leave',
            LeaveEntitled: "45",
            LeaveEncashment: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ProrateBased: <span className='flex justify-center'><SuccessTick className={'text-tickCussess'} /></span>,
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
            sr: <div className="flex items-center">
                <CheckBox
                    id={`6`}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            SerailNo: '6',
            Title: 'Casual Leave',
            LeaveEntitled: "45",
            LeaveEncashment: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ProrateBased: <span className='flex justify-center'><SuccessTick className={'text-tickCussess'} /></span>,
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
            sr: <div className="flex items-center">
                <CheckBox
                    id={`7`}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            SerailNo: '7',
            Title: 'Sick Leave',
            LeaveEntitled: "45",
            LeaveEncashment: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ProrateBased: <span className='flex justify-center'><SuccessTick className={'text-tickCussess'} /></span>,
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
            sr: <div className="flex items-center">
                <CheckBox
                    id={`8`}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            SerailNo: '8',
            Title: 'Annual Leave',
            LeaveEntitled: "45",
            LeaveEncashment: <span className='flex justify-center'><CloseCross className={'text-themeDanger'} /></span>,
            ProrateBased: <span className='flex justify-center'><SuccessTick className={'text-tickCussess'} /></span>,
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
        <section className="flex flex-col grow">
            <div className="flex justify-between items-center pb-6">
                <div className="">
                    <h1 className="text-h4 mb-0">{t("Leave Settings")}</h1>
                </div>
            </div>

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
        </section>
    )
}