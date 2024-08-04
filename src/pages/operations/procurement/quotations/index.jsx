import { Button, DropDown, Table, ToggleCheck } from "@/components/elements";
import { FetchEmployees } from "@/store/actions/employee.actions";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateQuotationForm from "@/components/forms/procurement/quotations/create";
import StatusSelect from "@/components/elements/SelectStatus";
import { Edit, EyeOn, ThreeDotsVertical, Trash } from "@/components/svg";
import Toast from "@/util/toast";


export default function QuotationsPage() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { total_records } = useSelector((state) => state.employee)
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [create, setCreate] = useState(false)
    const VendorOptions = [
        { value: 'purple', label: 'John', className: 'zt-tag-purple' },
        { value: 'purple', label: 'Mink', className: 'zt-tag-purple' },
    ];
    const StatusOptions = [
        { value: 'success', label: 'Approved', className: 'zt-tag-success' },
        { value: 'purple', label: 'Working', className: 'zt-tag-purple' },
        { value: 'danger', label: 'Pending', className: 'zt-tag-danger' },
    ];
    const item = { status: 'success' };
    const headings = [
        { title: t("Quote ID"), col: "QuoteID" },
        { title: t("Quotation Title"), col: "QuotationTitle" },
        { title: t("Vendor"), col: "Vendor" },
        { title: t("Amount"), col: "Amount" },
        { title: t("Expiry "), col: "Expiry" },
        { title: t("Status"), col: "Status" },
        { title: t("Action"), col: "Action" },
    ]

    const rows = [{

        QuoteID: "675",
        QuotationTitle: "Quotation Title",
        Vendor: <StatusSelect item={item} options={VendorOptions} />,
        Amount: "50$",
        Expiry: "25 Dec 2024",
        Status: <StatusSelect item={item} options={StatusOptions} />,
        Action: <DropDown icon={<ThreeDotsVertical />}>
            <ul className="zt-themeDropDownList zt-sm gap-4 w-[123px]">
                <li className="!p-0">
                    <a onClick={() => { setView(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                        <span><EyeOn /></span>
                        <span>{t("View")}</span>
                    </a>
                </li>
                <li className="!p-0">
                    <a onClick={() => { setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                        <span><Edit /></span>
                        <span>{t("Edit")}</span>
                    </a>
                </li>
                <li className="!p-0">
                    <a onClick={() => {
                        Toast.confirmDelete(() => {
                            Toast.success(t("Quotation deleted successfully"))
                        }, t)
                    }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
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
                    <h1 className="text-h4 mb-0">{t("Quotations")}</h1>
                </div>
                <div className="flex items-start gap-2">
                    <Button className={"btn btn-primary"} onClick={() => setCreate(true)}>{t("Add Quotation")}</Button>
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

            {create && <CreateQuotationForm onClose={() => { setCreate(false) }} />}
        </section>
    )
}