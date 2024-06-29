import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import ls from 'localstorage-slim';

import LandingPage from "@/layouts/LandingPage";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Button, Datepicker, SearchSelect, Textarea } from '@/components/elements';
import FileUpload from '@/components/elements/FileUpload';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeDesignation } from '@/store/actions/employee-change-request.actions';
import Toast from '@/util/toast';
import { FetchEmployees } from '@/store/actions/employee.actions';
import { uploader } from '@/util/helpers';

export default function DesignationPage() {
	const { t } = useTranslation();
	const { } = useSelector(state => state.employee)
	const { customfield_list } = useSelector(state => state.customfield)
	const { employees_list } = useSelector((state) => state.employee)
	const currentDesignationRef = useRef(null)
	const dispatch = useDispatch()
	useEffect(() => {
		if (employees_list.length === 0)
			dispatch(FetchEmployees())
	}, [dispatch])
	const formik = useFormik({
		initialValues: {
			employee: "",
			designation: "",
			effectiveDate: "",
			reason: "",
			detail: "",
			attachment: null,
		},
		validationSchema: Yup.object().shape({
			employee: Yup.string().required(t('formik.employeeRequired')),
			designation: Yup.string().required(t('formik.newDesignationRequired')),
			effectiveDate: Yup.string().required(t('formik.effectiveDateRequired')),
			reason: Yup.string().required(t('formik.reasonOfDesignationChangeRequired')),
		}),
		onSubmit: async (values) => {
			if (values.attachment) {
				await uploader(values.attachment, (url) => {
					values.attachment = url
					dispatch(ChangeDesignation(values, () => {
						formik.resetForm()
						Toast.success(t("Designation change request saved successfully"))
					}))
				})
			} else {
				dispatch(ChangeDesignation(values, () => {
					formik.resetForm()
					Toast.success(t("Designation change request saved successfully"))
				}))
			}
		}
	});

	return (
		<section className="flex flex-col grow">
			<h1 className="text-h4 mb-6 flex items-center justify-start gap-3">{t("Change Designation Request")}</h1>
			<form className="zt-themeForm zt-baseForm w-full bg-white p-12 rounded-lg grow" onSubmit={event => { event.preventDefault(); formik.handleSubmit() }}>
				<fieldset className='flex flex-col gap-12'>
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
								currentDesignationRef.current.value =
									employees_list.find(item => value === item._id)?.designation?.name || ""
							}}
							list={employees_list.map((item) => {
								return { display: item.firstName + " " + item.lastName, value: item._id }
							})}
							required
						/>
						<div className="zt-formGroup">
							<label className="dark:text-themeGrayscale300" htmlFor={"currentDesignation"}>
								{t("Current Designation")}
							</label>
							<input ref={currentDesignationRef} readOnly id={"currentDesignation"} placeholder={t("Current Designation")} className='zt-themeInput' />
						</div>

						<SearchSelect
							type={'select'}
							name={'designation'}
							label={t('New Designation')}
							value={formik.values.designation}
							error={formik.touched.designation && formik.errors.designation}
							onBlur={() => { formik.setFieldTouched('designation', true) }}
							onInput={formik.handleBlur}
							onChange={(value) => { formik.setFieldValue('designation', value) }}
							list={customfield_list.filter(item => item.type === 'designation').map(item => {
								return { display: item.name, value: item._id }
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
							name={'reason'}
							label={t('Reason Of Designation Change')}
							value={formik.values.reason}
							error={formik.touched.reason && formik.errors.reason}
							onBlur={() => { formik.setFieldTouched('reason', true) }}
							onInput={formik.handleBlur}
							onChange={(value) => { formik.setFieldValue('reason', value) }}
							list={[
								{ display: 'Promotion', value: 'promotion' },
								{ display: 'Correction', value: 'correction' },
								{ display: 'Other', value: 'other' },
							]}
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
							id={'attachment'}
							name={'attachment'}
							label={t('Upload Attachment')}
							accept={`image/*,application/pdf,.doc,.docx`}
							onChange={(file) => {
								formik.setFieldValue('attachment', file)
							}}
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