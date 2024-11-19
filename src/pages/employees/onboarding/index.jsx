
import { Button, DisplayProfile, DropDown, Table } from "@/components/elements";
import CreateOnboardingForm from "@/components/forms/employees/createOnboarding";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import { usePagination } from "@/hooks/usePagination";
import { FetchSettings, GetOnboardingEmployees } from "@/store/actions/onboarding-offboarding.actions";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Onboarding() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [create, setCreate] = useState(null)
    const { onboarding_employees } = useSelector((state) => state.onboardingoffboarding)
    useEffect(() => {
        dispatch(GetOnboardingEmployees())
        dispatch(FetchSettings())
    }, [])
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)

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
        action: item.isCompleted ?
            <Button type="button" size={"sm"} variant={"success"} value={t("Onboarded")} /> :
            <Button type="button" size={"sm"} variant={"primary"} value={t("Onboard")} onClick={() => { setCreate(item) }} />
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
            {create && <CreateOnboardingForm onClose={() => { setCreate(null) }} employee={create} />}
        </section>
    )
}
