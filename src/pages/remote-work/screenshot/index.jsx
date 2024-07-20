import { CheckBox, Table } from '@/components/elements'
import FilterArea from '@/components/includes/FilterArea'
import { ChevronDown } from '@/components/svg'
import Image from 'next/image'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

export default function Screenshot() {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
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
            placeholder: t("Search team members"),
            className: "xl:col-span-2",
            onChange: (event) => {
                let _filter = { ...filters }
                _filter['search'] = event.target.value
                setFilters(_filter)
            }
        },
        {
            type: "search",
            name: "search",
            value: filters.search,
            placeholder: t("Search team"),
            className: "xl:col-span-2",
            onChange: (event) => {
                let _filter = { ...filters }
                _filter['search'] = event.target.value
                setFilters(_filter)
            }
        },
    ]

    const headings = [
        { title: t("Name"), col: "name", /* sort: true */ },
        { title: t("Screenshots taken"), col: "Screenshots" },
        { title: t("Flagged as suspicious"), col: "Flagged", /* sort: true */ },
        { title: t("View"), col: "view", /* sort: true */ },
    ]

    const rows = [
        {
            name: <div className="flex items-center justify-start gap-4 grow">
                <figure className={'shrink-0'}><Image height={30} width={30} alt='profile' src={'/assets/images/users/user-01.jpg'} /></figure>
                <div className={'flex flex-col text-left'}>
                    <strong className={'text-themeGrayscale text-sm'}>{t('Kelli Lebsack')}</strong>
                    <span className={'text-themeGrayscale500 text-xs'}>{t('Manager')}</span>
                </div>
            </div>,
            Screenshots: '3',
            Flagged: "5",
            view: <button><ChevronDown /></button>,
            discloureContent: <div className='grid custom__grid gap-4'>
                {[0, 1, 2, 3, 4, 5, 6].map((ele, i) => (
                    <div key={i} className='flex flex-col gap-1 w-max relative'>
                        <figure>
                            <Image src={'/assets/images/asset/img-01.png'} height={200} width={216} alt='screenshot' />
                        </figure>
                        <div className='absolute top-2 left-2'>
                            <CheckBox id={i} />
                        </div>
                        <div className='flex justify-between'>
                            <span>{t("Skype")}</span>
                            <span className='font-bold'>10:54</span>
                        </div>
                        <p className='text-start mb-0'>{t("Productivity")} <span className='text-themeDanger font-bold'>65.45%</span></p>
                    </div>
                ))}
            </div>
        },
        {
            name: <div className="flex items-center justify-start gap-4 grow">
                <figure className={'shrink-0'}><Image height={30} width={30} alt='profile' src={'/assets/images/users/user-01.jpg'} /></figure>
                <div className={'flex flex-col text-left'}>
                    <strong className={'text-themeGrayscale text-sm'}>{t('Kelli Lebsack')}</strong>
                    <span className={'text-themeGrayscale500 text-xs'}>{t('Manager')}</span>
                </div>
            </div>,
            Screenshots: '3',
            Flagged: "5",
            view: <button><ChevronDown /></button>,
            discloureContent: <div className='grid custom__grid gap-4'>
                {[0, 1, 2, 3, 4, 5, 6].map((ele, i) => (
                    <div key={i} className='flex flex-col gap-1 w-max relative'>
                        <figure>
                            <Image src={'/assets/images/asset/img-01.png'} height={200} width={216} alt='screenshot' />
                        </figure>
                        <div className='absolute top-2 left-2'>
                            <CheckBox id={i} />
                        </div>
                        <div className='flex justify-between'>
                            <span>{t("Skype")}</span>
                            <span className='font-bold'>10:54</span>
                        </div>
                        <p className='text-start mb-0'>{t("Productivity")} <span className='text-themeDanger font-bold'>65.45%</span></p>
                    </div>
                ))}
            </div>
        },
    ]

    return (
        <section className="flex flex-col grow">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex justify-between pb-6">
                <h1 className="text-h4 mb-0">{t("Screenshot")}</h1>
                {/* <Button className={"btn btn-primary"} onClick={() => setCreate(true)}>{t("Add New Request")}</Button> */}
            </div>
            <div className="zt-card grow">
                <FilterArea title={t("Screenshot")}
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
        </section>
    )
}