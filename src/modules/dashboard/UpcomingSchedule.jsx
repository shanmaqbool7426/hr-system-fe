import { MultiSelect } from '@/components/elements'
import { Plus } from '@/components/svg';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

export const UpcomingSchedule = ({ title, options,className }) => {
    const { t } = useTranslation()

    const [leaveType, setLeaveType] = useState([]);

    const leaves = ['mportant Tasks', 'Daily Tasks', 'Interviews', 'Internal Meetings', 'Client Meetings', 'General'];
    return (
        <aside className={`${className} zt-scheduleSidebar`}>
            <div className='flex justify-between items-center'>
                <h2 className="text-base font-bold mb-0">{title}</h2>
                <button className="p-2 rounded-full bg-themeGrayscale50"><Plus className='h-4 w-4 text-themePurple' /></button>
            </div>
            {options &&
                <MultiSelect containerClass='w-full'
                    list={leaves.map((leave) => ({ value: leave, display: leave }))}
                    value={leaveType}
                    onChange={(selected) => setLeaveType(selected)}
                    placeholder="Important Tasks"
                />
            }
            {["Today", "Tomorrow", "This Week"].map((ele, i) => (
                <div className="flex flex-col gap-4" key={i}>
                    <span className="text-sm font-bold text-themeGrayscale500">{ele}</span>
                    <div className="flex flex-col gap-2">
                        <div className="rounded flex items-center bg-themePrimary100">
                            <span className="p-2 text-darkPurple text-bmd font-bold border-r border-themePrimary">3:00</span>
                            <div className="px-2 py-1 font-medium text-bsm">
                                <p className=" text-themePrimary mb-1 leading-3"><span className="text-darkPurple">Mini Soman;</span> Mean stack</p>
                                <p className="text-themePrimary mb-0 leading-3">developer interview  <span className="text-darkPurple"> | 3:15 - 3:45</span></p>
                            </div>
                        </div>
                        <div className="rounded flex items-center bg-themeSuccessLight/10">
                            <span className="p-2 text-darkPurple text-bmd font-bold border-r border-themePrimary">3:00</span>
                            <div className="px-2 py-1 font-medium text-bsm">
                                <p className=" text-themeGrayscale mb-1 leading-3"><span className="text-lightOrange">Mini Soman;</span> Mean stack</p>
                                <p className="text-themeGrayscale mb-0 leading-3">developer interview  <span className="text-lightOrange"> | 3:15 - 3:45</span></p>
                            </div>
                        </div>
                        <div className="rounded flex items-center bg-themePrimary100">
                            <span className="p-2 text-darkPurple text-bmd font-bold border-r border-themePrimary">3:00</span>
                            <div className="px-2 py-1 font-medium text-bsm">
                                <p className=" text-themePrimary mb-1 leading-3"><span className="text-darkPurple">Mini Soman;</span> Mean stack</p>
                                <p className="text-themePrimary mb-0 leading-3">developer interview  <span className="text-darkPurple"> | 3:15 - 3:45</span></p>
                            </div>
                        </div>
                        <div className="rounded flex items-center bg-themeSuccessLight/10">
                            <span className="p-2 text-darkPurple text-bmd font-bold border-r border-themePrimary">3:00</span>
                            <div className="px-2 py-1 font-medium text-bsm">
                                <p className=" text-themeGrayscale mb-1 leading-3"><span className="text-lightOrange">Mini Soman;</span> Mean stack</p>
                                <p className="text-themeGrayscale mb-0 leading-3">developer interview  <span className="text-lightOrange"> | 3:15 - 3:45</span></p>
                            </div>
                        </div>
                        <div className="rounded flex items-center bg-themePrimary100">
                            <span className="p-2 text-darkPurple text-bmd font-bold border-r border-themePrimary">3:00</span>
                            <div className="px-2 py-1 font-medium text-bsm">
                                <p className=" text-themePrimary mb-1 leading-3"><span className="text-darkPurple">Mini Soman;</span> Mean stack</p>
                                <p className="text-themePrimary mb-0 leading-3">developer interview  <span className="text-darkPurple"> | 3:15 - 3:45</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </aside>
    )
}
