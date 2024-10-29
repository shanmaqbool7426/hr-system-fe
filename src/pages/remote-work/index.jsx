import StatsCard from "@/components/elements/Widgets/StatsCard";
import { useTranslation } from "next-i18next";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import axios from "@/util/axios";
import { useEffect, useState } from "react";
import ProgressBar from "@/components/elements/ProgressBar";
export default function RemoteWork() {
    const { t } = useTranslation()
    const [stats, setStats] = useState({})
    const [applicationTimeSpent, setApplicationTimeSpent] = useState([])
    const [productiveTimeSpent, setProductiveTimeSpent] = useState([])
    const [topPerformers, setTopPerformers] = useState([])
    useEffect(() => {
        axios.get('/remote/dashboard').then(data => {
            console.log("data", data)
            setStats(data?.stats)
            setApplicationTimeSpent(data?.applicationTimeSpent)
            setProductiveTimeSpent(data?.productiveTimeSpent)
            setTopPerformers(data?.topPerformers)
        })
    }, [])

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
                    <StatsCard description={t("Online")} title={stats?.online?.toString()} variant="green" />
                    <StatsCard description={t("Offline")} title={stats?.offline?.toString()} variant="purple" />
                    <StatsCard description={t("Absent")} title={stats?.absent?.toString()} variant="red" />
                </div>

                <div className="grid grid-cols-2 gap-4">

                    <div className="zt-card col-span-2">
                        <h4 className="text-h5 mb-4">{t("Productive Time Spent")}</h4>
                        <ResponsiveContainer width="100%" height={400} className="text-themeSuccessDark dark:text-themeSuccessLight">
                            <AreaChart
                                width={500}
                                height={250}
                                data={productiveTimeSpent}
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
                    <div className="zt-card">
                        <h4 className="text-h5 mb-4">{t("Top Performers")}</h4>
                        <div className="flex flex-col gap-2">
                            {topPerformers.map((performer, index) => {
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
                </div>

            </section>
        </>
    )
}