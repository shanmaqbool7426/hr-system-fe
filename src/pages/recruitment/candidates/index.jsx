import { Button, DropDown, Table, CheckBox } from '@/components/elements'
import CandidateFieldForm from '@/components/forms/recruitment/add-candidate/create'
import FilterArea from '@/components/includes/FilterArea'
import Statistic from '@/components/recruitment/statistic'
import { CloseCross, Edit, InputErrorInfo, ThreeDotsVertical, Trash, Download, OpenJobs, Applicants, ShortListed, ScheduleInterviews } from '@/components/svg'
import { DeleteCustomfield } from '@/store/actions/customfield.actions'
import Toast from '@/util/toast'
import Link from 'next/link'
import React, { lazy, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

export default function Recruitment() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [create, setCreate] = useState(false) 
  const [edit, setEdit] = useState(false)
  const { customfield_list } = useSelector(state => state.customfield)
  const [filters, setFilters] = useState({
    search: "",
    project: null,
    department: null,
    status: null,
  })

  const filterElements = [
    {
      type: "search",
      name: "search",
      value: filters.search,
      placeholder: t("Search employees by name & email"),
      className: "xl:col-span-2",
      onChange: (event) => {
        let _filter = { ...filters }
        _filter['search'] = event.target.value
        setFilters(_filter)
      }
    },
    {
      type: "select",
      name: "status",
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
   
    { title: t("Name"), col: "name", /* sort: true */ },
    { title: t("Job Title"), col: "jobTitle", className: "flex justify-center" },
    { title: t("Departments"), col: "departments", /* sort: true */ },
    { title: t("Job Types"), col: "jobType", /* sort: true */ },
    { title: t("Status"), col: "status" },
    { title: t("ATS Score"), col: "atsScore" },
    { title: t("Resume"), col: "resume" },
    { title: t("Action"), col: "action" }
  ]

  const rows = [{
 
    name: <Link href={'/recruitment/detail/123'} className="flex flex-col no-underline items-center justify-centerw">
      <strong className={'text-themeGrayscale900 text-sm'}>{t('Kelli Lebsack')}</strong>
      <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
    </Link>,
    jobTitle: 'Manager',
    departments: 'Outdoors',
    jobType: <span className='zt-tag zt-tag-success'>Full Time</span>,
    status: <span className='zt-tag zt-tag-dark'>Applied</span>,
    atsScore: '92',
    resume: <Button type="button" variant={'purple'} className={'!py-1 !px-4'}>
      <Download />
      {t('Download')}
    </Button>,
    action: <DropDown icon={<ThreeDotsVertical />}>
      <ul className="zt-themeDropDownList zt-sm gap-4">
        <li className="!p-0">
          <a onClick={() => { setEdit(true); setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
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
    </DropDown>
  },
  {
   
    name: <Link href={'/recruitment/detail/123'} className="flex flex-col no-underline items-center justify-center">
      <strong className={'text-themeGrayscale900 text-sm'}>{t('Gertrude Kuphal')}</strong>
      <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
    </Link>,
    jobTitle: 'Manager',
    departments: 'Outdoors',
    jobType: <span className='zt-tag zt-tag-danger'>Part Time</span>,
    status: <span className='zt-tag zt-tag-success'>Short List</span>,
    atsScore: '92',
    resume: <Button type="button" variant={'purple'} className={'!py-1 !px-4'}>
      <Download />
      {t('Download')}
    </Button>,
    action: <DropDown icon={<ThreeDotsVertical />}>
      <ul className="zt-themeDropDownList zt-sm gap-4">
        <li className="!p-0">
          <a onClick={() => { setEdit(true); setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
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
    </DropDown>
  },
  {
   
    name: <Link href={'/recruitment/detail/123'} className="flex flex-col no-underline items-center justify-center">
      <strong className={'text-themeGrayscale900 text-sm'}>{t('Kelli Lebsack')}</strong>
      <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
    </Link>,
    jobTitle: 'Manager',
    departments: 'Outdoors',
    jobType: <span className='zt-tag zt-tag-warning'>Contract</span>,
    status: <span className='zt-tag zt-tag-purple'>Interview</span>,
    atsScore: '92',
    resume: <Button type="button" variant={'purple'} className={'!py-1 !px-4'}>
      <Download />
      {t('Download')}
    </Button>,
    action: <DropDown icon={<ThreeDotsVertical />}>
      <ul className="zt-themeDropDownList zt-sm gap-4">
        <li className="!p-0">
          <a onClick={() => { setEdit(true); setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
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
    </DropDown>
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
    name: <Link href={'/recruitment/detail/123'} className="flex flex-col no-underline items-center justify-center">
      <strong className={'text-themeGrayscale900 text-sm'}>{t('Kelli Lebsack')}</strong>
      <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
    </Link>,
    jobTitle: 'Manager',
    departments: 'Outdoors',
    jobType: <span className='zt-tag zt-tag-success'>Full Time</span>,
    status: <span className='zt-tag zt-tag-warning'>Pre Final</span>,
    atsScore: '92',
    resume: <Button type="button" variant={'purple'} className={'!py-1 !px-4'}>
      <Download />
      {t('Download')}
    </Button>,
    action: <DropDown icon={<ThreeDotsVertical />}>
      <ul className="zt-themeDropDownList zt-sm gap-4">
        <li className="!p-0">
          <a onClick={() => { setEdit(true); setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
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
    </DropDown>
  },
  {
    sr: <div className="flex items-center">
      <CheckBox
        id={`5`}
        size={'sm'}
        variant={'dark'}
      />
    </div>,
    SerailNo: '5',
    name: <Link href={'/recruitment/detail/123'} className="flex flex-col no-underline items-center justify-center">
      <strong className={'text-themeGrayscale900 text-sm'}>{t('Kelli Lebsack')}</strong>
      <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
    </Link>,
    jobTitle: 'Manager',
    departments: 'Outdoors',
    jobType: <span className='zt-tag zt-tag-danger'>Part Time</span>,
    status: <span className='zt-tag zt-tag-secondary'>Final</span>,
    atsScore: '92',
    resume: <Button type="button" variant={'purple'} className={'!py-1 !px-4'}>
      <Download />
      {t('Download')}
    </Button>,
    action: <DropDown icon={<ThreeDotsVertical />}>
      <ul className="zt-themeDropDownList zt-sm gap-4">
        <li className="!p-0">
          <a onClick={() => { setEdit(true); setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
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
    </DropDown>
  },
  {
    sr: <div className="flex items-center">
      <CheckBox
        id={`6`}
        size={'sm'}
        variant={'dark'}
      />
    </div>,
    SerailNo: '6',
    name: <Link href={'/recruitment/detail/123'} className="flex flex-col no-underline items-center justify-center">
      <strong className={'text-themeGrayscale900 text-sm'}>{t('Kelli Lebsack')}</strong>
      <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
    </Link>,
    jobTitle: 'Manager',
    departments: 'Outdoors',
    jobType: <span className='zt-tag zt-tag-warning'>Contract</span>,
    status: <span className='zt-tag zt-tag-purple'>Hired</span>,
    atsScore: '92',
    resume: <Button type="button" variant={'purple'} className={'!py-1 !px-4'}>
      <Download />
      {t('Download')}
    </Button>,
    action: <DropDown icon={<ThreeDotsVertical />}>
      <ul className="zt-themeDropDownList zt-sm gap-4">
        <li className="!p-0">
          <a onClick={() => { setEdit(true); setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
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
    </DropDown>
  },
  {
    sr: <div className="flex items-center">
      <CheckBox
        id={`7`}
        size={'sm'}
        variant={'dark'}
      />
    </div>,
    SerailNo: '7',
    name: <Link href={'/recruitment/detail/123'} className="flex flex-col no-underline items-center justify-center">
      <strong className={'text-themeGrayscale900 text-sm'}>{t('Kelli Lebsack')}</strong>
      <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
    </Link>,
    jobTitle: 'Manager',
    departments: 'Outdoors',
    jobType: <span className='zt-tag zt-tag-success'>Full Time</span>,
    status: <span className='zt-tag zt-tag-primary'>Onboarding</span>,
    atsScore: '92',
    resume: <Button type="button" variant={'purple'} className={'!py-1 !px-4'}>
      <Download />
      {t('Download')}
    </Button>,
    action: <DropDown icon={<ThreeDotsVertical />}>
      <ul className="zt-themeDropDownList zt-sm gap-4">
        <li className="!p-0">
          <a onClick={() => { setEdit(true); setCreate(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
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
    </DropDown>
  }
  ]

  return (
    <section className="flex flex-col grow">
      {/* {is_loading && <PageLoader/>} */}
      <div className="flex justify-between pb-6">
        <div className="flex flex-col">
          <h1 className="text-h4 mb-0">{t("Dashboard")}</h1>
          <p className="mb-0">{t("Manage all candidates")}</p>
        </div>
        <div className="flex items-start gap-2">
          <Button className={"btn btn-dark-outline"} onClick={() => setCreate(true)}>{t("Add Candidate")}</Button>
          <Button className={"btn btn-dark"}>{t("Add Job")}</Button>
        </div>
      </div>

      <div className="zt-statList mb-6">
        <Statistic variant={'primary'} statIcon={<OpenJobs />} title={'Open Jobs'} statCount={'112'} statRatio={'+25,5%'} />
        <Statistic variant={'secondary'} statIcon={<Applicants />} title={'Applicants'} statCount={'310'} statRatio={'+57,5%'} />
        <Statistic variant={'warning'} statIcon={<ScheduleInterviews />} title={'Schedule Interviews'} statCount={'74'} statRatio={'+15,5%'} />
        <Statistic variant={'success'} statIcon={<ShortListed />} title={'Short Listed'} statCount={'37'} statRatio={'+9,5%'} />
      </div>

      <div className="w-full bg-white p-6 rounded-lg grow">
        <FilterArea title={t("Employees")}
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
          className={'zt-employeeTable zt-recruitmentTable'}
        />
      </div>

      {create && <CandidateFieldForm
        onClose={() => { setCreate(false); setEdit(null) }}
        object={edit}
      />}
    </section>
  )
}