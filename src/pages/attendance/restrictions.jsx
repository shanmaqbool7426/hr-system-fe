import { Input, Table, ToggleCheck } from '@/components/elements'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup';
import { useFormik } from 'formik';

export default function Restriction() {
	const { t } = useTranslation()
	const [sortCol, setSortCol] = useState(null)
	const [sortDir, setSortDir] = useState(null)
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(10)
	const pagination = {
		totalRecords: 5,
		showPerPage: true,
		prevAction: () => page > 1 && setPage(page - 1),
		clickAction: (value) => setPage(value),
		nextAction: () => setPage(page + 1),
	}

	const headings = [

		{ title: t("Employee"), col: "Employee", /* sort: true */ },
		{ title: t("Employee Details"), col: "EmployeeDetails" },
		{ title: t("Geo Location"), col: "geoLocation", /* sort: true */ },
		{ title: t("Mobile IMEI"), col: "mobileIMEI", /* sort: true */ },
		{ title: t("IP Restriction"), col: "ipRestriction" },
		{ title: t("Face Restriction"), col: "faceRestriction" },
	]
	const formik = useFormik({
		initialValues: {
			goeLocation: false,
			mobileIMEI: false,
			ipRestriction: false,
		},
		validationSchema: Yup.object().shape({

		}),
	})
	const rows = [
		{
			Employee: <div className="flex items-center justify-center gap-4 grow">
				<div className={'flex flex-col gap-1 text-left'}>
					<strong className={'text-themeGrayscale text-sm'}>{t('Kelli Lebsack')}</strong>
					<span className={'text-themeGrayscale500 '}>{t('10202325')}</span>
				</div>
			</div>,
			EmployeeDetails: <div className='flex gap-4 justify-center'>
				<div className='flex flex-col items-start gap-1 text-themeGrayscale500'><span>{t('Station')}</span> <span>{t('Departement')}</span></div>
				<div className='flex flex-col gap-1 text-themeGrayscale'><span>{t('Canda')}</span> <span>{t('Design')}</span></div>
			</div>,
			geoLocation: <div className='flex flex-col items-center gap-1'>
				<ToggleCheck id={'goe'} name="goeLocation"
					checked={formik.values.goeLocation}
					onChange={(event) => {
						formik.setFieldValue('goeLocation', event.target.checked)
					}} />
				<Input className={`${formik.values.goeLocation ? "" : "cursor-not-allowed"}`} disabled={formik.values.goeLocation ? false : true} placeholder='Latitude, Longitude' />
				<Input className={`${formik.values.goeLocation ? "" : "cursor-not-allowed"}`} disabled={formik.values.goeLocation ? false : true} placeholder='Latitude, Longitude' />
			</div>,
			mobileIMEI: <div className='flex flex-col items-center gap-1'>
				<ToggleCheck id={'mobileIMEI'} name="mobileIMEI"
					checked={formik.values.mobileIMEI}
					onChange={(event) => {
						formik.setFieldValue('mobileIMEI', event.target.checked)
					}} />
				<Input className={`${formik.values.mobileIMEI ? "" : "cursor-not-allowed"}`} disabled={formik.values.mobileIMEI ? false : true} placeholder='Mobile IMEI' />
				<Input className={`${formik.values.mobileIMEI ? "" : "cursor-not-allowed"}`} disabled={formik.values.mobileIMEI ? false : true} placeholder='Mobile IMEI' />
			</div>,
			ipRestriction: <div className='flex flex-col items-center gap-1'>
				<ToggleCheck id={'ipRestriction'} name="ipRestriction"
					checked={formik.values.ipRestriction}
					onChange={(event) => {
						formik.setFieldValue('ipRestriction', event.target.checked)
					}} />
				<Input className={`${formik.values.ipRestriction ? "" : "cursor-not-allowed"}`} disabled={formik.values.ipRestriction ? false : true} placeholder='IP Restriction' />
				<Input className={`${formik.values.ipRestriction ? "" : "cursor-not-allowed"}`} disabled={formik.values.ipRestriction ? false : true} placeholder='IP Restriction' />
			</div>,
			faceRestriction:
				<div className='flex flex-col items-center gap-1'>
					<ToggleCheck id={'faceRestriction'} />
				</div>,
		},
	]

	return (
		<section className="flex flex-col grow">
			{/* {is_loading && <PageLoader/>} */}
			<div className="flex justify-between pb-6">
				<h1 className="text-h4 mb-0">{t("Attendance Restriction")}</h1>
			</div>

			<div className="zt-card grow">
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
					className={'zt-employeeTable zt-attendanceRestrictionTable'}
				/>
			</div>
		</section>
	)
}