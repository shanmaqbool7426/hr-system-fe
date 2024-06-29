import { Button, DropDown, Table } from '@/components/elements'
import UserListView from '@/components/elements/UserListView'
import AddProjectsForm from '@/components/forms/projects/addProjects'
import FilterArea from '@/components/includes/FilterArea'
import { Edit, GridIcon, ListIcon, ThreeDotsVertical, Trash } from '@/components/svg'
import ProjectCard from '@/modules/employee/projects/projectCard'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

const Projects = [
  {
    "name": "Office Management",
    href:"/projects/details",
    "openTasks": 1,
    "completedTasks": 9,
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. When an unknown printer took a galley of type and scrambled it...",
    "deadline": "17 Apr 2024",
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
    "progress": "70%"
  },
  {
    "name": "Office Management",
    href:"/projects/details",
    "openTasks": 1,
    "completedTasks": 9,
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. When an unknown printer took a galley of type and scrambled it...",
    "deadline": "17 Apr 2024",
    "leaders": [
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-02.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-03.jpg" },
    ],
    "team": [
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-02.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-03.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-04.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-05.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-06.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-07.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-08.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-09.jpg" }
    ],
    "progress": "40%"
  },
  {
    href:"/projects/details",
    "name": "Office Management",
    "openTasks": 1,
    "completedTasks": 9,
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. When an unknown printer took a galley of type and scrambled it...",
    "deadline": "17 Apr 2024",
    "leaders": [
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-02.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-03.jpg" },
    ],
    "team": [
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-02.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-03.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-04.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-05.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-06.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-07.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-08.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-09.jpg" }
    ],
    "progress": "20%"
  },
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
export default function ProjectsModule() {
  const { t } = useTranslation() 
  const [view, setView] = useState("grid")
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [create, setCreate] = useState(false)
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
      name: "search",
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
      name: "Designation",
      className: "xl:col-span-2",
      placeholder: "Designation",
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
    { title: t("Task Board Name"), col: "TaskBoardName" },
    { title: t("Project Name"), col: "ProjectName" },
    { title: t("Sprint"), col: "Sprint" },
    { title: t("Due Date"), col: "DueDate" },
    { title: t("Project Leader"), col: "ProjectLeader" },
    { title: t("Team"), col: "Team" }, 
  ]

  const rows = [
    {
      TaskBoardName: <Link href={'/projects/task-board-detail'}><span className=''>Office Management</span></Link>,
      ProjectName: "Spalsh",
      Sprint: '01',
      ProjectLeader: <figure className={`flex justify-center overflow-hidden rounded-full  border-2 border-white m-0`}>
        <Image src={'/assets/images/users/user-03.jpg'} width={32} height={32} alt="Leade" /></figure>,
      Team: <div className='flex justify-center'>{tableData.map((ele, i) => (
        <UserListView imgClass="h-[32px] w-[32px]" key={i} list={ele.team} limit={2} />
      ))}</div>, 
      DueDate: "22 March 2023",  
    },
    {
        TaskBoardName: <Link href={'/projects/task-board-detail'}><span className=''>Office Management</span></Link>,
        ProjectName: "Spalsh",
        Sprint: '01',
        ProjectLeader: <figure className={`flex justify-center overflow-hidden rounded-full  border-2 border-white m-0`}>
          <Image src={'/assets/images/users/user-03.jpg'} width={32} height={32} alt="Leade" /></figure>,
        Team: <div className='flex justify-center'>{tableData.map((ele, i) => (
          <UserListView imgClass="h-[32px] w-[32px]" key={i} list={ele.team} limit={2} />
        ))}</div>, 
        DueDate: "22 March 2023",  
      },
  ]
  return (
    <section className="flex flex-col grow">
      <div className="flex justify-between pb-6">
        <h1 className="text-h4 mb-0">{t("Task Board")}</h1>       
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
        {create && <AddProjectsForm
          title={t('Add Project')}
          type={'New Request'}
          onClose={() => { setCreate(false) }}
        />}
      </div>
    </section>
  )
}
