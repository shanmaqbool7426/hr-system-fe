import { Tabs } from '@/components/elements'
import { Tab } from '@headlessui/react'
import React from 'react'

const AppsTab = () => {
    return (
        <div className='zt-card'>
            <Tabs
                containerClasses={'zt-themeTabsV1'}
                tabNavClasses={'zt-themeTabNav1'}
                tabs={["All", "Without team", "Accounting", "Management", "Product Oversight", "Sales"]}
            >
                <Tab.Panels className={`zt-themeTabPanels zt-employeeTabsPanel !bg-transparent !p-0 !pr-96`}>
                    <Tab.Panel className={'zt-themeTabPanel'}> s
                    </Tab.Panel>
                 
                </Tab.Panels>
            </Tabs>
        </div>
    )
}

export default AppsTab
