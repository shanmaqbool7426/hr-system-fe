
import { CheckBox, DropDown, Table } from "@/components/elements";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import Toast from "@/util/toast";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import CreateExitClearanceForm from "@/components/forms/projects/createExitClearance";
export default function ExitClearance() {
  const { t } = useTranslation()
  const router = useRouter()
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [clearance, setClearance] = useState(false)
  const headings = [

    { title: t("Name"), col: "name", /* sort: true */ },
    { title: t("Job Title"), col: "jobTitle", className: "flex justify-center" },
    { title: t("Departments"), col: "departments", /* sort: true */ },
    { title: t("Email"), col: "email" },
    { title: t("Action"), col: "action" }
  ]

  const rows = [{

    name: <Link href={'/employees/details/6689569e410235cd11e326b2'} className="flex flex-col no-underline items-center justify-center">
      <strong className={'text-themeGrayscale900 text-sm'}>{t('Kelli Lebsack')}</strong>
      <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
    </Link>,
    jobTitle: 'Manager',
    departments: 'Outdoors',
    email: "John@gmail.com",
    jobType: <span className='zt-tag zt-tag-success'>Full Time</span>,
    status: <span className='zt-tag zt-tag-dark'>Applied</span>,
    action: <DropDown icon={<ThreeDotsVertical />}>
      <ul className="zt-themeDropDownList zt-sm gap-4 w-40">
        <li className="!p-0">
          <a onClick={() => { setClearance(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
            <span><Edit /></span>
            <span>{t("Clearance")}</span>
          </a>
        </li>
        <li className="!p-0">
          <a onClick={() => {
            Toast.daynamicTitle(() => {
              Toast.success(t("Employee moved for Final Settlement"))
              router.push('/payroll/final-settlement')
            }, t, 'Do you want to move this Employee for Final Settlment ?')
          }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
            <span><Trash /></span>
            <span>{t("Move to FNF")}</span>
          </a>
        </li>
      </ul>
    </DropDown>
  },
  {

    name: <Link href={'/employees/details/6689569e410235cd11e326b2'} className="flex flex-col no-underline items-center justify-center">
      <strong className={'text-themeGrayscale900 text-sm'}>{t('Gertrude Kuphal')}</strong>
      <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
    </Link>,
    jobTitle: 'Manager',
    departments: 'Outdoors',
    email: "John@gmail.com",
    jobType: <span className='zt-tag zt-tag-danger'>Part Time</span>,
    status: <span className='zt-tag zt-tag-success'>Short List</span>,
    action: <DropDown icon={<ThreeDotsVertical />}>
      <ul className="zt-themeDropDownList zt-sm gap-4 w-40">
        <li className="!p-0">
          <a onClick={() => { setClearance(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
            <span><Edit /></span>
            <span>{t("Clearance")}</span>
          </a>
        </li>
        <li className="!p-0">
          <a onClick={() => {
            Toast.daynamicTitle(() => {
              Toast.success(t("Employee moved for Final Settlement"))
              router.push('/payroll/final-settlement')
            }, t, 'Do you want to move this Employee for Final Settlment ?')
          }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
            <span><Trash /></span>
            <span>{t("Move to FNF")}</span>
          </a>
        </li>
      </ul>
    </DropDown>
  },
  {

    name: <Link href={'/employees/details/6689569e410235cd11e326b2'} className="flex flex-col no-underline items-center justify-center">
      <strong className={'text-themeGrayscale900 text-sm'}>{t('Kelli Lebsack')}</strong>
      <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
    </Link>,
    jobTitle: 'Manager',
    departments: 'Outdoors',
    email: "John@gmail.com",
    jobType: <span className='zt-tag zt-tag-warning'>Contract</span>,
    status: <span className='zt-tag zt-tag-purple'>Interview</span>,
    action: <DropDown icon={<ThreeDotsVertical />}>
      <ul className="zt-themeDropDownList zt-sm gap-4 w-40">
        <li className="!p-0">
          <a onClick={() => { setClearance(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
            <span><Edit /></span>
            <span>{t("Clearance")}</span>
          </a>
        </li>
        <li className="!p-0">
          <a onClick={() => {
            Toast.daynamicTitle(() => {
              Toast.success(t("Employee moved for Final Settlement"))
              router.push('/payroll/final-settlement')
            }, t, 'Do you want to move this Employee for Final Settlment ?')
          }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
            <span><Trash /></span>
            <span>{t("Move to FNF")}</span>
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
    name: <Link href={'/employees/details/6689569e410235cd11e326b2'} className="flex flex-col no-underline items-center justify-center">
      <strong className={'text-themeGrayscale900 text-sm'}>{t('Kelli Lebsack')}</strong>
      <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
    </Link>,
    jobTitle: 'Manager',
    departments: 'Outdoors',
    email: "John@gmail.com",
    jobType: <span className='zt-tag zt-tag-success'>Full Time</span>,
    status: <span className='zt-tag zt-tag-warning'>Pre Final</span>,
    action: <DropDown icon={<ThreeDotsVertical />}>
      <ul className="zt-themeDropDownList zt-sm gap-4 w-40">
        <li className="!p-0">
          <a onClick={() => { setClearance(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
            <span><Edit /></span>
            <span>{t("Clearance")}</span>
          </a>
        </li>
        <li className="!p-0">
          <a onClick={() => {
            Toast.daynamicTitle(() => {
              Toast.success(t("Employee moved for Final Settlement"))
              router.push('/payroll/final-settlement')
            }, t, 'Do you want to move this Employee for Final Settlment ?')
          }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
            <span><Trash /></span>
            <span>{t("Move to FNF")}</span>
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
    name: <Link href={'/employees/details/6689569e410235cd11e326b2'} className="flex flex-col no-underline items-center justify-center">
      <strong className={'text-themeGrayscale900 text-sm'}>{t('Kelli Lebsack')}</strong>
      <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
    </Link>,
    jobTitle: 'Manager',
    departments: 'Outdoors',
    email: "John@gmail.com",
    jobType: <span className='zt-tag zt-tag-danger'>Part Time</span>,
    status: <span className='zt-tag zt-tag-secondary'>Final</span>,
    action: <DropDown icon={<ThreeDotsVertical />}>
      <ul className="zt-themeDropDownList zt-sm gap-4 w-40">
        <li className="!p-0">
          <a onClick={() => { setClearance(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
            <span><Edit /></span>
            <span>{t("Clearance")}</span>
          </a>
        </li>
        <li className="!p-0">
          <a onClick={() => {
            Toast.daynamicTitle(() => {
              Toast.success(t("Employee moved for Final Settlement"))
              router.push('/payroll/final-settlement')
            }, t, 'Do you want to move this Employee for Final Settlment ?')
          }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
            <span><Trash /></span>
            <span>{t("Move to FNF")}</span>
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
    name: <Link href={'/employees/details/6689569e410235cd11e326b2'} className="flex flex-col no-underline items-center justify-center">
      <strong className={'text-themeGrayscale900 text-sm'}>{t('Kelli Lebsack')}</strong>
      <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
    </Link>,
    jobTitle: 'Manager',
    departments: 'Outdoors',
    email: "John@gmail.com",
    jobType: <span className='zt-tag zt-tag-warning'>Contract</span>,
    status: <span className='zt-tag zt-tag-purple'>Hired</span>,
    action: <DropDown icon={<ThreeDotsVertical />}>
      <ul className="zt-themeDropDownList zt-sm gap-4 w-40">
        <li className="!p-0">
          <a onClick={() => { setClearance(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
            <span><Edit /></span>
            <span>{t("Clearance")}</span>
          </a>
        </li>
        <li className="!p-0">
          <a onClick={() => {
            Toast.daynamicTitle(() => {
              Toast.success(t("Employee moved for Final Settlement"))
              router.push('/payroll/final-settlement')
            }, t, 'Do you want to move this Employee for Final Settlment ?')
          }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
            <span><Trash /></span>
            <span>{t("Move to FNF")}</span>
          </a>
        </li>
      </ul>
    </DropDown>
  },
  ]
  return (
    <section className="flex flex-col gap-6 grow">
      {/* {is_loading && <PageLoader/>} */}
      <div className="flex justify-between items-center">
        <h1 className="text-h4 mb-0">{t("Exit Clearance")}</h1>
      </div>

      <div className="zt-card grow">
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
      {clearance && <CreateExitClearanceForm onClose={() => { setClearance(false) }} />}

    </section>
  )
}
