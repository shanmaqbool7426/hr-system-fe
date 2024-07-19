import { Button, DropDown, Table } from '@/components/elements'
import ProgressBar from '@/components/elements/ProgressBar'
import UserListView from '@/components/elements/UserListView'
import AddTaskForm from '@/components/forms/projects/addTask'
import CreateBoardForm from '@/components/forms/projects/createBoard'
import FeedbackForm from '@/components/forms/projects/feedback'
import RaiseIssueForm from '@/components/forms/projects/raiseIssue'
import FilterArea from '@/components/includes/FilterArea'
import { ChevronLeft, DiscussionIcon, Edit, GridIcon, ListIcon, StarIcon, ThreeDotsVertical, Trash, WarningIcon } from '@/components/svg'
import TaskCard from '@/modules/projects/taskCard'
import Link from 'next/link'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import CreatProjectsForm from '@/components/forms/projects/createProjects'
import DiscussionForm from '@/components/forms/projects/discussion'
const data = [
    { name: 'High', value: 300 },
    { name: 'Medium', value: 300 },
    { name: 'Low', value: 300 },
];


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
const COLORS = ['#165DFF', '#E03137', '#F16E16'];

const teamData = [
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
    const [view, setView] = useState("grid")
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [create, setCreate] = useState(false)
    const [feedback, setFeedback] = useState(false)
    const [discussion, setDiscussion] = useState(false)
    const [task, setTask] = useState(false)
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
    const headings = [
        { title: t("Task Id"), col: "TaskId" },
        { title: t("Task Name"), col: "TaskName" },
        { title: t("Task Time"), col: "TaskTime", sort: true },
        { title: t("Project Name"), col: "ProjectName" },
        { title: t("Due Date"), col: "DueDate", sort: true },
        { title: t("Leader"), col: "Leader" },
        { title: t("Assignee"), col: "Assignee" },
        { title: t("Priority"), col: "Priority", sort: true },
        { title: t("Status"), col: "Status", sort: true },
        { title: t("Action"), col: "action" },
    ]

    const rows = [
        {
            TaskId: "PJT-001",
            ProjectName: "Office Mangement",
            TaskName: "Splash",
            Leader: <div>{tableData.map((ele, i) => (
                <UserListView imgClass="h-[32px] w-[32px]" key={i} list={ele.team} limit={2} />
            ))}</div>,
            Assignee: <div>{tableData.map((ele, i) => (
                <UserListView imgClass="h-[32px] w-[32px]" key={i} list={ele.team} limit={2} />
            ))}</div>,
            Priority: <span className={"zt-tag zt-tag-danger"}>High</span>,
            TaskTime: "01:00",
            DueDate: "18 May 2024",
            Feedback: <div className='flex flex-col justify-start items-start'>
                <span className='text-xs'>Feedback From <span className='text-themePurple font-semibold'>Jhon</span></span>
                <div className='flex gap-1 items-center'><span className='text-sm font-semibold'>3.0</span> <div className='flex'><StarIcon className={'text-themeSecondary'} /><StarIcon className={'text-themeSecondary'} /><StarIcon className={'text-themeSecondary'} /><StarIcon className={'text-gray-400'} /><StarIcon className={'text-gray-400'} /></div></div>
                <span className='text-xs'>“Good Job”</span>
            </div>,
            Status: <span className={"zt-tag zt-tag-success"}>Done</span>,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-52 h-40 overflow-y-auto">
                    <li className="!p-0">
                        <a onClick={() => { setRaiseIssue(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
                            <span><WarningIcon /></span>
                            <span>{t("Raise Issue")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={()=>{setTask(true)}}  className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccess'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => { setDiscussion(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccess'}>
                            <span><DiscussionIcon /></span>
                            <span>{t("Discussion")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                            <span><Edit /></span>
                            <span>{t("Change Status")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>,
        },
        {
            TaskId: "PJT-001",
            ProjectName: "Office Mangement",
            TaskName: "Login",
            Leader: <div>{tableData.map((ele, i) => (
                <UserListView imgClass="h-[32px] w-[32px]" key={i} list={ele.team} limit={2} />
            ))}</div>,
            Assignee: <div>{tableData.map((ele, i) => (
                <UserListView imgClass="h-[32px] w-[32px]" key={i} list={ele.team} limit={2} />
            ))}</div>,
            Priority: <span className={"zt-tag zt-tag-warning"}>Normal</span>,
            TaskTime: "01:00",
            DueDate: "18 May 2024",
            Feedback: <div className='flex flex-col justify-start items-start'>
                <span className='text-xs'>Feedback From <span className='text-themePurple font-semibold'>Jhon</span></span>
                <div className='flex gap-1 items-center'><span className='text-sm font-semibold'>3.0</span> <div className='flex'><StarIcon className={'text-themeSecondary'} /><StarIcon className={'text-themeSecondary'} /><StarIcon className={'text-themeSecondary'} /><StarIcon className={'text-gray-400'} /><StarIcon className={'text-gray-400'} /></div></div>
                <span className='text-xs'>“Good Job”</span>
            </div>,
            Status: <span className={"zt-tag zt-tag-primary"}>Working</span>,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-52 h-40 overflow-y-auto">
                    <li className="!p-0">
                        <a onClick={() => { setRaiseIssue(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
                            <span><WarningIcon /></span>
                            <span>{t("Raise Issue")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={()=>{setTask(true)}}  className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => { setDiscussion(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccess'}>
                            <span><DiscussionIcon /></span>
                            <span>{t("Discussion")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                            <span><Edit /></span>
                            <span>{t("Change Status")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>,
        },
    ]
    const taskStatus = [
        {
            status: "Pending",
            bg: "bg-themeDanger/5",
            headBg: "bg-themeDanger",
            taskName01: "Splash",
            taskName02: "Forgot Password",
            varient: "danger",
            normalBtn: "light-danger",
            firstBtn: "Normal",
            pendingBtn: "light-danger",
            secBtn: "Pending",
            progress: "40%"
        },
        {
            status: "Progress",
            bg: "bg-themeBlue/5",
            headBg: "bg-themeBlue",
            taskName01: "Login",
            taskName02: "Sign Up",
            firstBtn: "Normal",
            secBtn: "Working",
            varient: "primary",
            normalBtn: "light-secondary",
            pendingBtn: "gray",
            progress: "40%",
            workingBtn: "gray",
        },
        {
            status: "Completed",
            bg: "bg-themeSuccess/10",
            headBg: "bg-themeSuccess",
            taskName01: "Website Redesign",
            taskName02: "Profile Design",
            varient: "success",
            firstBtn: "Normal",
            secBtn: "Working",
            normalBtn: "light-secondary",
            pendingBtn: "gray",
            progress: "40%"
        },
    ]
    return (
        <section className="flex flex-col grow">
            <div className="flex justify-between pb-6">
                <h1 className="text-h4 mb-0 flex items-center justify-start gap-3">
                    <Link href={`/projects/task-board`}><ChevronLeft className={'text-themeGrayscale600'} width={10} /></Link>
                    <span className='shrink-0'>{t("Task Board")}</span>
                </h1>
                {/* <h1 className="text-h4 mb-0">{t("Task Board")}</h1> */}
                <div className='flex gap-6 items-center'>
                    <div className='rounded-full p-1 flex bg-themeGrayscale200'>
                        <button onClick={() => setView('list')} className={`${view === "list" ? "bg-themePurple" : ""} rounded-full p-2`}><ListIcon className={`${view === "list" ? "text-white" : "text-themeGrayscale500"}`} /></button>
                        <button onClick={() => setView('grid')} className={`${view === "grid" ? "bg-themePurple" : ""} rounded-full p-2`}><GridIcon className={`${view === "grid" ? "text-white" : "text-themeGrayscale500"}`} /></button>
                    </div>
                    <Button className={"btn btn-dark-outline"} onClick={() => setTask(true)}>{t("Add Task")}</Button>

                </div>
            </div>
            <div className="w-full bg-white p-6 rounded-lg grow">
                <FilterArea title={t("")}
                    elements={filterElements}
                    filters={filters}
                    setFilters={setFilters}
                />
                {view === "grid" ?
                    <div>
                        <div className='zt-taskBoardList'>
                            {["Task Priority", "Task Status", "Task Time"].map((ele, i) => (
                                <div key={i} className='p-6 rounded-lg bg-white'>
                                    <h2 className='text-lg text-themeGrayscale900 font-bold mb-8'>{ele}</h2>
                                    <PieChart width={300} height={300} className='!max-h-[351px] relative'>
                                        <Pie
                                            data={data}
                                            cx={"50%"}
                                            cy={"50%"}
                                            labelLine={false}
                                            label={renderCustomizedLabel}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className='flex gap-20 mb-4'>
                                <div className='zt-projectTeam flex flex-col gap-3'>
                                    <strong>Project Leader</strong>
                                    {teamData.map((ele, i) => (
                                        <UserListView imgClass="h-[32px] w-[32px]" key={i} list={ele.team} limit={2} />
                                    ))}
                                </div>
                                <div className='zt-projectLeaders flex flex-col gap-3'>
                                    <strong> Team</strong>
                                    {teamData.map((ele, i) => (
                                        <UserListView imgClass="h-[32px] w-[32px]" key={i} list={ele.leaders} limit={3} />
                                    ))}
                                </div>
                            </div>
                            <ProgressBar percentage={"40%"} variant={'success'} containerClasses={'flex flex-col gap-4'} titleBarClasses={'mb-0 flex justify-between'} progressClasses={'flex flex-col'} progressBarClasses={'grow rounded-full'} />
                            <div className='grid grid-cols-3 gap-6 py-6'>
                                {taskStatus.map((task, index) => (
                                    <TaskCard key={index} taskData={task} />
                                ))}
                            </div>
                        </div>
                    </div> :
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
                }
                {create && <CreatProjectsForm
                    onClose={() => { setCreate(false) }}
                />}
                {raiseIssue && <RaiseIssueForm
                    onClose={() => { setRaiseIssue(false) }}
                />}
                {feedback && <FeedbackForm
                    onClose={() => { setFeedback(false) }}
                />}
                {task && <AddTaskForm 
                    onClose={() => { setTask(false) }}
                />}
                {discussion && <DiscussionForm
                    onClose={() => { setDiscussion(false) }}
                />}
            </div>
        </section>
    )
}
