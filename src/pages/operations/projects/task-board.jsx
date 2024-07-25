import { Button, CheckBox, DropDown, Table } from '@/components/elements'
import UserListView from '@/components/elements/UserListView'
import DisplayDate from "@/components/elements/DisplayDate";
import CreateBoardForm from '@/components/forms/projects/createBoard'
import CreatProjectsForm from '@/components/forms/projects/createProjects'
import FilterArea from '@/components/includes/FilterArea'
import { FetchTaskBoards } from '@/store/actions/taskboard.actions'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'


export default function ProjectsModule() {
  const { t } = useTranslation()
  const [board, setBoard] = useState(false)
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [create, setCreate] = useState(false)
  const dispatch = useDispatch();
  const { customfield_list } = useSelector(state => state.customfield);
  const { taskboard_list, is_loading } = useSelector(state => state.taskboard);
  const [filters, setFilters] = useState({
    search: "",
    project: null,
    department: null,
    status: null,
  })

  useEffect(() => {
    dispatch(FetchTaskBoards());
  }, [dispatch]);

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
  let filteredRows = taskboard_list?.filter((item) => {
    return (
      filters.search.length === 0 ||
      item.name.toLowerCase().includes(filters.search.toLowerCase())
    );
  })
  .sort((a, b) => {
    if (sortCol) {
      if (sortDir === "asc") return a[sortCol]?.localeCompare(b[sortCol]);
      else return b[sortCol]?.localeCompare(a[sortCol]);
    }
    return 0;
  });

const indexOfLastItem = page * perPage;
const indexOfFirstItem = indexOfLastItem - perPage;
const paginatedData = filteredRows?.slice(indexOfFirstItem, indexOfLastItem);

const rows = paginatedData?.map((item) => ({
  
  TaskBoardName: <Link href={`/operations/projects/task-board-detail/${item?._id}`}><span className=''>{item?.name}</span></Link>,
  ProjectName: item?.project?.name,
  Sprint: item?.sprintNumber,
  ProjectLeader: <div className='flex justify-center'>{item?.leads?.map((leads, i) => (
    <UserListView imgClass="h-[32px] w-[32px]" key={i} list={[leads]} limit={2} />
  ))}</div>,
  Team: <div className='flex justify-center'>{item?.members?.map((member, i) => (
    <UserListView imgClass="h-[32px] w-[32px]" key={i} list={[member]} limit={2} />
  ))}</div>,
  DueDate:   <DisplayDate date={item?.dueDate} />,
}));

const pagination = {
  totalRecords: filteredRows?.length,
  showPerPage: true,
  prevAction: () => page > 1 && setPage(page - 1),
  clickAction: (value) => setPage(value),
  nextAction: () => setPage(page + 1),
};

  return (
    <section className="flex flex-col grow">
      <div className="flex justify-between pb-6">
        <h1 className="text-h4 mb-0">{t("Task Board")}</h1>
        {/* <div className='flex gap-4'>
          <Button className={"btn btn-primary"} onClick={() => setBoard(true)}>{t("Create Task Board")}</Button>
        </div> */}
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
          pagination={pagination}
          setPage={setPage}
          className={'zt-employeeTable zt-projectsTable'}
        />
        {create && <CreatProjectsForm
          onClose={() => { setCreate(false) }}
        />}

        {board && <CreateBoardForm
          title={t('Create Task Board')}

          type={'Feedback'}
          onClose={() => { setBoard(false) }}
        />}
      </div>
    </section>
  )
}
