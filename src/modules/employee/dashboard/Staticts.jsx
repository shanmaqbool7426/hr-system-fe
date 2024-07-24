import { Button, SearchSelect, Select, Tabs } from '@/components/elements';
import { Download, EyeOn } from '@/components/svg';
import { Tab } from '@headlessui/react';
import React from 'react'
import { useTranslation } from 'react-i18next';

export const Staticts = () => {
    const { t } = useTranslation();

    return (
        <div className='flex flex-col xl:flex-row gap-6'>
            <div className='w-full flex flex-col gap-4 p-6 bg-white rounded-lg'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-xl font-bold mb-0'>{t("Statistics")}</h2>
                    <SearchSelect
                        list={[{ label: "Today", value: "Today" }]}
                        placeholder={`Today`}
                    />
                </div>
                <div className='flex flex-col gap-4 justify-between grow'>
                    <div className='rounded-lg p-4 bg-themeGrayscale50 flex justify-between'>
                        <div className='flex flex-col justify-between text-sm'>
                            <span className='text-themeGrayscale600 '>{t("Work Time")}</span>
                            <span className='font-semibold'>{t("06 Hrs : 54 Min")}</span>
                        </div>
                        <Button variant={'orange'}>{t("Check In")}</Button>
                    </div>
                    <div className='self-end w-full flex justify-between gap-3 text-sm'>
                        <div className='bg-themeGrayscale50 rounded-lg p-3 flex flex-col gap-1 items-center'>
                            <span className=''>{t("Remaining")}</span>
                            <span className='font-bold'>{t("2 Hrs 36 Min")}</span>
                        </div>
                        <div className='bg-themeGrayscale50 rounded-lg p-3 flex flex-col gap-1 items-center'>
                            <span className=''>{t("Break")}</span>
                            <span className='font-bold'>{t("0 Hrs 00 Min")}</span>
                        </div>
                        <div className='bg-themeGrayscale50 rounded-lg p-3 flex flex-col gap-1 items-center'>
                            <span className=''>{t("Overtime")}</span>
                            <span className='font-bold'>{t("1 Hrs 00 Min")}</span>
                        </div>
                    </div>
                </div>

            </div>
            <div className='w-full p-6 bg-white rounded-lg'>
                <h2 className='text-xl font-bold'>{t("Company Policy")}</h2>
                <Tabs
                    containerClasses={'zt-themeTabsV2 grow'}
                    tabNavClasses={'zt-themeTabNav mt-4'}
                    tabs={["HR Policies", "Announcements"]}
                >
                    <Tab.Panels className={`zt-themeTabPanels zt-employeeTabsPanel !bg-transparent !p-0`}>
                        <Tab.Panel className={'zt-themeTabPanel'}>
                            {["Attendance Policy", "Leave Policy", "Remote Work Policy"].map((ele, i) => (
                                <div key={i} className='flex justify-between items-center p-3 bg-themeGrayscale50 mb-2'>
                                    <h3 className='font-semibold text-sm mb-0'>{ele}</h3>
                                    <div className='flex gap-3'>
                                        <button><EyeOn /></button>
                                        <button><Download className={'h-5 w-5'} /></button>
                                    </div>
                                </div>
                            ))}
                        </Tab.Panel>
                        <Tab.Panel className={'zt-themeTabPanel'}>
                            {["Attendance Policy", "Leave Policy", "Remote Work Policy"].map((ele, i) => (
                                <div key={i} className='flex justify-between items-center p-3 bg-themeGrayscale50 mb-2'>
                                    <h3 className='font-semibold text-sm mb-0'>{ele}</h3>
                                    <div className='flex gap-3'>
                                        <button><EyeOn /></button>
                                        <button><Download className={'h-5 w-5'} /></button>
                                    </div>
                                </div>
                            ))}
                        </Tab.Panel>
                    </Tab.Panels>
                </Tabs>
            </div>
        </div>
    )
}
