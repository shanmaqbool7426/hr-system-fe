import { Button, SearchInput, Table, SearchSelect, DropDown, DisplayDate, Profile } from "@/components/elements";
import AssignToForm from "@/components/forms/organization/inventory/assignTo";
import CreateAssetForm from "@/components/forms/organization/inventory/create";
import ReturnToForm from "@/components/forms/organization/inventory/returnTo";
import FilterArea from "@/components/includes/FilterArea";
import { AssignTo, Edit, HandFree, HeadPhone, Led, ReturnTo, ThreeDotsVertical, Trash } from "@/components/svg";
import { FetchAssets, DeleteAsset } from "@/store/actions/asset.actions";
import Toast from "@/util/toast";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconCompnent from "@/components/forms/organization/inventory/IconCompnent"

export default function InventoryPage() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { is_loading, asset_list } = useSelector((state) => state.asset)
	const [sortCol, setSortCol] = useState(null)
	const [sortDir, setSortDir] = useState(null)
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(10)
	const [create, setCreate] = useState("")
	const [selected, setSelected] = useState(null)
	const [filters, setFilters] = useState({
		search: "",
		status: "",
	})

	const assetsStatuses = [
		{ display: "Active", value: "active" },
		{ display: "In Active", value: "inactive" },
	]

	const filterElements = [
		{
			type: "search",
			name: "search",
			value: filters.search,
			placeholder: t("Search assetID"),
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
		{ title: t("Asset User"), col: "assetUser", sort: true },
		{ title: t("Asset Type"), col: "assetType", sort: true },
		{ title: t("Asset ID"), col: "assetId", sort: true },
		{ title: t("Purchased Date"), col: "purchaseDate", sort: true },
		{ title: t("Warranty Expiry"), col: "warrantyExpiry", sort: true },
		{ title: t("Amount"), col: "amount", sort: true },
		{ title: t("Status"), col: "status", sort: true },
		{ title: t("Action"), col: "action" },
	]


	let filteredrows = asset_list.filter((item) => {
		let include = true
		if (filters.search && filters.search.length > 0) {
			include = item.assetId.toLowerCase().includes(filters.search.toLowerCase())
			if (!include) return false
		}
		if (filters.status) {
			include = item?.status === filters.status
			if (!include) return false
		}
		return include
	}).sort((a, b) => {
		if (sortDir === 'asc') return a[sortCol]?.localeCompare(b[sortCol])
		else return b[sortCol]?.localeCompare(a[sortCol])
	})
	const indexOfLastItem = page * perPage;
	const indexOfFirstItem = indexOfLastItem - perPage;
	const paginatedData = filteredrows.slice(indexOfFirstItem, indexOfLastItem);

	const rows = paginatedData.map(item => {
		return {
			assetUser: item.user ?
				<div className="flex items-center justify-start gap-4 grow">
					<Profile name={item.user.firstName} image={item.user.avatar} />
					<div className={'flex flex-col gap-1 text-left'}>
						<strong className={'text-themeGrayscale900 text-sm'}>{item.user.firstName} {item.user.lastName}</strong>
						<span className={'text-themeGrayscale500 text-xs'}>{item.user.employeeCode}</span>
					</div>
				</div> : "------",
			assetType: <Link href={`inventory/details/${item._id}`} className="flex items-center justify-center gap-3 text-themeGrayscale no-underline font-normal hover:text-themePrimary">
				<IconCompnent icon={item?.assetType?.icon} />
				<span>{item?.assetType?.name}</span>
			</Link>,
			assetId: item?.assetId || "------",
			purchaseDate: <DisplayDate date={item.purchaseDate} />,
			warrantyExpiry: <DisplayDate date={item.warrantyExpiry} />,
			amount: item.cost.toFixed(2),
			status: <span className='zt-tag zt-tag-purple capitalize'>{item.status}</span>,
			action: <DropDown icon={<ThreeDotsVertical />}>
				<ul className="zt-themeDropDownList zt-sm gap-4">
					{item.status !== 'assigned' && <li className="!p-0">
						<a onClick={() => { setCreate('assignTo'); setSelected(item) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal'}>
							<span><AssignTo /></span>
							<span className="whitespace-nowrap">{t('Assign To')}</span>
						</a>
					</li>}
					{item.status === 'assigned' && <li className="!p-0">
						<a onClick={() => { setCreate('returnTo'); setSelected(item) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal'}>
							<span><ReturnTo /></span>
							<span className="whitespace-nowrap">{t('Return To')}</span>
						</a>
					</li>}
					<li className="!p-0">
						<a onClick={() => { setSelected(item); setCreate('create') }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
							<span><Edit /></span>
							<span>{t("Edit")}</span>
						</a>
					</li>
					<li className="!p-0">
						<a onClick={() => removeAsset(item)} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
							<span><Trash /></span>
							<span>{t('Delete')}</span>
						</a>
					</li>
				</ul>
			</DropDown>
		}
	})

	const pagination = {
		totalRecords: asset_list.length,
		showPerPage: true,
		prevAction: () => page > 1 && setPage(page - 1),
		clickAction: (value) => setPage(value),
		nextAction: () => setPage(page + 1),
	}

	const removeAsset = (item) => {
		Toast.confirmDelete(() => {
			dispatch(DeleteAsset(item._id, () => {
				Toast.success(t("Asset deleted successfully"))
			}))
		}, t)
	}

	useEffect(() => {
		dispatch(FetchAssets())
	}, [dispatch])

	return (
		<section className="flex flex-col grow">
			<div className="flex justify-between pb-6">
				<div className="flex flex-col">
					<h1 className="text-h4 mb-0">{t("Assets Inventory Page")}</h1>
					<p className="mb-0">{t("Manage your employee Assets")}</p>
				</div>
				<div className="flex items-start gap-2">
					{/* <Button className={"btn btn-dark-outline"}>{t("Export")}</Button>
					<Button className={"btn btn-dark-outline"}>{t("Import")}</Button> */}
					<Button className={"btn btn-primary"} onClick={() => setCreate('create')}>{t("Add Asset")}</Button>
				</div>
			</div>

			<div className=" zt-card grow">
				<FilterArea title={t("Inventory")}
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
					className={'zt-inventoryTable text-center text-sm'}
				/>
			</div>
			{create === "create" && <CreateAssetForm asset={selected} onClose={() => { setCreate(""); setSelected(null) }} />}
			{create === "assignTo" && <AssignToForm asset={selected} onClose={() => { setCreate(""); setSelected(null) }} />}
			{create === "returnTo" && <ReturnToForm asset={selected} onClose={() => { setCreate(""); setSelected(null) }} />}
		</section>
	)
}