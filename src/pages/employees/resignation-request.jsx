import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import ls from 'localstorage-slim';
import { Button,  Table } from '@/components/elements'; 
import { useState } from 'react';
import CreateResignationForm from '@/components/forms/employees/createResignation';

const user = ls?.get('auth_user', { decrypt: true })

export default function ResignationRequestPage() {
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
	const [sortCol, setSortCol] = useState(null)
	const [sortDir, setSortDir] = useState(null)
	const [page, setPage] = useState(1)
	const [create, setCreate] = useState(false)
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
		{ title: t("Transition Date"), col: "TransitionDate" },
		{ title: t("Reason Type"), col: "ReasonType", },
		{ title: t("Last preferred Working Date"), col: "LastpreferredWorkingDate" },
		{ title: t("Reason"), col: "Reason", },
	]
	const rows = [
		{
		
			Employee: 'Admin',
			LastpreferredWorkingDate: '23 May 2025',
			ReasonType: 'One',
			NewSalary: '8888',
			TransitionDate: '12 Jun 2025',
			Reason: '-',
		},
		{
		
			Employee: 'Admin',
			LastpreferredWorkingDate: '23 May 2025',
			ReasonType: 'One',
			NewSalary: '8888',
			TransitionDate: '12 Jun 2025',
			Reason: '-',
		},
		{
		
			Employee: 'Admin',
			LastpreferredWorkingDate: '23 May 2025',
			ReasonType: 'One',
			NewSalary: '8888',
			TransitionDate: '12 Jun 2025',
			Reason: '-',
		},
	]
	return (
		<section className="flex flex-col grow">
			{/* {is_loading && <PageLoader/>} */}
			<div className="flex justify-between pb-6">
				<h1 className="text-h4 mb-0">{t("Resignation Request")}</h1>
				<Button onClick={() => setCreate(true)} className={"btn btn-primary"}>{t("Apply Resignation")}</Button>
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
					<div className="grid sm:grid-cols-2 gap-12">
						<SearchSelect
							type={'select'}
							name={'employee'}
							label={t('Employee')}
							value={formik.values.employee}
							error={formik.touched.employee && formik.errors.employee}
							onBlur={() => { formik.setFieldTouched('employee', true) }}
							onInput={formik.handleBlur}
							onChange={(value) => { formik.setFieldValue('employee', value) }}
							list={[{ display: 'Jhon', value: '1' }, { display: 'Doe', value: '2' }]}
							required
						/>
						<Datepicker
							name={'resignationDate'}
							label={t('Transition  Date')}
							value={formik.values.resignationDate}
							error={formik.touched.resignationDate && formik.errors.resignationDate}
							onBlur={formik.handleBlur}
							onInput={formik.handleBlur}
							onChange={(value) => { formik.setFieldValue('resignationDate', value) }}
							required
						/>
						<SearchSelect
							type={'select'}
							name={'reasonType'}
							label={t('Reason Type')}
							value={formik.values.reasonType}
							error={formik.touched.reasonType && formik.errors.reasonType}
							onBlur={() => { formik.setFieldTouched('reasonType', true) }}
							onInput={formik.handleBlur}
							onChange={(value) => { formik.setFieldValue('reasonType', value) }}
							list={[{ display: 'One', value: '1' }, { display: 'Two', value: '2' }]}
							required
						/>
						<Datepicker
							name={'lastPreferredWorkingDate'}
							label={t('Last preferred Working Date')}
							value={formik.values.lastPreferredWorkingDate}
							error={formik.touched.lastPreferredWorkingDate && formik.errors.lastPreferredWorkingDate}
							onBlur={formik.handleBlur}
							onInput={formik.handleBlur}
							onChange={(value) => { formik.setFieldValue('lastPreferredWorkingDate', value) }}
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
			</form> */}
			{create && <CreateResignationForm onClose={() => setCreate(false)} />}
		</section>
	)
}