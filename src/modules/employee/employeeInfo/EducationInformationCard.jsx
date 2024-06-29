import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next'
import { Edit, Plus, Trash } from '../../../components/svg';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Button, Datepicker, DisplayDate, Input } from '@/components/elements';
import Toast from '@/util/toast';
import { CreateAcademic, DeleteAcademic, UpdateAcademic } from '@/store/actions/employee-academic.actions';

export default function EducationInformationCard() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [add, setAdd] = useState(false)
  const [edit, setEdit] = useState(null)
  const { is_loading, employee_details } = useSelector((state) => state.employee)
  const formik = useFormik({
    initialValues: {
      institution: edit?.institution || "",
      degree: edit?.degree || "",
      startDate: edit?.startDate || "",
      endDate: edit?.endDate || "",
    },
    validationSchema: Yup.object().shape({
      institution: Yup.string().required(t('formik.institutionRequired')),
      degree: Yup.string().required(t('formik.degreeRequired')),
      startDate: Yup.date().required(t('formik.startDateRequired')),
    }),
    onSubmit: values => {
      const onSuccess = () => {
        formik.resetForm()
        setAdd(false)
        setEdit(false)
        Toast.success(edit ? t('Education record updated successfully') : t('Education record added successfully'))
      }
      if (edit) {
        dispatch(UpdateAcademic(edit._id, { user: employee_details._id, ...values }, onSuccess))
      } else {
        dispatch(CreateAcademic({ user: employee_details._id, ...values }, onSuccess))
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
      dispatch(DeleteAcademic(id, () => {
        Toast.success(t('Education record removed successfully'))
      }))
    }, t)
  }
  return (
    <div className='zt-employeeCardTimeLine'>
      <div className='zt--employeeCardHead'>
        <h3>{t('Education Information')}</h3>
        <Plus className={'text-themePurple cursor-pointer'} onClick={() => setAdd(!add)} />
      </div>
      {!add && !employee_details?.academicsHistory?.length && <p className='text-lg h-full flex items-center justify-center'>{t('No Data')}</p>}
      {!add && employee_details?.academicsHistory?.length > 0 &&
        <ul className='zt--employeeCardBody'>
          {employee_details?.academicsHistory?.map((item, index) => (
            <li key={index}>
              <h4>{item.institution}</h4>
              <span>{item.degree}</span>
              <p>
                <DisplayDate date={item.startDate} /> -- {item.endDate ? <DisplayDate date={item.endDate} /> : t('Continue')}
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
              name={'institution'}
              label={t('Institution')}
              placeholder={t('Institution')}
              value={formik.values.institution}
              formik={formik}
              required
            />
            <Input
              type={'text'}
              name={'degree'}
              label={t('Degree')}
              placeholder={t('Degree')}
              value={formik.values.degree}
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
