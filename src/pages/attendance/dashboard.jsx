import { Button, DisplayDate, Profile, Table } from '@/components/elements'
import AddExemptionForm from '@/components/forms/attendance/addExemption'
import CreateAttendanceRequest from '@/components/forms/attendance/create-attendance-request'
import ChangeShiftForm from '@/components/forms/attendance/ChangeShift'
import ApplyOvertimeForm from '@/components/forms/overTime/create'
import FilterArea from '@/components/includes/FilterArea'
import { Activity } from '@/modules/attendance/Activity'
import { Staticts } from '@/modules/attendance/Staticts'
import { TimeSheet } from '@/modules/attendance/TimeSheet'
import { AttendanceChart } from '@/modules/dashboard/AttendanceChart'
import { AttendanceSummaryStatistic } from '@/modules/dashboard/AttendanceSummaryStatistic'
import { FetchAttendance } from '@/store/actions/attendance.actions' 
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'

export default function Dashboard() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [request, setRequest] = useState(false)
  const [create, setCreate] = useState(false)
  const [overTime, setOverTime] = useState(false)
  const [changeShift, setChangeShift] = useState(false)
  const [edit, setEdit] = useState(false)
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const { attendance_list } = useSelector(state => state.attendance) 
  
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
    { title: t("Worked Hours"), col: "workedHours" },
  ]

  useEffect(() => {
    dispatch(FetchAttendance()) 
  }, [dispatch])

  const filtered_attendandance_data = (attendance_list || [])
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
    .map((item, i) => {
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
      <div className="flex flex-col xl:flex-row justify-between gap-2 xl:items-center">
        <h1 className="text-h4 mb-0">{t("Dashboard")}</h1>
        <div className='flex gap-4 flex-wrap xl:flex-nowrap'>
          <Button className={"btn whitespace-nowrap btn-dark-outline"} onClick={() => setOverTime(true)}>{t("Apply Overtime")}</Button>
          <Button className={"btn whitespace-nowrap btn-dark-outline"} onClick={() => setChangeShift(true)}>{t("Shift change Request")}</Button>
          <Button className={"btn whitespace-nowrap btn-dark-outline"} onClick={() => setCreate(true)}>{t("Exemption Request")}</Button>
          <Button className={"btn whitespace-nowrap btn-primary"} onClick={() => setRequest(true)}>{t("Attendance Request")}</Button>
        </div>
      </div>
      <div className="zt-card zt-attendanceSummary col-span-3 hidden lg:block">
        <AttendanceChart />
      </div>
      <AttendanceSummaryStatistic />
      <div className="grid grid-cols-3 gap-6">
        <TimeSheet className={'col-span-3 xl:col-span-1'} />
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
      {request && <CreateAttendanceRequest onClose={() => { setRequest(false) }} object={edit} />}
      {changeShift && <ChangeShiftForm onClose={() => { setChangeShift(false) }} />}
      {overTime && <ApplyOvertimeForm onClose={() => { setOverTime(false) }} />}
      {create && <AddExemptionForm onClose={() => { setCreate(false); setEdit(null) }} object={edit} />}
    </section>
  )
}