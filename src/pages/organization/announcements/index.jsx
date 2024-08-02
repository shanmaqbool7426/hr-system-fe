import { Button, SearchInput, Table, SearchSelect, Tabs, MultiSelect, DropDown, CheckBox, Datepicker } from "@/components/elements";
import { Edit, EyeOn, ThreeDotsVertical, Trash } from "@/components/svg";
import { FetchEmployees, DeleteEmployee } from "@/store/actions/employee.actions";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterArea from "@/components/includes/FilterArea";
import CreateRoleForm from "@/components/forms/roles/create";
import Toast from "@/util/toast";
import CreateAnnouncementForm from "@/components/forms/organization/announcement/createAnnouncement";


export default function AnnouncementsPage() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { is_loading, total_records, employees_list } = useSelector((state) => state.employee)
	const [sortCol, setSortCol] = useState(null)
	const [sortDir, setSortDir] = useState(null)
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(10)
	const [create, setCreate] = useState("") 
	const [edit, setEdit] = useState(false) 
	const [filters, setFilters] = useState({
		search: "",
		project: null,
		department: null,
		status: "all",
	})

	const months = [
		{ display: "January", value: "January" },
		{ display: "February", value: "February" },
		{ display: "March", value: "March" },
		{ display: "April", value: "April" },
		{ display: "May", value: "May" },
		{ display: "June", value: "June" },
		{ display: "July", value: "July" },
		{ display: "August", value: "August" },
		{ display: "September", value: "September" },
		{ display: "October", value: "October" },
		{ display: "November", value: "November" },
		{ display: "December", value: "December" },
	]

	const filterElements = [
		{
			type: "search",
			name: "search",
			value: filters.search,
			placeholder: t("Announcement Title"),
			className: "xl:col-span-1",
			onChange: (event) => {
				let _filter = { ...filters }
				_filter['search'] = event.target.value
				setFilters(_filter)
			}
		},
		{
			type: "select",
			name: "SelectYear",
			placeholder: t("Select Year"),
			list: [{ display: "2021", value: '2021' }, { display: "2022", value: '2022' }],
			onChange: (status) => {
				let _filter = { ...filters }
				_filter['status'] = status
				setFilters(_filter)
			}
		},
		{
			type: "select",
			name: "SelectMonth",
			placeholder: t("Select Month"),
			list: months,
			onChange: (status) => {
				let _filter = { ...filters }
				_filter['status'] = status
				setFilters(_filter)
			}
		},
		{
			type: "select",
			name: "AnnouncementType",
			placeholder: t("Announcement Type"),
			list: [{ display: "News", value: "News" }, { display: "HR Policy", value: "HR Policy" }],
			onChange: (status) => {
				let _filter = { ...filters }
				_filter['status'] = status
				setFilters(_filter)
			}
		},
		{
			type: "select",
			name: "Flag",
			placeholder: t("Flag"),
			list: [{ display: "Mark", value: "Mark" }, { display: "Unmark", value: "Unmark" }],
			onChange: (status) => {
				let _filter = { ...filters }
				_filter['status'] = status
				setFilters(_filter)
			}
		},
	]
 
	const headings = [

		{ title: t("Title"), col: "Title" },
		{ title: t("Display Start Date"), col: "DisplayStartDate" },
		{ title: t("Display End Date"), col: "DisplayEndDate" },
		{ title: t("Type"), col: "Type" },
		{ title: t("Modified On"), col: "ModifiedOn" },
		{ title: t("Action"), col: "action" },
	]

	const rows = [
		{
			Title: "Work from Home Policy",
			DisplayStartDate: "22 March 2024",
			DisplayEndDate: "22 March 2024",
			Type: "HR Policies",
			ModifiedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
				<span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
			</div></div>,

			action:
				<DropDown icon={<ThreeDotsVertical />}>
					<ul className="zt-themeDropDownList zt-sm gap-4">
						<li className="!p-0">
							<a onClick={() => { setEdit(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
								<span><Edit /></span>
								<span>{t("Edit")}</span>
							</a>
						</li>
						<li className="!p-0">
							<a onClick={() => {
								Toast.confirmDelete(() => {
									Toast.success(t("Announcement deleted successfully"))
								}, t)
							}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
								<span><Trash /></span>
								<span>{t("Delete")}</span>
							</a>
						</li>
					</ul>
				</DropDown>,
		},
		{
			Title: "ISO 27001 Audit Schedule",
			DisplayStartDate: "22 March 2024",
			DisplayEndDate: "22 March 2024",
			Type: "HR Policies",
			ModifiedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
				<span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
			</div></div>,

			action:
				<DropDown icon={<ThreeDotsVertical />}>
					<ul className="zt-themeDropDownList zt-sm gap-4">
						<li className="!p-0">
							<a onClick={() => { setEdit(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
								<span><Edit /></span>
								<span>{t("Edit")}</span>
							</a>
						</li>
						<li className="!p-0">
							<a onClick={() => {
								Toast.confirmDelete(() => {
									Toast.success(t("Announcement deleted successfully"))
								}, t)
							}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
								<span><Trash /></span>
								<span>{t("Delete")}</span>
							</a>
						</li>
					</ul>
				</DropDown>,
		},
		{
			Title: "Overtime Policy",
			DisplayStartDate: "22 March 2024",
			DisplayEndDate: "22 March 2024",
			Type: "HR Policies",
			ModifiedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
				<span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
			</div></div>,

			action:
				<DropDown icon={<ThreeDotsVertical />}>
					<ul className="zt-themeDropDownList zt-sm gap-4">
						<li className="!p-0">
							<a onClick={() => { setEdit(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
								<span><Edit /></span>
								<span>{t("Edit")}</span>
							</a>
						</li>
						<li className="!p-0">
							<a onClick={() => {
								Toast.confirmDelete(() => {
									Toast.success(t("Announcement deleted successfully"))
								}, t)
							}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
								<span><Trash /></span>
								<span>{t("Delete")}</span>
							</a>
						</li>
					</ul>
				</DropDown>,
		},
		{
			Title: "Attendance Policy",
			DisplayStartDate: "22 March 2024",
			DisplayEndDate: "22 March 2024",
			Type: "HR Policies",
			ModifiedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
				<span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
			</div></div>,

			action:
				<DropDown icon={<ThreeDotsVertical />}>
					<ul className="zt-themeDropDownList zt-sm gap-4">
						<li className="!p-0">
							<a onClick={() => { setEdit(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
								<span><Edit /></span>
								<span>{t("Edit")}</span>
							</a>
						</li>
						<li className="!p-0">
							<a onClick={() => {
								Toast.confirmDelete(() => {
									Toast.success(t("Announcement deleted successfully"))
								}, t)
							}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
								<span><Trash /></span>
								<span>{t("Delete")}</span>
							</a>
						</li>
					</ul>
				</DropDown>,
		},
		{
			Title: "Leave Policy",
			DisplayStartDate: "22 March 2024",
			DisplayEndDate: "22 March 2024",
			Type: "HR Policies",
			ModifiedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
				<span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
			</div></div>,

			action:
				<DropDown icon={<ThreeDotsVertical />}>
					<ul className="zt-themeDropDownList zt-sm gap-4">
						<li className="!p-0">
							<a onClick={() => { setEdit(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
								<span><Edit /></span>
								<span>{t("Edit")}</span>
							</a>
						</li>
						<li className="!p-0">
							<a onClick={() => {
								Toast.confirmDelete(() => {
									Toast.success(t("Announcement deleted successfully"))
								}, t)
							}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
								<span><Trash /></span>
								<span>{t("Delete")}</span>
							</a>
						</li>
					</ul>
				</DropDown>,
		},
		{
			Title: "Loan Policy",
			DisplayStartDate: "22 March 2024",
			DisplayEndDate: "22 March 2024",
			Type: "HR Policies",
			ModifiedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
				<span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
			</div></div>,

			action:
				<DropDown icon={<ThreeDotsVertical />}>
					<ul className="zt-themeDropDownList zt-sm gap-4">
						<li className="!p-0">
							<a onClick={() => { setEdit(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
								<span><Edit /></span>
								<span>{t("Edit")}</span>
							</a>
						</li>
						<li className="!p-0">
							<a onClick={() => {
								Toast.confirmDelete(() => {
									Toast.success(t("Announcement deleted successfully"))
								}, t)
							}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
								<span><Trash /></span>
								<span>{t("Delete")}</span>
							</a>
						</li>
					</ul>
				</DropDown>,
		},
		{
			Title: "Advance Salary Policy",
			DisplayStartDate: "22 March 2024",
			DisplayEndDate: "22 March 2024",
			Type: "HR Policies",
			ModifiedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
				<span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
			</div></div>,

			action:
				<DropDown icon={<ThreeDotsVertical />}>
					<ul className="zt-themeDropDownList zt-sm gap-4">
						<li className="!p-0">
							<a onClick={() => { setEdit(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
								<span><Edit /></span>
								<span>{t("Edit")}</span>
							</a>
						</li>
						<li className="!p-0">
							<a onClick={() => {
								Toast.confirmDelete(() => {
									Toast.success(t("Announcement deleted successfully"))
								}, t)
							}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
								<span><Trash /></span>
								<span>{t("Delete")}</span>
							</a>
						</li>
					</ul>
				</DropDown>,
		},
		{
			Title: "Lunch Policy",
			DisplayStartDate: "22 March 2024",
			DisplayEndDate: "22 March 2024",
			Type: "HR Policies",
			ModifiedOn: <div className="flex justify-center"><div className="flex flex-col items-start"><span>22 March2024<span className="text-themeGrayscale500"> 7:00PM</span></span>
				<span className="text-themeGrayscale500">By <span className="text-[#7239EA]">Jhon Carter</span></span>
			</div></div>,

			action:
				<DropDown icon={<ThreeDotsVertical />}>
					<ul className="zt-themeDropDownList zt-sm gap-4">
						<li className="!p-0">
							<a onClick={() => { setEdit(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
								<span><Edit /></span>
								<span>{t("Edit")}</span>
							</a>
						</li>
						<li className="!p-0">
							<a onClick={() => {
								Toast.confirmDelete(() => {
									Toast.success(t("Announcement deleted successfully"))
								}, t)
							}} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
								<span><Trash /></span>
								<span>{t("Delete")}</span>
							</a>
						</li>
					</ul>
				</DropDown>,
		},
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
					<h1 className="text-h4 mb-0">{t("Announcement")}</h1>
				</div>
				<Button className={"btn btn-primary"} onClick={() => setCreate('roles')}>{t("Add Announcement")}</Button>
			</div>

			<div className=" zt-card grow">
				<FilterArea
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
			{edit && <CreateAnnouncementForm onClose={() => {
				setEdit(false) 
			}} />}
			{create && <CreateAnnouncementForm onClose={() => {
				setCreate(false)
			}} />}
		</section>
	)
}