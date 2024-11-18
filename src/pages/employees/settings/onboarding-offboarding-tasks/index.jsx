import React, { useEffect } from 'react'
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import OnboardingTasksList from '@/modules/employee/settings/onboarding-tasks';
import OffboardingTasksList from '@/modules/employee/settings/offboarding-tasks';
import OnboardingAssetsList from '@/modules/employee/settings/onboarding-assets';
import { FetchSettings } from "@/store/actions/onboarding-offboarding.actions"
export default function ExitOnboardingPage() {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(FetchSettings())
    }, [])
    return (
        <section className="flex flex-col grow">
            <div className="flex flex-col pb-6">
                <h1 className="text-h4 mb-0">{t("On/Off Boarding Settings")}</h1>
                <p className="mb-0">{t("Onboarding and Offboarding settings are the settings that are required to be completed by the employee during onboarding and offboarding process.")}</p>
            </div>
            <div className='flex flex-col 2xl:grid 2xl:grid-cols-3 gap-4 grow'>
                <OnboardingTasksList />
                <OnboardingAssetsList />
                <OffboardingTasksList />
            </div>
        </section>
    )
}