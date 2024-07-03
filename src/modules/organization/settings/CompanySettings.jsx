import { Input } from '@/components/elements';
import DisclosureComponent from '@/components/elements/Disclosure'
import React from 'react'
import { useTranslation } from 'react-i18next';

export const CompanySettings = () => {
    const { t } = useTranslation();
    return (
        <div className='zt-card'>
            <div className="flex justify-between pb-6">
                <h2 className="text-h4 mb-0">{t("Company Settings")}</h2>
            </div>
            <div className='flex flex-col gap-4'>
                <DisclosureComponent disclosureTitle={'Company Basic Information'} defaultOpen={true}>
                    <div className='grid grid-cols-2 gap-4'>
                        <Input
                            type={'text'}
                            name={'CompanyName'}
                            label={t('Company Name')}
                            placeholder={t('ERP')}
                            containerClass='!gap-2'
                        />
                        <Input
                            type={'text'}
                            name={'ManagerName'}
                            label={t('Account Manager Name')}
                            placeholder={t('Jack')}
                            containerClass='!gap-2'
                        />
                        <Input
                            type={'number'}
                            name={'ManagerNumber'}
                            label={t('Account Manager Number')}
                            placeholder={t('778-863-0143')}
                            containerClass='!gap-2'
                        />
                        <Input
                            type={'number'}
                            name={'EmployeeLimit'}
                            label={t('Employee Limit')}
                            placeholder={t('77')}
                            containerClass='!gap-2'
                        />
                        <Input
                            type={'number'}
                            name={'CompanyURL'}
                            label={t('Company URL')}
                            placeholder={t('https://sarai.name')}
                            containerClass='!gap-2'
                        />
                        <Input
                            type={'date'}
                            name={'EstablishmentDate'}
                            label={t('Establishment Date')}
                            containerClass='!gap-2'
                        />
                        <Input
                            type={'date'}
                            name={'ExpiryDate'}
                            label={t('Expiry Date')}
                            containerClass='!gap-2'
                        />
                    </div>
                </DisclosureComponent>
            </div>
        </div>
    )
}
