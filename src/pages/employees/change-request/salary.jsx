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

export default function SalaryPage () {
	const { t } = useTranslation();
	const formik = useFormik({
		employee: "",
		initialValues: {
			currentSalary: "",
			newSalary: "",
			effectiveDate: "",
			reasonOfChangeSalary: "",
			detail: "",
			fileSalary: "",
		},
		validationSchema: Yup.object().shape({
			employee: Yup.string().required(t('formik.employeeRequired')),
			currentSalary: Yup.string().required(t('formik.currentSalaryRequired')),
			newSalary: Yup.string().required(t('formik.newSalaryRequired')),
			effectiveDate: Yup.string().required(t('formik.effectiveDateRequired')),
			reasonOfChangeSalary: Yup.string().required(t('formik.reasonOfChangeSalaryRequired')),
			detail: Yup.string(),
			fileSalary: Yup.string(),
		}),
		onSubmit: (values) => {
			console.log("Form Values:", values); // Logging form values on submit
		}
	});

	return (
		<section className="flex flex-col grow">
			{/* {is_loading && <PageLoader/>} */}
			<h1 className="text-h4 mb-6 flex items-center justify-start gap-3">{t("Change Salary Request")}</h1>

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
							name={'currentSalary'}
							label={t('Current Salary')}
							value={formik.values.currentSalary}
							error={formik.touched.currentSalary && formik.errors.currentSalary}
							onBlur={() => {formik.setFieldTouched('currentSalary', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('currentSalary', value)}}
							list={[{display: 'Jhon', value: '1'}, {display: 'Doe', value: '2'}]}
							required
						/>
						<SearchSelect
							type={'select'}
							name={'newSalary'}
							label={t('New Salary')}
							value={formik.values.newSalary}
							error={formik.touched.newSalary && formik.errors.newSalary}
							onBlur={() => {formik.setFieldTouched('newSalary', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('newSalary', value)}}
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
							name={'reasonOfChangeSalary'}
							label={t('Reason Of Change Salary')}
							value={formik.values.reasonOfChangeSalary}
							error={formik.touched.reasonOfChangeSalary && formik.errors.reasonOfChangeSalary}
							onBlur={() => {formik.setFieldTouched('reasonOfChangeSalary', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('reasonOfChangeSalary', value)}}
							// corection
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
							id={'fileSalary'}
							name={'fileSalary'}
							label={t('Upload Attachment')}
							value={formik.values.fileSalary}
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