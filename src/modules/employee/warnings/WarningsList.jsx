import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { Button, CheckBox, DropDown, Table } from '@/components/elements';
import { EyeOn, ThreeDotsVertical, Trash, WarningIcon } from '@/components/svg';
import RaiseIssueForm from '@/components/forms/projects/raiseIssue';
import { useTranslation } from 'react-i18next';
import CreateWarningForm from '@/components/forms/employees/createWarning';
import Toast from '@/util/toast';
import CreateWarningRevokeForm from '@/components/forms/employees/createWarningRevoke';
import CreateWarningDetailForm from '@/components/forms/employees/createwarningsDetail';

export default function WarningsList() {
    const { t } = useTranslation()
    const { total_records } = useSelector((state) => state.employee)
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10) 
    const [detail, setDetail] = useState(false)
    const [warning, setWarning] = useState(false)
    const [revoke, setRevoke] = useState(false)
    const headings = [
    
        { title: t("Warning Issue by"), col: "WarningIssueby", },
        { title: t("Warning Date"), col: "WarningDate", },
        { title: t("Review Date"), col: "ReviewDate", },
        { title: t("Reason"), col: "Reason", },
        { title: t("Action"), col: "action" },
    ]
    const rows = [
        {
            sr: <div className="flex items-center">
                <CheckBox
                    id={`1`}
                    // name={`checkbox-${index}`}
                    // checked={checkedItems[index] || false}
                    // onChange={(e) => handleCheckItem(index, e.target.checked)}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            SerailNo: '1',
            WarningIssueby: 'John',
            WarningDate: "14 Apr 2024",
            ReviewDate: '15 Apr 2025',
            Reason: "-",
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4">
                    <li className="!p-0">
                        <a onClick={() => { setDetail(true) }} className={'flex items-center no-underline gap-2 cursor-pointer'}
                        >
                            <span className='flex gap-2 hover:text-themePrimary'><EyeOn /> {t("Detail")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => { setRevoke(true) }} className={'flex items-center no-underline gap-2 cursor-pointer'}
                        >
                            <span className='flex gap-2 hover:text-themeDanger'><WarningIcon /> {t("Revoke")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => { 
                                    Toast.success(t("Warning deleted successfully")) 
                            }, t)
                        }} className={'flex items-center no-underline gap-2 cursor-pointer'}
                        >
                            <span className='flex gap-2 hover:text-themeDanger'><Trash /> {t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        },
        {
            sr: <div className="flex items-center">
                <CheckBox
                    id={`2`}
                    // name={`checkbox-${index}`}
                    // checked={checkedItems[index] || false}
                    // onChange={(e) => handleCheckItem(index, e.target.checked)}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            SerailNo: '2',
            WarningIssueby: 'John',
            WarningDate: "14 Apr 2024",
            ReviewDate: '15 Apr 2025',
            Reason: "-",
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4">
                <li className="!p-0">
                        <a onClick={() => { setDetail(true) }} className={'flex items-center no-underline gap-2 cursor-pointer'}
                        >
                            <span className='flex gap-2 hover:text-themePrimary'><EyeOn /> {t("Detail")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => { setRevoke(true) }} className={'flex items-center no-underline gap-2 cursor-pointer'}
                        >
                            <span className='flex gap-2 hover:text-themeDanger'><WarningIcon /> {t("Revoke")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => { 
                                    Toast.success(t("Warning deleted successfully")) 
                            }, t)
                        }}  className={'flex items-center no-underline gap-2 cursor-pointer'}
                        >
                            <span className='flex gap-2 hover:text-themeDanger'><Trash /> {t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        }
    ]
    const pagination = {
        totalRecords: total_records,
        showPerPage: true,
        prevAction: () => page > 1 && setPage(page - 1),
        clickAction: (value) => setPage(value),
        nextAction: () => setPage(page + 1),
    }
    return (
        <div className='zt-employeeCard grow'>
            <div className='zt--employeeCardHead flex justify-between'>
                <h3>{t('Warnings')}</h3>
                <Button onClick={()=>{setWarning(true)}} className={'btn btn-primary'}>{t("Issue Warning")}</Button>
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
            {revoke && <CreateWarningRevokeForm
                onClose={() => { setRevoke(false) }}
            />}
             {warning && <CreateWarningForm
                onClose={() => { setWarning(false) }}
            />}
              {detail && <CreateWarningDetailForm
                onClose={() => { setDetail(false) }}
            />}
        </div>
    )
}