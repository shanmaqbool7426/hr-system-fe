import { useTranslation } from "next-i18next";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', uv: 200, pv: 2400, cv: 600, amt: 2400 },
    { name: 'Feb', uv: 1300, pv: 210, cv: 800, amt: 2290 },
    { name: 'Mar', uv: 200, pv: 2290, cv: 2000, amt: 2000 },
    { name: 'Apr', uv: 2000, pv: 2000, cv: 600, amt: 2181 },
    { name: 'May', uv: 189, pv: 2500, cv: 1000, amt: 2500 },
    { name: 'Jun', uv: 2900, pv: 2100, cv: 600, amt: 2100 },
    { name: 'Jul', uv: 400, pv: 2400, cv: 1000, amt: 2400 },
    { name: 'Aug', uv: 3100, pv: 210, cv: 600, amt: 2290 },
    { name: 'Sep', uv: 200, pv: 2290, cv: 1800, amt: 2000 },
    { name: 'Oct', uv: 2000, pv: 2000, cv: 600, amt: 2181 },
    { name: 'Nov', uv: 189, pv: 2500, cv: 2900, amt: 2500 },
    { name: 'Dec', uv: 239, pv: 2100, cv: 600, amt: 2100 },
];

const TicketSummary = () => {
    const { t } = useTranslation()
    const summaryData = [
        { bg: 'bg-themePurple', text: "Open" },
        { bg: 'bg-themeSuccessLight', text: "Inprogress" },
        { bg: 'bg-themeDanger', text: "Closed" },
    ]

    return (
        <div className='zt-card mb-6'>
            <div className='flex justify-between mb-6'>
                <h2 className="m-0 text-2xl">{t("Ticket Summary")}</h2>
                <div className="flex gap-4">
                    {summaryData.map((ele, i) => (
                        <div key={i} className="flex gap-3 font-bold text-xl">
                            <span className={`rounded h-6 w-6 ${ele.bg}`}></span>
                            <span>{ele.text}</span>
                        </div>
                    ))}
                </div>

            </div>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                >
                    {/* <Tooltip /> */}
                    <XAxis tickLine={false} dataKey="name" />
                    <YAxis tickLine={false} />
                    <Line dot={false} dataKey="pv" stroke="#8c62ff" strokeWidth={2} />
                    <Line dot={false} dataKey="uv" stroke="#e03137" strokeWidth={2} />
                    <Line dot={false} dataKey="cv" stroke="#55c790" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>

    );
};

export default TicketSummary;
