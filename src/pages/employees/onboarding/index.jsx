
import { DropDown, Table } from "@/components/elements";
import CreateWarningForm from "@/components/forms/employees/createWarning";
import CreateOnboardingForm from "@/components/forms/projects/createOnboarding";
import CreateRejectionForm from "@/components/forms/projects/creatRejection";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import { useTranslation } from "next-i18next";
import { useState } from "react";

export default function Onboarding() {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [detail, setDetail] = useState(false)
    const [reject, setReject] = useState(false)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const headings = [
        { title: t("Name"), col: "name" },
        { title: t("Job Title"), col: "jobTitle"  },
        { title: t("Departments"), col: "departments" },
        { title: t("Contact"), col: "contact" },
        { title: t("Job Types"), col: "jobType" },
        { title: t("Status"), col: "status" },
        { title: t("Action"), col: "action" }
    ]

    const rows = [{
        name: <button onClick={() => { setDetail(true) }} className="flex flex-col no-underline items-center justify-center w-full">
            <strong className={'text-themeGrayscale900 text-sm'}>{t('Kelli Lebsack')}</strong>
            <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
        </button>,
        jobTitle: 'Manager',
        departments: 'Outdoors',
        contact:"+92 301 64656",
        jobType: <span className='zt-tag zt-tag-success'>Full Time</span>,
        status: <span className='zt-tag zt-tag-success'>Onboard</span>,
        action: <DropDown icon={<ThreeDotsVertical />}>
            <ul className="zt-themeDropDownList zt-sm gap-4">
                <li className="!p-0">
                    <a onClick={() => { setDetail(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                        <span><Edit /></span>
                        <span>{t("Onboard")}</span>
                    </a>
                </li>
                <li className="!p-0">
                    <a onClick={()=>{setReject(true)}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                        <span><Trash /></span>
                        <span>{t("Reject")}</span>
                    </a>
                </li>
            </ul>
        </DropDown>
    },
    {
        name: <button onClick={() => { setDetail(true) }} className="w-full flex flex-col no-underline items-center justify-center">
            <strong className={'text-themeGrayscale900 text-sm'}>{t('Gertrude Kuphal')}</strong>
            <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
        </button>,
        jobTitle: 'Manager',
        departments: 'Outdoors',
        contact:"+92 301 64656",
        jobType: <span className='zt-tag zt-tag-danger'>Part Time</span>,
        status: <span className='zt-tag zt-tag-success'>Onboard</span>,
        action: <DropDown icon={<ThreeDotsVertical />}>
        <ul className="zt-themeDropDownList zt-sm gap-4">
            <li className="!p-0">
                <a onClick={() => { setDetail(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                    <span><Edit /></span>
                    <span>{t("Onboard")}</span>
                </a>
            </li>
            <li className="!p-0">
                <a onClick={()=>{setReject(true)}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                    <span><Trash /></span>
                    <span>{t("Reject")}</span>
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
                <h1 className="text-h4 mb-0">{t("Onboarding")}</h1>
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
            {detail && <CreateOnboardingForm onClose={() => { setDetail(false) }} />}
            {reject && <CreateRejectionForm onClose={() => { setReject(false) }} />}
        </section>
    )
}
