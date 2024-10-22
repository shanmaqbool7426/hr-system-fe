import { Button } from '@/components/elements'
import ChangePlanForm from '@/components/forms/remoteWork/change-plan'
import CreateMemberForm from '@/components/forms/remoteWork/createMember'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'

const PaymentMethods = () => {
    const { t } = useTranslation()
    const [addMember, setAddMember] = useState(false)
    const [changePlan, setChangePlan] = useState(false)
    return (
        <div className="zt-card w-9/12 grow">
            <h2 className='text-h5 mb-2'>{t("Payment methods")}</h2>
            <p>{t("You'll be automatically charged for the subscription at the end of your free trial.")}</p>
            <div className='grid gap-6 custom__grid'>
                <div className='!bg-themeGrayscale100 zt-card flex flex-col justify-between gap-6'>
                    <div className=''>
                        <span>{t("Team members count")}</span>
                        <h3 className='mb-0 text-h5'>{t("Up to 22 members")}</h3>
                    </div>
                    <div className='flex flex-col gap-3 items-start'>
                        <span>{t("22 current members")}</span>
                        <Button onClick={() => setAddMember(true)} className={'btn btn-dark-outline'}>{t("Add more")}</Button>
                    </div>
                </div>
                <div className='!bg-themeGrayscale100 zt-card flex flex-col justify-between gap-6'>
                    <div className=''>
                        <span>{t("Billing period")}</span>
                        <h3 className='mb-0 text-h5'>{t("Monthly billing")}</h3>
                    </div>
                    <div className='flex flex-col gap-3 items-start'>
                        <span>{t("Get 1 month free with annual billing.")}</span>
                        <Button onClick={() => setAddMember(true)} className={'btn btn-dark-outline'}>{t("Switch to annual")}</Button>
                    </div>
                </div>
                <div className='!bg-themeGrayscale100 zt-card flex flex-col justify-between gap-6'>
                    <div className=''>
                        <span>{t("Pricing plan")}</span>
                        <h3 className='mb-1 text-h5'>{t("Premium")}</h3>
                        <h4 className='mb-0 text-h2'>{t("$220.00")}</h4>
                    </div>
                    <div className='flex flex-col gap-3 items-start'>
                        <Button onClick={() => setChangePlan(true)} className={'btn btn-dark-outline'}>{t("Change plan")}</Button>
                    </div>
                </div>
            </div>
            {addMember &&
                <CreateMemberForm onClose={() => { setAddMember(false) }} />}
            {changePlan &&
                <ChangePlanForm onClose={() => { setChangePlan(false) }} />}
        </div>
    )
}

export default PaymentMethods
