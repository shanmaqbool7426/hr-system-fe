import React from 'react'
import { useTranslation } from 'react-i18next'

export const PublicHolidays = () => {
    const { t } = useTranslation()
    const data=[
        {day:"New Year's Day",date:"1 January2025"},
        {day:"Pakistan Day",date:"23 March  2025"},
        {day:"Labor Day",date:"01 May  2025"},
        {day:"Iqbal Day",date:"09 November  2025"},
        {day:"Iqbal Day",date:"09 November  2025"},
        {day:"Iqbal Day",date:"09 November  2025"},
    ]
    return (
        <div className='zt-card'>
            <h2 className='mb-4 font-bold text-lg'>{t("Upcoming Public Holidays")}</h2>
            <div className="flex flex-col gap-2">
                {data.map((ele, i) => (
                    <div key={i} className="bg-themeGrayscale50 rounded p-3 flex justify-between items-center">
                        <h3 className="text-xs mb-0 font-semibold">{ele.day}</h3>
                        <button className="text-themePurple bg-themePurple/10 rounded-md px-2 py-1 text-xs font-medium">{ele.date}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
