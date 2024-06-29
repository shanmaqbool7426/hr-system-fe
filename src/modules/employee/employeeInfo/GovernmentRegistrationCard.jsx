import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next'
import { UpdateEmployee } from '@/store/actions/employee.actions';
import { Edit } from '../../../components/svg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Datepicker, DisplayDate, Input } from '@/components/elements';
import Toast from '@/util/toast';

export default function GovernmentRegistrationCard() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const { is_loading, employee_details } = useSelector((state) => state.employee)
    const formik = useFormik({
        initialValues: {
            cnic: employee_details?.cnic || "",
            cnicIssueDate: employee_details?.cnicIssueDate || "",
            cnicExpiryDate: employee_details?.cnicExpiryDate || "",
            passportNumber: employee_details?.passportNumber || "",
            EOBI: employee_details?.EOBI || "",
            SSA: employee_details?.SSA || "",
        },
        validationSchema: Yup.object().shape({
            cnic: Yup.string().required(t('formik.cnicRequired')),
            cnicIssueDate: Yup.string().required(t('formik.cnicIssueDateRequired')),
            cnicExpiryDate: Yup.string().required(t('formik.cnicExpiryDateRequired')),
            passportNumber: Yup.string().required(t('formik.passportNumberRequired')),
            EOBI: Yup.string().required(t('formik.EOBIRequired')),
            SSA: Yup.string().required(t('formik.SSARequired')),
        }),
        onSubmit: values => {
            dispatch(UpdateEmployee(employee_details._id, values, () => {
                setEdit(false)
                Toast.success(t('Government registration details updated successfully'))
            }))
        },
        enableReinitialize: true
    })

    return (
        <div className='zt-employeeCard'>
            <div className='zt--employeeCardHead'>
                <h3>{t('Government Registration')}</h3>
                <span onClick={() => { setEdit(!edit) }} className={'text-themePurple cursor-pointer'}><Edit width={'1.5rem'} height={'auto'} /></span>
            </div>
            {
                !edit && <ul className='zt--employeeCardBody'>
                    <li>
                        <span>{t("Employee CNIC")}</span>
                        <strong>{employee_details?.cnic || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("CNIC Issue Date")}</span>
                        <strong>{employee_details?.cnicIssueDate ? <DisplayDate date={employee_details?.cnicIssueDate} /> : '------'}</strong>
                    </li>
                    <li>
                        <span>{t("CNIC Expiry Date")}</span>
                        <strong>{employee_details?.cnicExpiryDate ? <DisplayDate date={employee_details?.cnicExpiryDate} /> : '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Passport Number")}</span>
                        <strong>{employee_details?.passportNumber || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("EOBI Number")}</span>
                        <strong>{employee_details?.EOBI || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("SSA Number")}</span>
                        <strong>{employee_details?.SSA || '------'}</strong>
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
                            name={'cnic'}
                            label={t('Employee CNIC')}
                            placeholder={t('Employee CNIC')}
                            value={formik.values.cnic}
                            formik={formik}
                            required
                        />
                        <Datepicker
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            name={'cnicIssueDate'}
                            label={t('CNIC Issue Date')}
                            value={formik.values.cnicIssueDate}
                            error={formik.errors.cnicIssueDate}
                            onBlur={formik.handleBlur}
                            onInput={formik.handleBlur}
                            onChange={(value) => {
                                formik.setFieldValue('cnicIssueDate', value)
                            }}
                            required
                        />
                        <Datepicker
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            name={'cnicExpiryDate'}
                            label={t('CNIC Expiry Date')}
                            value={formik.values.cnicExpiryDate}
                            error={formik.errors.cnicExpiryDate}
                            onBlur={formik.handleBlur}
                            onInput={formik.handleBlur}
                            minDate={new Date}
                            onChange={(value) => {
                                formik.setFieldValue('cnicExpiryDate', value)
                            }}
                            required
                        />
                        <Input
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            type={'text'}
                            name={'passportNumber'}
                            label={t('Passport Number')}
                            placeholder={t('Passport Number')}
                            value={formik.values.passportNumber}
                            formik={formik}
                            required
                        />
                        <Input
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            type={'text'}
                            name={'EOBI'}
                            label={t('EOBI Number')}
                            placeholder={t('EOBI Number')}
                            value={formik.values.EOBI}
                            formik={formik}
                            required
                        />
                        <Input
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            type={'text'}
                            name={'SSA'}
                            label={t('SSA Number')}
                            placeholder={t('SSA Number')}
                            value={formik.values.SSA}
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