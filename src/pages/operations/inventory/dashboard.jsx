import ProgressBar from "@/components/elements/ProgressBar";
import StatsCard from "@/components/elements/Widgets/StatsCard";
import { FetchAssetDashboard } from "@/store/actions/asset.actions";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { PureComponent } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Tooltip } from 'recharts';
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
    const [assetsByType, setAssetsByType] = useState({})
    const [repairCost, setRepairCost] = useState(0)
    const [netWorth, setNetWorth] = useState(0)


    useEffect(() => {
        FetchAssetDashboard()
            .then((data) => {
                setStats(data.countStats)
                setAssetsByType(data.assetsByType)
                setRepairCost(data.repairCost)
                setNetWorth(data.netWorth)          
            })
    }, [])
    console.log(assetsByType);

  
    return (
        <section className="flex flex-col grow space-y-6">
            <div className="pb-6">
                <h1 className="text-h4 mb-0">{t("Inventory Dashboard")}</h1>
            </div>
            {/* Total Stats */}
            <div className="grid grid-cols-3 gap-4">
                <StatsCard title={t("Total Assets")} hideDescription icon={<span className="text-4xl font-bold">{stats?.total}</span>} variant="primary" />
                <StatsCard title={t("Total Purchase Value")} description={`${netWorth}`} icon={<span className="text-2xl font-bold">PKR</span>} variant="purple" />
                <StatsCard title={t("Repair Cost")} description={`${repairCost}`} icon={<span className="text-2xl font-bold">PKR</span>} variant="green" />
            </div>

            {/* Asset Summary Chart */}

            <div className='flex gap-6 mb-6'>

                <div className='zt-card w-1/2 flex flex-col gap-4'>
                    <h2 className='m-0 text-2xl font-bold'>{t("Assets By Status")}</h2>
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
                                    name: t("Deleted"),
                                    count: stats?.deleted
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
                <div className='zt-card w-1/2 flex flex-col gap-4'>
                    <h2 className='m-0 text-2xl font-bold'>{t("Assets By Type")}</h2>
                    {Object.keys(assetsByType).sort((a, b) => a.localeCompare(b)).map((type, index) => (
                        <ProgressBar
                            key={index}
                            title={type}
                            statics={`${assetsByType[type] ? assetsByType[type] : 0} / ${stats?.total ? stats?.total : 0}`}
                            percentage={`${assetsByType[type] ? assetsByType[type] / stats?.total * 100 : 0}%`}
                            variant={'primary'}
                            containerClasses={'flex flex-col gap-2'}
                            titleBarClasses={'mb-0 flex justify-between'}
                            progressClasses={'flex flex-col'}
                            progressBarClasses={'grow rounded-full'}
                        />
                    ))}

                </div>
            </div>
        </section>
    )
}