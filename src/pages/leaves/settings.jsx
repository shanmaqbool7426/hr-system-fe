import { useTranslation } from "next-i18next";
import { Button, Tabs } from "@/components/elements";
import { Tab } from "@headlessui/react";
import LeaveTypeSetting from "@/modules/leaves/setting/LeaveTypeSetting";
import LeaveQuotta from "@/modules/leaves/setting/LeaveQuotta";
import GeneralLeaveSetting from "@/modules/leaves/setting/GeneralLeaveSetting";

export default function LeaveSettingsPage() {
  const { t } = useTranslation()

  return (
    <section className="flex flex-col grow">
      <div className="flex justify-between items-center pb-6">
        <div className="">
          <h1 className="text-h4 mb-0">{t("Leave Settings")}</h1>
        </div>
      </div>
      <Tabs
        containerClasses={'zt-themeTabsV2 grow'}
        tabNavClasses={'zt-themeTabNav'}
        tabs={["Leave Type Settings", "Employee Leave Quota", "General Leave Settings"]}
      >
        <Tab.Panels className={`zt-themeTabPanels zt-employeeTabsPanel !bg-transparent !p-0 flex flex-col grow`}>
          <Tab.Panel className={'zt-themeTabPanel grow'}>
            <LeaveTypeSetting />
          </Tab.Panel>
          <Tab.Panel className={'zt-themeTabPanel grow'}>
            <LeaveQuotta />
          </Tab.Panel>
          <Tab.Panel className={'zt-themeTabPanel grow'}>
            <GeneralLeaveSetting />
          </Tab.Panel>

        </Tab.Panels>
      </Tabs>
    </section>
  )
}