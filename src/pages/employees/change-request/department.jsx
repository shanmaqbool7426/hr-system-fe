import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import ls from 'localstorage-slim';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeDepartment } from '@/store/actions/employee-change-request.actions';
import Toast from '@/util/toast';
import { FetchEmployees } from '@/store/actions/employee.actions';
import { uploader } from '@/util/helpers';
import { Button, Datepicker, SearchSelect, Textarea } from '@/components/elements';
import FileUpload from '@/components/elements/FileUpload';

const user = ls?.get('auth_user', { decrypt: true })

export default function DepartmentPage() {
	const { t } = useTranslation();
	const { } = useSelector(state => state.employee)
	const { customfield_list } = useSelector(state => state.customfield)
	const { employees_list } = useSelector((state) => state.employee)
	const currentDepartmentRef = useRef(null)
	const dispatch = useDispatch()
	useEffect(() => {
		if (employees_list.length === 0)
			dispatch(FetchEmployees())
	}, [dispatch])
	const formik = useFormik({
		initialValues: {
			employee: "",
			currentDepartment: "",
			newDepartment: "",
			effectiveDate: "",
			reasonOfDepartmentChange: "",
			detail: "",
			fileDepartment: "",
		},
		validationSchema: Yup.object().shape({
			employee: Yup.string().required(t('formik.employeeRequired')),
			currentDepartment: Yup.string().required(t('formik.currentDepartmentRequired')),
			newDepartment: Yup.string().required(t('formik.newDepartmentRequired')),
			effectiveDate: Yup.string().required(t('formik.effectiveDateRequired')),
			reasonOfDepartmentChange: Yup.string().required(t('formik.reasonOfDepartmentChangeRequired')),
			detail: Yup.string(),
			fileDepartment: Yup.string(),
		}),
		onSubmit: async (values) => {
			if (values.attachment) {
				await uploader(values.attachment, (url) => {
					values.attachment = url
					dispatch(ChangeDepartment(values, () => {
						formik.resetForm()
						Toast.success(t("Department change request saved successfully"))
					}))
				})
			} else {
				dispatch(ChangeDesignation(values, () => {
					formik.resetForm()
					Toast.success(t("Request not proceed"))
				}))
			}
		}
	});

	return (
		<section className="flex flex-col grow">
			{/* {is_loading && <PageLoader/>} */}
			<h1 className="text-h4 mb-6 flex items-center justify-start gap-3">{t("Change Department Request")}</h1>

			<form className="zt-themeForm zt-baseForm w-full bg-white p-12 rounded-lg grow" onSubmit={event => { event.preventDefault(); formik.handleSubmit() }}>
				<fieldset className='flex flex-col  gap-12'>
					<div className="grid sm:grid-cols-3 gap-12">
						<SearchSelect
							type={'select'}
							name={'employee'}
							label={t('Employee')}
							value={formik.values.employee}
							error={formik.touched.employee && formik.errors.employee}
							onBlur={() => { formik.setFieldTouched('employee', true) }}
							onInput={formik.handleBlur}
							onChange={(value) => {
								formik.setFieldValue('employee', value)
								currentDepartmentRef.current.value =
									employees_list.find(item => value === item._id)?.currentDepartment?.name || ""
							}}
							list={employees_list.map((item) => {
								return { display: item.firstName + " " + item.lastName, value: item._id }
							})}
							required
						/>
						<div className="zt-formGroup">
							<label className="dark:text-themeGrayscale300" htmlFor={"currentDepartment"}>
								{t("Current Department")}
							</label>
							<input ref={currentDepartmentRef} readOnly id={"currentDepartment"} placeholder={t("Current Department")} className='zt-themeInput' />
						</div>
						<SearchSelect
							type={'select'}
							name={'newDepartment'}
							label={t('New Department')}
							value={formik.values.newDepartment}
							error={formik.touched.newDepartment && formik.errors.newDepartment}
							onBlur={() => { formik.setFieldTouched('newDepartment', true) }}
							onInput={formik.handleBlur}
							onChange={(value) => { formik.setFieldValue('newDepartment', value) }}
							list={[
								{ display: 'IT', value: 'General' },
								{ display: 'Finance', value: 'Finance' },
								{ display: 'Security', value: 'Security' },
							]}
							required
						/>
						<Datepicker
							name={'effectiveDate'}
							label={t('Effective Date')}
							value={formik.values.effectiveDate}
							error={formik.touched.effectiveDate && formik.errors.effectiveDate}
							onBlur={formik.handleBlur}
							onInput={formik.handleBlur}
							onChange={(value) => { formik.setFieldValue('effectiveDate', value) }}
							required
						/>
						<SearchSelect
							type={'select'}
							name={'reasonOfDepartmentChange'}
							label={t('Reason Of Department Change')}
							value={formik.values.reasonOfDepartmentChange}
							error={formik.touched.reasonOfDepartmentChange && formik.errors.reasonOfDepartmentChange}
							onBlur={() => { formik.setFieldTouched('reasonOfDepartmentChange', true) }}
							onInput={formik.handleBlur}
							onChange={(value) => { formik.setFieldValue('reasonOfDepartmentChange', value) }}
							// transfer
							// correction
							// other

							list={[{ display: 'Career Growth', value: 'Career Growth' }, { display: 'Work-Life Balance', value: 'Work-Life Balance' }]}
							required
						/>
					</div>
					<div className="grid sm:grid-cols-3 gap-12">
						<Textarea
							type={'textarea'}
							name={'detail'}
							label={t('Details')}
							containerClass={'col-span-2'}
							value={formik.values.detail}
							formik={formik}
							onChange={(event) => { formik.setFieldValue('detail', event.target.value) }}

							rows={5}
						/>
					</div>
					<div className="grid sm:grid-cols-3 gap-12">
						<FileUpload
							id={'fileDepartment'}
							name={'fileDepartment'}
							label={t('Upload Attachment')}
							value={formik.values.fileDepartment}
							formik={formik}
						/>
					</div>
				</fieldset>

				<div className="zt-btns !p-0 justify-end">
					<Button type="button" value={t("Cancel")} className={"btn btn-dark-outline min-w-32"} />
					<Button type="submit" value={t("Submit")} className={"btn btn-dark min-w-32"} />
				</div>
			</form>
		</section>
	)
}