import { Button, CheckBox, DropDown, Table } from '@/components/elements'
import UserListView from '@/components/elements/UserListView'
import CreatProjectsForm from '@/components/forms/projects/creatProjects'
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
    href: "/projects/details",
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
    href: "/projects/details",
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
    href: "/projects/details",
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
		{ title: t(""), col: "sr", check: true },
		{ title: t("Sr#"), col: "SerailNo" },
    { title: t("Project"), col: "Project", sort: true },
    { title: t("Project ID"), col: "ProjectID", sort: true },
    { title: t("Client"), col: "Client", sort: true },
    { title: t("Leader"), col: "Leader", sort: true },
    { title: t("Team"), col: "Team", sort: true },
    { title: t("Task Time"), col: "TaskTime", sort: true },
    { title: t("Deadline"), col: "Deadline", sort: true },
    { title: t("Priority"), col: "Priority", sort: true },
    { title: t("Status"), col: "Status", sort: true },
    { title: t("Amount"), col: "Amount", sort: true },
    { title: t("Action"), col: "Action" },
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
      Project: <Link href={'/projects/details'}><span className=''>Office Management</span></Link>,
      ProjectID: "PJT- 001",
      Client: 'Arun',
      Leader: <figure className={`overflow-hidden rounded-full  border-2 border-white m-0`}>
        <Image src={'/assets/images/users/user-03.jpg'} width={32} height={32} alt="Leade" /></figure>,
      Team: <div>{tableData.map((ele, i) => (
        <UserListView imgClass="h-[32px] w-[32px]" key={i} list={ele.team} limit={2} />
      ))}</div>,
      TaskTime: "548:00",
      Deadline: "22 March 2023",
      Priority: <span className='zt-tag zt-tag-danger'>High</span>,
      Status: <span className='zt-tag zt-tag-success'>Active</span>,
      Amount: "$1205",
      Action: <div className='flex gap-2'>
        <Button variant={"light-primary"} className={'!py-2 !px-2'}><Edit /></Button>
        <Button variant={"light-danger"} className={'!py-2 !px-2'}><Trash /></Button>
      </div>,
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
      Project: <Link href={'/projects/details'}><span className=''>Video Calling</span></Link>,
      ProjectID: "PJT- 001",
      Client: 'Arun',
      Leader: <figure className={`overflow-hidden rounded-full  border-2 border-white m-0`}>
        <Image src={'/assets/images/users/user-03.jpg'} width={32} height={32} alt="Leade" /></figure>,
      Team: <div>{tableData.map((ele, i) => (
        <UserListView imgClass="h-[32px] w-[32px]" key={i} list={ele.team} limit={2} />
      ))}</div>,
      TaskTime: "548:00",
      Deadline: "22 March 2023",
      Priority: <span className='zt-tag zt-tag-warning'>Normal</span>,
      Status: <span className='zt-tag zt-tag-success'>Active</span>,
      Amount: "$1205",
      Action: <div className='flex gap-2'>
        <Button variant={"light-primary"} className={'!py-2 !px-2'}><Edit /></Button>
        <Button variant={"light-danger"} className={'!py-2 !px-2'}><Trash /></Button>
      </div>,
    },
  ]
  return (
    <section className="flex flex-col grow">
      <div className="flex justify-between pb-6">
        <h1 className="text-h4 mb-0">{t("Projects")}</h1>
        <div className='flex gap-6 items-center'>
          <div className='rounded-full p-1 flex bg-themeGrayscale200'>
            <button onClick={() => setView('list')} className={`${view === "list" ? "bg-themePurple" : ""} rounded-full p-2`}><ListIcon className={`${view === "list" ? "text-white" : "text-themeGrayscale500"}`} /></button>
            <button onClick={() => setView('grid')} className={`${view === "grid" ? "bg-themePurple" : ""} rounded-full p-2`}><GridIcon className={`${view === "grid" ? "text-white" : "text-themeGrayscale500"}`} /></button>
          </div>
          <Button className={"btn btn-primary"} onClick={() => setCreate(true)}>{t("Add Project")}</Button>
        </div>
      </div>
      <div className="w-full bg-white p-6 rounded-lg grow">
        <FilterArea title={t("")}
          elements={filterElements}
          filters={filters}
          setFilters={setFilters}
        />
        {view === "grid" ?
          <div className='zt-projectsList !shadow-none'>
            <h2 className="text-h5 mb-0 col-span-3">{t("Projects")}</h2>
            {Projects.map((project, index) => (
              <ProjectCard key={index} projectData={project} />
            ))}
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
      </div>
    </section>
  )
}
