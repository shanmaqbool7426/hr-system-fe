import { Button, DisplayDate, DropDown, Table } from '@/components/elements'
import CreateCustomFieldForm from '@/components/forms/organization/custom-fields/create'
import { CloseCross, Edit, InputErrorInfo, ThreeDotsVertical, Trash } from '@/components/svg'
import { DeleteCustomfield } from '@/store/actions/customfield.actions'
import Toast from '@/util/toast'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

export default function ManageEmployeeStatusPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [create, setCreate] = useState(false)
  const [hide, setHide] = useState(false)
  const [edit, setEdit] = useState(false)

  const { customfield_list } = useSelector(state => state.customfield)
  const headings = [
    { title: t("Name"), col: "name", sort: true },
    { title: t("Modified On"), col: "updatedAt", sort: true },
    { title: t("Action"), col: "action" },
  ]

  const rows = customfield_list.filter(item => item.type === 'employee_status')
    .sort((a, b) => {
      if (sortDir === 'asc')
        return a[sortCol]?.localeCompare(b[sortCol])
      else
        return b[sortCol]?.localeCompare(a[sortCol])
    })
    .map(item => {
      return {
        name: item.name,
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
                    Toast.success(t("Employee Status deleted successfully"))
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
          <h1 className="text-h4 mb-0">{t("Employee Status")}</h1>
          <p className="mb-0">{t("Manage Employee Status")}</p>
        </div>
        <div className="flex items-start gap-2">
          <Button className={"btn btn-primary"} onClick={() => setCreate(true)}>{t("Create New Status")}</Button>
        </div>
      </div>

      <div className=" zt-card grow">

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
          setSortDir={setSortDir}
          perPage={perPage}
          setPerPage={setPerPage}
          page={page}
          setPage={setPage}
          className={'zt-employeeTable zt-employerBankTable'}
        />
      </div>
      {create && <CreateCustomFieldForm
        title={edit ? t('Employee Status') : t('Employee Status')}
        type={'employee_status'}
        onClose={() => { setCreate(false); setEdit(null) }}
        object={edit}
      />}
    </>
  )
}