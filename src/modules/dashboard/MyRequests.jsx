import { Tabs } from '@/components/elements'
import { Tab } from '@headlessui/react'
import React from 'react'
import { useTranslation } from 'next-i18next'

export const MyRequests = () => {
    const { t } = useTranslation()

    return (
        <div className={`zt-card`}>
            <h2 className="font-bold text-lg mb-4">{t("My Requests")}</h2>
            <hr className="bg-themeGrayscale200 dark:border-gray-700 mb-4" />
            <Tabs
                containerClasses={'zt-themeTabsV2 zt-myRequestsTabs'}
                tabNavClasses={'zt-themeTabNav'}
                tabs={["My Requests", "Team Requests"]}
            >
                <Tab.Panels className={`zt-themeTabPanels !p-0`}>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <div className="flex bg-transparent flex-col gap-2">
                            {["Leave Requests", "Attendance Requests", "Advance Salary Request", "Over Time Requests", "Leave Encashment Requests"].map((ele, i) => (
                                <div key={i} className="bg-themeGrayscale50 dark:bg-gray-700 rounded p-3 flex items-center justify-between">
                                    <h3 className="text-xs mb-0 font-semibold">{ele}</h3>
                                    <span className="text-themePurple bg-themePurple/10 dark:bg-themePurple dark:text-white rounded-md px-2 py-1 text-xs font-medium">10</span>
                                </div>
                            ))}
                        </div>
                    </Tab.Panel>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <div className="flex bg-transparent flex-col gap-2">
                            {["Leave Requests", "Attendance Requests", "Advance Salary Request", "Over Time Requests", "Leave Encashment Requests"].map((ele, i) => (
                                <div key={i} className="bg-themeGrayscale50 dark:bg-gray-700 rounded p-3 flex items-center justify-between">
                                    <h3 className="text-xs mb-0 font-semibold">{ele}</h3>
                                    <span className="text-themePurple bg-themePurple/10 dark:bg-themePurple dark:text-white rounded-md px-2 py-1 text-xs font-medium">10</span>
                                </div>
                            ))}
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tabs>
        </div>
    )
}
