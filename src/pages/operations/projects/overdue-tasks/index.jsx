import { Button, CheckBox, DisplayDate, DropDown, Table } from '@/components/elements'
import UserListView from '@/components/elements/UserListView'
import FeedbackForm from '@/components/forms/projects/feedback'
import RaiseIssueForm from '@/components/forms/projects/raiseIssue'
import FilterArea from '@/components/includes/FilterArea'
import { ChevronLeft, DiscussionIcon, Edit, GridIcon, ListIcon, StarIcon, ThreeDotsVertical, Trash, WarningIcon } from '@/components/svg'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import Toast from '@/util/toast'
import DiscussionForm from '@/components/forms/projects/discussion'
import AddTaskForm from '@/components/forms/projects/addTask'
import { DeleteTask, FetchOverDueTasks } from '@/store/actions/task.actions'
import { FetchEmployees } from '@/store/actions/employee.actions'
import moment from 'moment'

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
	const dispatch= useDispatch()
	const [sortCol, setSortCol] = useState(null)
	const [sortDir, setSortDir] = useState(null)
	const [page, setPage] = useState(1)
	const [perPage, setPerPage] = useState(10)
	const [discussion, setDiscussion] = useState(false)
	const [edit, setEdit] = useState(false)
	const [editTask, setEditTask] = useState(null);
    const [task, setTask] = useState(false)
	const [feedback, setFeedback] = useState(false)
	const [raiseIssue, setRaiseIssue] = useState(false)
	const { customfield_list } = useSelector(state => state.customfield)
    const { overdue_task_list  } = useSelector(state => state.task)


	useEffect(()=>{
		dispatch(FetchEmployees())
		dispatch(FetchOverDueTasks())
	},[dispatch])


	const [filters, setFilters] = useState({
        search: "",
        priority: null,
        status: null,
      });
    const filterElements = [
        {
            type: "search",
            name: "Troject",
            value: filters.search,
            placeholder: t("Task Name"),
            className: "xl:col-span-2",
            onChange: (event) => {
                let _filter = { ...filters }
                _filter['search'] = event.target.value
                setFilters(_filter)
            }
        },
        {
            type: "select",
            name: "TaskPriority",
            className: "xl:col-span-2",
            placeholder: "Task Priority",
            value: filters.priority,
            list: [
                { value: "low", display: "Low" },
                { value: "medium", display: "Medium" },
                { value: "high", display: "High" },
            ],
            onChange: (priority) => {
                let _filter = { ...filters }
                _filter['priority'] = priority
                setFilters(_filter)
            }
        },
        {
            type: "select",
            name: "TaskStatus",
            className: "xl:col-span-2",
            placeholder: "Task Status",
            value: filters.status,
            list: [
                { value: "pending", display: "Pending" },
                { value: "progress", display: "Progress" },
                { value: "completed", display: "Completed" },
            ],
        onChange: (status) => {
            let _filter = { ...filters };
                _filter['status'] = status;
                setFilters(_filter);
            }
        },
        
    ]
	const deleteHandler = (item) => {
        Toast.confirmDelete(() => {
          dispatch(
            DeleteTask(item._id, () => {
              Toast.success(t("Task deleted successfully"));
            })
          );
        }, t);
      };
	const headings = [
		
		{ title: t("Task Id"), col: "TaskId" },
		{ title: t("Task Name"), col: "TaskName" },
		{ title: t("Task Time"), col: "TaskTime", sort: true },
		{ title: t("Project Name"), col: "ProjectName" },
		{ title: t("Due Date"), col: "DueDate", sort: true },
		{ title: t("Action"), col: "action" },
	]
	let filteredRows = overdue_task_list?.filter((item) => {
        return (
          (!filters.search || item.name.toLowerCase().includes(filters.search.toLowerCase())) &&
          (!filters.priority || item.priority === filters.priority) &&
          (!filters.status || item.status === filters.status)
        );
      })
        .sort((a, b) => {
          if (!sortCol) return 0;
          if (sortDir === "asc") return a[sortCol]?.localeCompare(b[sortCol]);
          else return b[sortCol]?.localeCompare(a[sortCol]);
        });
    
      const indexOfLastItem = page * perPage;
      const indexOfFirstItem = indexOfLastItem - perPage;
      const paginatedData = filteredRows?.slice(indexOfFirstItem, indexOfLastItem);
      const rows = paginatedData?.map((item,index) => { 
		const isPastDue = moment(item.dueDate).isBefore(moment())  
		return { 
			TaskId: item?.taskId,
			ProjectName: item?.project?.name,
			TaskName: item?.name,
			TaskTime:  item?.requiredTime,
			DueDate: <DisplayDate style={{ color: isPastDue ? 'red' : 'black' }} date={item?.dueDate} />,
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
						<a onClick={() => {
                            setEditTask(item);
                            setTask(true);
                            }}  className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
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
						<a onClick={() => {
                            deleteHandler(item);
                        }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
							<span><Trash /></span>
							<span>{t("Delete")}</span>
						</a>
					</li>
				</ul>
			</DropDown>}
		})
	return (
		<section className="flex flex-col grow">
			<div className="flex justify-between pb-6">
				<h1 className="text-h4 mb-0 flex items-center justify-start gap-3">
					{t("Overdue Tasks")}
				</h1>

			</div>
			<div className=" zt-card grow">
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
				 {task && <AddTaskForm  
                    object={editTask}
                    // additionFields={taskboard_details} 
                    onClose={() => { 
                        setTask(false);
                        setEditTask(null);
                    }}
                />}
			</div>
		</section>
	)
}
