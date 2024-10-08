import { Button, DropDown, ModifiedBy, Table } from "@/components/elements";
import CreateRemoteTeamForm from "@/components/forms/remoteWork/create-team";
import FilterArea from "@/components/includes/FilterArea";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import { DeleteRemoteTeam, FetchRemoteTeams } from "@/store/actions/remote-team.actions";
import Toast from "@/util/toast";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function RemoteTeamsPage() {
    const { t } = useTranslation()
    const { team_list } = useSelector(state => state.remoteteam)
    const dispatch = useDispatch()
    const [create, setCreate] = useState(false)
    const [edit, setEdit] = useState(null)
    const [selected, setSelected] = useState([])
    const [filters, setFilters] = useState({
        search: "",
    })
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)

    useEffect(() => {
        dispatch(FetchRemoteTeams())
    }, [dispatch])

    const pagination = {
        totalRecords: team_list?.length || 0,
        showPerPage: true,
        prevAction: () => page > 1 && setPage(page - 1),
        clickAction: (value) => setPage(value),
        nextAction: () => setPage(page + 1),
    }

    const headings = [
        { title: t("Name"), col: "name", },
        { title: t("Team members"), col: "members" },
        { title: t("Modified By"), col: "modifiedBy" },
        { title: t("Action"), col: "action" }
    ]
    let filteredRows = team_list?.filter((item) => !filters.search || item.name.toLowerCase().includes(filters.search.toLowerCase()))
        .sort((a, b) => {
            if (!sortCol) return 0;
            if (sortDir === "asc") return a[sortCol]?.localeCompare(b[sortCol]);
            else return b[sortCol]?.localeCompare(a[sortCol]);
        });

    const indexOfLastItem = page * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const paginatedData = filteredRows?.slice(indexOfFirstItem, indexOfLastItem);

    const rows = paginatedData?.map((item) => ({
        _id: item._id,
        name: item.name,
        members: item.members?.length || 0,
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
                            dispatch(DeleteRemoteTeam(item._id, () => {
                                Toast.success(t("Remote Team deleted successfully"))
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
            placeholder: t("Search team"),
            className: "xl:col-span-2",
            onChange: (event) => {
                setFilters({ ...filters, search: event.target.value })
            }
        },
    ]
    return (
        <section className="flex flex-col grow">
            <div className="flex justify-between pb-6">
                <h1 className="text-h4 mb-0">{t("Remote Teams")}</h1>
                <Button onClick={() => setCreate(true)} className={"btn btn-primary"}>{t("Create Team")}</Button>
            </div>
            <div className="zt-card grow">
                <FilterArea
                    elements={filterElements}
                    filters={filters}
                    setFilters={setFilters}
                />
                <Table
                    selected={selected}
                    setSelected={setSelected}
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
                />
            </div>
            {create && <CreateRemoteTeamForm onClose={() => { setCreate(false); setEdit(null) }} object={edit} />}
        </section>
    )
}