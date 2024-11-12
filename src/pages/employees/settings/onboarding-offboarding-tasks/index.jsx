import { CheckBox } from '@/components/elements';
import React, { useEffect } from 'react'
import { useTranslation } from 'next-i18next';
import { useSelector, useDispatch } from 'react-redux';
import OnboardingTasksList from '@/modules/employee/settings/onboarding-tasks';
import OffboardingTasksList from '@/modules/employee/settings/offboarding-tasks';
import { FetchSettings } from "@/store/actions/onboarding-offboarding.actions"
export default function ExitOnboardingPage() {
    const { t } = useTranslation();
    const { onboarding_assets } = useSelector((state) => state.onboardingoffboarding)
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
            <div className='grid grid-cols-3 gap-4 grow'>
                <OnboardingTasksList />
                <div className='zt-card'>
                    <h2 className='text-h4'>{t("Onboarding Assets")}</h2>
                    <table className='zt-table'>
                        <thead>
                            <tr>
                                <th className='text-left'>{t("Asset")}</th>
                                <th className='text-right'>{t("Active")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {onboarding_assets.map((asset, i) => (
                                <tr key={i}>
                                    <td>{asset}</td>
                                    <td>
                                        <div className="flex justify-end">
                                            <CheckBox id={i} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <OffboardingTasksList />

            </div>
        </section>
    )
}