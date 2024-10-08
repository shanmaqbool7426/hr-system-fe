import { Button, DropDown, ModifiedBy, Table } from "@/components/elements";
import CreateRemoteCategoryForm from "@/components/forms/remoteWork/create-catogory";
import FilterArea from "@/components/includes/FilterArea";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import { DeleteRemoteCategory, FetchRemoteCategories } from "@/store/actions/remote-category.actions";
import Toast from "@/util/toast";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function RemoteCategoryPage() {
    const { t } = useTranslation()
    const { category_list } = useSelector(state => state.remotecategory)
    const dispatch = useDispatch()
    const [create, setCreate] = useState(false)
    const [edit, setEdit] = useState(null)
    const [filters, setFilters] = useState({
        search: "",
    })
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)

    useEffect(() => {
        dispatch(FetchRemoteCategories())
    }, [dispatch])

    const pagination = {
        totalRecords: category_list?.length || 0,
        showPerPage: true,
        prevAction: () => page > 1 && setPage(page - 1),
        clickAction: (value) => setPage(value),
        nextAction: () => setPage(page + 1),
    }

    const headings = [
        { title: t("Name"), col: "name", className: "!justify-start" },
        { title: t("Modified By"), col: "modifiedBy" },
        { title: t("Action"), col: "action" }
    ]
    let filteredRows = category_list?.filter((item) => !filters.search || item.name.toLowerCase().includes(filters.search.toLowerCase()))
        .sort((a, b) => {
            if (!sortCol) return 0;
            if (sortDir === "asc") return a[sortCol]?.localeCompare(b[sortCol]);
            else return b[sortCol]?.localeCompare(a[sortCol]);
        });

    const indexOfLastItem = page * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const paginatedData = filteredRows?.slice(indexOfFirstItem, indexOfLastItem);

    const rows = paginatedData?.map((item) => ({
        name: <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full" style={{ backgroundColor: item.color }} />
            <span>{item.name}</span>
        </div>,
        modifiedBy: item.modifiedBy ? <ModifiedBy user={item.modifiedBy} date={item.updatedAt} /> : "-------",
        action: <DropDown icon={<ThreeDotsVertical />}>
            <ul className="zt-themeDropDownList zt-sm gap-4 w-[123px]">
                <li className="!p-0">
                    <a onClick={() => { setCreate(true); setEdit(item) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                        <span><Edit /></span>
                        <span>{t("Edit")}</span>
                    </a>
                </li>
                <li className="!p-0">
                    <a onClick={() =>
                        Toast.confirmDelete(() => {
                            dispatch(DeleteRemoteCategory(item._id, () => {
                                Toast.success(t("Remote Category deleted successfully"))
                            }))
                        }, t)
                    } className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
                        <span><Trash /></span>
                        <span>{t("Delete")}</span>
                    </a>
                </li>
            </ul>
        </DropDown>
    }))

    const filterElements = [
        {
            type: "search",
            name: "search",
            value: filters.search,
            placeholder: t("Search category"),
            className: "xl:col-span-2",
            onChange: (event) => {
                setFilters({ ...filters, search: event.target.value })
            }
        },
    ]
    return (
        <section className="flex flex-col grow">
            <div className="flex justify-between pb-6">
                <h1 className="text-h4 mb-0">{t("Remote Categories")}</h1>
                <Button onClick={() => setCreate(true)} className={"btn btn-primary"}>{t("Create Category")}</Button>
            </div>
            <div className="zt-card grow">
                <FilterArea
                    elements={filterElements}
                    filters={filters}
                    setFilters={setFilters}
                />
                <Table
                    checkbox={false}
                    headings={headings}
                    rows={rows}
                    sortCol={sortCol}
                    setSortCol={setSortCol}
                    sortDir={sortDir}
                    pagination={pagination}
                    setSortDir={setSortDir}
                    perPage={perPage}
                    setPerPage={setPerPage}
                    page={page}
                    setPage={setPage}
                    className={'zt-employeeTable zt-attendanceRequestsTable'}
                />
            </div>
            {create && <CreateRemoteCategoryForm onClose={() => { setCreate(false); setEdit(null) }} object={edit} />}
        </section>
    )
}