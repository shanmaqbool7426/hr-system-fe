
import { DropDown, Table } from "@/components/elements"; 
import { Recruitment, ThreeDotsVertical } from "@/components/svg";
import Toast from "@/util/toast";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
export default function InactiveEmployee() {
    const { t } = useTranslation()
    const router = useRouter()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null) 
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const headings = [
        { title: t("Name"), col: "name" },
        { title: t("Job Title"), col: "jobTitle" },
        { title: t("Departments"), col: "departments" },
        { title: t("Contact"), col: "contact" },
        { title: t("Email"), col: "email" },
        { title: t("Action"), col: "action" }
    ]

    const rows = [{
        name: <Link href='/employees/details/6689569e410235cd11e326b2' className="flex flex-col no-underline items-center justify-center w-full">
            <strong className={'text-themeGrayscale900 text-sm'}>{t('Kelli Lebsack')}</strong>
            <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
        </Link>,
        jobTitle: 'Manager',
        departments: 'Outdoors',
        contact: "+92 301 64656",
        email: "John@gmail.com",
        action: <DropDown icon={<ThreeDotsVertical />}>
            <ul className="zt-themeDropDownList zt-sm gap-4 w-32">
                <li className="!p-0">
                    <a onClick={() => {
                        Toast.dynamicTitle(() => {
                            Toast.success(t("Employee Re-Hired Successfully"));
                            router.push('/employees/onboarding')
                        }, t, "Do you want to re-hire this employee?")
                    }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                        <span><Recruitment className={'h-5 w-5'} /></span>
                        <span>{t("Re Hire")}</span>
                    </a>
                </li>
            </ul>
        </DropDown>
    },
    {
        name: <Link href={'/employees/details/6689569e410235cd11e326b2'} className="w-full flex flex-col no-underline items-center justify-center">
            <strong className={'text-themeGrayscale900 text-sm'}>{t('Gertrude Kuphal')}</strong>
            <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
        </Link>,
        jobTitle: 'Manager',
        departments: 'Outdoors',
        contact: "+92 301 64656",
        email: "John@gmail.com",
        action: <DropDown icon={<ThreeDotsVertical />}>
            <ul className="zt-themeDropDownList zt-sm gap-4 w-32">
                <li className="!p-0">
                    <a onClick={() => {
                        Toast.dynamicTitle(() => {
                            Toast.success(t("Employee Re-Hired Successfully"));
                            router.push('/employees/onboarding')
                        }, t, "Do you want to re-hire this employee?")
                    }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                        <span><Recruitment className={'h-5 w-5'} /></span>
                        <span>{t("Re Hire")}</span>
                    </a>
                </li>
            </ul>
        </DropDown>
    }
    ]
    return (
        <section className="flex flex-col gap-6 grow">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex justify-between items-center">
                <h1 className="text-h4 mb-0">{t("Inactive Employee")}</h1>
            </div>
            <div className="zt-card grow">
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
                    className={'zt-employeeTable zt-recruitmentTable'}
                />
            </div> 
        </section>
    )
}
