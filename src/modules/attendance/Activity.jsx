import { ClockIcon } from '@/components/svg'
import React, { Fragment, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { todaysAttendance, getBreaks } from "@/store/actions/attendance.actions"
import { useDispatch, useSelector } from 'react-redux'

export const Activity = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch();
    const { is_loading, todayAttendance, getBreaksByAttendance } = useSelector((state) => state.attendance) ;
    function formatTime(dateString) {
        const date = new Date(dateString);
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    } 
    useEffect(() => {
       if(todayAttendance?._id){
           dispatch(getBreaks(todayAttendance?._id))
       }
    }, [0])   
    return (
        <div className='zt-card col-span-3 xl:col-span-1'> 
            <h2 className='mb-4 font-bold text-xl'>{t("Today Activity")}</h2>
            <ul className='zt-activityLogs '>
                <li>
                    <span className='flex flex-col gap-1'>
                        <span>Check In At</span>
                        <span className='flex gap-1 items-center'>
                            <ClockIcon />
                            <time dateTime='09.00 AM' className='text-sm font-semibold'>{todayAttendance?.checkInAt ? formatTime(todayAttendance?.checkInAt) : "No Check In"}</time>
                        </span>
                    </span>
                </li>
                {getBreaksByAttendance.map((ele, i) => (
                    <Fragment key={i}>
                        {ele.startAt && (
                            <li >
                                <span className='flex flex-col gap-1'>
                                    <span>Break Start At</span>
                                    <span className='flex gap-1 items-center'>
                                        <ClockIcon />
                                        <time dateTime='09.00 AM' className='text-sm font-semibold'>{ele?.startAt ? formatTime(ele?.startAt) : "9:00 AM"}</time>
                                    </span>
                                </span>
                                <span className='zt-tag zt-tag-normal'>Break Start</span>
                            </li>
                        )}
                        {ele.endAt && (
                            <li>
                                <span className='flex flex-col gap-1'>
                                    <span>Break End At</span>

                                    <span className='flex gap-1 items-center'>
                                        <ClockIcon />
                                        <time dateTime='09.00 AM' className='text-sm font-semibold'>{ele?.endAt ? formatTime(ele?.endAt) : "9:00 AM"}</time>
                                    </span>
                                </span>
                                <span className='zt-tag zt-tag-normal'>Break End</span>

                            </li>
                        )}
                    </Fragment>

                ))}
                <li>
                    <span className='flex flex-col gap-1'>
                        <span>Check Out At</span>
                        <span className='flex gap-1 items-center'>
                            <ClockIcon />
                            <time dateTime='09.00 AM' className='text-sm font-semibold'>{todayAttendance?.checkOutAt ? formatTime(todayAttendance?.checkOutAt) : "No Checked Out"}</time>
                        </span>
                    </span>
                </li>
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
