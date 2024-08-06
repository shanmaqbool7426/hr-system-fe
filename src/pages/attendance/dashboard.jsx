import { Button, DisplayDate, Profile, Table } from '@/components/elements'
import AddExemptionForm from '@/components/forms/attendance/addExemption'
import AddRequestForm from '@/components/forms/attendance/addRequest'
import ChangeShiftForm from '@/components/forms/attendance/ChangeShift'
import ApplyOvertimeForm from '@/components/forms/overTime/create'
import FilterArea from '@/components/includes/FilterArea'
import { Activity } from '@/modules/attendance/Activity'
import { Staticts } from '@/modules/attendance/Staticts'
import { TimeSheet } from '@/modules/attendance/TimeSheet'
import { AttendanceSummaryStatistic } from '@/modules/dashboard/AttendanceSummaryStatistic'
import { FetchAttendance } from '@/store/actions/attendance.actions'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const data = [
  { name: '01 Apr', uv: 240, pv: 2400, amt: 2400 },
  { name: '02 Apr', uv: 180, pv: 1398, amt: 2210 },
  { name: '03 Apr', uv: 120, pv: 9800, amt: 2290 },
  { name: '04 Apr', uv: 160, pv: 3908, amt: 2000 },
  { name: '05 Apr', uv: 150, pv: 4800, amt: 2181 },
  { name: '06 Apr', uv: 120, pv: 3800, amt: 2500 },
  { name: '07 Apr', uv: 120, pv: 4300, amt: 2100 },
  { name: '08 Apr', uv: 120, pv: 4300, amt: 2100 },
  { name: '09 Apr', uv: 120, pv: 4300, amt: 2100 },
  { name: '10 Apr', uv: 120, pv: 4300, amt: 2100 },
  { name: '11 Apr', uv: 180, pv: 1398, amt: 2210 },
  { name: '12 Apr', uv: 120, pv: 4300, amt: 2100 },
  { name: '13 Apr', uv: 120, pv: 4300, amt: 2100 },
  { name: '14 Apr', uv: 120, pv: 4300, amt: 2100 },
  { name: '15 Apr', uv: 120, pv: 4300, amt: 2100 },
  { name: '16 Apr', uv: 120, pv: 4300, amt: 2100 },
  { name: '17 Apr', uv: 120, pv: 4300, amt: 2100 },
  { name: '18 Apr', uv: 120, pv: 4300, amt: 2100 },
  { name: '19 Apr', uv: 120, pv: 4300, amt: 2100 },
  { name: '20 Apr', uv: 120, pv: 4300, amt: 2100 },
  { name: '21 Apr', uv: 180, pv: 1398, amt: 2210 },
  { name: '22 Apr', uv: 120, pv: 4300, amt: 2100 },
  { name: '23 Apr', uv: 120, pv: 4300, amt: 2100 },
  { name: '24 Apr', uv: 120, pv: 4300, amt: 2100 },
  { name: '25 Apr', uv: 120, pv: 4300, amt: 2100 },
  { name: '26 Apr', uv: 180, pv: 1398, amt: 2210 },
  { name: '27 Apr', uv: 120, pv: 4300, amt: 2100 },
  { name: '28 Apr', uv: 120, pv: 4300, amt: 2100 },
  { name: '29 Apr', uv: 190, pv: 4300, amt: 2100 },
  { name: '30 Apr', uv: 120, pv: 4300, amt: 2100 },
];
const COLORS = ['#8C62FF', '#8C62FF', '#8C62FF', '#8C62FF', '#FFD023', '#0BA259', '#55C790', "#E03137", "#243C7A", "#8C62FF"];

// A helper function to convert minutes to "hh:mm"
const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};
const colorData = [
  { label: 'Present', color: "bg-themePurple" },
  { label: 'Late', color: "bg-themeSecondary" },
  { label: 'Early', color: "bg-themePrimary" },
  { label: 'Half Day', color: "bg-themeSuccessLight" },
  { label: 'Quarter Days', color: "bg-themeGrayscale500" },
  { label: 'Short Day', color: "bg-lightOrange" },
  { label: 'Absent', color: "bg-themeDanger" },
  { label: 'Absent For Short Time', color: "bg-themePrimary" },
  { label: 'Leave', color: "bg-themeSuccessDark" },
  { label: 'Missing', color: "bg-themeGrayscale300" },
  { label: 'Off', color: "bg-themeGrayscale" },
]
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
    // { title: t("Break"), col: "Break", sort: true },
    { title: t("Worked Hours"), col: "workedHours" },
    // { title: t("Over Time"), col: "OverTime", sort: true },
    // { title: t("Status"), col: "Status", sort: true },
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
      {/* {is_loading && <PageLoader/>} */}
      <div className="flex flex-col xl:flex-row justify-between gap-2 xl:items-center">
        <h1 className="text-h4 mb-0">{t("Dashboard")}</h1>
        <div className='flex gap-4 flex-wrap xl:flex-nowrap'>
          <Button className={"btn whitespace-nowrap btn-dark-outline"} onClick={() => setOverTime(true)}>{t("Apply Overtime")}</Button>
          <Button className={"btn whitespace-nowrap btn-dark-outline"} onClick={() => setChangeShift(true)}>{t("Shift change Request")}</Button>
          <Button className={"btn whitespace-nowrap btn-dark-outline"} onClick={() => setCreate(true)}>{t("Exemption Request")}</Button>
          <Button className={"btn whitespace-nowrap btn-primary"} onClick={() => setRequest(true)}>{t("Attendance Request")}</Button>
        </div>
      </div>
      <div className="zt-card !pb-8 zt-attendanceSummary h-80 hidden lg:block">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={"100%"} data={data}>
            <CartesianGrid horizontal={false} vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} className='text-xs' />
            <YAxis
              axisLine={false}
              tickLine={false}
              className='text-xs'
              tickFormatter={formatTime}  // Use the formatter here
            />
            <Bar radius={4} dataKey="uv" fill="#8884d8" barSize={20}> {data.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}</Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-2 flex-wrap justify-between text-xs text-themeGrayscale600 px-4">
          {colorData.map((ele, i) => (
            <div key={i} className="flex gap-1 items-center">
              <span className={`h-3 w-3 rounded ${ele.color}`}></span>
              <span>{ele.label}</span>
            </div>
          ))}
        </div>
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
      {request && <AddRequestForm onClose={() => { setRequest(false) }} object={edit} />}
      {changeShift && <ChangeShiftForm onClose={() => { setChangeShift(false) }} />}
      {overTime && <ApplyOvertimeForm onClose={() => { setOverTime(false) }} />}
      {create && <AddExemptionForm onClose={() => { setCreate(false); setEdit(null) }} object={edit} />}
    </section>
  )
}