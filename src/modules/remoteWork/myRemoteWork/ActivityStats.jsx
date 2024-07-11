import React from 'react'
import { useTranslation } from 'react-i18next'
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

const data = [
    {
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];
const ActivityStats = () => {
    const { t } = useTranslation()
    const statData = [
        { text: "Arrival time", time: "05:17", color: "themePrimary", graphColor: "#a6b5d9", dataKey: 'uv' },
        { text: "Left time", time: "05:17", color: "themePrimary", graphColor: "#a6b5d9", dataKey: 'pv' },
        { text: "Productive time", hour: "5", min: "21", color: "themePrimary", graphColor: "#a6b5d9", dataKey: 'amt' },
        { text: "Desktime time", hour: "5", min: "21", color: "themePrimary", graphColor: "#a6b5d9", dataKey: 'uv' },
        { text: "Time at work", hour: "5", min: "21", color: "themePrimary", graphColor: "#a6b5d9", dataKey: 'pv' },
        { text: "Place in team/company", order: "1", color: "themePrimary", graphColor: "#a6b5d9", dataKey: 'amt' },
        { text: "Effectiveness", time: "76.48%", color: "themePrimary", graphColor: "#a6b5d9", dataKey: 'uv' },
        { text: "Productivity", time: "66.48%", color: "themeDanger", graphColor: "#e03137", dataKey: 'pv' },
    ]
    return (
        <div className='grid zt-remoteStats__grid gap-6 xl:grid-cols-4'>
            {statData.map((ele, i) => (
                <div key={i} className='shadow bg-themeGrayscale50 rounded-lg'>
                    <div className='flex justify-between p-4'>
                        <h3 className='mb-0 text-lg font-bold'>{ele.text}</h3>
                    </div>
                    {ele.time &&
                        <h4 className={`text-${ele.color} text-h2 p-4 mb-0`}>{ele.time}</h4>
                    }
                    {ele.hour &&
                        <div className='flex items-end p-4 gap-2'>
                            <h4 className={`text-${ele.color} text-h2 mb-0`}>{ele.hour} <span className='text-base'>{t("h")}</span></h4>
                            <h4 className={`text-${ele.color} text-h2 mb-0`}>{ele.min} <span className='text-base'>{t("m")}</span></h4>
                        </div>
                    }
                    {ele.order &&
                        <div className='p-4'>
                            <h4 className={`text-${ele.color} text-h2 mb-0`}>{ele.order} <span className='text-base'>{t("st")}</span></h4>
                        </div>
                    }
                    <div className='w-full h-20'>
                        <ResponsiveContainer>
                            <AreaChart
                                width={200}
                                height={60}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 0,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <Area dataKey={ele.dataKey} stroke={ele.graphColor} fill={ele.graphColor} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default ActivityStats
