import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import { SuccessTick } from '@/components/svg';
import { useState } from 'react';
import clsx from 'clsx';
export default function ChangePlanForm({ onClose, object }) {
    const { t } = useTranslation()
    const [selectedPlan, setSelectedPlan] = useState('Premium');
    const plans = [
        { id: 'Lite', name: 'Lite', price: 'Free', users: "1 User only", features: ['Automatic time tracking', 'App tracking', 'Mobile app'] },
        { id: 'Pro', name: 'Pro', price: '$7.00', users: "user / month", features: ['Automatic time tracking', 'URL and app tracking', 'Productivity calculation', 'Idle time tracking'] },
        { id: 'Premium', name: 'Premium', price: '$10.00', users: "user / month", features: ['Automatic time tracking', 'URL and app tracking', 'Productivity calculation', 'Idle time tracking'] },
        { id: 'Enterprise', name: 'Enterprise', price: '$20.00', users: "user / month", features: ['Automatic time tracking', 'URL and app tracking', 'Productivity calculation', 'Idle time tracking'] },
    ];
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
            icon: object?.icon || "",
            prefix: object?.prefix || "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('formik.nameRequired')),
        }),
        onSubmit: async (values) => {

            return object ? dispatch(UpdateCustomfield(object._id, values, onCompleted)) : dispatch(CreateCustomfield(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`updated successfully`) : t(`created successfully`))
        onClose()
    }
    return (
        <BaseForm title={object ? "Upgrade Remote Work plan" : "Upgrade Remote Work plan"} formik={formik} onClose={onClose} is_loading={false} >
            <div className='col-span-2'>
                <p className=''>{t("Current plan")} <span className='font-bold'>{t("Premium.")}</span></p>
                <div className='flex gap-4 justify-between mb-6'>
                    {plans.map((plan, i) => (
                        <div key={i} className='w-full grow'>
                            <input
                                type="radio"
                                id={plan.id}
                                name="pricing-plan"
                                value={plan.id}
                                className="hidden"
                                checked={selectedPlan === plan.id}
                                onChange={() => setSelectedPlan(plan.id)}
                            />
                            <label
                                htmlFor={plan.id}
                                className={clsx(
                                    'flex h-full justify-between flex-col gap-4 cursor-pointer p-4 border rounded-lg transition transform hover:scale-105 shadow-sm',
                                    {
                                        'bg-themeSuccessLight/70 text-white': selectedPlan === plan.id,
                                        'bg-themeGrayscale100 hover:bg-white': selectedPlan !== plan.id
                                    }
                                )}
                            >
                                <div>
                                    <p className="mb-0 text-base">{plan.name}</p>
                                    <p className="text-h3 font-bold mb-0">{plan.price}</p>
                                    <p className='mb-0 text-lg'>{plan.users}</p>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    {plan.features.map((ele, i) => (
                                        <div key={i} className='flex gap-2'>
                                            <SuccessTick className={clsx(
                                                {
                                                    'text-white': selectedPlan === plan.id,
                                                    'text-tickCussess': selectedPlan !== plan.id
                                                }
                                            )} />
                                            <span className='text-start block text-xs'>{ele}</span>
                                        </div>
                                    ))}
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
                <div className='zt-card !bg-themeGrayscale100 flex flex-col gap-2'>
                    <span className='block text-start'>{t("Current plan summary:")}</span>
                    <div className='flex flex-col gap-1'>
                        <div className='flex gap-2 items-center'>
                            <span><SuccessTick className={'text-tickCussess'} /></span>
                            <span className='font-bold'>{t('Premium pricing plan')}</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <span><SuccessTick className={'text-tickCussess'} /></span>
                            <span className='font-bold'>{t('Monthly billing period')}</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <span><SuccessTick className={'text-tickCussess'} /></span>
                            <span className='font-bold'>{t('Up to 22 users')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </BaseForm>
    )
}
