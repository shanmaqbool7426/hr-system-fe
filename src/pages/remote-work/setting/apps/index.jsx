import { Datepicker, Tabs } from "@/components/elements";
import { ChevronLeft, ChevronRight } from "@/components/svg";
import AppsTab from "@/modules/remoteWork/setting/apps/AppsTab";
import { Tab } from "@headlessui/react";
import { useTranslation } from "next-i18next";

export default function Apps() {
    const { t } = useTranslation()

    return (
        <section className="flex flex-col grow">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex justify-between pb-6">
                <div className="flex flex-col">
                    <h1 className="text-h4 mb-0">{t("Apps")}</h1>
                </div>
            </div>
            <div className="relative flex">
                <div className="absolute top-0 left-96 flex items-center gap-6">
                    <Datepicker
                        containerClass={'w-max'}
                        name={'completionDate'}
                        value={''}
                    />
                    <button><ChevronLeft /></button>
                    <button><ChevronRight /></button>
                </div>
                <Tabs
                    containerClasses={'zt-themeTabsV2 grow'}
                    tabNavClasses={'zt-themeTabNav'}
                    tabs={["Day", "Week", "Month"]}
                >
                    <Tab.Panels className={`zt-themeTabPanels zt-employeeTabsPanel !bg-transparent !p-0`}>
                        <Tab.Panel className={'zt-themeTabPanel'}>
                            <AppsTab />
                        </Tab.Panel>
                        <Tab.Panel className={'zt-themeTabPanel'}>
                            <AppsTab />
                        </Tab.Panel>
                        <Tab.Panel className={'zt-themeTabPanel'}>
                            <AppsTab />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tabs> </div>

        </section>
    )
}