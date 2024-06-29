import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next'
import { UpdateEmployee } from '@/store/actions/employee.actions';
import { Edit } from '../../../components/svg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '@/components/elements';
import Toast from '@/util/toast';

export default function Reference2Card() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const { is_loading, employee_details } = useSelector((state) => state.employee)
    const formik = useFormik({
        initialValues: {
            fullname: employee_details?.reference2?.fullname || "",
            position: employee_details?.reference2?.position || "",
            contact: employee_details?.reference2?.contact || "",
            cnic: employee_details?.reference2?.cnic || "",
            organization: employee_details?.reference2?.organization || "",
            workContact: employee_details?.reference2?.workContact || "",
        },
        validationSchema: Yup.object().shape({
            fullname: Yup.string().required(t('formik.fullnameRequired')),
            position: Yup.string().required(t('formik.positionRequired')),
            contact: Yup.string().required(t('formik.contactRequired')),
            organization: Yup.string().required(t('formik.organizationRequired')),
            cnic: Yup.string().optional(),
            workContact: Yup.string().optional(),
        }),
        onSubmit: values => {
            dispatch(UpdateEmployee(employee_details._id, { reference2: { ...values } }, () => {
                setEdit(false)
                Toast.success(t('Reference updated successfully'))
            }))
        },
        enableReinitialize: true
    })

    return (
        <div className='zt-employeeCard'>
            <div className='zt--employeeCardHead'>
                <h3>{t('Reference 2')}</h3>
                <span onClick={() => { setEdit(!edit) }} className={'text-themePurple cursor-pointer'}><Edit width={'1.5rem'} height={'auto'} /></span>
            </div>
            {
                !edit && <ul className='zt--employeeCardBody'>
                    <li>
                        <span>{t("Full Name")}</span>
                        <strong>{employee_details?.reference2?.fullname || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Position")}</span>
                        <strong>{employee_details?.reference2?.position || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Contanct Number")}</span>
                        <strong>{employee_details?.reference2?.contact || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("CNIC")}</span>
                        <strong>{employee_details?.reference2?.cnic || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Organization")}</span>
                        <strong>{employee_details?.reference2?.organization || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Work Contact Number")}</span>
                        <strong>{employee_details?.reference2?.workContact || '------'}</strong>
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
                            name={'fullname'}
                            label={t('Full Name')}
                            placeholder={t('Full Name')}
                            value={formik.values.fullname}
                            formik={formik}
                            required
                        />
                        <Input
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            type={'text'}
                            name={'position'}
                            label={t('Position')}
                            placeholder={t('Position')}
                            value={formik.values.position}
                            formik={formik}
                            required
                        />
                        <Input
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            type={'text'}
                            name={'contact'}
                            label={t('Contact Number')}
                            placeholder={t('Contact Number')}
                            value={formik.values.contact}
                            formik={formik}
                            required
                        />
                        <Input
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            type={'text'}
                            name={'cnic'}
                            label={t('CNIC')}
                            placeholder={t('CNIC')}
                            value={formik.values.cnic}
                            formik={formik}
                        />
                        <Input
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            type={'text'}
                            name={'organization'}
                            label={t('Organization')}
                            placeholder={t('Organization')}
                            value={formik.values.organization}
                            formik={formik}
                            required
                        />
                        <Input
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            type={'text'}
                            name={'workContact'}
                            label={t('Work Contact Number')}
                            placeholder={t('Work Contact Number')}
                            value={formik.values.workContact}
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