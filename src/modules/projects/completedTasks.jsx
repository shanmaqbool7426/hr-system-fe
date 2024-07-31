import { Button, CheckBox, DropDown, Table } from "@/components/elements";
import Pagination from "@/components/elements/Table/pagination";
import UserListView from "@/components/elements/UserListView";
import FeedbackForm from "@/components/forms/projects/feedback";
import RaiseIssueForm from "@/components/forms/projects/raiseIssue";
import { Edit, FeedbackIcon, StarIcon, ThreeDotsVertical, Trash, WarningIcon } from "@/components/svg";
import { FetchCompletedTasks } from "@/store/actions/task.actions";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

export default function CompletedTaskModule() {
    const { t } = useTranslation()
    const dispatch= useDispatch()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [feedback, setFeedback] = useState(false)
    const [raiseIssue, setRaiseIssue] = useState(false)
    const { completed_task_list} = useSelector(state => state.task)

    useEffect(()=>{
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
            Leader: <UserListView imgClass="h-[32px] w-[32px]"  list={[item?.lead]}  />,
            Assignee:  <UserListView imgClass="h-[32px] w-[32px]" list={[item?.assignedTo]} />,   
            TaskTime: "01:00",
            DueDate: "18 May 2024",
            Feedback: <div className='flex flex-col items-center'>
                <span className=''>Feedback From <span className='text-themePurple font-semibold'>Jhon</span></span>
                <div className='flex gap-1 items-center'><span className='font-semibold'>3.0</span> <div className='flex'><StarIcon className={'text-themeSecondary'} /><StarIcon className={'text-themeSecondary'} /><StarIcon className={'text-themeSecondary'} /><StarIcon className={'text-gray-400'} /><StarIcon className={'text-gray-400'} /></div></div>
                <span className=''>“Good Job”</span>
            </div>,
            Status: <span className={'zt-tag zt-tag-success'}> {item?.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase()} </span>,
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
        totalRecords: completed_task_list?.length,
        showPerPage: true,
        prevAction: () => page > 1 && setPage(page - 1),
        clickAction: (value) => setPage(value),
        nextAction: () => setPage(page + 1),
    };
    return (
        <div className="w-full bg-white p-6 rounded-lg grow">
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
            {feedback && <FeedbackForm
                onClose={() => { setFeedback(false) }}
            />}
            {raiseIssue && <RaiseIssueForm
                onClose={() => { setRaiseIssue(false) }}
            />}
        </div>
    )
}
