import { Button, SearchInput, Table, SearchSelect, DropDown } from "@/components/elements";
import FilterArea from "@/components/includes/FilterArea";
import { AssignTo, Edit, HandFree, HeadPhone, Led, ReturnTo, ThreeDotsVertical, Trash } from "@/components/svg";
import { FetchDepartments, DeleteDepartment } from "@/store/actions/department.actions";
import Toast from "@/util/toast";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function RepairHistoryPage () {
  const { t } = useTranslation()
  const dispatch = useDispatch()
	const { is_loading, total_records, departments_list } = useSelector((state) => state.department)
	const [sortCol, setSortCol] = useState(null)
	const [sortDir, setSortDir] = useState(null)
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(10)
	const [filters, setFilters] = useState({
		search: "",
		project: null,
		department: null,
		status: "all",
	})

	const assetsStatuses = [
		{ display: "All Status", value: "all" },
		{ display: "Active", value: "active" },
		{ display: "In Active", value: "inactive" },
	]

	const filterElements = [
		{
		type: "search",
		name: "search",
		value: filters.search,
		placeholder: t("Search departments by name or code"),
		className: "xl:col-span-2",
		onChange: (event) => {
			let _filter = { ...filters }
			_filter['search'] = event.target.value
			setFilters(_filter)
		}
		},
		{
		type: "select",
		name: "status",
		value: filters.status,
		list: assetsStatuses,
		onChange: (status) => {
			let _filter = { ...filters }
			_filter['status'] = status
			setFilters(_filter)
		}
		},
	]

	const headings = [
		{ title: t("Request ID"), col: "requestID", sort: true },
		{ title: t("Requested by"), col: "requestedBy", sort: true },
		{ title: t("Asset ID"), col: "assetID", sort: true },
		{ title: t("Employee Possession"), col: "employeePossession", sort: true },
		{ title: t("Issue"), col: "issue", sort: true },
		{ title: t("Reported Date"), col: "reportedDate", sort: true },
		{ title: t("Resolve Date"), col: "resolveDate", sort: true },
		{ title: t("Priority"), col: "priority", sort: true },
		{ title: t("Repair Cost"), col: "repairCost", sort: true },
		{ title: t("Remarks"), col: "remarks", sort: true },
	]

	const rows = [{
    requestID: t('AST- 001'),
    requestedBy: <div className="flex items-center justify-center gap-4 grow">
      <figure className={'w-10 h-10 overflow-hidden rounded-full bg-themePrimary200 shrink-0'}></figure>
      <div className={'flex flex-col gap-1 text-left'}>
        <strong className={'text-themeGrayscale900 text-sm'}>{t('Kelli Lebsack')}</strong>
        <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
      </div>
    </div>,
    assetID: t('AST- 001'),
    employeePossession: <div className="flex items-center justify-center gap-4 grow">
      <figure className={'w-10 h-10 overflow-hidden rounded-full bg-themePrimary200 shrink-0'}></figure>
      <div className={'flex flex-col gap-1 text-left'}>
        <strong className={'text-themeGrayscale900 text-sm'}>{t('Kelli Lebsack')}</strong>
        <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
      </div>
    </div>,
    issue: t('Broken LCD'),
    reportedDate: t('22 March 2023'),
    resolveDate: t('22 March 2023'),
    priority: <span className="zt-tag zt-tag-success">{t('Normal')}</span>,
    repairCost: t('$100'),
    remarks: t('Lorem ipsum dolor sit amet consectetur adipisicing elit.')
  },
  {
    requestID: t('AST- 001'),
    requestedBy: <div className="flex items-center justify-center gap-4 grow">
      <figure className={'w-10 h-10 overflow-hidden rounded-full bg-themePrimary200 shrink-0'}></figure>
      <div className={'flex flex-col gap-1 text-left'}>
        <strong className={'text-themeGrayscale900 text-sm'}>{t('Kelli Lebsack')}</strong>
        <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
      </div>
    </div>,
    assetID: t('AST- 001'),
    employeePossession: <div className="flex items-center justify-center gap-4 grow">
      <figure className={'w-10 h-10 overflow-hidden rounded-full bg-themePrimary200 shrink-0'}></figure>
      <div className={'flex flex-col gap-1 text-left'}>
        <strong className={'text-themeGrayscale900 text-sm'}>{t('Kelli Lebsack')}</strong>
        <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
      </div>
    </div>,
    issue: t('Broken LCD'),
    reportedDate: t('22 March 2023'),
    resolveDate: t('22 March 2023'),
    priority: <span className="zt-tag zt-tag-danger">{t('High')}</span>,
    repairCost: t('$100'),
    remarks: t('Lorem ipsum dolor sit amet consectetur adipisicing elit.')
  },
  {
    requestID: t('AST- 001'),
    requestedBy: <div className="flex items-center justify-center gap-4 grow">
      <figure className={'w-10 h-10 overflow-hidden rounded-full bg-themePrimary200 shrink-0'}></figure>
      <div className={'flex flex-col gap-1 text-left'}>
        <strong className={'text-themeGrayscale900 text-sm'}>{t('Kelli Lebsack')}</strong>
        <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
      </div>
    </div>,
    assetID: t('AST- 001'),
    employeePossession: <div className="flex items-center justify-center gap-4 grow">
      <figure className={'w-10 h-10 overflow-hidden rounded-full bg-themePrimary200 shrink-0'}></figure>
      <div className={'flex flex-col gap-1 text-left'}>
        <strong className={'text-themeGrayscale900 text-sm'}>{t('Kelli Lebsack')}</strong>
        <span className={'text-themeGrayscale500 text-xs'}>{t('10202325')}</span>
      </div>
    </div>,
    issue: t('Broken LCD'),
    reportedDate: t('22 March 2023'),
    resolveDate: t('22 March 2023'),
    priority: <span className="zt-tag zt-tag-purple">{t('Medium')}</span>,
    repairCost: t('$100'),
    remarks: t('Lorem ipsum dolor sit amet consectetur adipisicing elit.')
  }]

	const pagination = {
		totalRecords: total_records,
		showPerPage: true,
		prevAction: () => page > 1 && setPage(page - 1),
		clickAction: (value) => setPage(value),
		nextAction: () => setPage(page + 1),
	}


  return (
    <section className="flex flex-col grow">
			<div className="flex justify-between pb-6">
				<div className="flex flex-col">
					<h1 className="text-h4 mb-0">{t("Repair History Page")}</h1>
					<p className="mb-0">{t("View asset repair history here")}</p>
				</div>
			</div>

      <div className=" zt-card grow">
        <FilterArea title={t("Asset Repair History")}
					elements={filterElements}
					filters={filters}
					setFilters={setFilters}
					// filterHandler={filterHandler}
				/>

				<Table
					headings={headings}
					rows={rows}
					sortCol={sortCol}
					setSortCol={setSortCol}
					sortDir={sortDir}
					setSortDir={setSortDir}
					perPage={perPage}
					setPerPage={setPerPage}
					page={page}
					setPage={setPage}
					pagination={pagination}
					className={'zt-assetHistoryTable text-center text-sm'}
				/>
      </div>
		</section>
  )
}