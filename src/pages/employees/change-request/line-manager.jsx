import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import ls from 'localstorage-slim';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchEmployees } from '@/store/actions/employee.actions';
import Toast from '@/util/toast';
import { ChangeLineManager } from '@/store/actions/employee-change-request.actions';
import { Button, Datepicker, SearchSelect, Textarea } from '@/components/elements';
import FileUpload from '@/components/elements/FileUpload';

const user = ls?.get('auth_user', { decrypt: true })

export default function LineManagerPage() {
	const { t } = useTranslation();
	const { } = useSelector(state => state.employee)
	const { customfield_list } = useSelector(state => state.customfield)
	const { employees_list } = useSelector((state) => state.employee)
	const ChangeLineManagerRef = useRef(null)
	const dispatch = useDispatch()
	useEffect(() => {
		if (employees_list.length === 0)
			dispatch(FetchEmployees())
	}, [dispatch])
	const formik = useFormik({
		initialValues: {
			employee: "",
			currentLineManager: "",
			newLineManager: "",
			effectiveDate: "",
			reasonOfLineManagerChange: "",
			detail: "",
			fileLineManager: "",
		},
		validationSchema: Yup.object().shape({
			employee: Yup.string().required(t('formik.employeeRequired')),
			currentLineManager: Yup.string().required(t('formik.currentLineManagerRequired')),
			newLineManager: Yup.string().required(t('formik.newLineManagerRequired')),
			effectiveDate: Yup.string().required(t('formik.effectiveDateRequired')),
			reasonOfLineManagerChange: Yup.string().required(t('formik.reasonOfLineManagerChangeRequired')),
			detail: Yup.string(),
			fileLineManager: Yup.string(),
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
			<h1 className="text-h4 mb-6 flex items-center justify-start gap-3">{t("Change Line Manager Request")}</h1>

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
								formik.setFieldValue('employee', value);
								const selectedEmployee = employees_list.find(item => value === item._id);
								const firstName = selectedEmployee?.lineManager?.firstName || "";
								const lastName = selectedEmployee?.lineManager?.lastName || "";

								ChangeLineManagerRef.current.value = firstName + " " + lastName
							}}
							list={employees_list.map((item) => {
								return { display: item.firstName + " " + item.lastName, value: item._id };
							})}
							required
						/>
						<div className="zt-formGroup">
							<label className="dark:text-themeGrayscale300" htmlFor={"currentLineManager"}>
								{t("Current Line Manager")}
							</label>
							<input ref={ChangeLineManagerRef} readOnly id={"currentLineManager"} placeholder={t("Current Line Manager")} className='zt-themeInput' />
						</div>

						{console.log(employees_list)}
						<SearchSelect
							type={'select'}
							name={'newLineManager'}
							label={t('New Line Manager')}
							value={formik.values.newLineManager}
							error={formik.touched.newLineManager && formik.errors.newLineManager}
							onBlur={() => { formik.setFieldTouched('newLineManager', true) }}
							onInput={formik.handleBlur}
							onChange={(value) => { formik.setFieldValue('newLineManager', value) }}
							list={employees_list.filter(item => item.type == 'lineManager').map(item => {
								return {
									display: item.firstName + " " + item.lastName, value: item._id,
								}
							})}
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
							name={'reasonOfLineManagerChange'}
							label={t('Reason Of Line Manager Change')}
							value={formik.values.reasonOfLineManagerChange}
							error={formik.touched.reasonOfLineManagerChange && formik.errors.reasonOfLineManagerChange}
							onBlur={() => { formik.setFieldTouched('reasonOfLineManagerChange', true) }}
							onInput={formik.handleBlur}
							onChange={(value) => { formik.setFieldValue('reasonOfLineManagerChange', value) }}
							list={[{ display: 'Promotion', value: '1' }, { display: 'To just move', value: '2' }]}
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
							id={'fileLineManager'}
							name={'fileLineManager'}
							label={t('Upload Attachment')}
							value={formik.values.fileLineManager}
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