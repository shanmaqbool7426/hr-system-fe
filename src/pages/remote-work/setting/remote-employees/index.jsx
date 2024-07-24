import { DropDown, Table } from "@/components/elements";
import ChangeRemoteTeamForm from "@/components/forms/remoteWork/ChangeTeam";
import FilterArea from "@/components/includes/FilterArea";
import { Edit, EyeOn, ThreeDotsVertical, Trash } from "@/components/svg";
import Toast from "@/util/toast";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Employees() {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [changeTeam, setChangeTeam] = useState(false)
    const { customfield_list } = useSelector(state => state.customfield)
    const [filters, setFilters] = useState({
        search: "",
        project: null,
        department: null,
        status: null,
    })
    const pagination = {
        totalRecords: 5,
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
            name: "LineManager",
            placeholder: "LineManager",
            value: filters.status,
            list: customfield_list.filter(item => item.type === 'employee_status').map(item => {
                return { value: item._id, display: item.name }
            }),
            onChange: (status) => {
                let _filter = { ...filters }
                _filter['status'] = status
                setFilters(_filter)
            }
        },
        {
            type: "select",
            name: "Status",
            placeholder: "Status",
            value: filters.status,
            list: customfield_list.filter(item => item.type === 'employee_status').map(item => {
                return { value: item._id, display: item.name }
            }),
            onChange: (status) => {
                let _filter = { ...filters }
                _filter['status'] = status
                setFilters(_filter)
            }
        },
    ]

    const headings = [

        { title: t("Name"), col: "Name", },
        { title: t("Department"), col: "Department" },
        { title: t("Line Manager"), col: "LineManager", },
        { title: t("From"), col: "From", sort: true },
        { title: t("To"), col: "To", sort: true },
        { title: t("Action"), col: "action" }
    ]

    const rows = [
        {

            Name: <div className="flex items-center justify-center gap-4 grow">
                <figure className="shrink-0">
                    <Image height={40} width={40} src={'/assets/images/users/user-02.jpg'} className="rounded-full" /></figure>
                <div className={'flex flex-col text-left'}>
                    <strong className={'text-themeGrayscale '}>{t('Kelli Lebsack')}</strong>
                    <span className={'text-themeGrayscale500'}>{t('23056')}</span>
                </div>
            </div>,
            Department: 'Frontend',
            From: '23 May 2024',
            To: '23 May 2024',
            LineManager: "Company Admin",
            Client: '-',
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-44">
                    <a onClick={() => {setChangeTeam(true)}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                        <span><Edit /></span>
                        <span>{t("Change Team")}</span>
                    </a>
                    <li className="!p-0">
                        <Link href='/employees/details/6689569e410235cd11e326b2' className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><EyeOn /></span>
                            <span>{t("Detail")}</span>
                        </Link>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmRevoke(() => {
                                // dispatch(DeleteCustomfield(item._id, () => {
                                Toast.success(t("Remote Access Revoked Successfully"))
                                // }))
                            }, t)
                        }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
                            <span><Trash /></span>
                            <span>{t("Revoke")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        },
        {

            Name: <div className="flex items-center justify-center gap-4 grow">
                <figure className="shrink-0">
                    <Image height={40} width={40} src={'/assets/images/users/user-01.jpg'} className="rounded-full" /></figure>
                <div className={'flex flex-col text-left'}>
                    <strong className={'text-themeGrayscale '}>{t('Kelli Lebsack')}</strong>
                    <span className={'text-themeGrayscale500'}>{t('503')}</span>
                </div>
            </div>,
            Department: 'HR',
            From: '23 May 2024',
            To: '23 May 2024',
            LineManager: "Company Admin",
            Client: '-',
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-44">
                    <li className="!p-0">
                        <a onClick={() => {setChangeTeam(true)}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Change Team")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <Link href='/employees/details/6689569e410235cd11e326b2' className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><EyeOn /></span>
                            <span>{t("Detail")}</span>
                        </Link>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmRevoke(() => {
                                // dispatch(DeleteCustomfield(item._id, () => {
                                Toast.success(t("Remote Access Revoked Successfully"))
                                // }))
                            }, t)
                        }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
                            <span><Trash /></span>
                            <span>{t("Revoke")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        },
    ]
    return (
        <section className="flex flex-col grow">
            {/* {is_loading && <PageLoader/>} */}
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
                    className={'zt-employeeTable zt-attendanceRequestsTable'}
                />
            </div>
            {changeTeam && <ChangeRemoteTeamForm onClose={()=>setChangeTeam(false)}/>}
        </section>
    )
}