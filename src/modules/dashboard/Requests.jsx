import { Button } from '@/components/elements';
import { Calendar, CheckOutIcon } from '@/components/svg';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { RadialChart } from './RadialChart';
import AddRequestForm from '@/components/forms/attendance/addRequest';
import CreateLeaveRequestForm from '@/components/forms/leaves/create-request';

export const Requests = () => {
    const { t } = useTranslation()
    const [create, setCreate] = useState(false)
    const [leave, setLeave] = useState(false)

    return (
        <div className={`col-span-3 lg:col-span-2 p-6 bg-white rounded-lg flex flex-col gap-6`}>
            <div className='grid sm:grid-cols-2 gap-6'>
                <Button onClick={() => setCreate(true)} variant={'success'} className={'flex items-center w-full'}><Calendar className={'text-white'} /> Attendance Request</Button>
                <Button onClick={() => setLeave(true)} variant={'purple'} className={'flex items-center w-full'}><CheckOutIcon /> Leave Request</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {['Casual Leave', "Sick Leave", "Sick Leave", "Annual Leave", "Earn Leave", "Earn Leave"].map((ele, i) => (
                    <div key={i} className="p-2 flex justify-between gap-4 items-center bg-themeGrayscale50 rounded-lg">
                        <div className="shrink-0">
                            <h3 className="text-sm font-semibold mb-2">{ele}</h3>
                            <div className="flex gap-1 mb-1">
                                <span className="h-3 w-3 rounded bg-themePurple/50"></span>
                                <span className="text-[10px] text-themeGrayscale600 leading-3">{t("Total 10")}</span>
                            </div>
                            <div className="flex gap-1 mb-1">
                                <span className="h-3 w-3 rounded bg-themePurple"></span>
                                <span className="text-[10px] text-themeGrayscale600 leading-3">{t("Used - 4")}</span>
                            </div>
                            <div className="flex gap-1">
                                <span className="h-3 w-3 rounded bg-primary"></span>
                                <span className="text-[10px] text-themeGrayscale600 leading-3">{t("Remaining - 3")}</span>
                            </div>
                        </div>
                        <RadialChart circleSize={90} fillColor='#8C62FF' circularValue={'/10'}/>
                    </div>
                ))}
            </div>
      {leave && <CreateLeaveRequestForm onClose={() => { setLeave(false) }} />}

            {create && <AddRequestForm
                title={'New Request'}
                type={'New Request'}
                onClose={() => { setCreate(false) }} 
            />}
        </div>
    )
}
