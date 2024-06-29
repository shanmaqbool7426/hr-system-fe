import { RadialChart } from '@/modules/dashboard/RadialChart'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const Leaves = () => {
    const { t } = useTranslation()

    return (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 col-span-3'>
            {['Probation Leave', "Sick Leave", "Casual Leave", "Annual Leave", "Compensatory Leave"].map((ele, i) => (
                <div key={i} className='rounded-lg bg-white p-6 flex flex-col items-center gap-4'>
                    <h2 className='text-sm font-semibold mb-0'>{ele}</h2>
                    <RadialChart circleSize={90} />
                    <div className='text-xs text-themeGrayscale600'>
                        <span className='border-r border-themeGrayscale300 p-1'>{t("Total 10")}</span>
                        <span className='border-r border-themeGrayscale300 p-1'>{t("Used - 4")}</span>
                        <span className='p-1'>{t("Remaining - 3")}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
