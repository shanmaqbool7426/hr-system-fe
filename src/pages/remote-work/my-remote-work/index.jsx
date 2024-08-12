import { Datepicker, DropDown, Table, Tabs } from "@/components/elements";
import ChangeRemoteTeamForm from "@/components/forms/remoteWork/ChangeTeam";
import CreateRemoteTeamForm from "@/components/forms/remoteWork/createTeam";
import { ChevronLeft, ChevronRight, Edit, EyeOn, ThreeDotsVertical, Trash } from "@/components/svg";
import DayTab from "@/modules/remoteWork/myRemoteWork/DayTab";
import Toast from "@/util/toast";
import { Tab } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MyRemoteWork() {
    const { t } = useTranslation()
    const [changeTeam, setChangeTeam] = useState(false)
    const [edit, setEdit] = useState(false)
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)

    const pagination = {
        totalRecords: 5,
        showPerPage: true,
        prevAction: () => page > 1 && setPage(page - 1),
        clickAction: (value) => setPage(value),
        nextAction: () => setPage(page + 1),
    }
    const headings = [
        { title: t("Name"), col: "Name", },
        { title: t("Team members"), col: "Teammembers" },
        { title: t("Created"), col: "Created" },
        { title: t("Action"), col: "action" }
    ]
    const rows = [
        {
            Name: 'Accounting',
            Teammembers: '2',
            Created: '23 May 2024',
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-[123px]">
                    <li className="!p-0">
                        <a onClick={() => { setEdit(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() =>
                            Toast.confirmDelete(() => {
                                Toast.success(t("Remote Team deleted successfully"))
                            }, t)
                        } className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        },
        {
            Name: 'Management',
            Teammembers: '2',
            Created: '23 May 2024',
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-[123px]">
                    <li className="!p-0">
                        <a onClick={() => { setEdit(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() =>
                            Toast.confirmDelete(() => {
                                Toast.success(t("Remote Team deleted successfully"))
                            }, t)
                        } className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        },
    ]
    const employeeHeadings = [

        { title: t("Name"), col: "Name", },
        { title: t("Department"), col: "Department" },
        { title: t("Team"), col: "team" },
        { title: t("Line Manager"), col: "LineManager", },
        { title: t("From"), col: "From", sort: true },
        { title: t("To"), col: "To", sort: true },
        { title: t("Action"), col: "action" }
    ]
    const employeeRows = [
        {

            Name: <div className="flex items-center justify-center gap-4 grow">
                <figure className="shrink-0">
                    <Image alt="profile" height={40} width={40} src={'/assets/images/users/user-02.jpg'} className="rounded-full" /></figure>
                <div className={'flex flex-col text-left'}>
                    <strong className={'text-themeGrayscale '}>{t('Kelli Lebsack')}</strong>
                    <span className={'text-themeGrayscale500'}>{t('23056')}</span>
                </div>
            </div>,
            Department: 'Frontend',
            team: "React",
            From: '23 May 2024',
            To: '23 May 2024',
            LineManager: "Company Admin",
            Client: '-',
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-44">
                    <a onClick={() => { setChangeTeam(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
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
                            Toast.dynamicTitle(() => {
                                // dispatch(DeleteCustomfield(item._id, () => {
                                Toast.success(t("Remote Access Revoked Successfully"))
                                // }))
                            }, t, 'Are you want to revoke remote access for this employee?')
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
                    <Image alt="profile" height={40} width={40} src={'/assets/images/users/user-01.jpg'} className="rounded-full" /></figure>
                <div className={'flex flex-col text-left'}>
                    <strong className={'text-themeGrayscale '}>{t('Kelli Lebsack')}</strong>
                    <span className={'text-themeGrayscale500'}>{t('503')}</span>
                </div>
            </div>,
            team: "Recruitment",
            Department: 'HR',
            From: '23 May 2024',
            To: '23 May 2024',
            LineManager: "Company Admin",
            Client: '-',
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-44">
                    <li className="!p-0">
                        <a onClick={() => { setChangeTeam(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
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
                            Toast.dynamicTitle(() => {
                                // dispatch(DeleteCustomfield(item._id, () => {
                                Toast.success(t("Remote Access Revoked Successfully"))
                                // }))
                            }, t, 'Are you want to revoke remote access for this employee?')
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
                <div className="flex flex-col">
                    <h1 className="text-h4 mb-0">{t("My Remote Work")}</h1>
                </div>
            </div>
            <div className="relative flex flex-col gap-4 grow">
                <div className="absolute xl:top-0 top-16 xl:right-0 flex items-center gap-6">
                    <Datepicker
                        containerClass={'w-max'}
                        name={'completionDate'}
                        value={''}
                    />
                    <button><ChevronLeft /></button>
                    <button><ChevronRight /></button>
                </div>
                <Tabs
                    containerClasses={'zt-themeTabsV2 grow !gap-20 xl:!gap-4'}
                    tabNavClasses={'zt-themeTabNav'}
                    tabs={['Employee', 'Remote Team', "Day", "Week", "Month"]}
                >
                    <Tab.Panels className={`zt-themeTabPanels zt-employeeTabsPanel !bg-transparent !p-0`}>
                        <Tab.Panel className={'zt-themeTabPanel'}>
                            <div className="zt-card grow">
                                {/* <FilterArea title={t("Remote Employees")}
                                    elements={filterElements}
                                    filters={filters}
                                    setFilters={setFilters}
                                /> */}
                                <Table
                                    headings={employeeHeadings}
                                    rows={employeeRows}
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
                            {changeTeam && <ChangeRemoteTeamForm onClose={() => setChangeTeam(false)} />}
                        </Tab.Panel>
                        <Tab.Panel className={'zt-themeTabPanel'}>
                            <div className="zt-card grow">
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
                        </Tab.Panel>
                        <Tab.Panel className={'zt-themeTabPanel'}>
                            <DayTab />
                        </Tab.Panel>
                        <Tab.Panel className={'zt-themeTabPanel'}>
                            <DayTab />
                        </Tab.Panel>
                        <Tab.Panel className={'zt-themeTabPanel'}>
                            <DayTab />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tabs>
            </div>
            {edit && <CreateRemoteTeamForm object={true} onClose={() => setEdit(false)} />}

        </section>
    )
}