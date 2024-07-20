import React from 'react'
import { useTranslation } from 'react-i18next'; 
import DisclosureComponent from '@/components/elements/Disclosure';
export default function OrganizationEmailSettingPage() {
    const { t } = useTranslation();

    return (
        <section className="p-4 flex flex-col grow relative">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex justify-between pb-6">
                <h1 className="text-h4 mb-0">{t("Organization Settings")}</h1>
            </div>
            <div className='zt-card'>
                <div className="flex justify-between pb-6">
                    <h2 className="text-h4 mb-0">{t("Email Settings")}</h2>
                </div>
                <div className='flex flex-col gap-4'>
                    <DisclosureComponent disclosureTitle={'All Modules Credential Settings (Exclude Recruitment)'} defaultOpen={true}>
                        No data
                    </DisclosureComponent>
                    <DisclosureComponent disclosureTitle={'Credential Settings Only for Recruitment'} defaultOpen={true}>
                        No data
                    </DisclosureComponent>
                </div>
            </div>
        </section>
    )
}