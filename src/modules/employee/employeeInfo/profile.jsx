import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next'
import { FetchEmployeeDetails, UpdateEmployee } from '@/store/actions/employee.actions';
import { Edit } from '../../../components/svg';
import { FetchEmployees } from '@/store/actions/employee.actions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Datepicker, DisplayDate, Input, Profile, SearchSelect } from '@/components/elements';
import Toast from '@/util/toast';
import { FetchDepartments } from '@/store/actions/department.actions';


export default function EmployeeProfile({ employeeId }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [edit, setEdit] = useState(false)
  const { customfield_list } = useSelector(state => state.customfield);
  const {  departments_list } = useSelector(state => state.department);
  const { is_loading, employee_details , employees_list} = useSelector((state) => state.employee)
  useEffect(()=>{
    dispatch(FetchDepartments())
    dispatch(FetchEmployees())
    if (employeeId) {
      dispatch(FetchEmployeeDetails(employeeId));
    }
  }, [dispatch , employeeId])
  const formik = useFormik({
    initialValues: {
      firstName: employee_details?.firstName || "",
      lastName: employee_details?.lastName || "",
      email: employee_details?.email || "",
      joiningDate: employee_details?.joiningDate || "",
      department: employee_details?.department?._id || "",
      contact: employee_details?.contact || "",
      dateOfBirth: employee_details?.dateOfBirth || "",
      address: employee_details?.address || "",
      designation: employee_details?.designation._id || "",
      lineManager: employee_details?.lineManager._id || "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required(t('formik.firstNameRequired')),
      lastName: Yup.string().required(t('formik.lastNameRequired')),
      joiningDate: Yup.string().required(t('formik.joiningDateRequired')),
      contact: Yup.string().required(t('formik.contactRequired')),
      dateOfBirth: Yup.string().required(t('formik.dateOfBirthRequired')),
      address: Yup.string().required(t('formik.addressRequired'))
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
    <>
      <span onClick={() => { setEdit(!edit) }} className={'text-themePurple cursor-pointer absolute top-5 right-5 z-10'}><Edit width={'1.5rem'} height={'auto'} /></span>
      {edit ? <form className='col-span-2' onSubmit={event => { event.preventDefault(); formik.handleSubmit() }}>
        <fieldset className='grid grid-cols-2'>
          <div className='px-4 border-r border-dashed border-themeGrayscale600 flex flex-col gap-4'>
            <SearchSelect
              containerClass={'zt-formGroupV2'}
              className={' gap-4'}
              type={'text'}
              name={'designation'}
              label={t('Designation')}
              placeholder={t('Designation')}
              value={formik.values.designation}
              formik={formik}
              list= {customfield_list.filter(item => item.type === 'designation').map(item => ({
                value: item._id,
                display: item.name
            }))}
            onChange={(value) => {
              formik.setFieldValue('designation', value)
            }}
              required
            />
            <SearchSelect
              containerClass={'zt-formGroupV2'}
              className={' gap-4'}
              name={'department'}
              label={t('Department')}
              value={formik.values.department}
              list= {departments_list?.map((item) => ({
                value: item?._id,
                display: item.name,
              }))}
              onBlur={() => {
                formik.setFieldTouched('department', true)
              }} 
              onChange={(value) => {
                formik.setFieldValue('department', value)
              }}
              required
            />
            <Datepicker
              containerClass={'zt-formGroupV2'}
              className={' gap-4'}
              name={'joiningDate'}
              label={t('Joining Date')}
              placeholder={t('Joining Date')}
              value={formik.values.joiningDate}
              onBlur={() => {
                formik.setFieldTouched('joiningDate', true)
              }}
              onChange={(value) => {
                formik.setFieldValue('joiningDate', value)
              }}
              required
            /> 
              <SearchSelect
              containerClass={'zt-formGroupV2'}
              className={' gap-4'}
              name={'lineManager'}
              label={t('Line Manager')}
              value={formik.values.lineManager}
              list= {employees_list?.map((item) => ({
                value: item?._id,
                display: item.firstName + " " + item.lastName,
              }))}
              onBlur={() => {
                formik.setFieldTouched('lineManager', true)
              }} 
              onChange={(value) => {
                formik.setFieldValue('lineManager', value)
              }}
              multiple ={false}
              required
            />
          </div>
          <div className='px-4 border-l border-dashed border-themeGrayscale600 flex flex-col gap-4'>
            <Input
              containerClass={'zt-formGroupV2'}
              className={' gap-4'}
              type={'text'}
              name={'email'}
              label={t('Email')}
              placeholder={t('Email')}
              value={formik.values.email}
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
            <Datepicker
              containerClass={'zt-formGroupV2'}
              className={' gap-4'}
              name={'dateOfBirth'}
              label={t('Date of Birth')}
              placeholder={t('Date of Birth')}
              value={formik.values.dateOfBirth}
              onBlur={() => {
                formik.setFieldTouched('dateOfBirth', true)
              }}
              onChange={(value) => {
                formik.setFieldValue('dateOfBirth', value)
              }}
              required
            />
            <Input
              containerClass={'zt-formGroupV2'}
              className={' gap-4'}
              type={'text'}
              name={'address'}
              label={t('Address')}
              placeholder={t('Address')}
              value={formik.values.address}
              formik={formik}
              required
            />

          </div>
        </fieldset>
        <div className="zt-btns !p-0 !pt-4 justify-end">
          <Button type="button" value={t("Cancel")} variant={'dark-outline'} className={'min-w-40'} onClick={() => { formik.resetForm(); setEdit(!edit) }} />
          <Button type="submit" value={t("Save")} variant={'dark'} className={'min-w-40'} is_loading={is_loading} disabled={is_loading || !formik.isValid} />
        </div>
      </form> : <>
        <div className='px-4 border-r border-dashed border-themeGrayscale600'>
          <Profile image={employee_details?.avatar}
            width={96}
            height={96}
            nameClass={`w-24 h-24 text-3xl`}
            name={employee_details?.firstName}
            lastName={employee_details?.lastName}
          />

          <div className='flex flex-col'>
            <h2 className='mb-0 text-h5'>{employee_details?.firstName + " " + employee_details?.lastName}</h2>
            <p className='flex-col !items-start'> 
              <span>{employee_details?.department?.name}</span>
              <strong className='text-themePurple'>{employee_details?.designation?.name}</strong>
            </p>
            <ul>
              <li>
                <span>{t('Employee ID')}</span>
                <strong>{t(employee_details?.employeeCode)}</strong>
              </li>
              {employee_details?.department && <li >
                <span>{t('Department')}</span>
                <strong>{employee_details?.department?.name}</strong>
              </li>}
              <li>
                <p className='gap-4 mb-0'>
                  <span>{t('Joining Date')}</span>
                  <DisplayDate date={employee_details?.joiningDate} />
                </p>
              </li>
              <li>
                <span>{t('Line Manager')}</span>
                <strong className='text-themePurple'>{employee_details?.lineManager ? `${employee_details?.lineManager?.firstName} ${employee_details?.lineManager?.lastName}` : '-------'}</strong>
              </li>
            </ul>
            {employee_details?.status && <p className='mb-0'><span className='zt-tag zt-tag-purple capitalize'>{employee_details?.status?.name}</span></p>}
          </div>
        </div>
        <div className='px-4 border-l border-dashed border-themeGrayscale600'>
          <ul>
            <li>
              <span>Email</span>
              <a className='text-sm text-themePurple' href='mailto:lincoln@gmail.com'>{employee_details?.email}</a>
            </li>
            <li>
              <span>{t('Contact Number')}</span>
              <strong className='text-themePurple'>{employee_details?.contact}</strong>
            </li>
            <li>
              <span>{t('Date of Birth')}</span>
              <DisplayDate date={employee_details?.dateOfBirth} className='text-themePurple' />
            </li>
            <li>
              <span>{t('Address')}</span>
              <address>{employee_details?.address || '-------'}</address>
            </li>
            <li>
              <span>{t('Designation')}</span>
              <strong>{employee_details?.designation?.name || '-------'}</strong>
            </li>
          </ul>
        </div>
      </>}
    </>
  )
}