import { ClockIcon } from '@/components/svg'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { todaysAttendance } from "@/store/actions/attendance.actions"
import { useDispatch, useSelector } from 'react-redux'

export const Activity = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch();
    const { is_loading, user, todayAttendance } = useSelector((state) => state.attendance)
    console.log(todayAttendance?.checkInAt, "attendance")
    const formatTime = (duration) => {
        // const hours = Math.floor(duration / 1000 / 60 / 60)
        // const minutes = Math.floor((duration / 1000 / 60) % 60)
        const date = new Date(duration); 
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        console.log(duration, hours, minutes, "attendances")

        return `${hours}.${minutes < 10 ? '0' : ''}${minutes} hrs`
    }

    useEffect(() => {
        dispatch(todaysAttendance(user))
    }, [])

    const data = [
        {
            text: "Check In at",
            time: "9:00Am",
        },
        {
            text: "Check Out at",
            time: "10:00Am",
            btnText: "Break"
        },
        {
            text: "Check In at",
            time: "11:00Am",
        },
        {
            text: "Check Out at",
            time: "12:00Am",
            btnText: "Break"
        },
        {
            text: "Check In at",
            time: "01:00Am",
        },
    ]

    return (
        <div className='zt-card col-span-3 xl:col-span-1'>
            <h2 className='mb-4 font-bold text-xl'>{t("Today Activity")}</h2>
            <ul className='zt-activityLogs '>
                {data.map((ele, i) => (
                    <li key={i}>
                        <span className='flex flex-col gap-1'>
                            <span>{formatTime(todayAttendance?.checkInAt) ? formatTime(todayAttendance?.checkInAt) : "9:00 AM"}</span>
                            <span className='flex gap-1 items-center'>
                                <ClockIcon />
                                <time dateTime='09.00 AM' className='text-sm font-semibold'>{ele.time}</time>
                            </span>
                        </span>
                        {
                            ele.btnText &&
                            <span className='zt-tag zt-tag-normal'>{ele.btnText}</span>
                        }
                    </li>
                ))}
                {/* <li>
                    <span className='flex flex-col gap-1'>
                        <span>{t("Check In at")}</span>
                        <span className='flex gap-1 items-center'>
                            <ClockIcon />
                            <time dateTime='09.00 AM' className='text-sm font-semibold'>{t("09.00 AM")}</time>
                        </span>
                    </span>
                </li>
                <li>
                    <span className='flex flex-col gap-1'>
                        <span>{t("Check Out at")}</span>
                        <span className='flex gap-1 items-center'>
                            <ClockIcon />
                            <time dateTime='09.00 AM' className='text-sm font-semibold'>{t("09.00 AM")}</time>
                        </span>
                    </span>
                    <span className='zt-tag zt-tag-normal'>{t("Tea Break")}</span>
                </li>
                <li>
                    <span className='flex flex-col gap-1'>
                        <span>{t("Check In at")}</span>
                        <span className='flex gap-1 items-center'>
                            <ClockIcon />
                            <time dateTime='09.00 AM' className='text-sm font-semibold'>{t("09.00 AM")}</time>
                        </span>
                    </span>
                </li>
                <li>
                    <span className='flex flex-col gap-1'>
                        <span>{t("Check Out at")}</span>
                        <span className='flex gap-1 items-center'>
                            <ClockIcon />
                            <time dateTime='09.00 AM' className='text-sm font-semibold'>{t("09.00 AM")}</time>
                        </span>
                    </span>
                    <span className='zt-tag zt-tag-normal'>{t("Lunch Break")}</span>
                </li>
                <li>
                    <span className='flex flex-col gap-1'>
                        <span>{t("Check In at")}</span>
                        <span className='flex gap-1 items-center'>
                            <ClockIcon />
                            <time dateTime='09.00 AM' className='text-sm font-semibold'>{t("09.00 AM")}</time>
                        </span>
                    </span>
                </li>
                <li>
                    <span className='flex flex-col gap-1'>
                        <span>{t("Check Out at")}</span>
                        <span className='flex gap-1 items-center'>
                            <ClockIcon />
                            <time dateTime='09.00 AM' className='text-sm font-semibold'>{t("09.00 AM")}</time>
                        </span>
                    </span>
                    <span className='zt-tag zt-tag-normal'>{t("Shift End")}</span>
                </li> */}
            </ul>
        </div>
    )
}
