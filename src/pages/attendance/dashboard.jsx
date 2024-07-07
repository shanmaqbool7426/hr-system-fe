import { Button, DisplayDate, DropDown, Profile, Table } from '@/components/elements'
import AddExemptionForm from '@/components/forms/attendance/addExemption'
import AddRequestForm from '@/components/forms/attendance/addRequest'
import FilterArea from '@/components/includes/FilterArea'
import { ThreeDotsVertical } from '@/components/svg'
import { Activity } from '@/modules/attendance/Activity'
import { Staticts } from '@/modules/attendance/Staticts'
import { TimeSheet } from '@/modules/attendance/TimeSheet'
import { FetchAttendance } from '@/store/actions/attendance.actions'
import { DeleteCustomfield } from '@/store/actions/customfield.actions'
import Toast from '@/util/toast'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

export default function Dashboard() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [request, setRequest] = useState(false)
  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false)
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const { customfield_list } = useSelector(state => state.customfield)
  const { attendance_list } = useSelector(state => state.attendance)
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const [filters, setFilters] = useState({
    employee: "",
    fromDate: null,
    toDate: null
  })
  const filterElements = [
    {
      type: "search",
      name: "search",
      value: filters.search,
      label: t("Search employees"),
      placeholder: t("Search employees"),
      className: "xl:col-span-2",
      onChange: (event) => {
        let _filter = { ...filters }
        _filter['search'] = event.target.value
        setFilters(_filter)
      }
    },
    {
      type: "date",
      value: filters.fromDate,
      label: t("From Date"),
      onChange: (date) => {
        let _filter = { ...filters }
        _filter['fromDate'] = date
        setFilters(_filter)
      }
    },
    {
      type: "date",
      value: filters.toDate,
      label: t("To Date"),
      onChange: (date) => {
        let _filter = { ...filters }
        _filter['toDate'] = date
        setFilters(_filter)
      }
    }
  ]
  const headings = [
    { title: t("Date"), col: "date", sort: true },
    { title: t("Employee"), col: "employee" },
    { title: t("Punch In"), col: "checkIn", sort: true },
    { title: t("Punch Out"), col: "checkOut", sort: true },
    // { title: t("Break"), col: "Break", sort: true },
    { title: t("Worked Hours"), col: "workedHours" },
    // { title: t("Over Time"), col: "OverTime", sort: true },
    // { title: t("Status"), col: "Status", sort: true },
  ]

  useEffect(() => {
    dispatch(FetchAttendance())
  }, [dispatch])

  const filtered_attendandance_data = attendance_list
    .filter(item => {

      let attendanceDate = new Date(item.date)
      let flag = true
      if (filters.fromDate) {
        flag = attendanceDate.getTime() >= (new Date(filters.fromDate)).getTime()
        if (!flag) return false
      }
      if (filters.toDate) {
        flag = attendanceDate.getTime() <= (new Date(filters.toDate)).getTime()
        if (!flag) return false
      }
      if (filters.search) {
        flag = item?.user?.firstName?.toLowerCase().includes(filters.search.toLowerCase())
        if (!flag) return false
      }
      if (!filters.fromDate && !filters.toDate) {
        flag = attendanceDate.getMonth() === (new Date).getMonth()
        if (!flag) return false
      }
      return flag
    })
    .sort((a, b) => {
      return (new Date(a.date)).getTime() - (new Date(b.date)).getTime()
    })
    .map(item => {
      return {
        date: <DisplayDate date={item.date} />,
        employee: <div className='flex gap-3 items-center capitalize'>
          <Profile image={item?.user?.avatar} name={item?.user?.firstName} />
          <span>{item?.user?.firstName} {item?.user?.lastName}</span>
        </div>,
        workedHours: item.checkInAt && item.checkOutAt ? moment(item.checkOutAt).diff(moment(item.checkInAt), 'hours') + " h" : "------",
        checkIn: item.checkInAt ? <DisplayDate date={item.checkInAt} timeOnly={true} /> : "------",
        checkOut: item.checkOutAt ? <DisplayDate date={item.checkOutAt} timeOnly={true} /> : "------",
      }
    })


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
        <FilterArea title={t("")} elements={filterElements} filters={filters} setFilters={setFilters} />

        <Table
          headings={headings}
          rows={filtered_attendandance_data}
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
        onClose={() => { setCreate(false); setEdit(null) }}
        object={edit}
      />}
    </section>
  )
}