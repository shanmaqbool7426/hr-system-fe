import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, CheckBox, DisplayDate, DropDown, Table } from '@/components/elements';
import { EyeOn, ThreeDotsVertical, Trash, WarningIcon } from '@/components/svg';
import { useTranslation } from 'react-i18next';
import CreateWarningForm from '@/components/forms/employees/createWarning';
import Toast from '@/util/toast';
import CreateWarningRevokeForm from '@/components/forms/employees/createWarningRevoke';
import WarningDetail from '@/components/forms/employees/warningsDetail';
import { DeleteWarning } from '@/store/actions/employee-warning.actions';

export default function WarningsList() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { total_records } = useSelector((state) => state.employee)
    const { is_loading , employee_details} = useSelector((state) => state.employee);
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10) 
    const [detail, setDetail] = useState(false)
    const [warning, setWarning] = useState(false)
    const [revoke, setRevoke] = useState(false)
    const [selectedWarning, setSelectedWarning] = useState(null)

    const deleteHandler = (id) => {
        Toast.confirmDelete(() => {
          dispatch(DeleteWarning(id, () => {
            Toast.success(t('Warning removed successfully'));
          }));
        }, t);
      };
    
    const headings = [
    
        { title: t("Warning Issue by"), col: "WarningIssueby", },
        { title: t("Warning Date"), col: "WarningDate", },
        { title: t("Review Date"), col: "ReviewDate", },
        { title: t("Reason"), col: "Reason", },
        { title: t("Action"), col: "action" },
    ]
    const rows = employee_details?.warnings?.map((item, index) => ({
            WarningIssueby: `${item?.createdBy?.firstName} ${item?.createdBy?.lastName}` ,
            WarningDate: <DisplayDate date={item?.createdAt}/>,
            ReviewDate: '15 Apr 2025',
            Reason: item?.name,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4">
                    <li className="!p-0">
                        <a onClick={() => { setDetail(true); setSelectedWarning(item); }} className={'flex items-center no-underline gap-2 cursor-pointer'}
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
                        <a onClick={() => deleteHandler(item._id)} className={'flex items-center no-underline gap-2 cursor-pointer'}
                        >
                            <span className='flex gap-2 hover:text-themeDanger'><Trash /> {t("Delete")}</span>
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
              {detail && selectedWarning &&  <WarningDetail
                onClose={() => { setDetail(false); setSelectedWarning(null); }}
                object={selectedWarning}
            />}
        </div>
    )
}