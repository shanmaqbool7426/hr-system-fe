import ProgressBar from "@/components/elements/ProgressBar";
import StatsCard from "@/components/elements/Widgets/StatsCard";
import { FetchHelpdeskDashboard } from "@/store/actions/helpdesk.actions";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { PureComponent } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import moment from 'moment';
class CustomizedAxisTick extends PureComponent {
    render() {
        const { x, y, payload } = this.props;
        return (
            <g transform={`translate(${x},${y})`}>
                <text className='text-xs' x={0} y={0} dy={16} textAnchor="end" fill="currentColor" transform="rotate(-35)">
                    {payload.value}
                </text>
            </g>
        );
    }
}
export default function DashboardPage() {
    const { t } = useTranslation()
    const [stats, setStats] = useState({})
    const [ticketByPriority, setTicketByPriority] = useState({})
    const [topTicketSolvers, setTopTicketSolvers] = useState([])
    const [monthlyTicketCounts, setMonthlyTicketCounts] = useState([])


    useEffect(() => {
        FetchHelpdeskDashboard()
            .then((data) => {
                setStats(data.stats)
                setTicketByPriority(data.priorityStats)
                setTopTicketSolvers(data.topTicketSolvers)
                setMonthlyTicketCounts(data.monthlyTicketCounts)
            })
    }, [])
    const getWidthByRank = (rank) => {
        switch (rank) {
            case 0: return 'w-full'
            case 1: return 'w-[90%]'
            default: return 'w-[80%]'
        }
    }
    const data = monthlyTicketCounts.map(ele => ({
        name: moment(ele.date).format('MMM YY'),
        count: ele.count
    }))
    return (
        <section className="flex flex-col grow space-y-6">
            <div className="flex justify-between items-center pb-6">
                <h1 className="text-h4 mb-0">{t("HelpDesk")}</h1>
            </div>
            {/* Total Stats */}
            <div className="grid grid-cols-4 gap-4">
                <StatsCard title={t("Total")} hideDescription icon={<span className="text-4xl font-bold">{stats?.total}</span>} variant="primary" />
                <StatsCard title={t("Open")} hideDescription icon={<span className="text-4xl font-bold">{stats?.open}</span>} variant="orange" />
                <StatsCard title={t("In Progress")} hideDescription icon={<span className="text-4xl font-bold">{stats?.inProgress}</span>} variant="purple" />
                <StatsCard title={t("Closed")} hideDescription icon={<span className="text-4xl font-bold">{stats?.closed}</span>} variant="green" />
            </div>

            <div className='flex gap-6 mb-6'>
                {/* Tickets By Priority */}
                <div className='zt-card w-1/2 flex flex-col gap-4'>
                    <h2 className='m-0 text-2xl font-bold'>{t("Tickets By Priority")}</h2>
                    <ProgressBar
                        title={'Critical'}
                        statics={`${ticketByPriority?.critical ? ticketByPriority?.critical : 0} / ${stats?.total ? stats?.total : 0}`}
                        percentage={`${ticketByPriority?.critical ? ticketByPriority?.critical / stats?.total * 100 : 0}%`}
                        variant={'danger'}
                        containerClasses={'flex flex-col gap-2'}
                        titleBarClasses={'mb-0 flex justify-between'}
                        progressClasses={'flex flex-col'}
                        progressBarClasses={'grow rounded-full'}
                    />
                    <ProgressBar
                        title={'High'}
                        statics={`${ticketByPriority?.high ? ticketByPriority?.high : 0} / ${stats?.total ? stats?.total : 0}`}
                        percentage={`${ticketByPriority?.high ? ticketByPriority?.high / stats?.total * 100 : 0}%`}
                        variant={'lightOrange'}
                        containerClasses={'flex flex-col gap-2'}
                        titleBarClasses={'mb-0 flex justify-between'}
                        progressClasses={'flex flex-col'}
                        progressBarClasses={'grow rounded-full'}
                    />
                    <ProgressBar
                        title={'Medium'}
                        statics={`${ticketByPriority?.medium ? ticketByPriority?.medium : 0} / ${stats?.total ? stats?.total : 0}`}
                        percentage={`${ticketByPriority?.medium ? ticketByPriority?.medium / stats?.total * 100 : 0}%`}
                        variant={'purple'}
                        containerClasses={'flex flex-col gap-2'}
                        titleBarClasses={'mb-0 flex justify-between'}
                        progressClasses={'flex flex-col'}
                        progressBarClasses={'grow rounded-full'}
                    />
                    <ProgressBar
                        title={'Low'}
                        statics={`${ticketByPriority?.low ? ticketByPriority?.low : 0} / ${stats?.total ? stats?.total : 0}`}
                        percentage={`${ticketByPriority?.low ? ticketByPriority?.low / stats?.total * 100 : 0}%`}
                        variant={'success'}
                        containerClasses={'flex flex-col gap-2'}
                        titleBarClasses={'mb-0 flex justify-between'}
                        progressClasses={'flex flex-col'}
                        progressBarClasses={'grow rounded-full'}
                    />
                </div>
                {/* Top Ticket Solvers */}
                <div className='zt-card w-1/2 flex flex-col gap-6'>
                    <h2 className='m-0 text-2xl font-bold'>{t("Top Ticket Solvers This week")}</h2>
                    {topTicketSolvers.map((ele, i) => (
                        <div key={i} className={`bg-themeSuccess/30 dark:bg-themeSuccessLight/25 rounded-lg flex justify-between items-center px-5 py-4  ${getWidthByRank(i)}`}>
                            <span className='text-xl'>{ele.name}</span>
                            <span className='font-bold text-2xl'> {ele.closedCount}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* Ticket Summary Chart */}
            <div className='zt-card mb-6'>
                <div className='flex justify-between mb-6'>
                    <h2 className="m-0 text-2xl">{t("Ticket Summary")}</h2>
                    <p className='text-sm text-themeGray'>{t("Total Tickets")}: {stats?.total}</p>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        width={500}
                        height={250}
                        data={data}
                        margin={{
                            bottom: 20,
                        }}
                    >
                        <XAxis tickLine={false} dataKey="name" tick={<CustomizedAxisTick />} strokeDasharray="5 5" />
                        <YAxis tickLine={false} tick={{ fill: 'currentColor', fontSize: 12 }} strokeDasharray="5 5" />
                        <Line dot={false} dataKey="count" stroke="#8c62ff" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

        </section>
    )
}