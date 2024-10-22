import { Table } from "@/components/elements"; 
import { useState } from "react";
import { useTranslation } from "next-i18next";

export default function LeavePaneltyHistoryModule() {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10) 

    const headings = [
        { title: t("From Date"), col: 'FromDate'  },
        { title: t("To Date"), col: 'ToDate' },
        { title: t("Employee"), col: "Employee" },
        { title: t("Created On"), col: "RepostOn" },
        { title: t("Created By"), col: "RepostBy" } 
    ]
    const rows = [{ 
        FromDate: "22 May 2024",
        ToDate: "22 May 2024",
        Employee: "6",
        RepostOn: "02/04/2024 10:04:53", 
        RepostBy: "Owen.Hackett34@gmail.com", 
    },
    ]

    return (
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
                className={'zt-employeeTable zt-leavePaneltyHistoryTable'}
            /> 
    )
}
