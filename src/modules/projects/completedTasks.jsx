import { Button, CheckBox, DisplayDate, DropDown, Table } from "@/components/elements";
import Pagination from "@/components/elements/Table/pagination";
import UserListView from "@/components/elements/UserListView";
import TaskFeedbackForm from "@/components/forms/projects/taskFeedback";
import FeedbackReplyForm from "@/components/forms/projects/feedbackReply";
import { Edit, FeedbackIcon, StarIcon, ThreeDotsVertical, Trash, WarningIcon } from "@/components/svg";
import { FetchCompletedTasks } from "@/store/actions/task.actions";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { FetchEmployees } from "@/store/actions/employee.actions";

export default function CompletedTaskModule() {
    const { t } = useTranslation()
    const dispatch= useDispatch()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [feedback, setFeedback] = useState(false)
    const [feedbackReply, setFeedbackReply] = useState(false)
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const { completed_task_list} = useSelector(state => state.task)

    useEffect(()=>{
        dispatch(FetchEmployees())
        dispatch(FetchCompletedTasks())
    }, [dispatch])

    const headings = [
        { title: t("Task Id"), col: "TaskId" },
        { title: t("Task Name"), col: "TaskName" },
        { title: t("Project Name"), col: "ProjectName" },
        { title: t("Task Time"), col: "TaskTime", sort: true },
        { title: t("Due Date"), col: "DueDate", sort: true },
        { title: t("Leader"), col: "Leader" },
        { title: t("Team"), col: "Assignee" },
        { title: t("Status"), col: "Status", sort: true },
        { title: t("Feedback"), col: "Feedback", sort: true },
        { title: t("Action"), col: "action" },
    ]
    const indexOfLastItem = page * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const paginatedData = completed_task_list?.slice(indexOfFirstItem, indexOfLastItem);
  
    const rows = paginatedData?.map((item, index) => (
        {
            TaskId: item?.taskId,
            ProjectName: item?.project?.name,
            TaskName: item?.name,
            Leader:    <UserListView imgClass="h-[32px] w-[32px]"  list={[item?.lead]}  />,
            Assignee:  <UserListView imgClass="h-[32px] w-[32px]" list={[item?.assignedTo]} />,   
            TaskTime: item?.requiredTime,
            DueDate: <DisplayDate date={item?.dueDate} />,
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
            Status: <span className={'zt-tag zt-tag-success'}> {item?.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase()} </span>,
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
                        <a onClick={() => { setSelectedTask(item); setFeedback(true); }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccess'}>
                            <span><FeedbackIcon /></span>
                            <span>{t("Feedback")}</span>
                        </a>
                    </li>
                )}
                </ul>
            </DropDown>,
        }))

    const pagination = {
        totalRecords: completed_task_list?.length,
        showPerPage: true,
        prevAction: () => page > 1 && setPage(page - 1),
        clickAction: (value) => setPage(value),
        nextAction: () => setPage(page + 1),
    };
    return (
        <div className=" zt-card grow">
            <h2 className="text-h4">{t("Completed Tasks")}</h2>
       
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
            {feedback && <TaskFeedbackForm
                task={selectedTask}
                onClose={() => { setFeedback(false);  }}
            />}
           {feedbackReply && selectedFeedback && <FeedbackReplyForm
                onClose={() => { setFeedbackReply(false); }}
                object={selectedFeedback}
            />}
        </div>
    )
}
