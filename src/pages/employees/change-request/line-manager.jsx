import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import ls from 'localstorage-slim';

import { Button, Datepicker, SearchSelect, Textarea } from '@/components/elements';
import FileUpload from '@/components/elements/FileUpload';

const user = ls?.get('auth_user', { decrypt: true })

export default function LineManagerPage () {
	const { t } = useTranslation();
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
		onSubmit: (values) => {
			console.log("Form Values:", values); // Logging form values on submit
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
							onBlur={() => {formik.setFieldTouched('employee', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('employee', value)}}
							list={[{display: 'Jhon', value: '1'}, {display: 'Doe', value: '2'}]}
							required
						/>
						<SearchSelect
							type={'select'}
							name={'currentLineManager'}
							label={t('Current Line Manager')}
							value={formik.values.currentLineManager}
							error={formik.touched.currentLineManager && formik.errors.currentLineManager}
							onBlur={() => {formik.setFieldTouched('currentLineManager', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('currentLineManager', value)}}
							list={[{display: 'Jhon', value: '1'}, {display: 'Doe', value: '2'}]}
							required
						/>
						<SearchSelect
							type={'select'}
							name={'newLineManager'}
							label={t('New Line Manager')}
							value={formik.values.newLineManager}
							error={formik.touched.newLineManager && formik.errors.newLineManager}
							onBlur={() => {formik.setFieldTouched('newLineManager', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('newLineManager', value)}}
							list={[{display: 'Pakistan', value: '1'}, {display: 'India', value: '2'}]}
							required
						/>
						<Datepicker
							name={'effectiveDate'}
							label={t('Effective Date')}
							value={formik.values.effectiveDate}
							error={formik.touched.effectiveDate && formik.errors.effectiveDate}
							onBlur={formik.handleBlur}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('effectiveDate', value)}}
							required
						/>
						<SearchSelect
							type={'select'}
							name={'reasonOfLineManagerChange'}
							label={t('Reason Of Line Manager Change')}
							value={formik.values.reasonOfLineManagerChange}
							error={formik.touched.reasonOfLineManagerChange && formik.errors.reasonOfLineManagerChange}
							onBlur={() => {formik.setFieldTouched('reasonOfLineManagerChange', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('reasonOfLineManagerChange', value)}}
							list={[{display: 'Punjab', value: '1'}, {display: 'KPK', value: '2'}]}
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