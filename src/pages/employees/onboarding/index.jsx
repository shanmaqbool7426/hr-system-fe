
import { DisplayProfile, DropDown, Table } from "@/components/elements";
import CreateWarningForm from "@/components/forms/employees/createWarning";
import CreateOnboardingForm from "@/components/forms/projects/createOnboarding";
import CreateRejectionForm from "@/components/forms/projects/creatRejection";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import { usePagination } from "@/hooks/usePagination";
import { GetOnboardingEmployees } from "@/store/actions/onboarding-offboarding.actions";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Onboarding() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { onboarding_employees } = useSelector((state) => state.onboardingoffboarding)
    useEffect(() => {
        dispatch(GetOnboardingEmployees())
    }, [])
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [detail, setDetail] = useState(false)
    const [reject, setReject] = useState(false)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const paginated_data = usePagination(onboarding_employees, page, perPage, sortCol, sortDir)
    const headings = [
        { title: t("Name"), col: "name" },
        { title: t("Designation"), col: "designation" },
        { title: t("Department"), col: "department" },
        { title: t("Status"), col: "status" },
        { title: t("Action"), col: "action" }
    ]

    const rows = paginated_data.map((item) => ({
        name: <DisplayProfile user={item} />,
        designation: item.designation?.name,
        department: item.department?.name,
        status: <span className="zt-tag zt-tag-purple">{item.status?.name}</span>,
        action: <DropDown icon={<ThreeDotsVertical />}>
            <ul className="zt-themeDropDownList zt-sm gap-4">
                <li className="!p-0">
                    <a onClick={() => { setDetail(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                        <span><Edit /></span>
                        <span>{t("Onboard")}</span>
                    </a>
                </li>
                <li className="!p-0">
                    <a onClick={() => { setReject(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                        <span><Trash /></span>
                        <span>{t("Reject")}</span>
                    </a>
                </li>
            </ul>
        </DropDown>
    }))
    return (
        <section className="flex flex-col gap-6 grow">
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
