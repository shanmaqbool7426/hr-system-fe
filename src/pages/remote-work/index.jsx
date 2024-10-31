import StatsCard from "@/components/elements/Widgets/StatsCard";
import { useTranslation } from "next-i18next";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import axios from "@/util/axios";
import { useEffect, useState } from "react";
import ProgressBar from "@/components/elements/ProgressBar";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { DropDown, Table } from "@/components/elements";
import { LuMessageCircle } from "react-icons/lu";
import BaseForm from "@/components/forms/BaseForm";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ThreeDotsVertical } from "@/components/svg";
import Toast from "@/util/toast";
const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL.replace("/api", ""), {
    autoConnect: false
})
export default function RemoteWork() {
    const { t } = useTranslation()
    const { auth_user } = useSelector(state => state.auth)
    const [stats, setStats] = useState({})
    const [data, setData] = useState({})
    const [employees, setEmployees] = useState([])
    const [buzz, setBuzz] = useState(null)

    // Fetching the dashboard data
    useEffect(() => {
        axios.get('/remote/dashboard').then(data => {
            let stats = data?.stats
            stats.online = data?.remoteEmployees.filter(employee => employee.online)?.length
            stats.offline = data?.remoteEmployees.filter(employee => !employee.online)?.length
            setData(data)
            setStats(stats)
            setEmployees(data?.remoteEmployees)
        })
    }, [])
    // Socket connection
    useEffect(() => {
        socket.connect()
        socket.on(`company-${auth_user.company._id}`, (event) => {
            const emp = employees.findIndex(employee => employee._id.toString() === event.data._id.toString())
            if (emp !== -1) {
                setEmployees((prev) => {
                    prev[emp].online = event.type === 'user_connected'
                    return prev
                })
            }
        })
        return () => {
            socket.off(`company-${auth_user.company._id}`)
            socket.disconnect()
        }
    }, [auth_user])

    const formik = useFormik({
        initialValues: {
            message: ""
        },
        validationSchema: Yup.object({
            message: Yup.string().required(t("Message is required"))
        }),
        onSubmit: (values) => {
            axios.post(`/remote/send-buzz/${buzz?._id}`, values)
                .then(data => {
                    setBuzz(null)
                    Toast.success(t("Message sent successfully"))
                })
        }
    })
    return (
        <>
            <section className="flex flex-col grow">
                <div className="flex justify-between pb-6">
                    <div className="flex flex-col">
                        <h1 className="text-h4 mb-0">{t("Remote Work")}</h1>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-4">
                    <StatsCard description={t("Remote Employees")} title={stats?.total?.toString()} variant="primary" />
                    <StatsCard description={t("Online")} title={employees?.filter(employee => employee.online)?.length?.toString()} variant="green" />
                    <StatsCard description={t("Offline")} title={employees?.filter(employee => !employee.online)?.length?.toString()} variant="purple" />
                    <StatsCard description={t("Absent")} title={stats?.absent?.toString()} variant="red" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="zt-card">
                        <h4 className="text-h5 mb-4">{t("Top Performers")}</h4>
                        <div className="flex flex-col gap-2">
                            {data?.topPerformers?.map((performer, index) => {
                                const totalHours = 40 * 4 // TODO: Get the total hours from the user's shift details
                                const productiveHours = (performer.total / 3600).toFixed(2)
                                const percentage = (productiveHours / totalHours) * 100
                                return (
                                    <ProgressBar
                                        key={index}
                                        title={`${performer.firstName} ${performer.lastName}`}
                                        statics={`${productiveHours} / ${totalHours}`}
                                        percentage={`${percentage.toFixed(2)}%`}
                                        variant={'primary'}
                                        containerClasses={'flex flex-col gap-2'}
                                        titleBarClasses={'mb-0 flex justify-between'}
                                        progressClasses={'flex flex-col'}
                                        progressBarClasses={'grow rounded-full'}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div className="zt-card">
                        <h4 className="text-h5 mb-4">{t("Application Time Spent")}</h4>
                        <div className="text-dark-2 capitalize">
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart
                                    width={500}
                                    height={250}
                                    data={data?.applicationTimeSpentByNature}
                                    margin={{
                                        bottom: 20,
                                    }}
                                >
                                    <XAxis tickLine={false} dataKey="name" tick={{ fill: 'currentColor', fontSize: 12 }} />
                                    <YAxis tickLine={false} tick={{ fill: 'currentColor', fontSize: 12 }} />
                                    <Bar dataKey="timeSpent" fill="currentColor" barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="zt-card col-span-2">
                        <h4 className="text-h5 mb-4">{t("Productive Time Spent of current month")}</h4>
                        <div className="text-themeSuccessDark dark:text-themeSuccessLight">
                            <ResponsiveContainer width="100%" height={400} >
                                <AreaChart
                                    width={500}
                                    height={250}
                                    data={data?.productiveTimeSpent}
                                    margin={{
                                        bottom: 20,
                                    }}
                                >
                                    <XAxis tickLine={false} dataKey="date" tick={{ fill: 'currentColor', fontSize: 12 }} />
                                    <YAxis tickLine={false} tick={{ fill: 'currentColor', fontSize: 12 }} />
                                    <Area type="monotone" dot={false} dataKey="timeSpent" stroke="currentColor" fill="currentColor" strokeWidth={0} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="zt-card col-span-2">
                        <h4 className="text-h5 mb-4">{t("Remote Employees")}</h4>
                        <Table
                            checkbox={false}
                            headings={[
                                { col: 'name', title: t("Name") },
                                { col: 'email', title: t("Email") },
                                { col: 'status', title: t("Status") },
                                { col: 'action', title: t("Action") },
                            ]}
                            rows={employees.map(employee => ({
                                name: `${employee.firstName} ${employee.lastName}`,
                                email: employee.email,
                                status: employee.online ?
                                    <span className="text-themeSuccessDark dark:text-themeSuccessLight">{(t("Online"))}</span> :
                                    <span className="text-themeDangerDark dark:text-themeDangerLight">{(t("Offline"))}</span>,
                                action: <DropDown icon={<ThreeDotsVertical />}>
                                    <ul className="zt-themeDropDownList zt-sm gap-4 w-44">
                                        <a onClick={() => {
                                            setBuzz(employee)
                                        }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                                            <span><LuMessageCircle /></span>
                                            <span>{t("Message")}</span>
                                        </a>
                                    </ul>
                                </DropDown>
                            }))}
                        />
                    </div>
                </div>
                {buzz && <BaseForm
                    title={t("Message")}
                    formik={formik}
                    formElements={[
                        {
                            type: "textarea",
                            name: "message",
                            label: t("Message"),
                            placeholder: t("Write your message here..."),
                        }
                    ]}
                    onClose={() => setBuzz(null)}
                />}
            </section>
        </>
    )
}