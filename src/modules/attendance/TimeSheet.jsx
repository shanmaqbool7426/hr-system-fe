import { Button } from '@/components/elements'
import { CheckOutIcon, TakeBreakIcon } from '@/components/svg'
import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export const TimeSheet = () => {
    const { t } = useTranslation()
    const [isCheckedIn, setIsCheckedIn] = useState(false)
    const [onBreak, setOnBreak] = useState(false)
    const [checkInTime, setCheckInTime] = useState(null)
    const [breakTime, setBreakTime] = useState(0)
    const [overtime, setOvertime] = useState(0)
    const [workedHours, setWorkedHours] = useState(0)
    const [hasCheckedOut, setHasCheckedOut] = useState(false)
    const intervalRef = useRef(null)
    const breakStartTimeRef = useRef(null)

    useEffect(() => {
        if (isCheckedIn && !onBreak) {
            const interval = setInterval(() => {
                const now = new Date()
                const endOfShift = new Date()
                endOfShift.setHours(18, 0, 0, 0)

                const workedMillis = now - checkInTime - breakTime
                setWorkedHours(workedMillis)

                if (now > endOfShift) {
                    const overtimeMillis = now - endOfShift
                    setOvertime(overtimeMillis)
                }
            }, 1000)
            intervalRef.current = interval
            return () => clearInterval(interval)
        }
    }, [isCheckedIn, onBreak, checkInTime, breakTime])

    const handleCheckIn = () => {
        setIsCheckedIn(true)
        setCheckInTime(new Date())
    }

    const handleCheckOut = () => {
        setIsCheckedIn(false)
        setOnBreak(false)
        setCheckInTime(null)
        setBreakTime(0)
        setOvertime(0)
        setWorkedHours(0)
        setHasCheckedOut(true)
    }

    const handleTakeBreak = () => {
        setOnBreak(true)
        breakStartTimeRef.current = new Date()
    }

    const handleBreakOff = () => {
        setOnBreak(false)
        const now = new Date()
        const breakDuration = now - breakStartTimeRef.current
        setBreakTime(prev => prev + breakDuration)
    }

    const formatTime = (duration) => {
        const hours = Math.floor(duration / 1000 / 60 / 60)
        const minutes = Math.floor((duration / 1000 / 60) % 60)
        return `${hours}.${minutes < 10 ? '0' : ''}${minutes} hrs`
    }

    const getFormattedDate = () => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date().toLocaleDateString('en-US', options)
    }

    return (
        <div className={`zt-card grid grid-cols-2 gap-4 text-bmd`}>
            <div className='flex flex-col text-left'>
                <h2 className='text-xl font-bold mb-0'>{t("TimeSheet")}</h2>
                <time dateTime={new Date().toISOString()} className='text-themeGrayscale600 text-sm block'>{t(getFormattedDate())}</time>
            </div>
            <div className='flex flex-col gap-2 text-right'>
                <span className='text-themeGrayscale600 '>{t("Current Shift")}</span>
                <time className='font-semibold' dateTime="09:00 AM - 06:00 PM">{t("09:00 AM - 06:00 PM")}</time>
            </div>
            <div className='bg-themeGrayscale50 rounded-lg px-4 py-3 col-span-2 flex justify-between'>

                <div className='flex flex-col gap-1'>
                    <span className='text-themeGrayscale600'>{t("Punch In at")}</span>
                    <span className='font-semibold text-themeGrayscale900'>{checkInTime ? checkInTime.toLocaleTimeString() : t("Not checked in")}</span>
                </div>
                <div className='flex flex-col gap-1'>
                    <span className='text-themeGrayscale600'>{t("Work Mode")}</span>
                    <span className='font-semibold text-themeGrayscale900'>{t("Onsite")}</span>
                </div>
            </div>
            <div className='col-span-2 h-28 w-28 rounded-full border-5 border-themeGrayscale400 bg-themeGrayscale50 mx-auto flex justify-center items-center'>
                <time className='text-xs font-bold' dateTime={formatTime(workedHours)}>{t(formatTime(workedHours))}</time>
            </div>
            {!isCheckedIn ? (
                <>
                    <Button onClick={handleCheckIn} variant={'primary'} className={'flex w-full items-center whitespace-nowrap'} disabled={hasCheckedOut}>Check In</Button>
                    <Button onClick={handleCheckIn} variant={'primary'} className={'flex w-full items-center whitespace-nowrap'} disabled={hasCheckedOut}>Check In</Button>

                </>
            ) : (
                <>
                    {!onBreak ? (
                        <Button onClick={handleTakeBreak} variant={'orange'} className={'flex w-full items-center whitespace-nowrap'}>Take Break <TakeBreakIcon className={'shrink-0'} /></Button>
                    ) : (
                        <Button onClick={handleBreakOff} variant={'orange'} className={'flex w-full items-center whitespace-nowrap'}>Break Off <TakeBreakIcon className={'shrink-0'} /></Button>
                    )}
                    <Button onClick={handleCheckOut} variant={'primary'} className={'flex w-full items-center whitespace-nowrap'}>Check Out <CheckOutIcon className={'shrink-0'} /></Button>
                </>
            )}
            <div className='w-full bg-themeGrayscale50 p-4 rounded-lg flex flex-col text-center gap-1'>
                <span>{t("Break")}</span>
                <time className='font-bold' dateTime={formatTime(breakTime)}>{t(formatTime(breakTime))}</time>
            </div>
            <div className='w-full bg-themeGrayscale50 p-4 rounded-lg flex flex-col text-center gap-1'>
                <span>{t("Overtime")}</span>
                <time className='font-bold block' dateTime={formatTime(overtime)}>{t(formatTime(overtime))}</time>
            </div>
        </div>
    )
}
