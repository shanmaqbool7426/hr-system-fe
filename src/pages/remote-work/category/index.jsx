import { Button, Datepicker, Tabs } from "@/components/elements"; 
import CreateCategoryForm from "@/components/forms/remoteWork/createCatogory";
import { ChevronLeft, ChevronRight } from "@/components/svg";
import CategoryTypes from "@/modules/remoteWork/setting/category/CategoryType";
import { Tab } from "@headlessui/react"; 
import { useTranslation } from "next-i18next";
import { useState } from "react";

export default function Category() {
    const { t } = useTranslation()
    const [create, setCreate] = useState(false)
    return (
        <section className="flex flex-col grow">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex justify-between pb-6">
                <div className="flex flex-col">
                    <h1 className="text-h4 mb-0">{t("Category")}</h1>
                </div>
                <Button onClick={() => { setCreate(true) }} className={'btn btn-primary'}>{t("Add Category")}</Button>
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
                            <CategoryTypes />
                        </Tab.Panel>
                        <Tab.Panel className={'zt-themeTabPanel'}>
                            <CategoryTypes />
                        </Tab.Panel>
                        <Tab.Panel className={'zt-themeTabPanel'}>
                            <CategoryTypes />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tabs> </div>
            {create && <CreateCategoryForm onClose={() => { setCreate(false) }} />}
        </section>
    )
}