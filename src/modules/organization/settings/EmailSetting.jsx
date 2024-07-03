import DisclosureComponent from '@/components/elements/Disclosure'
import React from 'react'
import { useTranslation } from 'react-i18next';

export const EmailSettings = () => {
    const { t } = useTranslation();
    return (
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
    )
}
