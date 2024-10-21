import { Table, DisplayDate, Profile } from "@/components/elements";
import FilterArea from "@/components/includes/FilterArea";
import { FetchHelpdeskTickets } from "@/store/actions/helpdesk.actions";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
export default function RepairHistoryPage() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { ticket_list } = useSelector((state) => state.helpdesk)
	const [sortCol, setSortCol] = useState(null)
	const [sortDir, setSortDir] = useState(null)
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(10)
	const [filters, setFilters] = useState({
		fromDate: null,
		toDate: null,
	})

	const filterElements = [
		{
			type: "date",
			name: "fromDate",
			value: filters.fromDate,
			placeholder: t("From Date"),
			className: "xl:col-span-2",
			onChange: (value) => {
				let _filter = { ...filters }
				_filter['fromDate'] = value
				setFilters(_filter)
			}
		},
		{
			type: "date",
			name: "toDate",
			value: filters.toDate,
			placeholder: t("To Date"),
			className: "xl:col-span-2",
			onChange: (value) => {
				let _filter = { ...filters }
				_filter['toDate'] = value
				setFilters(_filter)
			}
		}
	]

	const headings = [
		{ title: t("ID"), col: "ticketId", sort: true },
		{ title: t("Requested by"), col: "createdBy", sort: true },
		{ title: t("Asset ID"), col: "asset", sort: true },
		{ title: t("Issue"), col: "title", sort: true },
		{ title: t("Reported Date"), col: "createdAt", sort: true },
		{ title: t("Resolve Date"), col: "updatedAt", sort: true },
		{ title: t("Priority"), col: "priority", sort: true },
		{ title: t("Repair Cost"), col: "repairCost", sort: true },
		{ title: t("Remarks"), col: "remarks", sort: true },
	]
	let filteredrows = ticket_list
		.filter((item) => {
			let include = true;
			if (filters.fromDate) {
				include = moment(item.createdAt).isSameOrAfter(filters.fromDate);
				if (!include) return false;
			}
			if (filters.toDate) {
				include = moment(item.createdAt).isSameOrBefore(filters.toDate);
				if (!include) return false;
			}
			return include;
		})
		.sort((a, b) => {
			if (sortDir === "asc") return a[sortCol]?.localeCompare(b[sortCol]);
			else return b[sortCol]?.localeCompare(a[sortCol]);
		});
	const indexOfLastItem = page * perPage;
	const indexOfFirstItem = indexOfLastItem - perPage;
	const paginatedData = filteredrows.slice(indexOfFirstItem, indexOfLastItem);
	const rows = paginatedData?.map((item, i) => {
		return {
			ticketId: item.ticketId,
			createdBy: <div className="flex items-center justify-center gap-4 grow">
				<Profile image={item.createdBy?.avatar} name={`${item.createdBy?.firstName} ${item.createdBy?.lastName}`} />
				<div className={'flex flex-col gap-1 text-left'}>
					<strong className={''}>{`${item.createdBy?.firstName} ${item.createdBy?.lastName}`}</strong>
					<span className={'text-themeGrayscale500 text-xs'}>{item.createdBy?.employeeCode}</span>
				</div>
			</div>,
			asset: item.asset?.assetId,
			title: item.title,
			createdAt: <DisplayDate date={item.createdAt} />,
			updatedAt: <DisplayDate date={item.updatedAt} />,
			priority: <span className={`zt-tag !text-white zt-priority-${item.priority}`}>{item.priority}</span>,
			repairCost: item.repairCost,
			remarks: item.remarks,
		}
	})

	const pagination = {
		totalRecords: ticket_list.length,
		showPerPage: true,
		prevAction: () => page > 1 && setPage(page - 1),
		clickAction: (value) => setPage(value),
		nextAction: () => setPage(page + 1),
	}

	useEffect(() => {
		dispatch(FetchHelpdeskTickets({ type: "hardware", status: "closed", hardwareType: "faulty" }))
	}, [dispatch])

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
				/>

				<Table
					checkbox={false}
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
				/>
			</div>
		</section>
	)
}