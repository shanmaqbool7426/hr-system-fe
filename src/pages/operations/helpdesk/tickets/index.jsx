import { Button, DropDown, Table } from "@/components/elements";
import { FetchEmployees } from "@/store/actions/employee.actions";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatHelpDeskForm from "@/components/forms/helpDesk/create";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import Toast from "@/util/toast";
import StatusSelect from "@/components/elements/SelectStatus";


export default function TicketsPage() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { total_records } = useSelector((state) => state.employee)
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [create, setCreate] = useState(false)

    const headings = [

        { title: t("Ticket Id"), col: "TicketId" },
        { title: t("Issue Title"), col: "IssueTitle" },
        { title: t("Requested by"), col: "RequestedBy" },
        { title: t("Assign to"), col: "assignTo" },
        { title: t("Category"), col: "Category" },
        { title: t("Sub-Category"), col: "SubCategory" },
        { title: t("Priority"), col: "Priority" },
        { title: t("Status"), col: "Status" },
        { title: t("Action"), col: "action" },
    ]
    const options = [
        { value: 'warning', label: 'Open', className: 'zt-tag-warning' },
        { value: 'success', label: 'Inprogress', className: 'zt-tag-purple' },
        { value: 'completed', label: 'Resolved', className: 'zt-tag-success' },
    ];

    const item = { status: 'success' };
    const rows = [
        {
            TicketId: "220",
            IssueTitle: "Laptop issue",
            RequestedBy: "Alex",
            assignTo: "Ticket Owner",
            Category: "Laptop",
            SubCategory: "215-RNL",
            Priority: "High",
            Status: <StatusSelect item={item} options={options} />,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4">
                    <li className="!p-0">
                        <a onClick={() => { setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => Toast.confirmDelete(() => {
                            Toast.success(t("Ticket deleted successfully"))
                        }, t)} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        },
        {
            TicketId: "220",
            IssueTitle: "Laptop issue",
            RequestedBy: "Alex",
            assignTo: "Ticket Owner",
            Category: "Laptop",
            SubCategory: "215-RNL",
            Priority: "High",
            Status: <StatusSelect item={item} options={options} />,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4">
                    <li className="!p-0">
                        <a onClick={() => { setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => Toast.confirmDelete(() => {
                            Toast.success(t("Ticket deleted successfully"))
                        }, t)} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        },
        {
            TicketId: "220",
            IssueTitle: "Laptop issue",
            RequestedBy: "Alex",
            assignTo: "Ticket Owner",
            Category: "Laptop",
            SubCategory: "215-RNL",
            Priority: "High",
            Status: <StatusSelect item={item} options={options} />,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4">
                    <li className="!p-0">
                        <a onClick={() => { setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => Toast.confirmDelete(() => {
                            Toast.success(t("Ticket deleted successfully"))
                        }, t)} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
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

    return (
        <section className="flex flex-col grow">
            <div className="flex justify-between items-center pb-6">
                <h1 className="text-h4 mb-0">{t("Ticket Details")}</h1>
                <Button onClick={() => setCreate(true)} className={"btn btn-primary"}>{t("Add Ticket")}</Button>
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

            {create && <CreatHelpDeskForm onClose={() => setCreate(false)} />}
        </section>
    )
}