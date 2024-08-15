import { Button } from '@/components/elements';
import { Calendar, CheckOutIcon, RemoteWork } from '@/components/svg';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { RadialChart } from './RadialChart';
import AddRequestForm from '@/components/forms/attendance/addRequest';
import CreateLeaveRequestForm from '@/components/forms/leaves/create-request';
import ApplyOvertimeForm from '@/components/forms/overTime/create';

export const Requests = () => {
    const { t } = useTranslation()
    const [create, setCreate] = useState(false)
    const [leave, setLeave] = useState(false)
    const [overTime, setOverTime] = useState(false)

    return (
        <div className={`col-span-3 lg:col-span-2 zt-card flex flex-col gap-6`}>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3 xl:gap-6 flex-wrap'>
                <Button onClick={() => setCreate(true)} variant={'success'} className={'flex items-center w-full whitespace-nowrap'}><Calendar className={'text-white shrink-0'} /> Attendance Request</Button>
                <Button onClick={() => setLeave(true)} variant={'purple'} className={'flex items-center w-full whitespace-nowrap'}><CheckOutIcon className={'text-white shrink-0'} /> Leave Request</Button>
                <Button onClick={() => setOverTime(true)} variant={'primary'} className={'flex items-center w-full whitespace-nowrap'}><RemoteWork className={'text-white shrink-0'} /> Apply overtime </Button>
            </div>
            <div className='grid sm:grid-cols-2 gap-6'>
                {['Annual Leaves', "Sick Leaves", "Casual Leaves", "Compensatory Leaves"].map((ele, i) => (
                    <div key={i} className="p-4 flex flex-col md:flex-row justify-between gap-4 md:items-center bg-themeGrayscale50 dark:bg-dark-3 rounded-lg">
                        <div className="shri">
                            <h3 className="text-xl font-semibold mb-4">{ele}</h3>
                            <div className="flex gap-2 mb-3 items-center ">
                                <span className="h-6 w-6 rounded bg-themePurple/50"></span>
                                <span className="text-themeGrayscale600 leading-3">{t("Total 10")}</span>
                            </div>
                            <div className="flex gap-2 mb-3 items-center">
                                <span className="h-6 w-6 rounded bg-themePurple"></span>
                                <span className="text-themeGrayscale600 leading-3">{t("Used - 4")}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className="h-6 w-6 rounded bg-primary"></span>
                                <span className="text-themeGrayscale600 leading-3">{t("Remaining - 3")}</span>
                            </div>
                        </div>
                        <RadialChart textSize='20' circleSize={140} fillColor='#8C62FF' circularValue={'/10'} />
                    </div>
                ))}
            </div>
            {leave && <CreateLeaveRequestForm onClose={() => { setLeave(false) }} />}
            {create && <AddRequestForm onClose={() => { setCreate(false) }} />}
            {overTime && <ApplyOvertimeForm onClose={() => { setOverTime(false) }} />}
        </div>
    )
}
