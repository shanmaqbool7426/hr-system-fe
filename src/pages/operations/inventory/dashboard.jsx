import ProgressBar from "@/components/elements/ProgressBar";
import StatsCard from "@/components/elements/Widgets/StatsCard";
import { FetchAssetDashboard } from "@/store/actions/asset.actions";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { PureComponent } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Tooltip } from 'recharts';
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
export default function InventoryDashboardPage() {
    const { t } = useTranslation()
    const [stats, setStats] = useState({})
    const [reservedAssets, setReservedAssets] = useState({})


    useEffect(() => {
        FetchAssetDashboard()
            .then((data) => {
                setStats(data.countStats)
                setReservedAssets(data.reservedAssets)
            })
    }, [])

    return (
        <section className="flex flex-col grow space-y-6">
            <div className="pb-6">
                <h1 className="text-h4 mb-0">{t("Inventory Dashboard")}</h1>
            </div>
            {/* Total Stats */}
            <div className="grid grid-cols-3 gap-4">
                <StatsCard title={t("Total Purchase Value")} description={`${stats?.totalPurchase}`} icon={<span className="text-2xl font-bold">PKR</span>} variant="primary" />
                <StatsCard title={t("Repair Cost")} description={`${stats?.repairCost}`} icon={<span className="text-2xl font-bold">PKR</span>} variant="red" />
                <StatsCard title={t("Current Asset")} description={`${stats?.netWorth}`} icon={<span className="text-2xl font-bold">PKR</span>} variant="green" />
            </div>
            <div className="grid grid-cols-5 gap-4">
                <StatsCard title={t("Total Assets")} hideDescription icon={<span className="text-4xl font-bold">{stats?.total}</span>} variant="primary" />
                <StatsCard title={t("Issued")} hideDescription icon={<span className="text-4xl font-bold">{stats?.issued}</span>} variant="purple" />
                <StatsCard title={t("Reserved")} hideDescription icon={<span className="text-4xl font-bold">{stats?.reserved}</span>} variant="green" />
                <StatsCard title={t("Reported")} hideDescription icon={<span className="text-4xl font-bold">{stats?.reported}</span>} variant="orange" />
                <StatsCard title={t("Expired")} hideDescription icon={<span className="text-4xl font-bold">{stats?.expired}</span>} variant="red" />
            </div>

            {/* Asset Summary Chart */}

            <div className='grid grid-cols-2 gap-6 mb-6'>
                <div className='zt-card flex flex-col gap-4'>
                    <h2 className='m-0 text-2xl font-bold'>{t("Faulty Assets")}</h2>
                    {Object.keys(reservedAssets).sort((a, b) => a.localeCompare(b)).map((type, index) => (
                        <ProgressBar
                            key={index}
                            title={type}
                            statics={`${reservedAssets[type] ? reservedAssets[type].reported : 0} / ${reservedAssets[type].total ? reservedAssets[type].total : 0}`}
                            percentage={`${reservedAssets[type] ? reservedAssets[type].reported / reservedAssets[type].total * 100 : 0}%`}
                            variant={'success'}
                            containerClasses={'flex flex-col gap-2'}
                            titleBarClasses={'mb-0 flex justify-between'}
                            progressClasses={'flex flex-col !h-4'}
                            progressBarClasses={'grow rounded-full'}
                        />
                    ))}
                </div>
                <div className='zt-card flex flex-col gap-4'>
                    <h2 className='m-0 text-2xl font-bold'>{t("Reserved Assets")}</h2>
                    {Object.keys(reservedAssets).sort((a, b) => a.localeCompare(b)).map((type, index) => (
                        <ProgressBar
                            key={index}
                            title={type}
                            statics={`${reservedAssets[type] ? reservedAssets[type].reserved : 0} / ${reservedAssets[type].total ? reservedAssets[type].total : 0}`}
                            percentage={`${reservedAssets[type] ? reservedAssets[type].reserved / reservedAssets[type].total * 100 : 0}%`}
                            variant={'success'}
                            containerClasses={'flex flex-col gap-2'}
                            titleBarClasses={'mb-0 flex justify-between'}
                            progressClasses={'flex flex-col !h-4'}
                            progressBarClasses={'grow rounded-full'}
                        />
                    ))}
                </div>

                <div className='zt-card flex flex-col gap-4'>
                    <h2 className='m-0 text-2xl font-bold'>{t("Assets Status")}</h2>
                    <ResponsiveContainer width="100%" height={400} className="text-themePrimary dark:text-themeGrayscale400">
                        <BarChart
                            width={500}
                            height={250}
                            data={[
                                {
                                    name: t("Issued"),
                                    count: stats?.issued
                                }, {
                                    name: t("Reserved"),
                                    count: stats?.reserved
                                },
                                {
                                    name: t("Reported"),
                                    count: stats?.reported
                                },
                                {
                                    name: t("Repaired"),
                                    count: stats?.repaired
                                },
                                {
                                    name: t("Sold"),
                                    count: stats?.sold
                                },
                                {
                                    name: t("Deleted"),
                                    count: stats?.deleted
                                },
                                {
                                    name: t("Expired"),
                                    count: stats?.expired
                                }
                            ]}
                            margin={{
                                bottom: 20,
                            }}
                        >
                            <XAxis tickLine={false} dataKey="name" tick={{ fill: 'currentColor', fontSize: 18 }} strokeDasharray="5 5" />
                            <YAxis tickLine={false} tick={{ fill: 'currentColor', fontSize: 12 }} strokeDasharray="5 5" />
                            <Bar dataKey="count" barSize={20} fill="currentColor" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className='zt-card flex flex-col gap-4'>
                    <h2 className='m-0 text-2xl font-bold'>{t("Assets Condition")}</h2>
                    <ResponsiveContainer width="100%" height={400} className="text-themePrimary dark:text-themeGrayscale400">
                        <AreaChart
                            width={500}
                            height={250}
                            data={[
                                {
                                    name: t("Poor"),
                                    count: stats?.poor
                                }, {
                                    name: t("Fair"),
                                    count: stats?.fair
                                },
                                {
                                    name: t("Good"),
                                    count: stats?.good
                                },
                                {
                                    name: t("Excellent"),
                                    count: stats?.excellent
                                },
                                {
                                    name: t("Best"),
                                    count: stats?.best
                                },
                            ]}
                            margin={{
                                bottom: 20,
                            }}
                        >
                            <XAxis tickLine={false} dataKey="name" tick={{ fill: 'currentColor', fontSize: 18 }} strokeDasharray="5 5" />
                            <YAxis tickLine={false} tick={{ fill: 'currentColor', fontSize: 12 }} strokeDasharray="5 5" />
                            <Area dataKey="count" fill="currentColor" type="monotone" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </section>
    )
}