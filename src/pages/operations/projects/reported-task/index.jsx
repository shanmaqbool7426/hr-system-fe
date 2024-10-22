import { useTranslation } from 'next-i18next'
import { DisplayDate, DropDown, Table } from '@/components/elements'
import { useEffect, useState } from 'react'
import { EyeOn, SuccessTick, ThreeDotsVertical, Trash } from '@/components/svg'
import Toast from '@/util/toast'
import AddTaskForm from '@/components/forms/projects/create-task'
import Pagination from '@/components/elements/Table/pagination'
import DiscussionForm from '@/components/forms/projects/discussion'
import ReportedIssueDetail from '@/components/forms/projects/resolveIssuePage'
import { useDispatch, useSelector } from 'react-redux'
import { FetchReportedTasks } from '@/store/actions/task.actions'
import { FetchEmployees } from '@/store/actions/employee.actions'

export default function ReportedIssuesPage() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [board, setBoard] = useState(false)
    const [discussion, setDiscussion] = useState(false)
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [warning, setWarning] = useState(false)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [selectedIssue, setSelectedIssue] = useState(null)
    const { reported_task_list } = useSelector(state => state.task)

    
    const handleViewIssue = (issue) => {
        setSelectedIssue(issue);
        setWarning(true);
    };
    
    useEffect(() => {
        dispatch(FetchEmployees())
        dispatch(FetchReportedTasks())
    }, [dispatch])
    const headings = [
        { title: t("Task Id"), col: "TaskId" },
        { title: t("Task Name"), col: "TaskName" },
        { title: t("Project Name"), col: "ProjectName" },
        { title: t("Task Time"), col: "TaskTime" },
        { title: t("Task Due Date"), col: "TaskDeadline" },
        { title: t("Issue"), col: "issue" },
        { title: t("Action"), col: "action" },
    ]

    const indexOfLastItem = page * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const paginatedData = reported_task_list?.slice(indexOfFirstItem, indexOfLastItem);

    const rows = paginatedData?.map((item, index) => {
        const recentIssue = item?.issueRaised?.[item.issueRaised.length - 1] || {}

       return{TaskId: <a className='cursor-pointer' onClick={(event) => { event.preventDefault(); handleViewIssue(item); }}>{item?.taskId}</a>,
        TaskName: item?.name,
        ProjectName: item?.project?.name,
        TaskTime: item?.requiredTime,
        TaskDeadline: <DisplayDate date={item?.dueDate} />,
            issue: recentIssue?.name,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-40">
                    <li className="!p-0">
                        <a onClick={() => handleViewIssue(item)}  className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><EyeOn /></span>
                            <span>{t("Issue detail")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>}
    })
    const pagination = {
        totalRecords: reported_task_list?.length,
        showPerPage: true,
        prevAction: () => page > 1 && setPage(page - 1),
        clickAction: (value) => setPage(value),
        nextAction: () => setPage(page + 1),
    };
    return (
        <section className="flex flex-col grow">
            <div className="flex items-center justify-between pb-6">
                <h1 className="text-h4 mb-0"> {t("Reported Task")}</h1>
            </div>
            <div className='zt-card grow'>
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
                    className={'zt-employeeTable zt-rportedIssueTable '}
                />
                {paginatedData?.length > 0 && pagination && <Pagination
                    pagination={pagination}
                    currentLength={rows?.length}
                    perPage={perPage}
                    setPerPage={setPerPage}
                    page={page}
                    setPage={setPage} />
                }
            </div>
            {warning && selectedIssue && <ReportedIssueDetail
                object={selectedIssue}
                onClose={() => { setWarning(false) }}
            />}

            {board && <AddTaskForm
                object={true}
                onClose={() => { setBoard(false) }}
            />}
            {discussion && <DiscussionForm
                onClose={() => { setDiscussion(false) }}
            />}
        </section>
    )
}