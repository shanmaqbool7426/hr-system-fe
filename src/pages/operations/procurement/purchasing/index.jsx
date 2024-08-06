import { Button, DropDown, Table } from "@/components/elements";
import { FetchEmployees } from "@/store/actions/employee.actions";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatePurchaseForm from "@/components/forms/procurement/purchase/create";
import StatusSelect from "@/components/elements/SelectStatus";
import { Edit, EyeOn, ThreeDotsVertical, Trash } from "@/components/svg";
import Toast from "@/util/toast";


export default function PurchasingPage() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { total_records } = useSelector((state) => state.employee)
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [create, setCreate] = useState(false)

    const headings = [

        { title: t("Order No"), col: "OrderNo" },
        { title: t("Vendor"), col: "Vendor" },
        { title: t("Date"), col: "Date" },
        { title: t("Payment"), col: "Payment" },
        { title: t("Status"), col: "Status" },
        { title: t("Action"), col: "action" },
    ]
    const VendorOptions = [
        { value: 'purple', label: 'John', className: 'zt-tag-purple' },
        { value: 'purple', label: 'Mink', className: 'zt-tag-purple' },
    ];
    const item = { status: 'success' };
    const rows = [{

        OrderNo: "098FR8",
        Vendor: <StatusSelect item={item} options={VendorOptions} />,
        Date: "31-07-2024",
        Payment: "InProgress",
        Status: "InProgress",
        action: <DropDown icon={<ThreeDotsVertical />}>
            <ul className="zt-themeDropDownList zt-sm gap-4 ">
                <li className="!p-0">
                    <a onClick={() => { setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                        <span><EyeOn /></span>
                        <span>{t("View")}</span>
                    </a>
                </li>
                <li className="!p-0">
                    <a onClick={() => { setCreate(true) }} className={'no-underline flex items-center gap-1 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                        <span><Edit /></span>
                        <span>{t("Edit")}</span>
                    </a>
                </li>
                <li className="!p-0">
                    <a onClick={() => {
                        Toast.confirmDelete(() => {
                            Toast.success(t("Purchase deleted successfully"))
                        }, t)
                    }} className={'no-underline flex items-center gap-1 cursor-pointer font-normal hover:text-themeDanger'}>
                        <span><Trash /></span>
                        <span>{t("Delete")}</span>
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

    useEffect(() => {
        dispatch(FetchEmployees())
    }, [dispatch])

    return (
        <section className="flex flex-col grow">
            <div className="flex justify-between items-center pb-6">
                <div className="">
                    <h1 className="text-h4 mb-0">{t("Purchase Request")}</h1>
                </div>
                <div className="flex items-start gap-2">
                    <Button className={"btn btn-primary"} onClick={() => setCreate(true)}>{t("Purchase Order")}</Button>
                </div>
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
                    pagination={pagination}
                    className={'zt-employeeRoleTable'}
                />
            </div>
            {create && <CreatePurchaseForm onClose={() => { setCreate(false) }} />}
        </section>
    )
}