import React, { Fragment } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, XAxis } from 'recharts'

const data = [
    { name: '01 Apr', uv: 4000, pv: 2400, amt: 2400 },
    { name: '02 Apr', uv: 3000, pv: 1398, amt: 2210 },
    { name: '03 Apr', uv: 2000, pv: 9800, amt: 2290 },
    { name: '04 Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: '05 Apr', uv: 1890, pv: 4800, amt: 2181 },
    { name: '06 Apr', uv: 2390, pv: 3800, amt: 2500 },
    { name: '07 Apr', uv: 3490, pv: 4300, amt: 2100 },
    { name: '08 Apr', uv: 3490, pv: 4300, amt: 2100 },
    { name: '09 Apr', uv: 3490, pv: 4300, amt: 2100 },
    { name: '10 Apr', uv: 3490, pv: 4300, amt: 2100 },
    { name: '11 Apr', uv: 3000, pv: 1398, amt: 2210 },
    { name: '12 Apr', uv: 3490, pv: 4300, amt: 2100 },
    { name: '13 Apr', uv: 3490, pv: 4300, amt: 2100 },
    { name: '14 Apr', uv: 3490, pv: 4300, amt: 2100 },
    { name: '15 Apr', uv: 3490, pv: 4300, amt: 2100 },
    { name: '16 Apr', uv: 3490, pv: 4300, amt: 2100 },
    { name: '17 Apr', uv: 3490, pv: 4300, amt: 2100 },
    { name: '18 Apr', uv: 3490, pv: 4300, amt: 2100 },
    { name: '19 Apr', uv: 3490, pv: 4300, amt: 2100 },
    { name: '20 Apr', uv: 3490, pv: 4300, amt: 2100 },
    { name: '21 Apr', uv: 3000, pv: 1398, amt: 2210 },
    { name: '22 Apr', uv: 3490, pv: 4300, amt: 2100 },
    { name: '23 Apr', uv: 3490, pv: 4300, amt: 2100 },
    { name: '24 Apr', uv: 3490, pv: 4300, amt: 2100 },
    { name: '25 Apr', uv: 3490, pv: 4300, amt: 2100 },
    { name: '26 Apr', uv: 3000, pv: 1398, amt: 2210 },
    { name: '27 Apr', uv: 3490, pv: 4300, amt: 2100 },
    { name: '28 Apr', uv: 3490, pv: 4300, amt: 2100 },
    { name: '29 Apr', uv: 3490, pv: 4300, amt: 2100 },
    { name: '30 Apr', uv: 3490, pv: 4300, amt: 2100 },
];

const COLORS = ['#8C62FF', '#8C62FF', '#8C62FF', '#8C62FF', '#FFD023', '#0BA259', '#55C790', "#E03137", "#243C7A", "#8C62FF"];

export const AttendanceChart = () => {
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
    return (
        <Fragment>
            <div className="zt-attendanceSummary__BarChart w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart width={"100%"} data={data}>
                        <CartesianGrid horizontal={false} vertical={false} />
                        <XAxis dataKey="name"  axisLine={false} tickLine={false} className='text-[8px]'/>
                        <Bar radius={4} dataKey="uv" fill="#8884d8" barSize={20}> {data.map((entry, index) => ( <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> ))}</Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-between text-xs text-themeGrayscale600 px-4">
                {colorData.map((ele, i) => (
                    <div key={i} className="flex gap-1 items-center">
                        <span className={`h-3 w-3 rounded ${ele.color}`}></span>
                        <span>{ele.label}</span>
                    </div>
                ))}
            </div>
        </Fragment>
    )
}
