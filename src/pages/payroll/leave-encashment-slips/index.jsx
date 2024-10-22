import { Table } from '@/components/elements'  
import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next' 

export default function LeaveEncashementSlipsPage() {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
   
    const pagination = {
        totalRecords: 5,
        showPerPage: true,
        prevAction: () => page > 1 && setPage(page - 1),
        clickAction: (value) => setPage(value),
        nextAction: () => setPage(page + 1),
    } 
    const headings = [
        { title: t("Employee"), col: "Employee" },
        { title: t("Employee Details"), col: "EmployeeDetails" },
        { title: t("Encashment Period"), col: "EncashmentPeriod", },
        { title: t("Total Encashment"), col: "TotalEncashment" }, 
        { title: t("Remarks"), col: "Remarks", }, 
    ]  
    const rows = [
        {
            Employee: <div className="flex  items-center justify-center gap-3">
                <figure>
                    <Image alt="profile" height={32} width={32} src={'/assets/images/users/user-01.jpg'} className="rounded-full" /></figure>
                <div className="flex flex-col">
                    <span className="font-semibold">{t("Jhon Carter")}</span>
                    <span className="text-themeGrayscale500">{t("10202325")}</span>
                </div>
            </div>,
            EmployeeDetails: <div className='flex gap-4 justify-center'>
                <div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Station')}</span> <span>{t('Departement')}</span></div>
                <div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('Canda')}</span> <span>{t('Design')}</span></div>
            </div>,
            EncashmentPeriod: "1 Month", 
            TotalEncashment: "$2110",
            Remarks:"-"
        },
        {
            Employee: <div className="flex  items-center justify-center gap-3">
                <figure>
                    <Image alt="profile" height={32} width={32} src={'/assets/images/users/user-02.jpg'} className="rounded-full" /></figure>
                <div className="flex flex-col">
                    <span className="font-semibold">{t("Jhon Carter")}</span>
                    <span className="text-themeGrayscale500">{t("10202325")}</span>
                </div>
            </div>,
            EmployeeDetails: <div className='flex gap-4 justify-center'>
                <div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Station')}</span> <span>{t('Departement')}</span></div>
                <div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('Canda')}</span> <span>{t('Design')}</span></div>
            </div>,
             EncashmentPeriod: "1 Month", 
            TotalEncashment: "$2110",
            Remarks:"-"
   
        },
        {
            Employee: <div className="flex  items-center justify-center gap-3">
                <figure>
                    <Image alt="profile" height={32} width={32} src={'/assets/images/users/user-03.jpg'} className="rounded-full" /></figure>
                <div className="flex flex-col">
                    <span className="font-semibold">{t("Jhon Carter")}</span>
                    <span className="text-themeGrayscale500">{t("10202325")}</span>
                </div>
            </div>,
            EmployeeDetails: <div className='flex gap-4 justify-center'>
                <div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Station')}</span> <span>{t('Departement')}</span></div>
                <div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('Canda')}</span> <span>{t('Design')}</span></div>
            </div>,
             EncashmentPeriod: "1 Month", 
            TotalEncashment: "$2110",
            Remarks:"-"
   
        },
    ]

    return (
        <section className="flex flex-col grow">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex justify-between pb-6">
                <h1 className="text-h4 mb-0">{t("Employees Leave Encashment Slips")}</h1>
            </div>
            <div className="zt-card grow">
                <Table
                    headings={headings}
                    rows={rows}
                    sortCol={sortCol}
                    setSortCol={setSortCol}
                    sortDir={sortDir}
                    pagination={pagination}
                    setSortDir={setSortDir}
                    perPage={perPage}
                    setPerPage={setPerPage}
                    page={page}
                    setPage={setPage}
                    className={'zt-employeeTable zt-payrollTable'}
                />
            </div>
         </section>
    )
}