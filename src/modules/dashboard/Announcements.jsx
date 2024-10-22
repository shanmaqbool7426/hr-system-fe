import { Tabs } from '@/components/elements'
import { Tab } from '@headlessui/react'
import React from 'react'
import { useTranslation } from 'next-i18next'

export const Announcements = () => {
    const { t } = useTranslation()

    return (
        <div className={`zt-card`}>
            <h2 className="font-bold text-lg mb-4">{t("Announcements")}</h2>
            <hr className="bg-themeGrayscale200 dark:border-gray-700 mb-4" />
            <Tabs
                containerClasses={'zt-themeTabsV2 zt-announcementsTabs'}
                tabNavClasses={'zt-themeTabNav'}
                tabs={["News", "HR Policies"]}
            >
                <Tab.Panels className={`zt-themeTabPanels !p-0`}>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <div className="flex flex-col gap-2">
                            {["New Branch Opening", "AI Trend In Tech Industry", "Chat Bot Luch", "Fuel Allowance", "Medical Facility"].map((ele, i) => (
                                <div key={i} className="bg-themeGrayscale50 dark:bg-gray-700 rounded p-3 flex items-center justify-between">
                                    <h3 className="text-xs mb-0 font-semibold">{ele}</h3>
                                    <span className="text-themePurple bg-themePurple/10 dark:bg-themePurple dark:text-white rounded-md px-2 py-1 text-xs font-medium">View</span>
                                </div>
                            ))}
                        </div>
                    </Tab.Panel>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                    <div className="flex flex-col gap-2">
                            {["New Branch Opening", "AI Trend In Tech Industry", "Chat Bot Luch", "Fuel Allowance", "Medical Facility"].map((ele, i) => (
                                <div key={i} className="bg-themeGrayscale50 dark:bg-gray-700 rounded p-3 flex items-center justify-between">
                                    <h3 className="text-xs mb-0 font-semibold">{ele}</h3>
                                    <span className="text-themePurple bg-themePurple/10 dark:bg-themePurple dark:text-white rounded-md px-2 py-1 text-xs font-medium">View</span>
                                </div>
                            ))}
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tabs>
        </div>
    )
}
