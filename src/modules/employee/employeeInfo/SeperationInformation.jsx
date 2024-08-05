import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next'
import { UpdateEmployee } from '@/store/actions/employee.actions';
import { Edit } from '../../../components/svg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Datepicker, DisplayDate, Input } from '@/components/elements';
import Toast from '@/util/toast';

export default function SeperationCard() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const { is_loading, employee_details } = useSelector((state) => state.employee)
    const formik = useFormik({
        initialValues: {
            lastWorkingDate: employee_details?.lastWorkingDate || "",
            resignDate: employee_details?.resignDate || "",
        },
        validationSchema: Yup.object().shape({
            lastWorkingDate: Yup.string().required(t('formik.lastWorkingDateRequired')),
            resignDate: Yup.string().required(t('formik.resignDateRequired')),
        }),
        onSubmit: values => {
            dispatch(UpdateEmployee(employee_details._id, values , () => {
                setEdit(false)
                Toast.success(t('Appointment details updated successfully'))
            }))
        },
        enableReinitialize: true
    })

    return (
        <div className='zt-employeeCard'>
            <div className='zt--employeeCardHead'>
                <h3>{t('Seperation Information')}</h3>
                <span onClick={() => { setEdit(!edit) }} className={'text-themePurple cursor-pointer'}><Edit width={'1.5rem'} height={'auto'} /></span>
            </div>
            {
                !edit && <ul className='zt--employeeCardBody flex flex-col !gap-y-4 !gap-x-16'>
                    <li>
                        <span>{t("Resign Date")}</span>
                        <strong>{employee_details?.resignDate ? <DisplayDate date={employee_details?.resignDate} /> : '-------' }</strong>
                    </li>
                    <li>
                        <span>{t("Last Working Date")}</span>
                        <strong>{employee_details?.lastWorkingDate ? <DisplayDate date={employee_details?.lastWorkingDate} /> : '-------' }</strong>
                    </li>
                </ul>
            }
            {
                edit && <form onSubmit={event => { event.preventDefault(); formik.handleSubmit() }}>
                    <fieldset className='flex flex-col gap-y-4 gap-x-16'>
                    <Datepicker
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            name={'resignDate'}
                            label={t('Joining Date')}
                            value={formik.values.resignDate}
                            error={formik.errors.resignDate}
                            onBlur={formik.handleBlur}
                            onInput={formik.handleBlur}
                            onChange={(value) => {
                                formik.setFieldValue('resignDate', value)
                            }}
                            required
                        />
                         <Datepicker
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            name={'lastWorkingDate'}
                            label={t('Confirmation Date')}
                            value={formik.values.lastWorkingDate}
                            error={formik.errors.lastWorkingDate}
                            onBlur={formik.handleBlur}
                            onInput={formik.handleBlur}
                            onChange={(value) => {
                                formik.setFieldValue('lastWorkingDate', value)
                            }}
                            required
                        />
                        <div className="zt-btns !p-0 !pt-4 justify-end col-span-2">
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