import { Button, CheckBox, DisplayDate, DropDown, Table } from "@/components/elements";
import Pagination from "@/components/elements/Table/pagination";
import UserListView from "@/components/elements/UserListView";
import ProjectFeedbackForm from "@/components/forms/projects/projectFeedback";
import FeedbackReplyForm from "@/components/forms/projects/feedbackReply";
import { Edit, FeedbackIcon, StarIcon, ThreeDotsVertical, Trash, WarningIcon } from "@/components/svg";
import { FetchCompletedProjects } from "@/store/actions/project.actions";
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
  const [feedbackReply, setFeedbackReply] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
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
                {item?.feedback?._id ?  <>
                <span className=''>Feedback From <span className='text-themePurple font-semibold'>  {item?.feedback?.createdBy?.firstName} {item?.feedback?.createdBy?.lastName} </span></span>
                <div className='flex gap-1 items-center'><span className='font-semibold'>{item?.feedback?.rating.toFixed(1)} </span> <div className='flex'>
                {[...Array(5)].map((_, index) => (
                        <StarIcon
                            key={index}
                            className={`${item?.feedback?.rating > index ? 'text-themeSecondary' : 'text-gray-300'}`}
                        />
                    ))}
                    </div></div>
                <span className=''>“{item?.feedback?.comments}”</span>
                </> : <span className='text-themePurple font-semibold'> No Feedback </span>  }   
            </div>,
      action: <DropDown icon={<ThreeDotsVertical />}>
        <ul className="zt-themeDropDownList zt-sm gap-4 w-40">
          <li className="!p-0">
            <a onClick={() => { 
              if (item?.feedback?._id) {
                  setSelectedFeedback(item?.feedback); 
                  setFeedbackReply(true); 
              }
          }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
              <span><FeedbackIcon /></span>
              <span>{t("Reply")}</span>
            </a>
          </li>
          {!item?.feedback?._id && (
          <li className="!p-0">
            <a onClick={() => { setSelectedProject(item); setFeedback(true); }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccess'}>
              <span><FeedbackIcon /></span>
              <span>{t("Feedback")}</span>
            </a>
          </li>
          )}
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
      {feedback && <ProjectFeedbackForm
        project={selectedProject}
        onClose={() => { setFeedback(false) }}
      />}
       {feedbackReply && selectedFeedback && <FeedbackReplyForm
           onClose={() => { setFeedbackReply(false); }}
           object={selectedFeedback}
        />}
    </div>
  )
}
