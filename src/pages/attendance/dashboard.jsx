import { Button, DropDown, Table } from '@/components/elements'
import AddExemptionForm from '@/components/forms/attendance/addExemption'
import AddRequestForm from '@/components/forms/attendance/addRequest'
import FilterArea from '@/components/includes/FilterArea'
import { ThreeDotsVertical } from '@/components/svg'
import { Activity } from '@/modules/attendance/Activity'
import { Staticts } from '@/modules/attendance/Staticts'
import { TimeSheet } from '@/modules/attendance/TimeSheet'
import { DeleteCustomfield } from '@/store/actions/customfield.actions'
import Toast from '@/util/toast'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

export default function Dashboard() {
  const { t } = useTranslation()
  const [request, setRequest] = useState(false)
  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false)
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const { customfield_list } = useSelector(state => state.customfield)
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const [filters, setFilters] = useState({
    search: "",
    project: null,
    department: null,
    status: null,
  })
  const filterElements = [
    {
      type: "select",
      name: "Select Employee",
      className: "xl:col-span-2",
      placeholder: "Select Employee",
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
      { title: t("Sr#"), col: "Sr" },
      { title: t("Date"), col: "Date", sort: true },
      { title: t("Punch In"), col: "PunchIn", sort: true },
      { title: t("Punch Out"), col: "PunchOut", sort: true },
      { title: t("Break"), col: "Break", sort: true },
      { title: t("Worked Hours"), col: "WorkedHours", sort: true },
      { title: t("Over Time"), col: "OverTime", sort: true }, 
      { title: t("Status"), col: "Status", sort: true }, 
    ]
  
    const rows = [
      {
        Sr: "1",
        Date: "19 Feb 2024",
        PunchIn: '10:00 AM',
        PunchOut:  "7:00 PM",
        Break: "1:00 hrs",
        WorkedHours: "8:00 hrs",
        OverTime: "4:00 hrs",
        Status: <span className='zt-tag zt-tag-success'>Present</span>,
      },
      {
        Sr: "2",
        Date: "19 Feb 2024",
        PunchIn: '10:00 AM',
        PunchOut:  "7:00 PM",
        Break: "1:00 hrs",
        WorkedHours: "8:00 hrs",
        OverTime: "4:00 hrs",
        Status: <span className='zt-tag zt-tag-danger'>Leave</span>,
      },
      {
        Sr: "3",
        Date: "19 Feb 2024",
        PunchIn: '10:00 AM',
        PunchOut:  "7:00 PM",
        Break: "1:00 hrs",
        WorkedHours: "8:00 hrs",
        OverTime: "4:00 hrs",
        Status: <span className='zt-tag zt-tag-secondary'>Late</span>,
      },
    ]
    return (
        <section className="flex flex-col gap-6 grow">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex justify-between items-center">
                <h1 className="text-h4 mb-0">{t("Dashboard")}</h1>
                <div className='flex gap-4'>
                    <Button className={"btn btn-dark-outline"} onClick={() => setCreate(true)}>{t("Apply Overtime")}</Button>
                    <Button className={"btn btn-dark-outline"} onClick={() => setCreate(true)}>{t("Shift change Request")}</Button>
                    <Button className={"btn btn-dark-outline"} onClick={() => setCreate(true)}>{t("Exemption Request")}</Button>
                    <Button className={"btn btn-primary"} onClick={() => setRequest(true)}>{t("Attendance Request")}</Button>
                </div>
            </div>
            <div className="grid grid-cols-3  gap-6">
              <TimeSheet />
              <Staticts />
              <Activity />
            </div>

            <div className="zt-card grow">
                <FilterArea title={t("")} elements={filterElements} filters={filters} setFilters={setFilters}/>

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
                    className={'zt-employeeTable zt-projectsTable'}
                />
            </div>
            {request && <AddRequestForm
                title={edit ? t('New Request') : t('New Request')}
                type={'New Request'}
                onClose={() => { setRequest(false) }}
                object={edit}
            />}

      {create && <AddExemptionForm
        title={edit ? t('Exemption Request') : t('Exemption Request')}
        type={'New Request'}
        onClose={() => { setCreate(false); setEdit(null) }}
        object={edit}
      />}
    </section>
  )
}