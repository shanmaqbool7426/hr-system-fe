import { CheckBox } from '@/components/elements';
import React from 'react'
import { useTranslation } from 'next-i18next';

export default function ExitOnboardingPage() {
    const { t } = useTranslation();
    const onboardTasks = ["New Hire Information", "introduction With Team", 'Email Creation', 'Policy Briefing', 'HRM credentials', 'Project Assigned', 'Educational Document', 'Experienced Letter', 'CNIC Attached', 'Upload Photo', 'Laptop Assigned']
    const clearanceTasks = ['Email Deactivation', ' Revoke HRM credentials', 'Project Transition', 'Exit/ Clearance policy briefing ', 'NDA signed', 'Medical Insurance deactivation', 'EOBI deactivation', 'Assests returned',]
    const AssetsData = ['Laptop', 'Laptop Charger', 'Headset', 'Mobile', 'Wireless Mouse', 'Tablet', 'Car', 'Keys', 'Apartement',]

    return (
        <section className="flex flex-col grow">
            <div className="flex flex-col pb-6">
                <h1 className="text-h4 mb-0">{t("On/Off Boarding Tasks")}</h1>
                <p className="mb-0">{t("Onboarding and Offboarding tasks are the tasks that are required to be completed by the employee during onboarding and offboarding process.")}</p>
            </div>
            <div className='grid grid-cols-3 gap-4 grow'>
                <div className='zt-card'>
                    <h2 className='text-h4'>{t("Onboarding Tasks")}</h2>
                    <table className='zt-table'>
                        <thead>
                            <tr>
                                <th className='text-left'>{t("Task")}</th>
                                <th className='text-right'>{t("Active")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {onboardTasks.map((task, i) => (
                                <tr key={i}>
                                    <td>{task}</td>
                                    <td>
                                        <div className="flex justify-end">
                                            <CheckBox id={i} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* <div className='flex flex-col gap-4'>
                        {onboardTasks.map((ele, i) => (
                            <div key={i} className='flex items-center justify-between gap-4 border bg-themeGrayscale50 p-3 rounded'>
                                <span className='font-bold'>{ele}</span>
                                <CheckBox id={i} />
                            </div>
                        ))}
                    </div> */}
                </div>
                <div className='zt-card'>
                    <h2 className='text-h4'>{t("Exit Clearance")}</h2>
                    <div className='flex flex-col gap-4'>
                        {clearanceTasks.map((ele, i) => (
                            <div key={i} className='flex items-center justify-between gap-4 border bg-themeGrayscale50 p-3 rounded'>
                                <span className='font-bold'>{ele}</span>
                                <CheckBox id={ele} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='zt-card'>
                    <h2 className='text-h4'>{t("Onboarding Assets")}</h2>
                    <div className='flex flex-col gap-4'>
                        {AssetsData.map((ele, i) => (
                            <div key={i} className='flex items-center justify-between gap-4 border bg-themeGrayscale50 p-3 rounded'>
                                <span className='font-bold'>{ele}</span>
                                <CheckBox id={ele} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}