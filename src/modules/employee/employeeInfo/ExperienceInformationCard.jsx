import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next'
import { Edit, Plus, Trash } from '../../../components/svg';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Button, Datepicker, DisplayDate, Input } from '@/components/elements';
import Toast from '@/util/toast';
import { CreateJobExperience, DeleteJobExperience, UpdateJobExperience } from '@/store/actions/employee-job-experience.actions';

export default function ExperienceInformationCard() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [add, setAdd] = useState(false)
  const [edit, setEdit] = useState(null)
  const { is_loading, employee_details } = useSelector((state) => state.employee)
  const formik = useFormik({
    initialValues: {
      company: edit?.organization || "",
      location: edit?.location || "",
      designation: edit?.designation || "",
      startDate: edit?.startDate || "",
      endDate: edit?.endDate || "",
    },
    validationSchema: Yup.object().shape({
      company: Yup.string().required(t('formik.companyRequired')),
      designation: Yup.string().required(t('formik.designationRequired')),
      location: Yup.string().required(t('formik.locationRequired')),
      startDate: Yup.date().required(t('formik.startDateRequired')),
      endDate: Yup.date().required(t('formik.endDateRequired')),
    }),
    onSubmit: values => {
      const onSuccess = () => {
        formik.resetForm()
        setAdd(false)
        setEdit(false)
        Toast.success(edit ? t('Expirence record updated successfully') : t('Expirence record added successfully'))
      }
      if (edit) {
        dispatch(UpdateJobExperience(edit._id, { user: employee_details._id, ...values }, onSuccess))
      } else {
        dispatch(CreateJobExperience({ user: employee_details._id, ...values }, onSuccess))
      }

    },
    enableReinitialize: true
  })

  const submitHandler = (event) => {
    event.preventDefault()
    formik.handleSubmit()
  }
  const editHandler = (item) => {
    setEdit({ ...item })
    setAdd(true)
  }
  const deleteHandler = (id) => {
    Toast.confirmDelete(() => {
      dispatch(DeleteJobExperience(id, () => {
        Toast.success(t('Expirence record removed successfully'))
      }))
    }, t)
  }
  return (
    <div className='zt-employeeCardTimeLine'>
      <div className='zt--employeeCardHead'>
        <h3>{t('Experience Information')}</h3>
        <Plus className={'text-themePurple cursor-pointer'} onClick={() => setAdd(!add)} />
      </div>
      {!add && !employee_details?.jobExperiences?.length && <p className='text-lg h-full flex items-center justify-center'>{t('No Data')}</p>}
      {!add && employee_details?.jobExperiences?.length > 0 &&
        <ul className='zt--employeeCardBody'>
          {employee_details?.jobExperiences?.map((item, index) => (
            <li key={index}>
              <h4>{item.designation} {t('at')} {item.organization} ({item.location})</h4>
              <p>
                <DisplayDate date={item.startDate} /> -- {item.endDate ? <DisplayDate date={item.endDate} /> : t('Present')}
                {/* TODO  */}
                (calculated experience)
              </p>
              <p className='flex gap-2'>
                <Edit className={'text-themePurple cursor-pointer'} onClick={() => editHandler(item)} />
                <Trash className={'text-themeDanger cursor-pointer'} onClick={() => deleteHandler(item._id)} />
              </p>
            </li>
          ))}
        </ul>
      }
      {add && <div>
        <form onSubmit={submitHandler}>

          <fieldset className='flex flex-col gap-4'>
            <Input
              type={'text'}
              name={'company'}
              label={t('Company Name')}
              placeholder={t('Company Name')}
              value={formik.values.company}
              formik={formik}
              required
            />
            <Input
              type={'text'}
              name={'location'}
              label={t('Location')}
              placeholder={t('Location')}
              value={formik.values.location}
              formik={formik}
              required
            />
            <Input
              type={'text'}
              name={'designation'}
              label={t('Designation')}
              placeholder={t('Designation')}
              value={formik.values.designation}
              formik={formik}
              required
            />
            <Datepicker
              name={'startDate'}
              label={t('Start Date')}
              value={formik.values.startDate}
              error={formik.touched.startDate && formik.errors.startDate}
              onBlur={formik.handleBlur}
              onInput={formik.handleBlur}
              onChange={(value) => {
                formik.setFieldValue('startDate', value)
              }}
              required
            />
            <Datepicker
              name={'endDate'}
              label={t('End Date')}
              value={formik.values.endDate}
              minDate={formik.values.startDate}
              error={formik.touched.endDate && formik.errors.endDate}
              onBlur={formik.handleBlur}
              onInput={formik.handleBlur}
              onChange={(value) => {
                formik.setFieldValue('endDate', value)
              }}
              required
            />
            <div className="zt-btns !p-0 !pt-4 justify-end">
              <Button type="button" value={t("Cancel")} variant={'dark-outline'} className={'min-w-40'}
                onClick={() => { formik.resetForm(); setAdd(false); setEdit(false) }} />
              <Button type="button" onClick={submitHandler} value={t("Save")} variant={'dark'} className={'min-w-40'}
                is_loading={is_loading} disabled={is_loading || !formik.isValid}
              />
            </div>
          </fieldset>
        </form>
      </div>}
    </div>
  )
}
