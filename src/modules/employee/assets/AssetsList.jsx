import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { CheckBox, DropDown, Table } from '@/components/elements';
import { ThreeDotsVertical, WarningIcon } from '@/components/svg';
import RaiseIssueForm from '@/components/forms/projects/raiseIssue';
import { useTranslation } from 'react-i18next';

export default function AssetsList() {
    const { t } = useTranslation()
    const { total_records } = useSelector((state) => state.employee)
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const {  employee_details } = useSelector((state) => state.employee);
    const [raiseIssue, setRaiseIssue] = useState(false)
    const headings = [
    
        { title: t("Asset ID"), col: "assetID", sort: false },
        { title: t("Asset Name"), col: "AssetName", sort: true },
        { title: t("Assigned Date"), col: "assignedDate", sort: false },
        { title: t("Assignee"), col: "assignee", sort: false },
        { title: t("Remarks"), col: "Remarks", sort: false },
        { title: t("Action"), col: "action" },
    ]
    const rows =  employee_details?.assets?.map((item, index) => ({
           
            assetID: <Link href={'/organization/inventory/details/REN-L-001'}> {item?.assetId} </Link>,
            AssetName: item?.assetType?.name,
            assignedDate: "14 Apr 2024",
            assignee: item?.modifiedBy,
            Remarks: "Battery issue",
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4">
                    <li className="!p-0">
                        <a onClick={() => { setRaiseIssue(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}
                        >
                            <span className='flex gap-2'><WarningIcon /> {t("Raise Issue")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        }))

    const pagination = {
        totalRecords: total_records,
        showPerPage: true,
        prevAction: () => page > 1 && setPage(page - 1),
        clickAction: (value) => setPage(value),
        nextAction: () => setPage(page + 1),
    }
    return (
        <div className='zt-employeeCard grow'>
            <div className='zt--employeeCardHead'>
                <h3>{t('Assets')}</h3>
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
            {raiseIssue && <RaiseIssueForm
                onClose={() => { setRaiseIssue(false) }}
            />}
        </div>
    )
}