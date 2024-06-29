import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next'
import { UpdateEmployee } from '@/store/actions/employee.actions';
import { Edit } from '../../../components/svg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '@/components/elements';
import Toast from '@/util/toast';

export default function NextOfKinCard() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const { is_loading, employee_details } = useSelector((state) => state.employee)
    const formik = useFormik({
        initialValues: {
            fullname: employee_details?.nextOfKin?.fullname || "",
            relation: employee_details?.nextOfKin?.relation || "",
            contact: employee_details?.nextOfKin?.contact || "",
            cnic: employee_details?.nextOfKin?.cnic || "",
        },
        validationSchema: Yup.object().shape({
            fullname: Yup.string().required(t('formik.fullnameRequired')),
            relation: Yup.string().required(t('formik.relationRequired')),
            contact: Yup.string().required(t('formik.contactRequired')),
            cnic: Yup.string().required(t('formik.cnicRequired')),
        }),
        onSubmit: values => {
            dispatch(UpdateEmployee(employee_details._id, { nextOfKin: { ...values } }, () => {
                setEdit(false)
                Toast.success(t('Next of kin updated successfully'))
            }))
        },
        enableReinitialize: true
    })

    return (
        <div className='zt-employeeCard'>
            <div className='zt--employeeCardHead'>
                <h3>{t('Next Of Kin')}</h3>
                <span onClick={() => { setEdit(!edit) }} className={'text-themePurple cursor-pointer'}><Edit width={'1.5rem'} height={'auto'} /></span>
            </div>
            {
                !edit && <ul className='zt--employeeCardBody'>
                    <li>
                        <span>{t("Full Name")}</span>
                        <strong>{employee_details?.nextOfKin?.fullname || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Relation")}</span>
                        <strong>{employee_details?.nextOfKin?.relation || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("CNIC")}</span>
                        <strong>{employee_details?.nextOfKin?.cnic || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Contact Number")}</span>
                        <strong>{employee_details?.nextOfKin?.contact || '------'}</strong>
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
                            name={'cnic'}
                            label={t('CNIC')}
                            placeholder={t('CNIC')}
                            value={formik.values.cnic}
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