import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react';
import { Table } from '@/components/elements';
import { FetchEmployees } from "@/store/actions/employee.actions";
import { useDispatch, useSelector } from "react-redux";


export default function AssetsList() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading, total_records, employees_list } = useSelector((state) => state.employee)
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [filters, setFilters] = useState({
        search: "",
        project: null,
        department: null,
        status: "all",
    })

    const headings = [
        { title: t("Name"), col: "name", sort: true },
        { title: t("Asset ID"), col: "assetID", sort: false },
        { title: t("Assigned Date"), col: "assignedDate", sort: false },
        { title: t("Assignee"), col: "assignee", sort: false },
        { title: t("Action"), col: "action" },
    ]

    const rows = []

    const pagination = {
        totalRecords: total_records,
        showPerPage: true,
        prevAction: () => page > 1 && setPage(page - 1),
        clickAction: (value) => setPage(value),
        nextAction: () => setPage(page + 1),
    }


    useEffect(() => {
        // FetchEmployees({
        //     filters: JSON.stringify(filters), perPage, page, sort: sortCol, sortDir,
        // })
    }, [dispatch])

    return (
        <div className='zt-employeeCard grow'>
            <div className='zt--employeeCardHead'>
                <h3>{t('Documents')}</h3>
            </div>

            <div className='zt--employeeCardBody grow'>
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
                    className={'zt-employeeTable zt-assetsTable'}
                />
            </div>
        </div>
    )
}