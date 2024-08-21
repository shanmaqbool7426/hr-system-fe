import { useTranslation } from "next-i18next";
import { Button, DisplayDate, Table } from '@/components/elements';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchChangeRequests } from '@/store/actions/employee-change-request.actions';
import { FetchEmployees } from '@/store/actions/employee.actions';
import ChangeGradeForm from '@/components/forms/employees/change-request/grade';
import { Download } from "@/components/svg";

export default function ChangeGradePage() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const [sortCol, setSortCol] = useState(null)
	const [sortDir, setSortDir] = useState(null)
	const [page, setPage] = useState(1)
	const [change, setChange] = useState(false)
	const [perPage, setPerPage] = useState(10)
	const { change_request_list, employees_list } = useSelector(state => state.employee)

	useEffect(() => {
		if (employees_list.length === 0)
			dispatch(FetchEmployees())
		dispatch(FetchChangeRequests())
	}, [dispatch])

	const filteredrows = change_request_list
		.filter(request => request.type === 'grade')
		.sort((a, b) => {
			if (sortDir === "asc") return a[sortCol]?.localeCompare(b[sortCol]);
			else return b[sortCol]?.localeCompare(a[sortCol]);
		})

	const pagination = {
		totalRecords: filteredrows.length,
		showPerPage: true,
		prevAction: () => page > 1 && setPage(page - 1),
		clickAction: (value) => setPage(value),
		nextAction: () => setPage(page + 1),
	}
	const indexOfLastItem = page * perPage;
	const indexOfFirstItem = indexOfLastItem - perPage;
	const paginatedData = filteredrows.slice(indexOfFirstItem, indexOfLastItem);
	const headings = [
		{ title: t("Employee"), col: "employee" },
		{ title: t("Current Grade"), col: "currentValue" },
		{ title: t("New Grade"), col: "grade", },
		{ title: t("Effective Date"), col: "effectiveDate" },
		{ title: t("Reason To Change"), col: "reason", },
		{ title: t("Details"), col: "detail", },
		{ title: t("Attachment"), col: "attachment", },
	]
	const rows = paginatedData.map(request => ({
		employee: `${request?.employee?.firstName} ${request?.employee?.lastName}`,
		currentValue: request.currentValue || "----",
		grade: request.grade?.name,
		effectiveDate: <DisplayDate date={request.effectiveDate} />,
		reason: request.reason,
		detail: request.detail || '----',
		attachment: request.attachment ? <a target="_blank" download={request.attachment.split('/').at(-1)} href={request.attachment} className="cursor-pointer"><Download /></a> : '----'
	}));


	return (
		<section className="flex flex-col grow">
			<div className="flex justify-between pb-6">
				<h1 className="text-h4 mb-0">{t("Change Grade Request")}</h1>
				<Button onClick={() => setChange(true)} className={"btn btn-primary"}>{t("Change Grade Request")}</Button>
			</div>
			<div className='zt-card grow'>
				<Table
					checkbox={false}
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
				/>
			</div>

			{change &&
				<ChangeGradeForm onClose={() => setChange(false)} />
			}
		</section>
	)
}
