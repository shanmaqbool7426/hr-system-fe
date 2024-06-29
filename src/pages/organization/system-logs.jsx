import { Button, SearchInput, Table, SearchSelect, DropDown, CheckBox } from "@/components/elements";
import PageLoader from "@/components/elements/PageLoader";
import CreateDepartmentForm from "@/components/forms/departments/create";
import FilterArea from "@/components/includes/FilterArea";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import { FetchDepartments, DeleteDepartment } from "@/store/actions/department.actions";
import Toast from "@/util/toast";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SystemLogsPage() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading, departments_list } = useSelector((state) => state.department)
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [create, setCreate] = useState("")
    const [selected, setSelected] = useState(null)
    const [filters, setFilters] = useState({
        search: "",
        project: null,
        department: null,
        status: "",
    })

    const filterElements = [
        {
            type: "select",
            name: "Employee",
            placeholder: "Employee",
            value: filters.status,
            list: [
                { display: "Nadia Tabassum", value: "NadiaTabassum" },
                { display: "Lily", value: "Lily" },
            ],
            onChange: (status) => {
                let _filter = { ...filters }
                _filter['status'] = status
                setFilters(_filter)
            }
        },
        {
            type: "select",
            name: "Insert",
            value: filters.status,
            placeholder: "Insert",
            list: [
                { display: "Nadia Tabassum", value: "NadiaTabassum" },
                { display: "Lily", value: "Lily" },
            ],
            onChange: (status) => {
                let _filter = { ...filters }
                _filter['status'] = status
                setFilters(_filter)
            }
        },
        {
            type: "date",
            name: "Insert",
            value: filters.status,
        },
    ]

    const headings = [
        { title: t("Employee"), col: "Employee", check: true },
        { title: t("Date & Time"), col: "DateTime" },
        { title: t("IP Address"), col: "IPAddress" },
        { title: t("Action"), col: "Action", },
        { title: t("Log Type"), col: "LogType", className: "capitalize" },
        { title: t("Module"), col: "Module" },
        { title: t("Action"), col: "ActionMob" },
    ]
    const rows = [
        {
            Employee: <div className="flex items-center">
                <CheckBox
                    size={'sm'}
                    variant={'dark'}
                    iconClass={'!top-2'} 
                    id="night-shift"
                    name={"night-shift"}
                    label={ <div className="flex gap-3">
                        <figure>
                            <Image height={32} width={32} src={'/assets/images/users/user-01.jpg'} className="rounded-full" /></figure>
                        <div className="flex flex-col text-xs ">
                            <span className="font-semibold">{t("Jhon Carter")}</span>
                            <span className="text-themeGrayscale500">{t("10202325")}</span>
                        </div>
                    </div>}
                />
               
            </div>,
            DateTime:<div className="flex flex-col gap-1">
                <span>{t("22 March 2024")}</span>
                <span>{t("9:00:00 AM")}</span>
            </div>,
            IPAddress:"IP:59.103.53.105",
            Action:"Mark Today --Sign Out",
            LogType:"Insert",
            Module:"Attendance",
            ActionMob:"Mob App android",
        },
        {
            Employee: <div className="flex items-center">
                <CheckBox
                    size={'sm'}
                    variant={'dark'}
                    iconClass={'!top-2'} 
                    id="employee2"
                    name={"night-shift"}
                    label={ <div className="flex gap-3">
                        <figure>
                            <Image height={32} width={32} src={'/assets/images/users/user-02.jpg'} className="rounded-full" /></figure>
                        <div className="flex flex-col text-xs ">
                            <span className="font-semibold">{t("Jhon Carter")}</span>
                            <span className="text-themeGrayscale500">{t("10202325")}</span>
                        </div>
                    </div>}
                />
               
            </div>,
            DateTime:<div className="flex flex-col gap-1">
                <span>{t("22 March 2024")}</span>
                <span>{t("9:00:00 AM")}</span>
            </div>,
            IPAddress:"IP:59.103.53.105",
            Action:"Mark Today --Sign Out",
            LogType:"Insert",
            Module:"Attendance",
            ActionMob:"Mob App android",
        },
        {
            Employee: <div className="flex items-center">
                <CheckBox
                    size={'sm'}
                    variant={'dark'}
                    iconClass={'!top-2'} 
                    id="employee3"
                    name={"night-shift"}
                    label={ <div className="flex gap-3">
                        <figure>
                            <Image height={32} width={32} src={'/assets/images/users/user-03.jpg'} className="rounded-full" /></figure>
                        <div className="flex flex-col text-xs ">
                            <span className="font-semibold">{t("Jhon Carter")}</span>
                            <span className="text-themeGrayscale500">{t("10202325")}</span>
                        </div>
                    </div>}
                />
               
            </div>,
            DateTime:<div className="flex flex-col gap-1">
                <span>{t("22 March 2024")}</span>
                <span>{t("9:00:00 AM")}</span>
            </div>,
            IPAddress:"IP:59.103.53.105",
            Action:"Mark Today --Sign Out",
            LogType:"Insert",
            Module:"Attendance",
            ActionMob:"Mob App android",
        },
        {
            Employee: <div className="flex items-center">
                <CheckBox
                    size={'sm'}
                    variant={'dark'}
                    iconClass={'!top-2'} 
                    id="employee4"
                    name={"night-shift"}
                    label={ <div className="flex gap-3">
                        <figure>
                            <Image height={32} width={32} src={'/assets/images/users/user-04.jpg'} className="rounded-full" /></figure>
                        <div className="flex flex-col text-xs ">
                            <span className="font-semibold">{t("Jhon Carter")}</span>
                            <span className="text-themeGrayscale500">{t("10202325")}</span>
                        </div>
                    </div>}
                />
               
            </div>,
            DateTime:<div className="flex flex-col gap-1">
                <span>{t("22 March 2024")}</span>
                <span>{t("9:00:00 AM")}</span>
            </div>,
            IPAddress:"IP:59.103.53.105",
            Action:"Mark Today --Sign Out",
            LogType:"Insert",
            Module:"Attendance",
            ActionMob:"Mob App android",
        }
    ]
    let filteredrows = departments_list.filter((item) => {
        let include = true
        if (filters.search && filters.search.length > 0) {
            include = item.name.toLowerCase().includes(filters.search.toLowerCase()) || item.code.toLowerCase().includes(filters.search.toLowerCase())
            if (!include) return false
        }
        if (filters.status) {
            include = item?.status === filters.status
            if (!include) return false
        }
        return include
    }).sort((a, b) => {
        if (sortDir === 'asc') return a[sortCol]?.localeCompare(b[sortCol])
        else return b[sortCol]?.localeCompare(a[sortCol])
    })
    const indexOfLastItem = page * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const paginatedData = filteredrows.slice(indexOfFirstItem, indexOfLastItem);

 

    const pagination = {
        totalRecords: departments_list.length,
        showPerPage: true,
        prevAction: () => page > 1 && setPage(page - 1),
        clickAction: (value) => setPage(value),
        nextAction: () => setPage(page + 1),
    }

    const editDepartment = (item) => {
        setSelected({ ...item })
        setCreate('department')
    }

    const removeDepartment = (item) => {
        Toast.confirmDelete(() => {
            dispatch(DeleteDepartment(item._id, () => {
                Toast.success(t("Department deleted successfully"))
            }))
        }, t)
    }

    useEffect(() => {
        dispatch(FetchDepartments())
    }, [dispatch])

    return (
        <section className="p-4 flex flex-col grow">
            <div className="flex justify-between items-center pb-6">
                <h1 className="text-h4 mb-0">{t("System Logs")}</h1>
            </div>
            <div className="zt-card">
                <FilterArea title={t("System Logs")}
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
                    className={'zt-departmentTable'}
                />
            </div>
            {/* {is_loading && <PageLoader />} */}
        </section>
    )
}