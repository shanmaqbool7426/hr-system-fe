import { Button } from '@/components/elements'
import { CheckOutIcon, TakeBreakIcon } from '@/components/svg'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const TimeSheet = () => {
    const { t } = useTranslation()

    return (
        <div className={`zt-card grid grid-cols-2 gap-4 text-bmd`}>
            <div className='flex flex-col text-left'>
                <h2 className='text-xl font-bold mb-0'>{t("TimeSheet")}</h2>
                <time dateTime="11 March 2024" className='text-themeGrayscale600 text-sm block'>{t("11 March 2024")}</time>
            </div>
            <div className='flex flex-col gap-2 text-right'>
                <span className='text-themeGrayscale600 '>{t("Current Shift")}</span>
                <time className='font-semibold' dateTime="09:00 AM - 06:00 PM">{t("09:00 AM - 06:00 PM")}</time>
            </div>
            <div className='col-span-2 bg-themeGrayscale50 rounded-lg px-4 py-3 flex flex-col gap-1'>
                <span className='text-themeGrayscale600'>{t("Punch In at")}</span>
                <span className='font-semibold text-themeGrayscale900'>{t("Wed, 11th Mar 2024 09.00 AM")}</span>
            </div>
            <div className='col-span-2 h-28 w-28 rounded-full border-5 border-themeGrayscale400 bg-themeGrayscale50 mx-auto flex justify-center items-center'>
                <time className='text-xs font-bold' dateTime="04:45 hrs">{t("04:45 hrs")}</time>
            </div>
            <Button variant={'orange'} className={'flex w-full items-center whitespace-nowrap'}>Take Break <TakeBreakIcon className={'shrink-0'}/></Button>
            <Button variant={'primary'} className={'flex w-full items-center whitespace-nowrap'}>Check Out <CheckOutIcon className={'shrink-0'}/></Button>
            <div className='w-full bg-themeGrayscale50 p-4 rounded-lg flex flex-col text-center gap-1'>
                <span>{t("Break")}</span>
                <time className='font-bold' dateTime="01.21 hrs">{t("01.21 hrs")}</time>
            </div>
            <div className='w-full bg-themeGrayscale50 p-4 rounded-lg flex flex-col text-center gap-1'>
                <span>{t("Overtime")}</span>
                <time className='font-bold block' dateTime="01.21 hrs">{t("01.21 hrs")}</time>
            </div>
        </div>
    )
}
