import React from 'react'
import { useTranslation } from 'react-i18next';
import { Tabs } from '@/components/elements';
import { Tab } from '@headlessui/react'
import SystemConfiguration from '@/modules/organization/settings/SystemConfiguration';
import { CompanySettings } from '@/modules/organization/settings/CompanySettings';
import { BiometricSettings } from '@/modules/organization/settings/BiometricSetting';
import { EmailSettings } from '@/modules/organization/settings/EmailSetting';
import { CardTemplate } from '@/modules/organization/settings/CardTemplates';
export default function OrganizationSystemConfigurationSettingPage() {
    const { t } = useTranslation();

    return (
        <section className="p-4 flex flex-col grow relative">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex justify-between pb-6">
                <div className="flex flex-col">
                    <h1 className="text-h4 mb-0">{t("Organization Settings")}</h1>
                </div>
            </div>

            <Tabs
                containerClasses={'zt-themeTabsV2 grow'}
                tabNavClasses={'zt-themeTabNav'}
                tabs={["System Configuration", "Custom Fields", "Email Settings", "Company Settings", "Biometric Device Settings", "Card Template"]}
            >
                <Tab.Panels className={`zt-themeTabPanels zt-employeeTabsPanel !bg-transparent !p-0`}>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <SystemConfiguration />
                    </Tab.Panel>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        Custom Fields
                    </Tab.Panel>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <EmailSettings />
                    </Tab.Panel>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <CompanySettings />
                    </Tab.Panel>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <BiometricSettings />
                    </Tab.Panel>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <CardTemplate />
                    </Tab.Panel>
                </Tab.Panels>
            </Tabs>
        </section>
    )
}