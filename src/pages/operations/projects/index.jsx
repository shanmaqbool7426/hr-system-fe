import { Button, CheckBox, DropDown, Table } from '@/components/elements'
import UserListView from '@/components/elements/UserListView'
import CreateProjectsForm from '@/components/forms/projects/createProjects' 
import FilterArea from '@/components/includes/FilterArea'
import {  EyeOn, GridIcon, ListIcon } from '@/components/svg'
import ProjectCard from '@/modules/employee/projects/projectCard'
import Link from 'next/link'
import  Pagination  from '@/components/elements/Table/pagination'
import Toast from "@/util/toast";
import React, { useEffect, useState } from 'react'
import { Edit,  ThreeDotsVertical, Trash } from "@/components/svg";
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import { FetchProject , DeleteProject, UpdateProject} from '@/store/actions/project.actions';
import { FetchEmployees } from '@/store/actions/employee.actions'

export default function ProjectsModule() {
  const dispatch = useDispatch();
  const { t } = useTranslation() 
  const [view, setView] = useState(() => localStorage.getItem('View') || 'grid');
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const { project_list , is_loading} = useSelector(state => state.project);
  const [create, setCreate] = useState(false)
  const [editProject, setEditProject] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    priority: null,
    status: null,
  });
  

  const handlePriorityChange = (e, projectId) => {
    const newPriority = e.target.value;
    dispatch(UpdateProject(projectId, { priority: newPriority }, () => {
      Toast.success(t("Project priority updated successfully"));
    }));
  };
  
  const handleStatusChange = (e, projectId) => {
    const newStatus = e.target.value;
    dispatch(UpdateProject(projectId, { status: newStatus }, () => {
      Toast.success(t("Project status updated successfully"));
    }));
  };
  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'zt-tag-danger';
      case 'medium':
        return 'zt-tag-dark';
      case 'low':
        return 'zt-tag-success';
      default:
        return 'zt-tag-default';
    }
  };
