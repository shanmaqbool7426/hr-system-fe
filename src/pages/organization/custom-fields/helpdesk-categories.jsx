import { Button, DisplayDate, DropDown, Table } from '@/components/elements'
import CreateCustomFieldForm from '@/components/forms/organization/custom-fields/create'
import { Edit, ThreeDotsVertical, Trash } from '@/components/svg'
import { DeleteCustomfield } from '@/store/actions/customfield.actions'
import Toast from '@/util/toast'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

export default function HelpDeskCategoriesPage() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [create, setCreate] = useState(false)
    const [edit, setEdit] = useState(false)

    const { customfield_list } = useSelector(state => state.customfield)
    const headings = [
        { title: t("Category"), col: "name", sort: true },
        { title: t("Parent"), col: "parent", sort: true },
        { title: t("Modified On"), col: "updatedAt", sort: true },
        { title: t("Action"), col: "action" },
    ]

    const rows = customfield_list.filter(item => item.type === 'helpdesk_category')
        .sort((a, b) => {
            if (sortDir === 'asc')
                return a[sortCol]?.localeCompare(b[sortCol])
            else
                return b[sortCol]?.localeCompare(a[sortCol])
        })
        .map(item => {
            return {
                name: item.name,
                parent: item?.parent?.name || "------",
                updatedAt: <DisplayDate date={item.updatedAt} time={true} />,
                action: item?.company && <DropDown icon={<ThreeDotsVertical />}>
                    <ul className="zt-themeDropDownList zt-sm gap-4">
                        <li className="!p-0">
                            <a onClick={() => { setEdit(item); setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                                <span><Edit /></span>
                                <span>{t("Edit")}</span>
                            </a>
                        </li>
                        <li className="!p-0">
                            <a onClick={() => {
                                Toast.confirmDelete(() => {
                                    dispatch(DeleteCustomfield(item._id, () => {
                                        Toast.success(t("Employee Group deleted successfully"))
                                    }))
                                }, t)
                            }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                                <span><Trash /></span>
                                <span>{t("Delete")}</span>
                            </a>
                        </li>
                    </ul>
                </DropDown>,
            }
        })

    return (
        <>
            <div className="flex justify-between items-center pb-6">
                <div className="">
                    <h1 className="text-h4 mb-0">{t("Helpdesk Categories")}</h1>
                    <p className="mb-0">{t("Manage your Helpdesk Categories")}</p>
                </div>
                <div className="flex items-start gap-2">
                    <Button className={"btn btn-primary"} onClick={() => setCreate(true)}>{t("Create Helpdesk Categories")}</Button>
                </div>
            </div>
            <div className=" zt-card grow">
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
                    className={'zt-employeeTable zt-employeeGroupTable'}
                />
            </div>
            {create && <CreateCustomFieldForm
                title={t('Helpdesk Category')}
                type={'helpdesk_category'}
                parent={true}
                onClose={() => { setCreate(false); setEdit(null) }}
                object={edit}
            />}
        </>
    )
}