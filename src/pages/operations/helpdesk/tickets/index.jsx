import { Button, DropDown, ModifiedBy, StatusDropdown, Table } from "@/components/elements";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreatHelpDeskForm from "@/components/forms/helpdesk/create";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import Toast from "@/util/toast";
import { FetchHelpdeskTickets } from "@/store/actions/helpdesk.actions";
import { FetchAssets } from "@/store/actions/asset.actions";
import FilterArea from "@/components/includes/FilterArea";


export default function TicketsPage() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { ticket_list } = useSelector((state) => state.helpdesk)

    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [create, setCreate] = useState(false)

    const [filters, setFilters] = useState({
        search: "",
        status: "",
    })

    const filterElements = [
        {
            type: "search",
            name: "search",
            value: filters.search,
            placeholder: t("Search tickets by title"),
            className: "xl:col-span-2",
            onChange: (event) => {
                let _filter = { ...filters };
                _filter["search"] = event.target.value;
                setFilters(_filter);
            },
        },
        {
            type: "select",
            name: "status",
            value: filters.status,
            list: [
                { value: "open", display: t("Open") },
                { value: "closed", display: t("Closed") },
            ],
            onChange: (status) => {
                let _filter = { ...filters };
                _filter["status"] = status;
                setFilters(_filter);
            },
        },
    ];
    const headings = [
        { title: t("Ticket Id"), col: "ticketId" },
        { title: t("Issue Title"), col: "title" },
        { title: t("Requested by"), col: "createdBy" },
        { title: t("Assign to"), col: "assignTo" },
        { title: t("Priority"), col: "priority" },
        { title: t("Status"), col: "status" },
        { title: t("Action"), col: "action" },
    ]

    let filteredrows = ticket_list
        .filter((item) => {
            let include = true;
            if (filters.search && filters.search.length > 0) {
                include = item.title.toLowerCase().includes(filters.search.toLowerCase())
                if (!include) return false;
            }
            if (filters.status) {
                include = item?.status === filters.status;
                if (!include) return false;
            }
            return include;
        })
        .sort((a, b) => {
            if (sortDir === "asc") return a[sortCol]?.localeCompare(b[sortCol]);
            else return b[sortCol]?.localeCompare(a[sortCol]);
        });
    const indexOfLastItem = page * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const paginatedData = filteredrows.slice(indexOfFirstItem, indexOfLastItem);

    const pagination = {
        totalRecords: ticket_list?.total_records,
        showPerPage: true,
        prevAction: () => page > 1 && setPage(page - 1),
        clickAction: (value) => setPage(value),
        nextAction: () => setPage(page + 1),
    }
    const rows = paginatedData.map((item) => ({
        ticketId: item.ticketId,
        title: item.title,
        createdBy: item.createdBy ? <ModifiedBy user={item.createdBy} /> : "------",
        assignTo: item.assignTo ? <ModifiedBy user={item.assignTo} /> : "------",
        priority: <StatusDropdown
            value={item.priority}
            type="priority"
        />,
        status: <div className={`flex justify-center`}>
            <span className={`zt-status ${item.status === 'open' ? 'bg-themePurple' : 'bg-themeSuccess'}`}>{item.status}</span>
        </div>,
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
    }))
    useEffect(() => {
        dispatch(FetchHelpdeskTickets())
        dispatch(FetchAssets())
    }, [dispatch])

    return (
        <section className="flex flex-col grow">
            <div className="flex justify-between items-center pb-6">
                <h1 className="text-h4 mb-0">{t("Ticket Details")}</h1>
                <Button onClick={() => setCreate(true)} className={"btn btn-primary"}>{t("Create Ticket")}</Button>
            </div>
            <div className="zt-card grow">
                <FilterArea title={t("Ticket Details")} elements={filterElements} filters={filters} setFilters={setFilters} />
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
                />
            </div>

            {create && <CreatHelpDeskForm onClose={() => setCreate(false)} />}
        </section>
    )
}