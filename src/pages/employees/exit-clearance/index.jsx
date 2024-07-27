
import { CheckBox, DropDown, Table } from "@/components/elements";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useState } from "react";

export default function ExitClearance() {
    const { t } = useTranslation()
    
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
    const headings = [
   
        { title: t("Name"), col: "name", /* sort: true */ },
        { title: t("Job Title"), col: "jobTitle", className: "flex justify-center" },
        { title: t("Departments"), col: "departments", /* sort: true */ },
        { title: t("Job Types"), col: "jobType", /* sort: true */ },
        { title: t("Status"), col: "status" },
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
        </section>
    )
}
