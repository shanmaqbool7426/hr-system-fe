import { Button, CheckBox, DropDown, Table } from '@/components/elements'
import UserListView from '@/components/elements/UserListView'
import FeedbackForm from '@/components/forms/projects/feedback'
import RaiseIssueForm from '@/components/forms/projects/raiseIssue'
import FilterArea from '@/components/includes/FilterArea'
import { ChevronLeft, DiscussionIcon, Edit, GridIcon, ListIcon, StarIcon, ThreeDotsVertical, Trash, WarningIcon } from '@/components/svg'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import CreatProjectsForm from '@/components/forms/projects/createProjects'
import Toast from '@/util/toast'
import DiscussionForm from '@/components/forms/projects/discussion'
import AddTaskForm from '@/components/forms/projects/addTask'

const tableData = [
	{
		"leaders": [
			{ "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg" },
			{ "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-02.jpg" },
			{ "firstName": "ahmed", "lastName": "raza", "avatar": "" },
		],
		"team": [
			{ "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg" },
			{ "firstName": "ahmed", "lastName": "raza", "avatar": "" },
			{ "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-03.jpg" },
			{ "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-04.jpg" },
			{ "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-05.jpg" },
			{ "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-06.jpg" },
			{ "firstName": "ahmed", "lastName": "raza", "avatar": "" },
			{ "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-08.jpg" },
			{ "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-09.jpg" }
		],
	}
]
export default function TaskBoardDetailModule() {
	const { t } = useTranslation()
	const [sortCol, setSortCol] = useState(null)
	const [sortDir, setSortDir] = useState(null)
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(10)
	const [discussion, setDiscussion] = useState(false)
	const [edit, setEdit] = useState(false)
	const [feedback, setFeedback] = useState(false)
	const [raiseIssue, setRaiseIssue] = useState(false)
	const { customfield_list } = useSelector(state => state.customfield)
	const [filters, setFilters] = useState({
		search: "",
		project: null,
		department: null,
		status: null,
	})
	const filterElements = [
		{
			type: "search",
			name: "Project",
			value: filters.search,
			placeholder: t("Project"),
			className: "xl:col-span-2",
			onChange: (event) => {
				let _filter = { ...filters }
				_filter['search'] = event.target.value
				setFilters(_filter)
			}
		},
		{
			type: "customIcon",
			name: "employee",
			value: filters.search,
			placeholder: t("Employee"),
			className: "xl:col-span-2",
			onChange: (event) => {
				let _filter = { ...filters }
				_filter['search'] = event.target.value
				setFilters(_filter)
			}
		},
		{
			type: "select",
			name: "TaskStatus",
			className: "xl:col-span-2",
			placeholder: "Task Status",
			value: filters.status,
			list: customfield_list.filter(item => item.type === 'employee_status').map(item => {
				return { value: item._id, display: item.name }
			}),
			onChange: (status) => {
				let _filter = { ...filters }
				_filter['status'] = status
				setFilters(_filter)
			}
		},
		{
			type: "select",
			name: "TaskPriority",
			className: "xl:col-span-2",
			placeholder: "Task Priority",
			value: filters.status,
			list: customfield_list.filter(item => item.type === 'employee_status').map(item => {
				return { value: item._id, display: item.name }
			}),
			onChange: (status) => {
				let _filter = { ...filters }
				_filter['status'] = status
				setFilters(_filter)
			}
		},
	]
	const handlDelete = (item = null) => {
		Toast.confirmDelete(() => {
			// dispatch(DeleteEmployee(item._id, () => {
			Toast.success(t("Overdue Task Delete"))
			// }))
		}, t)
	}
	const headings = [
		{ title: t(""), col: "sr", check: true },
		{ title: t("Sr#"), col: "SerailNo" },
		{ title: t("Task Id"), col: "TaskId" },
		{ title: t("Task Name"), col: "TaskName" },
		{ title: t("Task Time"), col: "TaskTime", sort: true },
		{ title: t("Project Name"), col: "ProjectName" },
		{ title: t("Due Date"), col: "DueDate", sort: true },
		{ title: t("Action"), col: "action" },
	]

	const rows = [
		{
			sr: <div className="flex items-center">
				<CheckBox
					id={`1`}
					size={'sm'}
					variant={'dark'}
				/>
			</div>,
			SerailNo: '1',
			TaskId: "PJT-001",
			ProjectName: "Office Mangement",
			TaskName: "Splash",
			TaskTime: "01:00",
			DueDate: "18 May 2024",
			Feedback: <div className='flex flex-col justify-start items-start'>
				<span className='text-xs'>Feedback From <span className='text-themePurple font-semibold'>Jhon</span></span>
				<div className='flex gap-1 items-center'><span className='text-sm font-semibold'>3.0</span> <div className='flex'><StarIcon className={'text-themeSecondary'} /><StarIcon className={'text-themeSecondary'} /><StarIcon className={'text-themeSecondary'} /><StarIcon className={'text-gray-400'} /><StarIcon className={'text-gray-400'} /></div></div>
				<span className='text-xs'>“Good Job”</span>
			</div>,
			action: <DropDown icon={<ThreeDotsVertical />}>
				<ul className="zt-themeDropDownList zt-sm gap-4 w-52 h-40 overflow-y-auto">
					<li className="!p-0">
						<a onClick={() => { setRaiseIssue(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
							<span><WarningIcon /></span>
							<span>{t("Raise Issue")}</span>
						</a>
					</li>
					<li className="!p-0">
						<a onClick={() => { setEdit(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
							<span><Edit /></span>
							<span>{t("Edit")}</span>
						</a>
					</li>
					<li className="!p-0">
						<a onClick={() => { setDiscussion(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
							<span><DiscussionIcon /></span>
							<span>{t("Discussion")}</span>
						</a>
					</li>
					<li className="!p-0">
						<a onClick={() => handlDelete()} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
							<span><Trash /></span>
							<span>{t("Delete")}</span>
						</a>
					</li>
				</ul>
			</DropDown>,
		},
		{
			sr: <div className="flex items-center">
				<CheckBox
					id={`2`}
					size={'sm'}
					variant={'dark'}
				/>
			</div>,
			SerailNo: '2',
			TaskId: "PJT-001",
			ProjectName: "Office Mangement",
			TaskName: "Login",
			Leader: <div>{tableData.map((ele, i) => (
				<UserListView imgClass="h-[32px] w-[32px]" key={i} list={ele.team} limit={2} />
			))}</div>,
			Assignee: <div>{tableData.map((ele, i) => (
				<UserListView imgClass="h-[32px] w-[32px]" key={i} list={ele.team} limit={2} />
			))}</div>,
			Priority: <Button variant={"btn btn-orange"}>Normal</Button>,
			TaskTime: "01:00",
			DueDate: "18 May 2024",
			Feedback: <div className='flex flex-col justify-start items-start'>
				<span className='text-xs'>Feedback From <span className='text-themePurple font-semibold'>Jhon</span></span>
				<div className='flex gap-1 items-center'><span className='text-sm font-semibold'>3.0</span> <div className='flex'><StarIcon className={'text-themeSecondary'} /><StarIcon className={'text-themeSecondary'} /><StarIcon className={'text-themeSecondary'} /><StarIcon className={'text-gray-400'} /><StarIcon className={'text-gray-400'} /></div></div>
				<span className='text-xs'>“Good Job”</span>
			</div>,
			Status: <Button variant={"btn btn-blue"}>Working</Button>,
			action: <DropDown icon={<ThreeDotsVertical />}>
				<ul className="zt-themeDropDownList zt-sm gap-4 w-52 h-40 overflow-y-auto">
					<li className="!p-0">
						<a onClick={() => { setRaiseIssue(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
							<span><WarningIcon /></span>
							<span>{t("Raise Issue")}</span>
						</a>
					</li>
					<li className="!p-0">
						<a onClick={() => { setEdit(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
							<span><Edit /></span>
							<span>{t("Edit")}</span>
						</a>
					</li>
					<li className="!p-0">
						<a onClick={() => { setDiscussion(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
							<span><DiscussionIcon /></span>
							<span>{t("Discussion")}</span>
						</a>
					</li>
					<li className="!p-0">
						<a onClick={() => handlDelete()} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
							<span><Trash /></span>
							<span>{t("Delete")}</span>
						</a>
					</li>
				</ul>
			</DropDown>,
		},
	]
	return (
		<section className="flex flex-col grow">
			<div className="flex justify-between pb-6">
				<h1 className="text-h4 mb-0 flex items-center justify-start gap-3">
					{t("Overdue Tasks")}
				</h1>

			</div>
			<div className="w-full bg-white p-6 rounded-lg grow">
				<FilterArea title={t("")}
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
					className={'zt-employeeTable zt-projectsTable'}
				/>
				{raiseIssue && <RaiseIssueForm
					onClose={() => { setRaiseIssue(false) }}
				/>}
				{feedback && <FeedbackForm
					onClose={() => { setFeedback(false) }}
				/>}
				{discussion && <DiscussionForm
					onClose={() => { setDiscussion(false) }}
				/>}
				{edit && <AddTaskForm
					object={true}
					onClose={() => { setEdit(false) }}
				/>}
			</div>
		</section>
	)
}
