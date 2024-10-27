import { DisplayDate, DropDown, Profile, Table } from "@/components/elements";
import ChangeRemoteTeamForm from "@/components/forms/remoteWork/ChangeTeam";
import FilterArea from "@/components/includes/FilterArea";
import { Edit, EyeOn, ThreeDotsVertical, Trash } from "@/components/svg";
import { FetchEmployees } from "@/store/actions/employee.actions";
import { RevokeRemoteAccess } from "@/store/actions/remote-request.actions";
import { FetchRemoteTeams } from "@/store/actions/remote-team.actions";
import Toast from "@/util/toast";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function RemoteEmployeesPage() {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [changeTeam, setChangeTeam] = useState(null)
    const { employees_list } = useSelector(state => state.employee)
    const { team_list } = useSelector(state => state.remoteteam)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(FetchEmployees())
        dispatch(FetchRemoteTeams())
    }, [dispatch])

    const [filters, setFilters] = useState({
        search: "",
        team: null,
    })

    let filteredrows = employees_list
        .filter(item => item.workMode === "remote")
        .filter((item) => {
            let include = true;
            if (filters.search && filters.search.length > 0) {
                let fullname = item.firstName + " " + item.lastName;
                include =
                    fullname.toLowerCase().includes(filters.search.toLowerCase()) ||
                    item.email.toLowerCase().includes(filters.search.toLowerCase());
                if (!include) return false;
            }
            if (filters.team) {
                include = item?.team?._id === filters.team;
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
        totalRecords: filteredrows.length,
        showPerPage: true,
        prevAction: () => page > 1 && setPage(page - 1),
        clickAction: (value) => setPage(value),
        nextAction: () => setPage(page + 1),
    }
    const filterElements = [
        {
            type: "search",
            name: "search",
            value: filters.search,
            placeholder: t("Search employee"),
            className: "xl:col-span-2",
            onChange: (event) => {
                let _filter = { ...filters }
                _filter['search'] = event.target.value
                setFilters(_filter)
            }
        },
        {
            type: "select",
            name: "team",
            placeholder: "Team",
            value: filters.team,
            list: team_list.map(item => {
                return { value: item._id, display: item.name }
            }),
            onChange: (value) => {
                let _filter = { ...filters }
                _filter['team'] = value
                setFilters(_filter)
            }
        }
    ]

    const headings = [
        { title: t("Name"), col: "name" },
        { title: t("Department"), col: "department" },
        { title: t("Team"), col: "team" },
        { title: t("Line Manager"), col: "lineManager", },
        { title: t("From"), col: "from", sort: true },
        { title: t("To"), col: "to", sort: true },
        { title: t("Action"), col: "action" }
    ]

    const rows = paginatedData?.map((item, i) => ({

        name: <Link href={`/employees/details/${item._id}`} className="flex gap-2 items-center no-underline dark:text-white">
            <Profile image={item?.avatar} name={item.firstName} />
            <div className="text-left">
                <div>{`${item.firstName} ${item.lastName}`}</div>
                <div className="text-xs">{`${item.employeeCode}`}</div>
            </div>
        </Link>,
        department: item?.department?.name || "------",
        team: item?.team?.name || "------",
        lineManager: item?.lineManager ? `${item?.lineManager?.firstName} ${item?.lineManager?.lastName}` : "------",
        from: item?.remoteWork?.from ? <DisplayDate date={item?.remoteWork?.from} /> : "------",
        to: item?.remoteWork?.to ? <DisplayDate date={item?.remoteWork?.to} /> : "------",
        action: <DropDown icon={<ThreeDotsVertical />}>
            <ul className="zt-themeDropDownList zt-sm gap-4 w-44">
                <a onClick={() => { setChangeTeam(item) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                    <span><Edit /></span>
                    <span>{t("Change Team")}</span>
                </a>
                <li className="!p-0">
                    <Link href={`/employees/details/${item._id}`} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                        <span><EyeOn /></span>
                        <span>{t("Detail")}</span>
                    </Link>
                </li>
                <li className="!p-0">
                    <a onClick={() => {
                        Toast.dynamicTitle(() => {
                            dispatch(RevokeRemoteAccess(item._id, () => {
                                Toast.success(t("Remote Access Revoked Successfully"))
                            }))
                        }, t, t('Are you sure? You want to revoke remote access for this employee?'))
                    }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
                        <span><Trash /></span>
                        <span>{t("Revoke")}</span>
                    </a>
                </li>
            </ul>
        </DropDown>
    }))

    return (
        <section className="flex flex-col grow">
            <div className="flex justify-between pb-6">
                <h1 className="text-h4 mb-0">{t("Remote Employees")}</h1>
            </div>

            <div className="zt-card grow">
                <FilterArea title={t("Remote Employees")}
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
                    pagination={pagination}
                    setSortDir={setSortDir}
                    perPage={perPage}
                    setPerPage={setPerPage}
                    page={page}
                    setPage={setPage}
                />
            </div>
            {changeTeam && <ChangeRemoteTeamForm onClose={() => setChangeTeam(false)}
                employee={changeTeam._id}
                team={changeTeam?.team?.name}
            />}
        </section>
    )
}