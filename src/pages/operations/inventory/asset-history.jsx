import { Table, Profile, DisplayDate } from "@/components/elements";
import FilterArea from "@/components/includes/FilterArea";
import { FetchAssetHistory } from "@/store/actions/asset.actions";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AssetHistoryPage() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { asset_history } = useSelector((state) => state.asset)
	const [sortCol, setSortCol] = useState(null)
	const [sortDir, setSortDir] = useState(null)
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(10)
	const [filters, setFilters] = useState({
		search: "",
	})

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
		}
	]

	const headings = [
		{ title: t("Asset ID"), col: "assetId", sort: true },
		{ title: t("Asset User"), col: "assetUser", },
		{ title: t("Issue Date"), col: "issueDate", sort: true },
		{ title: t("Return to"), col: "returnTo", },
		{ title: t("Return Date"), col: "returnDate", sort: true },
		{ title: t("Remarks"), col: "remarks" },
	]

	let filteredrows = asset_history.filter((item) => {
		let include = true
		if (filters.search && filters.search.length > 0) {
			include = item.asset.assetId.toLowerCase().includes(filters.search.toLowerCase())
			if (!include) return false
		}

		return include
	}).sort((a, b) => {
		if (sortCol === 'assetId') {
			if (sortDir === 'asc') return a.asset.assetId?.localeCompare(b.asset.assetId)
			else return b.asset.assetId?.localeCompare(a.asset.assetId)
		}

		if (sortDir === 'asc') return a[sortCol]?.localeCompare(b[sortCol])
		else return b[sortCol]?.localeCompare(a[sortCol])
	})
	const indexOfLastItem = page * perPage;
	const indexOfFirstItem = indexOfLastItem - perPage;
	const paginatedData = filteredrows.slice(indexOfFirstItem, indexOfLastItem);


	const rows = paginatedData.map(item => {
		return {
			assetId: item?.asset?.assetId,
			assetUser: <div className="flex items-center justify-start gap-4 grow">
				<Profile name={item?.issueTo?.firstName} image={item?.issueTo?.avatar} />
				<div className={'flex flex-col gap-1 text-left'}>
					<strong className={'text-themeGrayscale900 text-sm'}>{item?.issueTo?.firstName} {item?.issueTo?.lastName}</strong>
					<span className={'text-themeGrayscale500 text-xs'}>{item?.issueTo?.employeeCode}</span>
				</div>
			</div>,
			issueDate: <DisplayDate date={item.issueDate} />,
			returnTo: item.returnTo ? <div className="flex items-center justify-start gap-4 grow">
				<Profile name={item?.returnTo?.firstName} image={item?.returnTo?.avatar} />
				<div className={'flex flex-col gap-1 text-left'}>
					<strong className={'text-themeGrayscale900 text-sm'}>{item?.returnTo?.firstName} {item?.returnTo?.lastName}</strong>
					<span className={'text-themeGrayscale500 text-xs'}>{item?.returnTo?.employeeCode}</span>
				</div>
			</div> : "------",
			returnDate: <DisplayDate date={item?.returnDate} />,
			remarks: <div>
				<h4 className="text-sm mb-1">Assign Remarks</h4>
				<div className="">{item.issueRemarks}</div>
				{item.returnRemarks && <><h4 className="text-sm mb-1">Return Remarks</h4>
				<div className="">{item.returnRemarks}</div></>}
			</div>
		}
	})

	const pagination = {
		totalRecords: asset_history.length,
		showPerPage: true,
		prevAction: () => page > 1 && setPage(page - 1),
		clickAction: (value) => setPage(value),
		nextAction: () => setPage(page + 1),
	}

	useEffect(() => {
		dispatch(FetchAssetHistory())
	}, [dispatch])

	return (
		<section className="flex flex-col grow">
			<div className="flex justify-between pb-6">
				<div className="flex flex-col">
					<h1 className="text-h4 mb-0">{t("Asset History Page")}</h1>
					<p className="mb-0">{t("View asset history here")}</p>
				</div>
			</div>

			<div className="w-full bg-white p-6 rounded-lg grow">
				<FilterArea title={t("Asset History")}
					elements={filterElements}
					filters={filters}
					setFilters={setFilters}
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