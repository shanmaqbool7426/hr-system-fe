import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import ls from 'localstorage-slim';

import { Button, Datepicker, Input, SearchSelect, Textarea } from '@/components/elements';

const user = ls?.get('auth_user', { decrypt: true })

export default function TransferPage () {
	const { t } = useTranslation();
	const formik = useFormik({
		initialValues: {
			employee: "",
			transferDate: "",
			country: "",
			province: "",
			city: "",
			station: "",
			employeeReportTo: "",
			department: "",
			subDepartment: "",
			vender: "",
			description: "",
		},
		validationSchema: Yup.object().shape({
			employee: Yup.string().required(t('formik.employeeRequired')),
			transferDate: Yup.string().required(t('formik.transferDateRequired')),
			country: Yup.string().required(t('formik.countryRequired')),
			province: Yup.string().required(t('formik.provinceRequired')),
			city: Yup.string().required(t('formik.cityRequired')),
			station: Yup.string().required(t('formik.designationRequired')),
			employeeReportTo: Yup.string().required(t('formik.employeeReportToRequired')),
			department: Yup.string().required(t('formik.departmentRequired')),
			subDepartment: Yup.string().required(t('formik.subDepartmentRequired')),
			vender: Yup.string().required(t('formik.venderRequired')),
			description: Yup.string(),
		}),
		onSubmit: (values) => {
			console.log("Form Values:", values); // Logging form values on submit
		}
	});

	return (
		<section className="flex flex-col grow">
			{/* {is_loading && <PageLoader/>} */}
			<h1 className="text-h4 mb-6 flex items-center justify-start gap-3">{t("Employee Transfer")}</h1>

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
						<Datepicker
							name={'transferDate'}
							label={t('Transfer  Date')}
							value={formik.values.transferDate}
							error={formik.touched.transferDate && formik.errors.transferDate}
							onBlur={formik.handleBlur}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('transferDate', value)}}
							required
						/>
						<SearchSelect
							type={'select'}
							name={'country'}
							label={t('Country')}
							value={formik.values.country}
							error={formik.touched.country && formik.errors.country}
							onBlur={() => {formik.setFieldTouched('country', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('country', value)}}
							list={[{display: 'Pakistan', value: '1'}, {display: 'India', value: '2'}]}
							required
						/>
						<SearchSelect
							type={'select'}
							name={'province'}
							label={t('Province')}
							value={formik.values.province}
							error={formik.touched.province && formik.errors.province}
							onBlur={() => {formik.setFieldTouched('province', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('province', value)}}
							list={[{display: 'Punjab', value: '1'}, {display: 'KPK', value: '2'}]}
							required
						/>
						<SearchSelect
							type={'select'}
							name={'city'}
							label={t('City')}
							value={formik.values.city}
							error={formik.touched.city && formik.errors.city}
							onBlur={() => {formik.setFieldTouched('city', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('city', value)}}
							list={[{display: 'Lahore', value: '1'}, {display: 'Islamabad', value: '2'}]}
							required
						/>
						<SearchSelect
							type={'select'}
							name={'station'}
							label={t('station')}
							value={formik.values.station}
							error={formik.touched.station && formik.errors.station}
							onBlur={() => {formik.setFieldTouched('station', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('station', value)}}
							list={[{display: 'Station One', value: '1'}, {display: 'Station Two', value: '2'}]}
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
						<SearchSelect
							type={'select'}
							name={'department'}
							label={t('Department')}
							value={formik.values.department}
							error={formik.touched.department && formik.errors.department}
							onBlur={() => {formik.setFieldTouched('department', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('department', value)}}
							list={[{display: 'HR', value: '1'}, {display: 'Finance', value: '2'}]}
							required
						/>
						<SearchSelect
							type={'select'}
							name={'subDepartment'}
							label={t('Sub Department')}
							value={formik.values.subDepartment}
							error={formik.touched.subDepartment && formik.errors.subDepartment}
							onBlur={() => {formik.setFieldTouched('subDepartment', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('subDepartment', value)}}
							list={[{display: 'HR', value: '1'}, {display: 'Finance', value: '2'}]}
							required
						/>
						<SearchSelect
							type={'select'}
							name={'vender'}
							label={t('Vender')}
							value={formik.values.vender}
							error={formik.touched.vender && formik.errors.vender}
							onBlur={() => {formik.setFieldTouched('vender', true)}}
							onInput={formik.handleBlur}
							onChange={(value) => {formik.setFieldValue('vender', value)}}
							list={[{display: 'HR', value: '1'}, {display: 'Finance', value: '2'}]}
							required
						/>
					</div>
					<div className="grid sm:grid-cols-3 gap-12">
						<Textarea
							type={'textarea'}
							name={'description'}
							label={t('Description')}
							containerClass={'col-span-2'}
							value={formik.values.description}
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