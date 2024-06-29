import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next'
import { UpdateEmployee } from '@/store/actions/employee.actions';
import { Edit } from '../../../components/svg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '@/components/elements';
import Toast from '@/util/toast';

export default function BankInfoCard() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const { is_loading, employee_details } = useSelector((state) => state.employee)
    const formik = useFormik({
        initialValues: {
            accountNumber: employee_details?.bankDetails?.accountNumber || "",
            IBAN: employee_details?.bankDetails?.IBAN || "",
            accountTitle: employee_details?.bankDetails?.accountTitle || "",
            bankName: employee_details?.bankDetails?.bankName || "",
            branch: employee_details?.bankDetails?.branch || "",
            branchCode: employee_details?.bankDetails?.branchCode || "",
        },
        validationSchema: Yup.object().shape({
            accountNumber: Yup.string().required(t('formik.accountNumberRequired')),
            IBAN: Yup.string().required(t('formik.IBANRequired')),
            accountTitle: Yup.string().required(t('formik.accountTitleRequired')),
            bankName: Yup.string().required(t('formik.bankNameRequired')),
            branch: Yup.string().required(t('formik.branchRequired')),
            branchCode: Yup.string().required(t('formik.branchCodeRequired')),
        }),
        onSubmit: values => {
            dispatch(UpdateEmployee(employee_details._id, { bankDetails: { ...values } }, () => {
                setEdit(false)
                Toast.success(t('Bank details updated successfully'))
            }))
        },
        enableReinitialize: true
    })

    return (
        <div className='zt-employeeCard'>
            <div className='zt--employeeCardHead'>
                <h3>{t('Bank Information')}</h3>
                <span onClick={() => { setEdit(!edit) }} className={'text-themePurple cursor-pointer'}><Edit width={'1.5rem'} height={'auto'} /></span>
            </div>
            {
                !edit && <ul className='zt--employeeCardBody'>
                    <li>
                        <span>{t("Account Number")}</span>
                        <strong>{employee_details?.bankDetails?.accountNumber || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("IBAN")}</span>
                        <strong>{employee_details?.bankDetails?.IBAN || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Account Title")}</span>
                        <strong>{employee_details?.bankDetails?.accountTitle || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Bank Name")}</span>
                        <strong>{employee_details?.bankDetails?.bankName || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Branch")}</span>
                        <strong>{employee_details?.bankDetails?.branch || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Branch Code")}</span>
                        <strong>{employee_details?.bankDetails?.branchCode || '------'}</strong>
                    </li>
                </ul>
            }

            {
                edit && <form onSubmit={event => { event.preventDefault(); formik.handleSubmit() }}>
                    <fieldset className='flex flex-col gap-4'>
                        <Input
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            type={'text'}
                            name={'accountNumber'}
                            label={t('Account Number')}
                            placeholder={t('Account Number')}
                            value={formik.values.accountNumber}
                            formik={formik}
                            required
                        />
                        <Input
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            type={'text'}
                            name={'IBAN'}
                            label={t('IBAN')}
                            placeholder={t('IBAN')}
                            value={formik.values.IBAN}
                            formik={formik}
                            required
                        />
                        <Input
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            type={'text'}
                            name={'accountTitle'}
                            label={t('Account Title')}
                            placeholder={t('Account Title')}
                            value={formik.values.accountTitle}
                            formik={formik}
                            required
                        />
                        <Input
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            type={'text'}
                            name={'bankName'}
                            label={t('Bank Name')}
                            placeholder={t('Bank Name')}
                            value={formik.values.bankName}
                            formik={formik}
                            required
                        />
                        <Input
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            type={'text'}
                            name={'branch'}
                            label={t('Branch')}
                            placeholder={t('Branch')}
                            value={formik.values.branch}
                            formik={formik}
                            required
                        />
                        <Input
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            type={'text'}
                            name={'branchCode'}
                            label={t('Branch Code')}
                            placeholder={t('Branch Code')}
                            value={formik.values.branchCode}
                            formik={formik}
                            required
                        />


                        <div className="zt-btns !p-0 !pt-4 justify-end">
                            <Button type="button" value={t("Cancel")} variant={'dark-outline'} className={'min-w-40'}
                                onClick={() => { formik.resetForm(); setEdit(!edit) }} />
                            <Button type="submit" value={t("Save")} variant={'dark'} className={'min-w-40'}
                                is_loading={is_loading} disabled={is_loading || !formik.isValid}
                            />
                        </div>
                    </fieldset>
                </form>
            }
        </div>
    )
}