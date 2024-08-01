import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import ls from 'localstorage-slim';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toast from '@/util/toast';
// import { changeCode } from '@/store/actions/employee-change-request.actions';
import { Button, CheckBox, Datepicker, SearchSelect, Table, Textarea } from '@/components/elements';
import FileUpload from '@/components/elements/FileUpload';
import { useState } from 'react';
import ChangeCodeForm from '@/components/forms/employees/changeRequest/ChangeCode';


export default function EmployeeCodePage() {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { employees_list } = useSelector(state => state.employee);
	const changeIdRef = useRef(null);
	const formik = useFormik({
		initialValues: {
			employee: "",
			currentEmployeeCode: "",
			newEmployeeCode: "",
			effectiveDate: "",
			reasonOfChangeEmployeeCode: "",
			detail: "",
			fileEmployeeCode: "",
		},
		validationSchema: Yup.object().shape({
			employee: Yup.string().required(t('formik.employeeRequired')),
			currentEmployeeCode: Yup.string().required(t('formik.currentEmployeeCodeRequired')),
			newEmployeeCode: Yup.string().required(t('formik.newEmployeeCodeRequired')),
			effectiveDate: Yup.string().required(t('formik.effectiveDateRequired')),
			reasonOfChangeEmployeeCode: Yup.string().required(t('formik.reasonOfChangeEmployeeCodeRequired')),
			detail: Yup.string(),
			fileEmployeeCode: Yup.string(),
		}),
		onSubmit: async (values) => {
			if (values.attachment) {
				await uploader(values.attachment, (url) => {
					values.attachment = url;
					// dispatch(changeCode(values, () => {
					// 	formik.resetForm();
					// 	Toast.success(t("Grade change request saved successfully"));
					// }));
				});
			} else {
				// dispatch(changeCode(values, () => {
				// 	formik.resetForm();
				// 	Toast.success(t("Request not proceed"));
				// }));
			}
		}
	});
	const [sortCol, setSortCol] = useState(null)
	const [sortDir, setSortDir] = useState(null)
	const [page, setPage] = useState(1)
	const [change, setChange] = useState(false)
	const [perPage, setPerPage] = useState(10)
	const pagination = {
		totalRecords: 5,
		showPerPage: true,
		prevAction: () => page > 1 && setPage(page - 1),
		clickAction: (value) => setPage(value),
		nextAction: () => setPage(page + 1),
	}
	const headings = [
		
		{ title: t("Employee"), col: "Employee" },
		{ title: t("Current Id"), col: "CurrentId" },
		{ title: t("New Employee Code"), col: "NewEmployeeCode", },
		{ title: t("Effective Date"), col: "EffectiveDate" },
		{ title: t("Reason Of Employee Id Change"), col: "ReasonOfEmployeeIdChange", },
		{ title: t("Details"), col: "Details", },
	]
	const rows = [
		{
		
			Employee: 'Admin',
			CurrentId: '4656',
			NewEmployeeCode: '8888',
			EffectiveDate: '12 Jun 2025',
			ReasonOfEmployeeIdChange: 'Correction of Errors',
			Details: '-',
		},
		{
		
			Employee: 'Admin',
			CurrentId: '4656',
			NewEmployeeCode: '8888',
			EffectiveDate: '12 Jun 2025',
			ReasonOfEmployeeIdChange: 'Correction of Errors',
			Details: '-',
		},
		{
		
			Employee: 'Admin',
			CurrentId: '4656',
			NewEmployeeCode: '8888',
			EffectiveDate: '12 Jun 2025',
			ReasonOfEmployeeIdChange: 'Correction of Errors',
			Details: '-',
		},
	]
	return (
		<section className="flex flex-col grow">
			{/* {is_loading && <PageLoader/>} */}
			<div className="flex justify-between pb-6">
				<h1 className="text-h4 mb-0">{t("Change Code Request")}</h1>
				<Button onClick={() => setChange(true)} className={"btn btn-primary"}>{t("Change Code Request")}</Button>
			</div>
			<div className='zt-card grow'>
				<Table
					headings={headings}
					rows={rows}
					sortCol={sortCol}
					setSortCol={setSortCol}
					sortDir={sortDir}
					pagination={pagination}
					setSortDir={setSortDir}
					perPage={perPage}
					setPerPage={setPerPage}
					page={page}
					setPage={setPage}
					className={'zt-employeeTable zt-changeShiftTable'}
				/>
			</div>
			{/* <form className="zt-themeForm zt-baseForm w-full bg-white p-12 rounded-lg grow" onSubmit={event => { event.preventDefault(); formik.handleSubmit() }}>
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
								changeIdRef.current.value =
									employees_list.find(item => value === item._id)?.employeeCode || ""
							}}
							list={employees_list.map((item) => {
								return { display: item.firstName + " " + item.lastName, value: item._id };
							})}
							required
						/>
						<div className="zt-formGroup">
							<label className="dark:text-themeGrayscale300" htmlFor={"changeId"}>
								{t("Current Id")}
							</label>
							<input ref={changeIdRef} readOnly id={"changeId"} placeholder={t("Current Id")} className='zt-themeInput' />
						</div>
						<SearchSelect
							type={'select'}
							name={'newEmployeeCode'}
							label={t('New Employee Code')}
							value={formik.values.newEmployeeCode}
							error={formik.touched.newEmployeeCode && formik.errors.newEmployeeCode}
							onBlur={() => { formik.setFieldTouched('newEmployeeCode', true) }}
							onInput={formik.handleBlur}
							onChange={(value) => { formik.setFieldValue('newEmployeeCode', value) }}
							list={[{ display: '1088', value: '1' }, { display: '1085', value: '2' }]}
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
							name={'reasonOfChangeEmployeeCode'}
							label={t('Reason Of Change Employee Id')}
							value={formik.values.reasonOfChangeEmployeeCode}
							error={formik.touched.reasonOfChangeEmployeeCode && formik.errors.reasonOfChangeEmployeeCode}
							onBlur={() => { formik.setFieldTouched('reasonOfChangeEmployeeCode', true) }}
							onInput={formik.handleBlur}
							onChange={(value) => { formik.setFieldValue('reasonOfChangeEmployeeCode', value) }}
							// correction
							// other
							list={[{ display: 'Correction of Errors', value: '1' }, { display: 'System Upgrade or Integration', value: '2' }]}

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
							id={'fileEmployeeCode'}
							name={'fileEmployeeCode'}
							label={t('Upload Attachment')}
							value={formik.values.fileEmployeeCode}
							formik={formik}
						/>
					</div>
				</fieldset>

				<div className="zt-btns !p-0 justify-end">
					<Button type="button" value={t("Cancel")} className={"btn btn-dark-outline min-w-32"} />
					<Button type="submit" value={t("Submit")} className={"btn btn-dark min-w-32"} />
				</div>
			</form> */}
			{change && <ChangeCodeForm onClose={() => { setChange(false) }} />}
		</section>
	)
}