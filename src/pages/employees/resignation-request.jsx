import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import ls from 'localstorage-slim';

import LandingPage from "@/layouts/LandingPage";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Button, Datepicker, Input, SearchSelect, Textarea } from '@/components/elements';
import FileUpload from '@/components/elements/FileUpload';

const user = ls?.get('auth_user', { decrypt: true })
const Layout = user ? DefaultLayout : LandingPage

export default function ResignationRequestPage () {
	const { t } = useTranslation();
	const formik = useFormik({
		initialValues: {
			employee: "",
			resignationDate: "",
			reasonType: "",
			lastPreferredWorkingDate: "",
			reason: "",
			file: "",
		},
		validationSchema: Yup.object().shape({
			employee: Yup.string().required(t('formik.employeeRequired')),
			resignationDate: Yup.string().required(t('formik.resignationDateRequired')),
			reasonType: Yup.string().required(t('formik.reasonTypeRequired')),
			lastPreferredWorkingDate: Yup.string().required(t('formik.lastPreferredWorkingDateRequired')),
			reason: Yup.string(),
			file: Yup.string(),
		}),
		onSubmit: (values) => {
			console.log("Form Values:", values); // Logging form values on submit
		}
	});

	return (
		<section className="flex flex-col grow">
			{/* {is_loading && <PageLoader/>} */}
			<h1 className="text-h4 mb-6 flex items-center justify-start gap-3">{t("Resignation Request")}</h1>

			<form className="zt-themeForm zt-baseForm w-full bg-white p-12 rounded-lg grow" onSubmit={event => { event.preventDefault(); formik.handleSubmit() }}>
				<fieldset className='flex flex-col gap-12'>
					<div className="grid sm:grid-cols-2 gap-12">
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
						<Datepicker
							name={'resignationDate'}
							label={t('Transition  Date')}
							value={formik.values.resignationDate}
							error={formik.touched.resignationDate && formik.errors.resignationDate}
							onBlur={formik.handleBlur}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('resignationDate', value)}}
							required
						/>
						<SearchSelect
							type={'select'}
							name={'reasonType'}
							label={t('Reason Type')}
							value={formik.values.reasonType}
							error={formik.touched.reasonType && formik.errors.reasonType}
							onBlur={() => {formik.setFieldTouched('reasonType', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('reasonType', value)}}
							list={[{display: 'One', value: '1'}, {display: 'Two', value: '2'}]}
							required
						/>
						<Datepicker
							name={'lastPreferredWorkingDate'}
							label={t('Last preferred Working Date')}
							value={formik.values.lastPreferredWorkingDate}
							error={formik.touched.lastPreferredWorkingDate && formik.errors.lastPreferredWorkingDate}
							onBlur={formik.handleBlur}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('lastPreferredWorkingDate', value)}}
							required
						/>
						<Textarea
							type={'textarea'}
							name={'reason'}
							label={t('Reason')}
							containerClass={'col-span-2'}
							value={formik.values.reason}
							formik={formik}
							rows={5}
						/>
						<FileUpload
							id={'fileDesignation'}
							name={'fileDesignation'}
							label={t('Upload Attachment')}
							value={formik.values.fileDesignation}
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