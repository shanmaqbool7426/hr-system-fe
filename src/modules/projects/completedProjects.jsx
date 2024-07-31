import { Button, CheckBox, DisplayDate, DropDown, Table } from "@/components/elements";
import Pagination from "@/components/elements/Table/pagination";
import UserListView from "@/components/elements/UserListView";
import FeedbackForm from "@/components/forms/projects/feedback";
import RaiseIssueForm from "@/components/forms/projects/raiseIssue";
import { Edit, FeedbackIcon, StarIcon, ThreeDotsVertical, Trash, WarningIcon } from "@/components/svg";
import { FetchCompletedProjects } from "@/store/actions/project.actions";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export default function CompletedProjectsModule() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [feedback, setFeedback] = useState(false)
  const [raiseIssue, setRaiseIssue] = useState(false)
  const {completed_project_list} = useSelector((state) => state.project)

  useEffect(()=>{
    dispatch(FetchCompletedProjects())
  }, [dispatch])

  const headings = [
   
    { title: t("Project ID"), col: "ProjectID", sort: true },
    { title: t("Project"), col: "Project", sort: true },
    { title: t("Client"), col: "Client", sort: true },
    { title: t("Leader"), col: "Leader", sort: true },
    { title: t("Team"), col: "Team", sort: true },
    { title: t("Due Date"), col: "Deadline", sort: true },
    { title: t("Status"), col: "Status", sort: true },
    { title: t("Feedback"), col: "Feedback", sort: true },
    { title: t("Action"), col: "action" },
  ]

  const indexOfLastItem = page * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const paginatedData = completed_project_list?.slice(indexOfFirstItem, indexOfLastItem);

  const rows = paginatedData?.map((item, index) => (
    {
     
      Project: <Link href={`/operations/projects/details/${item?._id}`}><span className=''>{item?.name}</span></Link>,
      ProjectID: item?.projectId,
      Client: item?.client,
      Leader:  <UserListView imgClass="h-[32px] w-[32px]" key={index} list={item?.leads}  />,
      Team: <UserListView imgClass="h-[32px] w-[32px]" key={index} list={item?.members} limit={2} />,
      Deadline: <DisplayDate date={item?.endDate} />,
      Status: <span className='zt-tag zt-tag-success'>{item?.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase()} </span>,
      Feedback: <div className='flex flex-col items-center'>
        <span className=''>Feedback From <span className='text-themePurple font-semibold'>Jhon</span></span>
        <div className='flex gap-1 items-center'><span className='font-semibold'>3.0</span> <div className='flex'><StarIcon className={'text-themeSecondary'} /><StarIcon className={'text-themeSecondary'} /><StarIcon className={'text-themeSecondary'} /><StarIcon className={'text-gray-400'} /><StarIcon className={'text-gray-400'} /></div></div>
        <span className=''>“Good Job”</span>
      </div>,
      action: <DropDown icon={<ThreeDotsVertical />}>
        <ul className="zt-themeDropDownList zt-sm gap-4 w-40">
          <li className="!p-0">
            <a onClick={() => { setRaiseIssue(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
              <span><WarningIcon /></span>
              <span>{t("Raise Issue")}</span>
            </a>
          </li>
          <li className="!p-0">
            <a onClick={() => { setFeedback(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccess'}>
              <span><FeedbackIcon /></span>
              <span>{t("Feedback")}</span>
            </a>
          </li>
        </ul>
      </DropDown>,
    }))

    const pagination = {
      totalRecords: completed_project_list?.length,
      showPerPage: true,
      prevAction: () => page > 1 && setPage(page - 1),
      clickAction: (value) => setPage(value),
      nextAction: () => setPage(page + 1),
  };
  return (
    <div className=" zt-card grow">
      <h2 className="text-h4">{t("Completed Projects")}</h2>
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
        {paginatedData?.length > 0 && pagination && <Pagination
            pagination={pagination}
            currentLength={rows?.length}
            perPage={perPage}
            setPerPage={setPerPage}
            page={page}
            setPage={setPage} />
        }
      {feedback && <FeedbackForm
        onClose={() => { setFeedback(false) }}
      />}
      {raiseIssue && <RaiseIssueForm
        onClose={() => { setRaiseIssue(false) }}
      />}
    </div>
  )
}
