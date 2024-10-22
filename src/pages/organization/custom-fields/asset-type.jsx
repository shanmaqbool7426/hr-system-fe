import { Button, DropDown, ModifiedBy, Table } from '@/components/elements'
import CreateCustomFieldForm from '@/components/forms/organization/custom-fields/create'
import IconCompnent from '@/components/forms/organization/inventory/IconCompnent'
import { CloseCross, Edit, HeadPhone, InputErrorInfo, ThreeDotsVertical, Trash, KeyboardIcon, MobileIcon, HandFreeIcon, LedIcon } from '@/components/svg'
import { DeleteCustomfield } from '@/store/actions/customfield.actions'
import Toast from '@/util/toast'
import React, { lazy, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'

export default function ManageAssetTypesPage() {
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
    { title: t("Name"), col: "name", sort: true },
    { title: t("Icon"), col: "icon", className: "flex justify-center" },
    { title: t("Prefix"), col: "prefix", sort: true },
    { title: t("Modified On"), col: "updatedAt" },
    { title: t("Action"), col: "action" },
  ]

  const rows = customfield_list.filter(item => item.type === 'asset_type')
    .sort((a, b) => {
      if (sortDir === 'asc')
        return a[sortCol]?.localeCompare(b[sortCol])
      else
        return b[sortCol]?.localeCompare(a[sortCol])
    }
    )
    .map(item => {
      return {
        name: item.name,
        prefix: item.prefix,
        icon: <IconCompnent icon={item.icon} />,
        updatedAt: item.modifiedBy ? <ModifiedBy user={item.modifiedBy} date={item.updatedAt} /> : "-------",        
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
                    Toast.success(t("Asset Type deleted successfully"))
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
          <h1 className="text-h4 mb-0">{t("Asset Type")}</h1>
          <p className="mb-0">{t("Manage your Asset Type")}</p>
        </div>
        <div className="flex items-start gap-2">
          <Button className={"btn btn-primary"} onClick={() => setCreate(true)}>{t("Create Asset Type")}</Button>
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
          className={'zt-employeeTable zt-assetsTypeTable'}
        />
      </div>

      {create && <CreateCustomFieldForm
        title={t('Asset Type')}
        type={'asset_type'}
        onClose={() => { setCreate(false); setEdit(null) }}
        object={edit}
        additionFields={[
          {
            type: "text",
            name: "prefix",
            label: t('Prefix'),
            placeholder: t("Prefix"),
            required: true,
          },
          {
            type: "select",
            name: "icon",
            label: t('Icon'),
            required: true,
            list: [
              {
                display: <div className='flex gap-2'><LedIcon /> {t("LED")}</div>,
                value: "Led"
              },
              {
                display: <div className='flex gap-2'><HeadPhone /> {t("Head Phone")}</div>,
                value: "HeadPhone"
              },
              {
                display: <div className='flex gap-2'><HandFreeIcon /> {t("Hand Free")}</div>,
                value: "HandFree"
              },
              {
                display: <div className='flex gap-2'><KeyboardIcon /> {t("Keyboard")}</div>,
                value: "Keyboard"
              },
              {
                display: <div className='flex gap-2'><MobileIcon /> {t("Mobile")}</div>,
                value: "Mobile"
              },
            ]
          }
        ]}
        dynamicFields={true}
      />}
    </>
  )
}