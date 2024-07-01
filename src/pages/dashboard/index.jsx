import { auth } from "@/store/actions/auth.actions"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next";
import { AttendanceChart } from "@/modules/dashboard/AttendanceChart"; 
import { Requests } from "@/modules/dashboard/Requests";
import { TopEmployee } from "@/modules/dashboard/TopEmployee";
import { MyRequests } from "@/modules/dashboard/MyRequests";
import { Announcements } from "@/modules/dashboard/Announcements";
import { EmployeePayslip } from "@/modules/dashboard/EmployeePayslip";
import { UpcomingSchedule } from "@/modules/dashboard/UpcomingSchedule";
import FilterArea from "@/components/includes/FilterArea";
import { CloseCross, InputErrorInfo } from "@/components/svg";
import { AttendanceSummaryStatistic } from "@/modules/dashboard/AttendanceSummaryStatistic";
import { TimeSheet } from "@/modules/attendance/TimeSheet";

export default function Dashboard() {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [hide, setHide] = useState(false)
    const [filters, setFilters] = useState({
        search: "",
        project: null,
        department: null,
        status: null,
    })
    const flag = ['Leave', 'Half day', "Full day"];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const employeeList = ['Farrukh Shahzad', 'Nadia Tabassum', 'Waqar', 'Shujat'];
    const filterElements = [
        {
            type: "select",
            name: "Attendance Flag",
            placeholder: "Attendance Flag",
            value: filters.status,
            list: flag.map(item => {
                return { value: item, display: item }
            }),
            onChange: (status) => {
                let _filter = { ...filters }
                _filter['status'] = status
                setFilters(_filter)
            }
        },
        {
            type: "select",
            placeholder: "Current Month",
            name: "Current Month",
            value: filters.status,
            list: months.map(item => {
                return { value: item, display: item }
            }),
            onChange: (status) => {
                let _filter = { ...filters }
                _filter['status'] = status
                setFilters(_filter)
            }
        },
        {
            type: "select",
            placeholder: "Search Employee",
            name: "Search Employee",
            value: filters.status,
            list: employeeList.map(item => {
                return { value: item, display: item }
            }),
            onChange: (status) => {
                let _filter = { ...filters }
                _filter['status'] = status
                setFilters(_filter)
            }
        }
    ]
    useEffect(() => {
        dispatch(auth({}))
    }, [dispatch])
    return (
        <div className="flex flex-col-reverse 2xl:block">
            <div className="w-full 2xl:w-9/12 grid grid-cols-3 gap-6 2xl:float-left">
                <div className="zt-card zt-attendanceSummary col-span-3 hidden lg:block">
                    <div className="zt-attendanceSummary__head">
                        <FilterArea title={t("Attendance Summary")}
                            elements={filterElements}
                            filters={filters}
                            setFilters={setFilters}
                        />
                        {!hide && <div className="p-2 bg-themeBlue/30 rounded-lg mb-4 text-themeBlue/80 flex items-center justify-between">
                            <div className='flex items-center gap-2'><InputErrorInfo /><strong> {t("Note")}</strong> {t('You cannot change predefined values')}</div>
                            <CloseCross className={'cursor-pointer'}
                                onClick={(() => setHide(true))}
                            />
                        </div>}
                    </div>
                    <AttendanceChart />
                </div>
                <AttendanceSummaryStatistic />
                <TimeSheet className={'col-span-3 lg:col-span-1'}/>
                {/* <DailyAttendanceLogs /> */}
                <Requests />
                <TopEmployee />

                <div className={'col-span-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'}>
                    <MyRequests />
                    <Announcements />
                    <EmployeePayslip />
                </div>
            </div>
            <UpcomingSchedule title={'Upcoming Schedule'} options={true}/>
        </div>
    )
}
