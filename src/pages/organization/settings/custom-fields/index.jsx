import React from 'react'
import { useTranslation } from 'react-i18next'; 
export default function OrganizationCustomFieldsSettingPage() {
    const { t } = useTranslation();

    return (
        <section className="p-4 flex flex-col grow relative">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex justify-between pb-6">
                <div className="flex flex-col">
                    <h1 className="text-h4 mb-0">{t("Organization Settings")}</h1>
                </div>
            </div> 
            <div className='zt-card grow'>

            </div>
        </section>
    )
}