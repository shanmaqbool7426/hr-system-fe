import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import ls from 'localstorage-slim';

import LandingPage from "@/layouts/LandingPage";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Button, Datepicker, Input, SearchSelect, Textarea } from '@/components/elements';

const user = ls?.get('auth_user', { decrypt: true });
const Layout = user ? DefaultLayout : LandingPage;

export default function TransitionPage() {
	const { t } = useTranslation();
	const formik = useFormik({
		initialValues: {
			transitionTitle: "",
			employee: "",
			transitionDate: "",
			promoteDemote: "",
			transitionType: "",
			designation: "",
			employeeStatus: "",
			employeeReportTo: "",
			reason: "",
		},
		validationSchema: Yup.object().shape({
			transitionTitle: Yup.string().required(t('formik.transitionTitleRequired')),
			employee: Yup.string().required(t('formik.employeeRequired')),
			transitionDate: Yup.string().required(t('formik.transitionDateRequired')),
			promoteDemote: Yup.string().required(t('formik.promoteDemoteRequired')),
			transitionType: Yup.string().required(t('formik.transitionTypeRequired')),
			designation: Yup.string().required(t('formik.designationRequired')),
			employeeStatus: Yup.string().required(t('formik.employeeStatusRequired')),
			employeeReportTo: Yup.string().required(t('formik.employeeReportToRequired')),
			reason: Yup.string(),
		}),
		onSubmit: (values) => {
			console.log("Form Values:", values); // Logging form values on submit
		}
	});

	return (
		<section className="flex flex-col grow">
			<h1 className="text-h4 mb-6 flex items-center justify-start gap-3">{t("Employee Transition")}</h1>

			<form className="zt-themeForm zt-baseForm w-full bg-white p-12 rounded-lg grow" onSubmit={event => { event.preventDefault(); formik.handleSubmit() }}>
				<fieldset>
					<div className="grid sm:grid-cols-3 gap-12">
						<Input
							id={'transitionTitle'}
							type={'text'}
							name={'transitionTitle'}
							label={t('Transition Title')}
							placeholder={t('Transition Title')}
							value={formik.values.transitionTitle}
							formik={formik}
							required
						/>
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
							name={'transitionDate'}
							label={t('Transition  Date')}
							value={formik.values.transitionDate}
							error={formik.touched.transitionDate && formik.errors.transitionDate}
							onBlur={formik.handleBlur}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('transitionDate', value)}}
							required
						/>
						<SearchSelect
							type={'select'}
							name={'promoteDemote'}
							label={t('Promote / Demote')}
							value={formik.values.promoteDemote}
							error={formik.touched.promoteDemote && formik.errors.promoteDemote}
							onBlur={() => {formik.setFieldTouched('promoteDemote', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('promoteDemote', value)}}
							list={[{display: 'Promote', value: '1'}, {display: 'Demotion', value: '2'}]}
							required
						/>
						<SearchSelect
							type={'select'}
							name={'transitionType'}
							label={t('Transition Type')}
							value={formik.values.transitionType}
							error={formik.touched.transitionType && formik.errors.transitionType}
							onBlur={() => {formik.setFieldTouched('transitionType', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('transitionType', value)}}
							list={[{display: 'Type One', value: '1'}, {display: 'Type Two', value: '2'}]}
							required
						/>
						<SearchSelect
							type={'select'}
							name={'designation'}
							label={t('Designation')}
							value={formik.values.designation}
							error={formik.touched.designation && formik.errors.designation}
							onBlur={() => {formik.setFieldTouched('designation', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('designation', value)}}
							list={[{display: 'HR', value: '1'}, {display: 'Project Manager', value: '2'}]}
							required
						/>
						<SearchSelect
							type={'select'}
							name={'employeeStatus'}
							label={t('Employee Status')}
							value={formik.values.employeeStatus}
							error={formik.touched.employeeStatus && formik.errors.employeeStatus}
							onBlur={() => {formik.setFieldTouched('employeeStatus', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('employeeStatus', value)}}
							list={[{display: 'Volunteering', value: '1'}, {display: 'Temporary', value: '2'}]}
							required
						/>
						<SearchSelect
							type={'select'}
							name={'employeeReportTo'}
							label={t('Employee Report to')}
							value={formik.values.employeeReportTo}
							error={formik.touched.employeeReportTo && formik.errors.employeeReportTo}
							onBlur={() => {formik.setFieldTouched('employeeReportTo', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('employeeReportTo', value)}}
							list={[{display: 'Volunteering', value: '1'}, {display: 'Temporary', value: '2'}]}
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