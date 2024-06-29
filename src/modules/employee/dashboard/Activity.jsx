import { Tabs } from '@/components/elements';
import { Tab } from '@headlessui/react';
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next';
import { ImportantActivityTab } from './ImportantActivityTab';

export const Activity = () => {
    const { t } = useTranslation();

    return (
        <Fragment>
            <div className='flex justify-between items-center'>
                <h2 className="text-xl font-bold mb-0">{t("Today Activity")}</h2>
                <button className="text-sm font-semibold">{t("View All")}</button>
            </div>
            <Tabs
                containerClasses={'zt-themeTabsV2 grow'}
                tabNavClasses={'zt-themeTabNav mt-4'}
                tabs={["Important", "Schedules"]}
            >
                <Tab.Panels className={`zt-themeTabPanels zt-employeeTabsPanel !bg-transparent !p-0`}>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <ImportantActivityTab />
                    </Tab.Panel>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <ImportantActivityTab />
                    </Tab.Panel>
                </Tab.Panels>
            </Tabs>
        </Fragment>
    )
}
