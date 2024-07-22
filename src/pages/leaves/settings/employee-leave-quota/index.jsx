import { CheckBox, DropDown, Table } from '@/components/elements'
import { Edit, ThreeDotsVertical, Trash } from '@/components/svg'
import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function LeaveQuotaSettingsPage() {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const headings = [
        { title: t(""), col: "sr", check: true },
        { title: t("Sr#"), col: "SerailNo" },
        { title: t("S# Employee"), col: "SEmployee" },
        { title: t("Employee Details"), col: "EmployeeDetails" },
        { title: t("Quota Dates"), col: "QuotaDates" },
        { title: t("Quota Details"), col: "QuotaDetails" },
        { title: t("Additional Details"), col: "AdditionalDetails" },
        { title: t("Modified On"), col: "ModifiedOn" },
        { title: t("Remaining"), col: "Remaining" },
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
            SEmployee: <div className="flex flex-col justify-center items-center">
                <span className="font-medium">{t("Jhon Carter")}</span>
                <span className="text-themeGrayscale500">{t("10202325")}</span>
            </div>,
            EmployeeDetails:
                <div className="flex justify-center">
                    <div className="grid grid-cols-2 gap-y-1 gap-x-4">
                        <span className="text-themeGrayscale600 text-start">{t("Station")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("Head Office ")}</span>
                        <span className="text-themeGrayscale600 text-start">{t("Department")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("Design")}</span>
                    </div>
                </div>,
            QuotaDates:
                <div className="flex justify-center">
                    <div className="grid grid-cols-2  gap-y-1 gap-x-4">
                        <span className="text-themeGrayscale600 text-start">{t("Start Date")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("01 January")}</span>
                        <span className="text-themeGrayscale600 text-start">{t("End Date")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("31 December")}</span>
                    </div>
                </div>,
            QuotaDetails:
                <div className="flex flex-col gap-1 justify-center items-center ">
                    <div className='flex justify-between w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Allowed")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("10")}</span>
                    </div>
                    <div className='flex justify-between gap-4 w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Carry Over")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("0")}</span>
                    </div>
                    <div className='flex justify-between gap-4 w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Carried Over")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("0")}</span>
                    </div>
                    <div className='flex justify-between gap-4 w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Taken")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("0")}</span>
                    </div>
                </div>,
            AdditionalDetails:
                <div className="flex flex-col gap-1 justify-center items-center ">
                    <div className='flex justify-between gap-4 w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Penalty")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("0")}</span>
                    </div>
                    <div className='flex justify-between gap-4 w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Pending")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("0")}</span>
                    </div>
                    <div className='flex justify-between gap-4 w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Compensatory")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("0")}</span>
                    </div>
                    <div className='flex justify-between gap-4 w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Sandwich/Club")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("0")}</span>
                    </div>
                </div>,
            ModifiedOn: <div className="flex justify-center"><div className="flex flex-col  items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
            Remaining: "10",
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
            SEmployee: <div className="flex flex-col justify-center items-center">
                <span className="font-medium">{t("Jhon Carter")}</span>
                <span className="text-themeGrayscale500">{t("10202325")}</span>
            </div>,
            EmployeeDetails:
                <div className="flex justify-center">
                    <div className="grid grid-cols-2  gap-y-1 gap-x-4">
                        <span className="text-themeGrayscale600 text-start">{t("Station")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("Head Office ")}</span>
                        <span className="text-themeGrayscale600 text-start">{t("Department")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("Design")}</span>
                    </div>
                </div>,
            QuotaDates:
                <div className="flex justify-center">
                    <div className="grid grid-cols-2  gap-y-1 gap-x-4">
                        <span className="text-themeGrayscale600 text-start">{t("Start Date")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("01 January")}</span>
                        <span className="text-themeGrayscale600 text-start">{t("End Date")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("31 December")}</span>
                    </div>
                </div>,
            QuotaDetails:
                <div className="flex flex-col gap-1 justify-center items-center ">
                    <div className='flex justify-between w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Allowed")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("10")}</span>
                    </div>
                    <div className='flex justify-between gap-4 w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Carry Over")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("0")}</span>
                    </div>
                    <div className='flex justify-between gap-4 w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Carried Over")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("0")}</span>
                    </div>
                    <div className='flex justify-between gap-4 w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Taken")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("0")}</span>
                    </div>
                </div>,
            AdditionalDetails:
                <div className="flex flex-col gap-1 justify-center items-center ">
                    <div className='flex justify-between gap-4 w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Penalty")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("0")}</span>
                    </div>
                    <div className='flex justify-between gap-4 w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Pending")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("0")}</span>
                    </div>
                    <div className='flex justify-between gap-4 w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Compensatory")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("0")}</span>
                    </div>
                    <div className='flex justify-between gap-4 w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Sandwich/Club")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("0")}</span>
                    </div>
                </div>,
            ModifiedOn: <div className="flex justify-center"><div className="flex flex-col  items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
            Remaining: "10",
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
        SEmployee: <div className="flex flex-col justify-center items-center">
            <span className="font-medium">{t("Jhon Carter")}</span>
            <span className="text-themeGrayscale500">{t("10202325")}</span>
        </div>,
            EmployeeDetails:
                <div className="flex justify-center">
                    <div className="grid grid-cols-2  gap-y-1 gap-x-4">
                        <span className="text-themeGrayscale600 text-start">{t("Station")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("Head Office ")}</span>
                        <span className="text-themeGrayscale600 text-start">{t("Department")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("Design")}</span>
                    </div>
                </div>,
            QuotaDates:
                <div className="flex justify-center">
                    <div className="grid grid-cols-2  gap-y-1 gap-x-4">
                        <span className="text-themeGrayscale600 text-start">{t("Start Date")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("01 January")}</span>
                        <span className="text-themeGrayscale600 text-start">{t("End Date")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("31 December")}</span>
                    </div>
                </div>,
            QuotaDetails:
                <div className="flex flex-col gap-1 justify-center items-center ">
                    <div className='flex justify-between w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Allowed")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("10")}</span>
                    </div>
                    <div className='flex justify-between gap-4 w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Carry Over")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("0")}</span>
                    </div>
                    <div className='flex justify-between gap-4 w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Carried Over")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("0")}</span>
                    </div>
                    <div className='flex justify-between gap-4 w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Taken")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("0")}</span>
                    </div>
                </div>,
            AdditionalDetails:
                <div className="flex flex-col gap-1 justify-center items-center ">
                    <div className='flex justify-between gap-4 w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Penalty")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("0")}</span>
                    </div>
                    <div className='flex justify-between gap-4 w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Pending")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("0")}</span>
                    </div>
                    <div className='flex justify-between gap-4 w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Compensatory")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("0")}</span>
                    </div>
                    <div className='flex justify-between gap-4 w-full'>
                        <span className="text-themeGrayscale600 text-start">{t("Sandwich/Club")}</span>
                        <span className="text-themeGrayscale900 text-start font-semibold">{t("0")}</span>
                    </div>
                </div>,
            ModifiedOn: <div className="flex justify-center"><div className="flex flex-col  items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
                <span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
            </div></div>,
            Remaining: "10",
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
                    <h2 className='text-lg font-bold'>{t("Employee Leave Quota")}</h2>
                    {/* <Button className={'btn btn-dark'}>{t("Add Leave Type")}</Button> */}
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