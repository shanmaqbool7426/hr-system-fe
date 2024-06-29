import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next'
import { UpdateEmployee } from '@/store/actions/employee.actions';
import { Edit } from '../../../components/svg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, SearchSelect } from '@/components/elements';
import Toast from '@/util/toast';

export default function PersonalInfoCard() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const { is_loading, employee_details } = useSelector((state) => state.employee)
    const { customfield_list } = useSelector(state => state.customfield)
    const formik = useFormik({
        initialValues: {
            cnic: employee_details?.cnic || "",
            fatherName: employee_details?.fatherName || "",
            fatherCnic: employee_details?.fatherCnic || "",
            passportNumber: employee_details?.passportNumber || "",
            gender: employee_details?.gender ? employee_details?.gender?._id : "",
            maritalStatus: employee_details?.maritalStatus?._id || "",
            nationality: employee_details?.nationality || "",
            religion: employee_details?.religion || "",
        },
        validationSchema: Yup.object().shape({
            cnic: Yup.string().required(t('formik.cnicRequired')),
            fatherName: Yup.string().required(t('formik.fatherNameRequired')),
            fatherCnic: Yup.string().required(t('formik.fatherCnicRequired')),
            passportNumber: Yup.string().required(t('formik.passportNumberRequired')),
            gender: Yup.string().required(t('formik.genderRequired')),
            maritalStatus: Yup.string().required(t('formik.maritalStatusRequired')),
            nationality: Yup.string().required(t('formik.nationalityRequired')),
            religion: Yup.string().required(t('formik.religionRequired'))
        }),
        onSubmit: values => {
            dispatch(UpdateEmployee(employee_details._id, values, () => {
                setEdit(false)
                Toast.success(t('Employee information updated successfully'))
            }))
        },
        enableReinitialize: true
    })

    return (
        <div className='zt-employeeCard'>
            <div className='zt--employeeCardHead'>
                <h3>{t('Personal Info')}</h3>
                <span onClick={() => { setEdit(!edit) }} className={'text-themePurple cursor-pointer'}><Edit width={'1.5rem'} height={'auto'} /></span>
            </div>
            {
                !edit && <ul className='zt--employeeCardBody'>
                    <li>
                        <span>{t("Employee CNIC")}</span>
                        <strong>{employee_details?.cnic || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Father Name")}</span>
                        <strong>{employee_details?.fatherName || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Father CNIC")}</span>
                        <strong>{employee_details?.fatherCnic || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Gender")}</span>
                        <strong>{employee_details?.gender?.name || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Martial Status")}</span>
                        <strong>{employee_details?.maritalStatus?.name || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Nationality")}</span>
                        <strong>{employee_details?.nationality || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Passport Number")}</span>
                        <strong>{employee_details?.passportNumber || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Religion")}</span>
                        <strong>{employee_details?.religion || '------'}</strong>
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
                        <Input
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            type={'text'}
                            name={'fatherName'}
                            label={t('Father Name')}
                            placeholder={t('Father Name')}
                            value={formik.values.fatherName}
                            formik={formik}
                            required
                        />
                        <Input
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            type={'text'}
                            name={'fatherCnic'}
                            label={t('Father CNIC')}
                            placeholder={t('Father CNIC')}
                            value={formik.values.fatherCnic}
                            formik={formik}
                            required
                        />
                        <SearchSelect
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            name={'gender'}
                            label={t('Gender')}
                            value={formik.values.gender}
                            list={customfield_list.filter(item => item.type === 'gender').map(item => {
                                return { value: item._id, display: item.name }
                            })}
                            error={formik.touched.gender && formik.errors.gender}
                            onBlur={() => {
                                formik.setFieldTouched('gender', true)
                            }}
                            onInput={formik.handleBlur}
                            onChange={(value) => {
                                formik.setFieldValue('gender', value)
                            }}
                            required
                        />
                        <SearchSelect
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            name={'maritalStatus'}
                            label={t('Martial Status')}
                            value={formik.values.maritalStatus}
                            list={customfield_list.filter(item => item.type === 'marital_status').map(item => {
                                return { value: item._id, display: item.name }
                            })}
                            error={formik.touched.maritalStatus && formik.errors.maritalStatus}
                            onBlur={() => {
                                formik.setFieldTouched('maritalStatus', true)
                            }}
                            onInput={formik.handleBlur}
                            onChange={(value) => {
                                formik.setFieldValue('maritalStatus', value)
                            }}
                            required
                        />
                        <Input
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            type={'text'}
                            name={'nationality'}
                            label={t('Nationality')}
                            placeholder={t('Nationality')}
                            value={formik.values.nationality}
                            formik={formik}
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
                            name={'religion'}
                            label={t('Religion')}
                            placeholder={t('Religion')}
                            value={formik.values.religion}
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