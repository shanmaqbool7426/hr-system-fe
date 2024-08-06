import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next'
import { UpdateEmployee } from '@/store/actions/employee.actions';
import { Edit } from '../../../components/svg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, SearchSelect, ToggleCheck } from '@/components/elements';

export default function CompanyInfoCard() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const { is_loading, employee_details } = useSelector((state) => state.employee)
    const { customfield_list } = useSelector(state => state.customfield)
    const formik = useFormik({
        initialValues: {
            station: employee_details?.station?._id || "",
            grade: employee_details?.grade?._id || "",
            mobileAttendance: employee_details?.mobileAttendance || false,
            webAttendance: employee_details?.webAttendance || false,
        },
        validationSchema: Yup.object().shape({

        }),
        onSubmit: values => {
            dispatch(UpdateEmployee(employee_details._id, values, () => {
                setEdit(false)
            }))
        },
        enableReinitialize: true
    })

    return (
        <div className='zt-employeeCard'>
            <div className='zt--employeeCardHead'>
                <h3>{t('Company Information')}</h3>
                <span onClick={() => { setEdit(!edit) }} className={'text-themePurple cursor-pointer'}><Edit width={'1.5rem'} height={'auto'} /></span>
            </div>
            {
                !edit && <ul className='zt--employeeCardBody'>
                    <li>
                        <span>{t("Grade")}</span>
                        <strong>{employee_details?.grade?.name || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Station")}</span>
                        <strong>{employee_details?.station?.name || '------'}</strong>
                    </li>
                    <li>
                        <span>{t("Allow attendance from mobile")}</span>
                        <strong>{employee_details?.mobileAttendance ? t('Yes') : t('No')}</strong>
                    </li>
                    <li>
                        <span>{t("Allow attendance from web")}</span>
                        <strong>{employee_details?.webAttendance ? t('Yes') : t('No')}</strong>
                    </li>
                </ul>
            }
            {
                edit && <form onSubmit={event => { event.preventDefault(); formik.handleSubmit() }}>
                    <fieldset className='flex flex-col gap-4'>
                        <SearchSelect
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            name={'grade'}
                            label={t('Grade')}
                            value={formik.values.grade}
                            list={customfield_list.filter(item => item.type === 'grade').map(item => {
                                return { value: item._id, display: item.name }
                            })}
                            error={formik.touched.grade && formik.errors.grade}
                            onBlur={() => {
                                formik.setFieldTouched('grade', true)
                            }}
                            onChange={(value) => {
                                formik.setFieldValue('grade', value)
                            }}
                        />
                         <SearchSelect
                            containerClass={'zt-formGroupV2'}
                            className={' gap-4'}
                            name={'station'}
                            label={t('Station')}
                            value={formik.values.station}
                            list={customfield_list.filter(item => item.type === 'station').map(item => {
                                return { value: item._id, display: item.name }
                            })}
                            error={formik.touched.station && formik.errors.station}
                            onBlur={() => {
                                formik.setFieldTouched('station', true)
                            }}
                            onChange={(value) => {
                                formik.setFieldValue('station', value)
                            }}
                        />
                        <ToggleCheck id="mobileAttendance"
                            variant={'dark'}
                            name="mobileAttendance"
                            label={t('Allow attendance from mobile')}
                            checked={formik.values.mobileAttendance}
                            onChange={(event) => {
                                formik.setFieldValue('mobileAttendance', event.target.checked)
                            }}
                        />
                        <ToggleCheck id="webAttendance"
                            variant={'dark'}
                            name="webAttendance"
                            label={t('Allow attendance from web')}
                            checked={formik.values.webAttendance}
                            onChange={(event) => {
                                formik.setFieldValue('webAttendance', event.target.checked)
                            }}
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