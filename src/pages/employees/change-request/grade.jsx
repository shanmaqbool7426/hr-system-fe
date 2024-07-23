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
import ChangeGradeForm from '@/components/forms/employees/changeRequest/ChangeGrade';

const user = ls?.get('auth_user', { decrypt: true });

export default function GradePage() {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { employees_list } = useSelector(state => state.employee);
	const { customfield_list } = useSelector(state => state.customfield);
	const ChangeGradeRef = useRef(null);

	useEffect(() => {
		if (employees_list.length === 0)
			dispatch(FetchEmployees());
	}, [dispatch]);

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
		onSubmit: async (values) => {
			if (values.attachment) {
				await uploader(values.attachment, (url) => {
					values.attachment = url;
					dispatch(ChangeDepartment(values, () => {
						formik.resetForm();
						Toast.success(t("Grade change request saved successfully"));
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
		
		{ title: t("Employee"), col: "Employee" },
		{ title: t("Current Grade"), col: "CurrentGrade" },
		{ title: t("New Grade"), col: "NewGrade", },
		{ title: t("Effective Date"), col: "EffectiveDate" },
		{ title: t("Reason Of Grade Change"), col: "ReasonOfGradeChange", },
		{ title: t("Details"), col: "Details", },
	]
	const rows = [
		{
		
			Employee: 'Admin',
			CurrentGrade: 'B',
			NewGrade: 'A',
			EffectiveDate: '12 Jun 2025',
			ReasonOfGradeChange: 'Correction of Errors',
			Details: '-',
		},
		{
		
			Employee: 'Admin',
			CurrentGrade: 'B',
			NewGrade: 'A',
			EffectiveDate: '12 Jun 2025',
			ReasonOfGradeChange: 'Correction of Errors',
			Details: '-',
		},
		{
			
			Employee: 'Admin',
			CurrentGrade: 'B',
			NewGrade: 'A',
			EffectiveDate: '12 Jun 2025',
			ReasonOfGradeChange: 'Correction of Errors',
			Details: '-',
		},
	]
	return (
		<section className="flex flex-col grow">
			<div className="flex justify-between pb-6">
				<h1 className="text-h4 mb-0">{t("Change Grade Request")}</h1>
				<Button onClick={() => setChange(true)} className={"btn btn-primary"}>{t("Change Grade Request")}</Button>
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
								formik.setFieldValue('employee', value);
								ChangeGradeRef.current.value =
									employees_list.find(item => value === item._id)?.currentGrade?.name || "";
							}}
							list={employees_list.map((item) => {
								return { display: item.firstName + " " + item.lastName, value: item._id };
							})}
							required
						/>
						<div className="zt-formGroup">
							<label className="dark:text-themeGrayscale300" htmlFor={"currentGrade"}>
								{t("Current Grade")}
							</label>
							<input ref={ChangeGradeRef} readOnly id={"currentGrade"} placeholder={t("Current Grade")} className='zt-themeInput' />
						</div>

						<SearchSelect
							type={'select'}
							name={'newGrade'}
							label={t('New Grade')}
							value={formik.values.newGrade}
							error={formik.touched.newGrade && formik.errors.newGrade}
							onBlur={() => { formik.setFieldTouched('newGrade', true) }}
							onInput={formik.handleBlur}
							onChange={(value) => { formik.setFieldValue('grade', value) }}
							list={customfield_list.filter(item => item.type === 'grade').map(item => {
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
							name={'reasonOfGradeChange'}
							label={t('Reason Of Grade Change')}
							value={formik.values.reasonOfGradeChange}
							error={formik.touched.reasonOfGradeChange && formik.errors.reasonOfGradeChange}
							onBlur={() => { formik.setFieldTouched('reasonOfGradeChange', true) }}
							onInput={formik.handleBlur}
							onChange={(value) => { formik.setFieldValue('reasonOfGradeChange', value) }}
							list={[{ display: 'Promotion', value: '1' }, { display: 'Reorganization', value: '2' }]}
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
			</form> */}
			{change && <ChangeGradeForm onClose={()=>setChange(false)}/>}
		</section>
	)
}
