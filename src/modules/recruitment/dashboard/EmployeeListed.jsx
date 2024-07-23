import { CheckBox, Table, Tabs } from '@/components/elements'
import { Tab } from '@headlessui/react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const EmployeeListed = () => {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)

    const headings = [
        { title: t(""), col: "sr", check: true },
        { title: t("Sr#"), col: "SerailNo" },
        { title: t("Job Title"), col: "JobTitle" },
        { title: t("Positions"), col: "Positions" },
        { title: t("Applications"), col: "Applications" },
        { title: t("Interviewed"), col: "Interviewed" },
        { title: t("Rejected"), col: "Rejected" },
        { title: t("Feedback Pending"), col: "FeedbackPending" },
        { title: t("Offered"), col: "Offered" },
    ]

    const rows = [{
        sr: <div className="flex items-center">
            <CheckBox
                id={`1`}
                size={'sm'}
                variant={'dark'}
            />
        </div>,
        SerailNo: '1',
        JobTitle: <div className="flex flex-col text-xs">
            <span className='font-medium'>{t('Customer Web Executive')}</span>
            <span className='text-themeSuccess'>{t("1 day ago")}</span>
        </div>,
        Positions: '3',
        Applications: '6',
        Interviewed: '5',
        Rejected: '9',
        FeedbackPending: '9',
        Offered: '9',
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
        JobTitle: <div className="flex flex-col text-xs">
            <span className='font-medium'>{t('Future Interactions Technician')}</span>
            <span className='text-themeSuccess'>{t("1 day ago")}</span>
        </div>,
        Positions: '3',
        Applications: '6',
        Interviewed: '5',
        Rejected: '9',
        FeedbackPending: '9',
        Offered: '9',
    },
    {
        sr: <div className="flex items-center">
            <CheckBox
                id={`3`}
                size={'sm'}
                variant={'dark'}
            />
        </div>,
        SerailNo: '3',
        JobTitle: <div className="flex flex-col text-xs">
            <span className='font-medium'>{t('Chief Response Planner')}</span>
            <span className='text-themeSuccess'>{t("1 day ago")}</span>
        </div>,
        Positions: '3',
        Applications: '6',
        Interviewed: '5',
        Rejected: '9',
        FeedbackPending: '9',
        Offered: '9',
    },
    {
        sr: <div className="flex items-center">
            <CheckBox
                id={`4`}
                size={'sm'}
                variant={'dark'}
            />
        </div>,
        SerailNo: '4',
        JobTitle: <div className="flex flex-col text-xs">
            <span className='font-medium'>{t('Lead Branding Orchestrator')}</span>
            <span className='text-themeSuccess'>{t("1 day ago")}</span>
        </div>,
        Positions: '3',
        Applications: '6',
        Interviewed: '5',
        Rejected: '9',
        FeedbackPending: '9',
        Offered: '9',
    },
    ]
    return (
        <div className='zt-card relative'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl mb-0 font-bold'>{t("Employees")}</h2>
                <Tabs
                    containerClasses={'zt-themeTabsV2'}
                    tabNavClasses={'zt-themeTabNav'}
                    tabs={["Jobs", "Candidates", "Onboardings"]}
                >
                    <Tab.Panels className={`zt-themeTabPanels zt-employeeTabsPanel absolute w-full left-0 top-20 zt-card`}>
                        <Tab.Panel className={'zt-themeTabPanel'}>
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
                                className={'zt-employeeTable zt-recruitmentTable'}
                            />
                        </Tab.Panel>
                        <Tab.Panel className={'zt-themeTabPanel'}>
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
                                className={'zt-employeeTable zt-recruitmentTable'}
                            />
                        </Tab.Panel>
                        <Tab.Panel className={'zt-themeTabPanel'}>
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
                                className={'zt-employeeTable zt-recruitmentTable'}
                            />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tabs>
            </div>
        </div>
    )
}
