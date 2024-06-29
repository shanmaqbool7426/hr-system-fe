import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import ls from 'localstorage-slim';

import LandingPage from "@/layouts/LandingPage";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Button, Datepicker, SearchSelect, Textarea } from '@/components/elements';
import FileUpload from '@/components/elements/FileUpload';

const user = ls?.get('auth_user', { decrypt: true })
const Layout = user ? DefaultLayout : LandingPage

export default function GradePage () {
	const { t } = useTranslation();
	const formik = useFormik({
		initialValues: {
			employee: "",
			currentGrade: "",
			newGrade: "",
			effectiveDate: "",
			reasonOfGradeChange: "",
			detail: "",
			fileGrade: "",
		},
		validationSchema: Yup.object().shape({
			employee: Yup.string().required(t('formik.employeeRequired')),
			currentGrade: Yup.string().required(t('formik.currentGradeRequired')),
			newGrade: Yup.string().required(t('formik.newGradeRequired')),
			effectiveDate: Yup.string().required(t('formik.effectiveDateRequired')),
			reasonOfGradeChange: Yup.string().required(t('formik.reasonOfGradeChangeRequired')),
			detail: Yup.string(),
			fileGrade: Yup.string(),
		}),
		onSubmit: (values) => {
			console.log("Form Values:", values); // Logging form values on submit
		}
	});

	return (
		<section className="flex flex-col grow">
			{/* {is_loading && <PageLoader/>} */}
			<h1 className="text-h4 mb-6 flex items-center justify-start gap-3">{t("Change Grade Request")}</h1>

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
							name={'currentGrade'}
							label={t('Current Grade')}
							value={formik.values.currentGrade}
							error={formik.touched.currentGrade && formik.errors.currentGrade}
							onBlur={() => {formik.setFieldTouched('currentGrade', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('currentGrade', value)}}
							list={[{display: 'Jhon', value: '1'}, {display: 'Doe', value: '2'}]}
							required
						/>
						<SearchSelect
							type={'select'}
							name={'newGrade'}
							label={t('New Grade')}
							value={formik.values.newGrade}
							error={formik.touched.newGrade && formik.errors.newGrade}
							onBlur={() => {formik.setFieldTouched('newGrade', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('newGrade', value)}}
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
							name={'reasonOfGradeChange'}
							label={t('Reason Of Grade Change')}
							value={formik.values.reasonOfGradeChange}
							error={formik.touched.reasonOfGradeChange && formik.errors.reasonOfGradeChange}
							onBlur={() => {formik.setFieldTouched('reasonOfGradeChange', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('reasonOfGradeChange', value)}}
							// 
							// other
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
							id={'fileGrade'}
							name={'fileGrade'}
							label={t('Upload Attachment')}
							value={formik.values.fileGrade}
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