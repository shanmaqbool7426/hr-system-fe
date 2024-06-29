import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react';
import { Table } from '@/components/elements';
import { FetchEmployees } from "@/store/actions/employee.actions";
import { useDispatch, useSelector } from "react-redux";

export default function DocumentList () {
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
        { title: t("Document Type"), col: "documentType", sort: true },
        { title: t("Choose File"), col: "chooseFile", sort: false },
        { title: t("Document Path"), col: "documentPath", sort: false },
        { title: t("Uploaded Date"), col: "uploadedDate", sort: false },
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

    // const filterHandler = () => {
    //     dispatch(FetchEmployees({
    //         filters: JSON.stringify(filters), perPage, page, sort: sortCol, sortDir,
    //     }))
    // }

    // useEffect(() => {
    //     filterHandler()
    // }, [page, perPage, sortCol, sortDir])

    return (
        <div className='zt-employeeCard'>
            <div className='zt--employeeCardHead'>
                <h3>{t('Documents')}</h3>
            </div>

            <div className='zt--employeeCardBody'>
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
                    className={'zt-employeeTable zt-documentTable'}
                />
            </div>
        </div>
    )
}