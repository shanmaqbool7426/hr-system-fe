import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import { Button, Tabs } from '@/components/elements';
import { Tab } from '@headlessui/react';
import { Minus, Plus, SuccessTick, Tick } from '@/components/svg';
import { useState } from 'react';

export default function CreateMemberForm({ onClose, object }) {
    const { t } = useTranslation()
    const [count, setCount] = useState(22)

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
        <BaseForm title={object ? "Update team members" : "Update team members"} formik={formik} onClose={onClose} is_loading={false} >
            <div className='col-span-2'>
                <p className=''>{t("Currently used")} <span className='font-bold'>{t("22 of 22")}</span> {t(" team members")}</p>
                <Tabs
                    containerClasses={'zt-themeTabsV2 grow'}
                    tabNavClasses={'zt-themeTabNav mx-auto'}
                    tabs={["Monthly", "Annual"]}
                >
                    <Tab.Panels className={`zt-themeTabPanels zt-employeeTabsPanel !bg-transparent !p-0`}>
                        <Tab.Panel className={'zt-themeTabPanel'}>
                            <p><span className='font-extrabold text-themeSuccess'>{t("1 Month")}</span> {t("free with annual plan")}</p>
                            <div className='flex mb-6 justify-between'>
                                <div className='flex gap-3 items-center'>
                                    <span className='font-bold text-h4'>{t("Team members:")}</span>
                                    <div className='flex gap-2'>
                                        <Button onClick={() => { setCount(count - 1) }} className={'btn btn-gray !py-2 !px-4'}><Minus /></Button>
                                        <Button className={'btn btn-success !py-1 !px-8 font-bold !text-h3'}>{count}</Button>
                                        <Button onClick={() => { setCount(count + 1) }} className={'btn btn-gray !py-2 !px-3'}><Plus /></Button>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-end'>
                                    <span className='font-bold'>{t("$201.74 monthly, paid annually")}</span>
                                    <span className='text-end'>{t("$9.17 / user / month")}</span>
                                </div>
                            </div>
                            <div className='zt-card !bg-themeGrayscale100 flex flex-col gap-2'>
                                <span className='block text-start'>{t("Current plan summary:")}</span>
                                <div className='flex flex-col gap-1'>
                                    <div className='flex gap-2 items-center'>
                                        <span><SuccessTick className={'text-tickCussess'}/></span>
                                        <span className='font-bold'>{t('Premium pricing plan')}</span>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <span><SuccessTick className={'text-tickCussess'}/></span>
                                        <span className='font-bold'>{t('Monthly billing period')}</span>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <span><SuccessTick className={'text-tickCussess'}/></span>
                                        <span className='font-bold'>{t('Up to 22 users')}</span>
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel className={'zt-themeTabPanel'}>
                            <p><span className='font-extrabold text-themeSuccess'>{t("1 Month")}</span> {t("free with annual plan")}</p>
                            <div className='flex mb-6 justify-between'>
                                <div className='flex gap-3 items-center'>
                                    <span className='font-bold text-h4'>{t("Team members:")}</span>
                                    <div className='flex gap-2'>
                                        <Button onClick={() => { setCount(count - 1) }} className={'btn btn-gray !py-2 !px-4'}><Minus /></Button>
                                        <Button className={'btn btn-success !py-1 !px-8 font-bold !text-h3'}>{count}</Button>
                                        <Button onClick={() => { setCount(count + 1) }} className={'btn btn-gray !py-2 !px-3'}><Plus /></Button>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-end'>
                                    <span className='font-bold'>{t("$201.74 monthly, paid annually")}</span>
                                    <span className='text-end'>{t("$9.17 / user / month")}</span>
                                </div>
                            </div>
                            <div className='zt-card !bg-themeGrayscale100 flex flex-col gap-2'>
                                <span className='block text-start'>{t("By clicking the Save button, you agree that your DeskTime plan will be upgraded to:")}</span>
                                <div className='flex flex-col gap-1'>
                                    <div className='flex gap-2 items-center'>
                                        <span><SuccessTick className={'text-tickCussess'}/></span>
                                        <span className='font-bold'>{t('Premium pricing plan')}</span>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <span><SuccessTick className={'text-tickCussess'}/></span>
                                        <span className='font-bold'>{t('Annual billing period')}</span>
                                    </div>
                                    <div className='flex gap-2 items-center'>
                                        <span><SuccessTick className={'text-tickCussess'}/></span>
                                        <span className='font-bold'>{t('Up to 22 users')}</span>
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tabs>
            </div>
        </BaseForm>
    )
}