const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'zt-tag-danger';
    case 'progress':
      return 'zt-tag-dark';
    case 'completed':
      return 'zt-tag-success';
      case "new":
        return 'zt-tag-dark';
    default:
      return 'zt-tag-default';
  }
};

  useEffect(() => {
    const savedView = localStorage.getItem('View');
    if (savedView) {
      setView(savedView);
    }
    dispatch(FetchProject());
    dispatch(FetchEmployees());
  }, [dispatch]);
  
  useEffect(() => {
    localStorage.setItem('View', view);
  }, [view]);

  const deleteHandler = (item) => {
    Toast.confirmDelete(() => {
      dispatch(
        DeleteProject(item._id, () => {
          Toast.success(t("Project deleted successfully"));
        })
      );
    }, t);
  };
 
  const headings = [
    { title: t("Project"), col: "Project", sort: true },
    { title: t("Project ID"), col: "ProjectID", sort: true },
    { title: t("Client"), col: "Client", sort: true },
    { title: t("Leader"), col: "Leader", sort: true },
    { title: t("Team"), col: "Team", sort: true },
    { title: t("Priority"), col: "Priority", sort: true },
    { title: t("Status"), col: "Status", sort: true },
    { title: t("Action"), col: "Action" },
  ]
  const filterElements = [
    {
      type: "search",
      name: "search",
      value: filters.search,
      placeholder: t("Project"),
      className: "xl:col-span-2",
      onChange: (event) => {
        let _filter = { ...filters };
        _filter['search'] = event.target.value;
        setFilters(_filter);
      }
    },
    {
      type: "select",
      name: "Priority",
      className: "xl:col-span-2",
      placeholder: t("Priority"),
      value: filters.priority,
      list: [
        { value: "low", display: "Low" },
        { value: "normal", display: "Normal" },
        { value: "high", display: "High" },
      ],
      onChange: (priority) => {
        let _filter = { ...filters };
        _filter['priority'] = priority;
        setFilters(_filter);
      }
    },
    {
      type: "select",
      name: "Status",
      className: "xl:col-span-2",
      placeholder: t("Status"),
      value: filters.status,
      list: [
        { value: "new", display: "New" },
      ],
      onChange: (status) => {
        let _filter = { ...filters };
        _filter['status'] = status;
        setFilters(_filter);
      }
    },
  ];

  let filteredRows = project_list?.filter((item) => {
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

  const rows = paginatedData?.map((item,index) => ({
      Project: <Link href={`/operations/projects/details/${item?._id}`}><span className=''>{item?.name}</span></Link>,
      ProjectID: item?.projectId,
      Client: item?.client,
      Leader:  <UserListView imgClass="h-[32px] w-[32px]" key={index} list={item?.leads}  />,
      Team: <UserListView imgClass="h-[32px] w-[32px]" key={index} list={item?.members} limit={2} />,
      Priority: (
        <select
          className={`zt-tag ${getPriorityClass(item.priority)}`}
          value={item.priority}
          onChange={(e) => handlePriorityChange(e, item._id)}
        >
          <option value="low" className='zt-tag-low'>
            Low
          </option>
          <option value="medium" className='zt-tag-medium'>
            Medium
          </option>
          <option value="high" className='zt-tag-high'>
            High
          </option>
        </select>
      ),
      Status:(
        <select
          className={`zt-tag ${getStatusClass(item.status)}`}
          value={item.status}
          onChange={(e) => handleStatusChange(e, item._id)}
        >
          {item.status === "new" && (
            <option value="new" className='zt-tag-new'>
              {t("New")}
            </option>
          )}
          <option value="pending" className='zt-tag-pending'>
            Pending
          </option>
          <option value="progress" className='zt-tag-progress'>
            Progress
          </option>
          <option value="completed" className='zt-tag-completed'>
            Completed
          </option>
        </select>
      ),
      Action: (
        <DropDown icon={<ThreeDotsVertical />}>
          <ul className="zt-themeDropDownList zt-sm gap-1">
          <li className="!p-0">
              <a href={`/operations/projects/details/${item?._id}`} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                <span><EyeOn /></span>
                <span>Details</span>
              </a>
            </li>
            <li className="!p-0">
              <a
                className={
                  "flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark"
                }
                onClick={() => {
                  setEditProject(item);
                  setCreate(true);
                }}
              >
                <span>
                  <Edit />
                </span>
                <span>{t("Edit")}</span>
              </a>
            </li>
            <li className="!p-0">
              <a
                onClick={() => {
                  deleteHandler(item);
                }}
                className={
                  "flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark"
                }
              >
                <span>
                  <Trash />
                </span>
                <span>{t("Delete")}</span>
              </a>
            </li>
          </ul>
        </DropDown>
        )}))
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
        <h1 className="text-h4 mb-0">{t("Projects")}</h1>
        <div className='flex gap-6 items-center'>
          <div className='rounded-full p-1 flex bg-themeGrayscale200'>
            <button onClick={() => setView('list')} className={`${view === "list" ? "bg-themePurple" : ""} rounded-full p-2`}><ListIcon className={`${view === "list" ? "text-white" : "text-themeGrayscale500"}`} /></button>
            <button onClick={() => setView('grid')} className={`${view === "grid" ? "bg-themePurple" : ""} rounded-full p-2`}><GridIcon className={`${view === "grid" ? "text-white" : "text-themeGrayscale500"}`} /></button>
          </div>
          <Button className={"btn btn-primary"} onClick={() => setCreate(true)}>{t("Add Project")}</Button>
        </div>
      </div>
      <div className=" zt-card grow">
      <FilterArea title={t("")}
          elements={filterElements}
          filters={filters}
          setFilters={setFilters}
        />
        {view === "grid" ?
          <div className='zt-projectsList !shadow-none'>
            <h2 className="text-h5 mb-0 col-span-3">{t("Projects")}</h2>
            {paginatedData?.map((project) => (
              <ProjectCard key={project?._id} projectData={project} />
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
            isLoading={is_loading}
          />
       }
         {paginatedData?.length > 0 && pagination && <Pagination
          pagination={pagination}
          currentLength={rows?.length}
          perPage={perPage}
          setPerPage={setPerPage}
          page={page}
          setPage={setPage} />}
        {create && <CreateProjectsForm
            onClose={() => {
            setCreate(false);
            setEditProject(null);
          }}
          object={editProject} />}
      </div>
    </section>
  );
}
