import { Table } from "@/components/elements";
import TicketHistory from "@/modules/helpDesk/dashboard/TicketHistory";
import TicketsStats from "@/modules/helpDesk/dashboard/TicketsStats";
import TicketSummary from "@/modules/helpDesk/dashboard/TicketSummary";
import { FetchEmployees } from "@/store/actions/employee.actions";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function DashboardPage() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { total_records } = useSelector((state) => state.employee)
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)

    const headings = [
        { title: t("Assign To"), col: "AssignTo" },
        { title: t("No.of Ticket"), col: "NoofTicket" },
        { title: t("Priority Level"), col: "PriorityLevel" },
        { title: t("Assign by"), col: "Assignby" },
    ]
    const rows = [
        {
            AssignTo: "Ticket Owner",
            NoofTicket: "30",
            PriorityLevel: "High",
            Assignby: "Alex M"
        },
        {
            AssignTo: "Ticket Owner",
            NoofTicket: "30",
            PriorityLevel: "High",
            Assignby: "Alex M"
        },
        {
            AssignTo: "Ticket Owner",
            NoofTicket: "30",
            PriorityLevel: "High",
            Assignby: "Alex M"
        },
    ]
    const pagination = {
        totalRecords: total_records,
        showPerPage: true,
        prevAction: () => page > 1 && setPage(page - 1),
        clickAction: (value) => setPage(value),
        nextAction: () => setPage(page + 1),
    }

    useEffect(() => {
        dispatch(FetchEmployees())
    }, [dispatch])

    return (
        <section className="flex flex-col grow">
            <div className="flex justify-between items-center pb-6">
                <h1 className="text-h4 mb-0">{t("HelpDesk")}</h1>
            </div>
            <TicketsStats />
            <TicketSummary />
            <TicketHistory />
            <div className="zt-card">
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
                    pagination={pagination}
                    className={'zt-employeeRoleTable'}
                />
            </div>
        </section>
    )
}