import { Button, DisplayDate, DropDown, Table } from '@/components/elements'
import CreateCustomFieldForm from '@/components/forms/organization/custom-fields/create'
import {  Edit,  ThreeDotsVertical, Trash } from '@/components/svg'
import { DeleteCustomfield } from '@/store/actions/customfield.actions'
import Toast from '@/util/toast'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

export default function ManageEmployeeExitClearanceTypePage () {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [create, setCreate] = useState(false) 
  const [edit, setEdit] = useState(false)

  const headings = [
    { title: t("Task Name"), col: "taskname", sort: true },
    { title: t("Modified On"), col: "updatedAt", sort: true },
    { title: t("Action"), col: "action" },
  ]

  const rows = [
    {
        taskname: 'Educational documents',
        updatedAt: <DisplayDate date={'25 May 2024'} time={true} />,
        action:  <DropDown icon={<ThreeDotsVertical />}>
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
                    Toast.success(t("Exit Type deleted successfully"))
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
  ]

  return (
    <>
      <div className="flex justify-between items-center pb-6">
        <div className="">
          <h1 className="text-h4 mb-0">{t("Exit Clearance")}</h1>
          <p className="mb-0">{t("Manage your Exit Clearance")}</p>
        </div>
        <div className="flex items-start gap-2">
          <Button className={"btn btn-primary"} onClick={() => setCreate(true)}>{t("Add New Exit Clearance")}</Button>
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
          className={'zt-employeeTable zt-exitTypeTable'}
        />
      </div>
      {create && <CreateCustomFieldForm
        title={t('Exit Clearance Task')}
        type={'exit_type'}
        onClose={() => { setCreate(false); setEdit(null) }}
        object={edit}
      />}
    </>
  )
}