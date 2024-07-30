import { useTranslation } from 'react-i18next'
import { Button, DisplayDate, Table } from '@/components/elements'
import { useEffect, useState } from 'react'
import RaiseIssueForm from '@/components/forms/projects/raiseIssue'
import { useDispatch, useSelector } from 'react-redux'
import { FetchAwaitingTasks, UpdateTask } from '@/store/actions/task.actions'
import Pagination from '@/components/elements/Table/pagination' 

export default function AwaitingTasksPage() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [create, setCreate] = useState(false)
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [currentTaskId, setCurrentTaskId] = useState(null)
    const [perPage, setPerPage] = useState(10)
    const [pendingTasks, setPendingTasks] = useState([]); 
    const { awaiting_task_list } = useSelector(state => state.task)

    const handleAccept = (taskId) => {
        const payload = { status: 'pending' }; 
        setTimeout(() => {
            dispatch(UpdateTask(taskId, payload));
        }, 2000)
        setPendingTasks(prev => [...prev, taskId]);  
      }; 

      const handleRaiseIssue = (taskId) => {
        setCurrentTaskId(taskId)
        setCreate(true)
    }
  
    useEffect(() => {
        dispatch(FetchAwaitingTasks())
    }, [dispatch])

    const headings = [
        { title: t("Task Id"), col: "TaskId" },
        { title: t("Task Name"), col: "TaskName" },
        { title: t("Project Name"), col: "ProjectName" },
        { title: t("Task Time"), col: "TaskTime" },
        { title: t("Task Due Date"), col: "TaskDeadline" },
        { title: t("Report"), col: "issue" },
        { title: t("Action"), col: "action" },
    ]

    const indexOfLastItem = page * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const paginatedData = awaiting_task_list?.slice(indexOfFirstItem, indexOfLastItem);

    const rows = paginatedData?.map((item, index) => ({
        TaskId: item?.taskId,
        TaskName: item?.name,
        ProjectName: item?.project?.name,
        TaskTime: item?.requiredTime,
        TaskDeadline: <DisplayDate date={item?.dueDate} />,
        issue: <div>
            <Button onClick={() => handleRaiseIssue(item._id)} className={"btn btn-dark"}>{t("Raise Issue")}</Button>
        </div>,
        action: <div className='flex justify-center'>
            <Button 
                onClick={() => handleAccept(item._id)} 
                className={`btn ${pendingTasks.includes(item._id) ? 'btn-success' : 'btn-primary'}`} 
            >
                {pendingTasks.includes(item._id) ? t("Pending") : t("Accept")}
            </Button>
        </div>
    }))

    const pagination = {
        totalRecords: awaiting_task_list?.length,
        showPerPage: true,
        prevAction: () => page > 1 && setPage(page - 1),
        clickAction: (value) => setPage(value),
        nextAction: () => setPage(page + 1),
    };

    return (
        <section className="flex flex-col grow">
            <div className="flex items-center justify-between pb-6">
                <h1 className="text-h4 mb-0"> {t("Awaiting Tasks")}</h1>
            </div>
            <div className='w-full bg-white p-6 rounded-lg'>
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
                    className={'zt-employeeTable zt-projectsAwaitingTasksTable '}
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
            {create && <RaiseIssueForm
                taskId={currentTaskId}
                onClose={() => { setCreate(false) }}
            />}
        </section>
    )
}
