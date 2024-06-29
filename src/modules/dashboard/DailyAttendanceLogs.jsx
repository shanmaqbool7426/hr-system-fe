import { Button } from '@/components/elements'
import { CheckOutIcon, TakeBreakIcon } from '@/components/svg'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const DailyAttendanceLogs = () => {
    const { t } = useTranslation()

    return (
        <div className={`zt-card flex flex-col md:flex-row lg:flex-col md:items-center md:justify-between lg:items-stretch lg:justify-center gap-6 col-span-3 lg:col-span-1`}>
            <h2 className="font-bold text-h3 text-center mb-0">
                <span className="text-center text-xs font-medium block">{t("Your Attendance")}</span>
                01:15:10{t("")}
            </h2>
            <div className="flex flex-col bg-themeGrayscale50 rounded-lg p-6 text-center text-themeGrayscale600">
                <span>{t("Break Time")}</span>
                <span className="font-semibold text-themeGrayscale">{t("1:00PM - 2:00PM (1 Hour)")}</span>
                <span>{t("Target Hours")}</span>
                <span className="font-semibold text-themeGrayscale">{t("08 Hours (Per Day)")}</span>
            </div>
            <div className="flex flex-row md:flex-col lg:flex-row justify-center gap-6">
                <Button variant={'orange'} className={'whitespace-nowrap lg:!p-2 lg:!text-bmd 4xl:!px-6 4xl:!text-base'}>Take Break <TakeBreakIcon /></Button>
                <Button variant={'primary'} className={'whitespace-nowrap lg:!p-2 lg:!text-bmd 4xl:!px-6 4xl:!text-base'}>Check Out <CheckOutIcon /></Button>
            </div>
        </div>
    )
}
