import { Button, SearchInput, Table, SearchSelect, Tabs, MultiSelect, DropDown, CheckBox } from "@/components/elements";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import { FetchEmployees, DeleteEmployee } from "@/store/actions/employee.actions";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterArea from "@/components/includes/FilterArea";
import CreateRoleForm from "@/components/forms/roles/create";
import Toast from "@/util/toast";


export default function EmployeeRolesPage() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { is_loading, total_records, employees_list } = useSelector((state) => state.employee)
	const [sortCol, setSortCol] = useState(null)
	const [sortDir, setSortDir] = useState(null)
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(10)
	const [create, setCreate] = useState("")
	const [selected, setSelected] = useState(null)
	const [filters, setFilters] = useState({
		search: "",
		project: null,
		department: null,
		status: "all",
	})

	const EmployeeStatuses = [
		{ display: "All Status", value: "all" },
		{ display: "Active", value: "active" },
		{ display: "In Active", value: "inactive" },
	]

	const filterElements = [
		{
			type: "search",
			name: "search",
			value: filters.search,
			placeholder: t("Search employees by name & email"),
			className: "xl:col-span-1",
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
			list: EmployeeStatuses,
			onChange: (status) => {
				let _filter = { ...filters }
				_filter['status'] = status
				setFilters(_filter)
			}
		},
	]

	const removeRole = (item = null) => {
		Toast.confirmDelete(() => {
			// dispatch(DeleteEmployee(item._id, () => {
			Toast.success(t("Employee role deleted successfully"))
			// }))
		}, t)
	}

	const headings = [
		
		{ title: t("Roles"), col: "name", sort: true },
		{ title: t("Description"), col: "description", sort: false },
		{ title: t("Status"), col: "status", sort: false },
		{ title: t("Action"), col: "action" },
	]

	const rows = [{
	
		name: "Manager",
		description: "Lorem ipsum",
		status: "active",
		action: <DropDown icon={<ThreeDotsVertical />}>
			<ul className="zt-themeDropDownList zt-sm gap-4">
				<li className="!p-0">
					<a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}
						onClick={() => {
							setSelected("")
						}}
					>
						<span><Edit /></span>
						<span>Edit</span>
					</a>
				</li>
				<li className="!p-0">
					<a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}
						onClick={() => removeRole()}>
						<span><Trash /></span>
						<span>Delete</span>
					</a>
				</li>
			</ul>
		</DropDown>
	}
	]
	const pagination = {
		totalRecords: total_records,
		showPerPage: true,
		prevAction: () => page > 1 && setPage(page - 1),
		clickAction: (value) => setPage(value),
		nextAction: () => setPage(page + 1),
	}

	useEffect(() => {
		dispatch(FetchEmployees())
	}, [dispatch])

	return (
		<section className="flex flex-col grow">
			<div className="flex justify-between items-center pb-6">
				<div className="">
					<h1 className="text-h4 mb-0">{t("Manage Employee Roles")}</h1>
					<p className="mb-0">{t("Manage your employees Role")}</p>
				</div>
				<div className="flex items-start gap-2">
					<Button className={"btn btn-dark-outline"}>{t("Export")}</Button>
					<Button className={"btn btn-dark-outline"}>{t("Import")}</Button>
					<Button className={"btn btn-primary"} onClick={() => setCreate('roles')}>{t("Create Role")}</Button>
				</div>
			</div>

			<div className=" zt-card grow">
				<FilterArea title={t("Employees Roles")}
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
					className={'zt-employeeRoleTable'}
				/>
			</div>

			{create === "roles" && <CreateRoleForm role={selected} onClose={() => {
				setCreate("")
				setSelected(null)
			}} />}
		</section>
	)
}