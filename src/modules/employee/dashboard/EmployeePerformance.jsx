import FilterArea from '@/components/includes/FilterArea'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'January', uv: 40, pv: 24,cv: 29, amt: 10 },
    { name: 'February', uv: 30, pv: 13, cv: 59,amt: 20 },
    { name: 'March', uv: 20, pv: 98,cv: 90, amt: 30 },
    { name: 'April', uv: 20, pv: 39,cv: 59, amt: 40 },
    { name: 'May', uv: 10, pv: 48,cv: 50, amt: 50 },
    { name: 'June', uv: 20, pv: 38,cv: 56, amt: 60 },
    { name: 'July', uv: 50, pv: 60,cv: 49, amt: 70 },
    { name: 'August', uv: 50, pv: 60,cv: 59, amt: 80 },
    { name: 'September', uv: 50, pv: 60,cv: 39, amt: 90 },
    { name: 'October', uv: 50, pv: 60,cv: 79, amt: 100 },
    { name: 'November', uv: 50, pv: 60,cv: 59, amt: 20 },
    { name: 'December', uv: 50, pv: 60,cv: 79, amt: 30 },
];
export const EmployeePerformance = () => {
    const { t } = useTranslation();

    const [filters, setFilters] = useState({
        search: "",
    })
    const filterElements = [
        {
            type: "select",
            name: "select",
            value: filters.search,
            placeholder: t("Select Employee"),
            className: "col-span-3",
            onChange: (event) => {
                let _filter = { ...filters }
                _filter['search'] = event.target.value
                setFilters(_filter)
            }
        },
        {
            type: "select",
            name: "select",
            value: filters.search,
            placeholder: t("2024"),
            className: "col-span-3",
            onChange: (event) => {
                let _filter = { ...filters }
                _filter['search'] = event.target.value
                setFilters(_filter)
            }
        },

    ]
    return (
        <div className='bg-white p-6 rounded-lg'>
            <FilterArea title={t("Employee Performance")}
                elements={filterElements}
                filters={filters}
                setFilters={setFilters}
            />
            <div className='flex gap-7 text-xs text-themeGrayscale600 pb-6'>
                <div className='flex gap-1 items-center'>
                    <span className='h-3 w-3 bg-themeBlue rounded'></span>
                    <span>{t("Attendance ")}</span>
                </div>
                <div className='flex gap-1 items-center'>
                    <span className='h-3 w-3 bg-themeWarningDark rounded'></span>
                    <span>{t("Leave")}</span>
                </div>
                <div className='flex gap-1 items-center'>
                    <span className='h-3 w-3 bg-themeSuccess rounded'></span>
                    <span>{t("KPI")}</span>
                </div>
            </div>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    > 
                        <XAxis dataKey="name" tickLine={false} axisLine={false} className='text-themeGrayscale600 text-xs'/>
                        <YAxis domain={[0, 100]}  tickLine={false} axisLine={false} className='text-themeGrayscale600 text-xs'/> 
                        <Line type="monotone" dataKey="pv" stroke="#E6BB20" strokeWidth={3} dot={false}/>
                        <Line type="monotone" dataKey="uv" stroke="#2F78EE" strokeWidth={3} dot={false}/>
                        <Line type="monotone" dataKey="cv" stroke="#0CAF60" strokeWidth={3} dot={false}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
            
        </div>
    )
}
