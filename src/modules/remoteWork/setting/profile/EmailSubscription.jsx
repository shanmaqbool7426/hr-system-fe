import { CheckBox } from '@/components/elements';
import React from 'react'
import { useTranslation } from 'next-i18next';

const EmailSubscription = () => {
    const { t } = useTranslation();

    return (
        <div className='grow zt-card'>
            <div className='!bg-themeGrayscale100 zt-card flex flex-col gap-3'>
                <h2 className='text-h4 mb-0'>{t("Email subscription preferences")}</h2>
                <p className='mb-0 leading-11'>{t("Please, select the updates you'd like to receive from us by email – you can change these preferences any time.")}</p>
                <CheckBox id={'product'} label={'Marketing and product updates'} />
                <CheckBox id={'reports'} label={'Productivity reports'} />
                <CheckBox id={'blog'} label={'Blog updates'} />
                <CheckBox id={'youtube'} label={'YouTube updates'} />
            </div>
        </div>
    )
}

export default EmailSubscription
