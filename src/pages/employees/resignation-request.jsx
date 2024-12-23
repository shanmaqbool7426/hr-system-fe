import { useTranslation } from "next-i18next";
import { Button, DisplayDate, DisplayProfile, ModifiedBy, Table, DropDown } from '@/components/elements';
import { useState } from 'react';
import CreateResignationForm from '@/components/forms/employees/create-resignation';
import ResignationActionForm from '@/components/forms/employees/resignation-action';
import { FetchEmployees } from '@/store/actions/employee.actions';
import { DeleteResignation, FetchResignationList } from '@/store/actions/employee-resignation.actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { usePagination } from "@/hooks/usePagination";
import { Check, CrossClose, Edit, ThreeDotsVertical, Trash } from "@/components/svg";

export default function ResignationRequestPage() {
	const { t } = useTranslation();
	const [edit, setEdit] = useState(null)
	const [action, setAction] = useState(null)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(FetchEmployees())
		dispatch(FetchResignationList())
	}, [dispatch])
	const { resignation_list } = useSelector(state => state.employee)
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
		{ title: t("Employee"), col: "employee" },
		{ title: t("Effective Date"), col: "effectiveDate" },
		{ title: t("Last preferred Working Date"), col: "lastWorkingDay" },
		{ title: t("Reason"), col: "reason" },
		{ title: t("Status"), col: "status" },
		{ title: t("Modified By"), col: "updatedBy" },
		{ title: t("Action"), col: "action" },
	]

	const data = usePagination(resignation_list, page, perPage, sortCol, sortDir)
	const getStatus = (status) => {
		switch (status) {
			case "pending":
				return "zt-tag-purple"
			case "approved":
				return "zt-tag-success"
			case "rejected":
				return "zt-tag-danger"
		}
	}
	const rows = data.map(item => ({
		employee: <DisplayProfile user={item.employee} />,
		effectiveDate: <DisplayDate date={item.effectiveDate} />,
		lastWorkingDay: <DisplayDate date={item.lastWorkingDay} />,
		reason: item.reason || "------",
		status: <span className={`zt-tag ${getStatus(item.status)}`}>{item.status}</span>,
		updatedBy: <ModifiedBy user={item.updatedBy} date={item.updatedAt} />,
		action: item.status === "pending" && <DropDown icon={<ThreeDotsVertical />}>
			<ul className="zt-themeDropDownList zt-sm gap-4">
				<li className="!p-0">
					<a
						onClick={() => {
							setEdit(item)
							setCreate(true)
						}}
						className={"flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themePurple"}
					>
						<span>
							<Edit />
						</span>
						<span>{t("Edit")}</span>
					</a>
				</li>
				<li className="!p-0">
					<a onClick={() => {
						Toast.confirmDelete(() => {
							dispatch(DeleteResignation(item._id, () => {
								Toast.success(t("Resignation deleted successfully"))
							}))
						}, t)
					}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
						<span><Trash /></span>
						<span>{t("Delete")}</span>
					</a>
				</li>
				<li className="!p-0">
					<a onClick={() => {
						setEdit(item)
						setAction("approve")
					}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
						<span><Check /></span>
						<span>{t("Approve")}</span>
					</a>
				</li>
				<li className="!p-0">
					<a onClick={() => {
						setEdit(item)
						setAction("reject")
					}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
						<span><CrossClose /></span>
						<span>{t("Reject")}</span>
					</a>
				</li>
			</ul>
		</DropDown>
	}))
	return (
		<section className="flex flex-col grow">
			<div className="flex justify-between pb-6">
				<h1 className="text-h4 mb-0">{t("Resignation Request")}</h1>
				<Button onClick={() => { setCreate(true); setEdit(null) }} className={"btn btn-primary"}>{t("Apply Resignation")}</Button>
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
			{create && <CreateResignationForm onClose={() => { setCreate(false); setEdit(null) }} object={edit} />}
			{action && <ResignationActionForm onClose={() => { setAction(false); setEdit(null) }} object={edit} action={action} />}
		</section>
	)
}