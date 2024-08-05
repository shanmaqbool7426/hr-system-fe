import { DropDown, Table } from "@/components/elements";
import { FetchEmployees } from "@/store/actions/employee.actions";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import FilterArea from "@/components/includes/FilterArea";


export default function SettingPage() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { total_records } = useSelector((state) => state.employee)
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)

    const headings = [
        { title: t("Item Id"), col: "ItemId" },
        { title: t("Item Name"), col: "ItemName" },
        { title: t("Rejection Date"), col: "RejectionDate" },
        { title: t("Rejected by"), col: "Rejectedby" },
        { title: t("Reason"), col: "Reason" },
        { title: t("Action"), col: "action" },
    ]

    const rows = [
        {
            ItemId: "61464",
            ItemName: "Laptop",
            RejectionDate: "30-07-2024",
            Rejectedby: "Laptop",
            Reason: "Description",
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 ">
                    <li className="!p-0">
                        <a onClick={() => { }} className={'no-underline flex items-center gap-1 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                Toast.success(t("Asset Repearing deleted successfully"))
                            }, t)
                        }} className={'no-underline flex items-center gap-1 cursor-pointer font-normal hover:text-themeDanger'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        },
        {
            ItemId: "61464",
            ItemName: "Laptop",
            RejectionDate: "30-07-2024",
            Rejectedby: "Laptop",
            Reason: "Description",
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 ">
                    <li className="!p-0">
                        <a onClick={() => { }} className={'no-underline flex items-center gap-1 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                Toast.success(t("Asset Repearing deleted successfully"))
                            }, t)
                        }} className={'no-underline flex items-center gap-1 cursor-pointer font-normal hover:text-themeDanger'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
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
    const [filters, setFilters] = useState({
        order: "", 
    })
    const filterElements = [
        {
             type: "search",
             name: "order",
             placeholder:"Search Order",
             className:"col-span-2",
             value: filters.order, 
             onChange: (order) => {
                 let _filter = { ...filters }
                 _filter['order'] = order
                 setFilters(_filter)
             }
         }, 
     ]
    return (
        <section className="flex flex-col grow">
            <div className="flex justify-between items-center pb-6">
                <h1 className="text-h4 mb-0">{t("Rejected Items")}</h1>
            </div>

            <div className="zt-card grow">
                <FilterArea
                    elements={filterElements}
                    filters={filters}
                    setFilters={setFilters}
                />
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