import React from 'react'
import { Tab } from '@headlessui/react'
import AppsCategory from './AppsCategory'
import { Tabs } from '@/components/elements'
import AppsState from '../../myRemoteWork/AppsState'

const AppsTab = () => {

    return (
        <div className='zt-card'>
            <Tabs
                containerClasses={'zt-themeTabsV1'}
                tabNavClasses={'zt-themeTabNav1'}
                tabs={["All", "Without team", "Accounting", "Management", "Product Oversight", "Sales"]}
            >
                <Tab.Panels className={`zt-themeTabPanels zt-employeeTabsPanel !bg-transparent !p-0`}>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <AppsState />
                    </Tab.Panel>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <AppsState />
                    </Tab.Panel>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <AppsState />
                    </Tab.Panel>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <AppsState />
                    </Tab.Panel>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <AppsState />
                    </Tab.Panel>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <AppsState />
                    </Tab.Panel>
                </Tab.Panels>
            </Tabs>
        </div>
    )
}

export default AppsTab
