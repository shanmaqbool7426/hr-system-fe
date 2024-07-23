import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import ls from 'localstorage-slim';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchEmployees } from '@/store/actions/employee.actions';
import Toast from '@/util/toast';
import { ChangeGrade } from '@/store/actions/employee-change-request.actions';

import { Button, CheckBox, Datepicker, SearchSelect, Table, Textarea } from '@/components/elements';
import FileUpload from '@/components/elements/FileUpload';
import ChangeSalaryForm from '@/components/forms/employees/changeRequest/ChangeSalary';

const user = ls?.get('auth_user', { decrypt: true })

export default function SalaryPage() {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { employees_list } = useSelector(state => state.employee);
	const { customfield_list } = useSelector(state => state.customfield);
	const changeSaleryRef = useRef(null);
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
		onSubmit: async (values) => {
			if (values.attachment) {
				await uploader(values.attachment, (url) => {
					values.attachment = url;
					dispatch(ChangeDepartment(values, () => {
						formik.resetForm();
						Toast.success(t("Salery change request saved successfully"));
					}));
				});
			} else {
				dispatch(ChangeDesignation(values, () => {
					formik.resetForm();
					Toast.success(t("Request not proceed"));
				}));
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
		{ title: t(""), col: "sr", check: true },
		{ title: t("Sr#"), col: "SerailNo" },
		{ title: t("Employee"), col: "Employee" },
		{ title: t("Current Salary"), col: "CurrentSalary" },
		{ title: t("New Salary"), col: "NewSalary", },
		{ title: t("Effective Date"), col: "EffectiveDate" },
		{ title: t("Reason Of Salary Change"), col: "ReasonOfSalaryChange", },
		{ title: t("Details"), col: "Details", },
	]
	const rows = [
		{
			sr: <div className="flex items-center">
			<CheckBox
				id={`1`}
				// name={`checkbox-${index}`}
				// checked={checkedItems[index] || false}
				// onChange={(e) => handleCheckItem(index, e.target.checked)}
				size={'sm'}
				variant={'dark'}
			/>
		</div>,
		SerailNo: '1',
			Employee: 'Admin',
			CurrentSalary: '4656',
			NewSalary: '8888',
			EffectiveDate: '12 Jun 2025',
			ReasonOfSalaryChange: 'Correction of Errors',
			Details: '-',
		},
		{
			sr: <div className="flex items-center">
			<CheckBox
				id={`2`}
				// name={`checkbox-${index}`}
				// checked={checkedItems[index] || false}
				// onChange={(e) => handleCheckItem(index, e.target.checked)}
				size={'sm'}
				variant={'dark'}
			/>
		</div>,
		SerailNo: '2',
			Employee: 'Admin',
			CurrentSalary: '4656',
			NewSalary: '8888',
			EffectiveDate: '12 Jun 2025',
			ReasonOfSalaryChange: 'Correction of Errors',
			Details: '-',
		},
		{
			sr: <div className="flex items-center">
			<CheckBox
				id={`3`}
				// name={`checkbox-${index}`}
				// checked={checkedItems[index] || false}
				// onChange={(e) => handleCheckItem(index, e.target.checked)}
				size={'sm'}
				variant={'dark'}
			/>
		</div>,
		SerailNo: '3',
			Employee: 'Admin',
			CurrentSalary: '4656',
			NewSalary: '8888',
			EffectiveDate: '12 Jun 2025',
			ReasonOfSalaryChange: 'Correction of Errors',
			Details: '-',
		},
	]
	return (
		<section className="flex flex-col grow">
			{/* {is_loading && <PageLoader/>} */}
			<div className="flex justify-between pb-6">
				<h1 className="text-h4 mb-0">{t("Change Salary Request")}</h1>
				<Button onClick={() => setChange(true)} className={"btn btn-primary"}>{t("Change Salary Request")}</Button>
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
							onChange={(value) => { formik.setFieldValue('employee', value) }}
							list={employees_list.map((item) => {
								return { display: item.firstName + " " + item.lastName, value: item._id };
							})}
							required
						/>
						<SearchSelect
							type={'select'}
							name={'currentSalary'}
							label={t('Current Salary')}
							value={formik.values.currentSalary}
							error={formik.touched.currentSalary && formik.errors.currentSalary}
							onBlur={() => { formik.setFieldTouched('currentSalary', true) }}
							onInput={formik.handleBlur}
							onChange={(value) => { formik.setFieldValue('currentSalary', value) }}
							list={[{ display: 'Jhon', value: '1' }, { display: 'Doe', value: '2' }]}
							readOnly
						/>

						<SearchSelect
							type={'select'}
							name={'newSalary'}
							label={t('New Salary')}
							value={formik.values.newSalary}
							error={formik.touched.newSalary && formik.errors.newSalary}
							onBlur={() => { formik.setFieldTouched('newSalary', true) }}
							onInput={formik.handleBlur}
							onChange={(value) => { formik.setFieldValue('newSalary', value) }}
							list={[{ display: '20000', value: '1' }, { display: '350000', value: '2' }]}
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
							name={'reasonOfChangeSalary'}
							label={t('Reason Of Change Salary')}
							value={formik.values.reasonOfChangeSalary}
							error={formik.touched.reasonOfChangeSalary && formik.errors.reasonOfChangeSalary}
							onBlur={() => { formik.setFieldTouched('reasonOfChangeSalary', true) }}
							onInput={formik.handleBlur}
							onChange={(value) => { formik.setFieldValue('reasonOfChangeSalary', value) }}
							// corection
							// other
							list={[{ display: 'Performance-Based Increase', value: '1' }, { display: 'Market Adjustment', value: '2' }]}
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
			</form> */}
			{change && <ChangeSalaryForm onClose={()=>setChange(false)}/>}
		</section>
	)
}