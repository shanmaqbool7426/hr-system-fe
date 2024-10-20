import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next'
import { FetchEmployeeDetails, UpdateEmployee } from '@/store/actions/employee.actions';
import { Edit } from '../../../components/svg';
import { FetchEmployees } from '@/store/actions/employee.actions';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Datepicker, DetailPanel, DisplayDate, FileUpload, Input, Profile, SearchSelect } from '@/components/elements';
import Toast from '@/util/toast';
import { FetchDepartments } from '@/store/actions/department.actions';
import BaseForm from '@/components/forms/BaseForm';
import Image from 'next/image';
import Storage from '@/util/storage';


export default function EmployeeProfile({ employeeId }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [edit, setEdit] = useState(false)
  const [editProfile, setEditProfile] = useState(false)
  const [loading, setLoading] = useState(false)
  const { customfield_list } = useSelector(state => state.customfield);
  const { departments_list } = useSelector(state => state.department);
  const { auth_user } = useSelector((state) => state.auth)
  const { is_loading, employee_details, employees_list } = useSelector((state) => state.employee)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  useEffect(() => {
    if (employeeId) {
      dispatch(FetchEmployeeDetails(employeeId));
    }
    dispatch(FetchEmployees())
    dispatch(FetchDepartments())
  }, [dispatch, employeeId])
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
      designation: employee_details?.designation?._id || "",
      lineManager: employee_details?.lineManager?._id || "",
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
      {!edit && <span onClick={() => { setEdit(!edit) }} className={'text-themePurple cursor-pointer absolute top-5 right-5 z-10'}><Edit width={'1.5rem'} height={'auto'} /></span>}
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
              list={customfield_list.filter(item => item.type === 'designation').map(item => ({
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
              list={departments_list?.map((item) => ({
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
              list={employees_list?.map((item) => ({
                value: item?._id,
                display: item.firstName + " " + item.lastName,
              }))}
              onBlur={() => {
                formik.setFieldTouched('lineManager', true)
              }}
              onChange={(value) => {
                formik.setFieldValue('lineManager', value)
              }}
              multiple={false}
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
          <Profile
            className={'w-24 h-24'}
            nameClass={'text-3xl'}
            image={employee_details?.avatar}
            name={employee_details?.firstName}
            lastName={employee_details?.lastName}
            edit={true}
            action={() => { setEditProfile(true) }}
          />
          <div className='flex flex-col w-full'>
            <h2 className='text-h5'>{employee_details?.firstName + " " + employee_details?.lastName}</h2>
            <ul>
              <li>
                <span>{t('Employee ID')}</span>
                <strong>{t(employee_details?.employeeCode)}</strong>
              </li>
              {employee_details?.department && <li >
                <span>{t('Department')}</span>
                <strong>{employee_details?.department?.name || '-------'}</strong>
              </li>}
              <li>
                <span>{t('Joining Date')}</span>
                {employee_details?.joiningDate ? <DisplayDate date={employee_details?.joiningDate} /> : '-------'}
              </li>
              <li>
                <span>{t('Line Manager')}</span>
                <strong className=''>{employee_details?.lineManager ? `${employee_details?.lineManager?.firstName} ${employee_details?.lineManager?.lastName}` : '-------'}</strong>
              </li>
            </ul>
            {employee_details?.status && <p className='mb-0'><span className='zt-tag zt-tag-purple capitalize'>{employee_details?.status?.name}</span></p>}
          </div>
        </div>
        <div className='flex flex-col px-4 border-l border-dashed border-themeGrayscale600 w-full'>
          <ul>
            <li>
              <span>Email</span>
              <a className='text-sm' href={`mailto:${employee_details?.email}`}>{employee_details?.email || '-------'}</a>
            </li>
            <li>
              <span>{t('Contact Number')}</span>
              <strong className=''>{employee_details?.contact || '-------'}</strong>
            </li>
            <li>
              <span>{t('Date of Birth')}</span>
              {employee_details?.dateOfBirth ? <DisplayDate date={employee_details?.dateOfBirth} className='text-themePurple' /> : '-------'}
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
      {editProfile && <DetailPanel>
        <h5 className='text-h5'>{t('Upload Profile Picture')}</h5>
        {preview && <figure className='w-24 h-24'>
          <Image src={preview} alt="profile picture" width={96} height={96} />
        </figure>}
        <FileUpload
          label={t('Upload Profile Picture')}
          onChange={(file) => {
            if (file) {
              setFile(file)
              const reader = new FileReader();
              reader.onload = (e) => setPreview(e.target.result);
              reader.readAsDataURL(file);
            } else {
              setPreview(null)
              setFile(null)
            }
          }}
          accept={'image/*'}
        />
        <div className='flex gap-4'>
          <Button value={t('Cancel')} variant={'dark-outline'} onClick={() => { setEditProfile(false) }} />
          <Button value={t('Save')} variant={'primary'} is_loading={loading} disabled={!file} onClick={async () => {
            try {
              setLoading(true)
              const { url } = await Storage.upload(file, auth_user.company._id)
              dispatch(UpdateEmployee(employee_details._id, { avatar: url }, () => {
                setEditProfile(false)
                setLoading(false)
                Toast.success(t('Profile picture updated successfully'))
              }))
            } finally {
              setLoading(false)
            }
          }} />
        </div>
      </DetailPanel>}
    </>
  )
}
