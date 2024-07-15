import React from 'react'
import { useTranslation } from 'react-i18next';
import { CardTemplate } from '@/modules/organization/settings/CardTemplates';
export default function OrganizationCardTemplateSettingPage() {
    const { t } = useTranslation();

    return (
        <section className="p-4 flex flex-col grow relative">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex justify-between pb-6">
                <h1 className="text-h4 mb-0">{t("Organization Settings")}</h1>
            </div>
            <CardTemplate /> 
        </section>
    )
}