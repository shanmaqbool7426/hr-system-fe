import { Button, CheckBox, DropDown, Table } from "@/components/elements";
import CreateRemoteEmployeeForm from "@/components/forms/remoteWork/createRemoteEmployee";
import FilterArea from "@/components/includes/FilterArea";
import { CloseCross, Edit, InputErrorInfo, ThreeDotsVertical, Trash } from "@/components/svg";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Employees() {
    const { t } = useTranslation()
    const [create, setCreate] = useState(false)
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [hide, setHide] = useState(false)
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
            name: "Role",
            placeholder: "Role",
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
        { title: t(""), col: "sr", check: true },
        { title: t("Sr#"), col: "SerailNo" },
        { title: t("Name"), col: "Name", },
        { title: t("Email"), col: "Email" },
        { title: t("Created"), col: "Created", sort: true },
        { title: t("Role"), col: "Role", },
        { title: t("Client"), col: "Client" },
        { title: t("Action"), col: "action" }
    ]

    const rows = [
        {
            sr: <div className="flex items-center">
                <CheckBox
                    id={`1`}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            SerailNo: '1',
            Name: <div className="flex items-center justify-start gap-4 grow">
                <figure className="shrink-0">
                    <Image height={40} width={40} src={'/assets/images/users/user-02.jpg'} className="rounded-full" /></figure>
                <div className={'flex flex-col text-left'}>
                    <strong className={'text-themeGrayscale '}>{t('Kelli Lebsack')}</strong>
                    <span className={'text-themeGrayscale500'}>{t('Management')}</span>
                </div>
            </div>,
            Email: 'test@gmail.com',
            Created: '23 May 2024',
            Role: "Company Admin",
            Client: '-',
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-[123px]">
                    <li className="!p-0">
                        <a onClick={() => { setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        },
        {
            sr: <div className="flex items-center">
                <CheckBox
                    id={`2`}
                    size={'sm'}
                    variant={'dark'}
                />
            </div>,
            SerailNo: '2',
            Name: <div className="flex items-center justify-start gap-4 grow">
                <figure className="shrink-0">
                    <Image height={40} width={40} src={'/assets/images/users/user-01.jpg'} className="rounded-full" /></figure>
                <div className={'flex flex-col text-left'}>
                    <strong className={'text-themeGrayscale '}>{t('Kelli Lebsack')}</strong>
                    <span className={'text-themeGrayscale500'}>{t('Management')}</span>
                </div>
            </div>,
            Email: 'test@gmail.com',
            Created: '23 May 2024',
            Role: "Company Admin",
            Client: '-',
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-[123px]">
                    <li className="!p-0">
                        <a onClick={() => { setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
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
                <h1 className="text-h4 mb-0">{t("Employees")}</h1>
                <Button onClick={() => setCreate(true)} className={"btn btn-primary"}>{t("Add Employee")}</Button>
            </div>

            <div className="zt-card grow">
                <FilterArea title={t("Employees")}
                    elements={filterElements}
                    filters={filters}
                    setFilters={setFilters}
                />
                {!hide && <div className="p-2 bg-themeBlue/30 rounded-lg mb-4 text-themeBlue/80 flex items-center justify-between">
                    <div className='flex items-center gap-2'><InputErrorInfo /><strong> {t("Note")}</strong> {t('You cannot change predefined values')}</div>
                    <CloseCross className={'cursor-pointer'}
                        onClick={(() => setHide(true))}
                    />
                </div>}

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
            {create &&
                <CreateRemoteEmployeeForm onClose={() => setCreate(false)} />}
        </section>
    )
}