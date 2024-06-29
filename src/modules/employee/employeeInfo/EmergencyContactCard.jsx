import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next'
import { UpdateEmployee } from '@/store/actions/employee.actions';
import { Edit } from '../../../components/svg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '@/components/elements';
import Toast from '@/util/toast';

export default function EmergencyContactCard() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const { is_loading, employee_details } = useSelector((state) => state.employee)
    const formik = useFormik({
        initialValues: {
            fullname: employee_details?.emergencyContact?.fullname || "",
            relation: employee_details?.emergencyContact?.relation || "",
            contact1: employee_details?.emergencyContact?.contact1 || "",
            contact2: employee_details?.emergencyContact?.contact2 || "",
        },
        validationSchema: Yup.object().shape({
            fullname: Yup.string().required(t('formik.fullnameRequired')),
            relation: Yup.string().required(t('formik.relationRequired')),
            contact1: Yup.string().required(t('formik.contact1Required')),
            contact2: Yup.string().optional(),
        }),
        onSubmit: values => {
            dispatch(UpdateEmployee(employee_details._id, { emergencyContact: { ...values } }, () => {
                setEdit(false)
                Toast.success(t('Emergency contact updated successfully'))
            }))
        },
        enableReinitialize: true
    })

    return (
        <div className='zt-employeeCard'>
            <div className='zt--employeeCardHead'>
                <h3>{t('Emergency Contact')}</h3>
                <span onClick={() => { setEdit(!edit) }} className={'text-themePurple cursor-pointer'}><Edit width={'1.5rem'} height={'auto'} /></span>
            </div>
            {
                !edit && <ul className='zt--employeeCardBody'>
                    <li>
                        <span>{t("Full Name")}</span>
                        <strong>{employee_details?.emergencyContact?.fullname || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Relation")}</span>
                        <strong>{employee_details?.emergencyContact?.relation || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Contact Number 1")}</span>
                        <strong>{employee_details?.emergencyContact?.contact1 || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Contact Number 2")}</span>
                        <strong>{employee_details?.emergencyContact?.contact2 || '------'}</strong>
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
                            name={'relation'}
                            label={t('Relation')}
                            placeholder={t('Relation')}
                            value={formik.values.relation}
                            formik={formik}
                            required
                        />
                        <Input
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            type={'text'}
                            name={'contact1'}
                            label={t('Contact Number 1')}
                            placeholder={t('Contact Number 1')}
                            value={formik.values.contact1}
                            formik={formik}
                            required
                        />
                        <Input
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            type={'text'}
                            name={'contact2'}
                            label={t('Contact Number 2')}
                            placeholder={t('Contact Number 2')}
                            value={formik.values.contact2}
                            formik={formik}
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