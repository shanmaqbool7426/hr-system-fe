import { ClockIcon } from '@/components/svg'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const Activity = () => {
    const { t } = useTranslation()

    return (
        <div className='zt-card'>
            <h2 className='mb-4 font-bold text-xl'>{t("Today Activity")}</h2>

            <ul className='zt-activityLogs'>
                {/*
                <div className='bg-themeGrayscale300 w-1 relative flex flex-col gap-12 items-center'>
                    {[0, 1, 2, 3, 4, 5].map((ele, i) => (
                        <span key={i} className='h-4 w-4 rounded-full border-themePurple bg-white border-3'></span>
                    ))}
                </div>
                <div>
                </div>
                */}
                <li>
                    <span className='flex flex-col gap-1'>
                        <span>{t("Punch In at")}</span>
                        <span className='flex gap-1 items-center'>
                            <ClockIcon />
                            <time dateTime='09.00 AM' className='text-sm font-semibold'>{t("09.00 AM")}</time>
                        </span>
                    </span>
                </li>
                <li>
                    <span className='flex flex-col gap-1'>
                        <span>{t("Punch Out at")}</span>
                        <span className='flex gap-1 items-center'>
                            <ClockIcon />
                            <time dateTime='09.00 AM' className='text-sm font-semibold'>{t("09.00 AM")}</time>
                        </span>
                    </span>
                    <span className='zt-tag zt-tag-normal'>{t("Tea Break")}</span>
                </li>
                <li>
                    <span className='flex flex-col gap-1'>
                        <span>{t("Punch In at")}</span>
                        <span className='flex gap-1 items-center'>
                            <ClockIcon />
                            <time dateTime='09.00 AM' className='text-sm font-semibold'>{t("09.00 AM")}</time>
                        </span>
                    </span>
                </li>
                <li>
                    <span className='flex flex-col gap-1'>
                        <span>{t("Punch Out at")}</span>
                        <span className='flex gap-1 items-center'>
                            <ClockIcon />
                            <time dateTime='09.00 AM' className='text-sm font-semibold'>{t("09.00 AM")}</time>
                        </span>
                    </span>
                    <span className='zt-tag zt-tag-normal'>{t("Lunch Break")}</span>
                </li>
                <li>
                    <span className='flex flex-col gap-1'>
                        <span>{t("Punch In at")}</span>
                        <span className='flex gap-1 items-center'>
                            <ClockIcon />
                            <time dateTime='09.00 AM' className='text-sm font-semibold'>{t("09.00 AM")}</time>
                        </span>
                    </span>
                </li>
                <li>
                    <span className='flex flex-col gap-1'>
                        <span>{t("Punch Out at")}</span>
                        <span className='flex gap-1 items-center'>
                            <ClockIcon />
                            <time dateTime='09.00 AM' className='text-sm font-semibold'>{t("09.00 AM")}</time>
                        </span>
                    </span>
                    <span className='zt-tag zt-tag-normal'>{t("Shift End")}</span>
                </li>
            </ul>
        </div>
    )
}
