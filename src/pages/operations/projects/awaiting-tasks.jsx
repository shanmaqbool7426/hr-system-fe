import { useTranslation } from 'next-i18next'
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
            <div className=' zt-card'>
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
            {/* <div className=" zt-card grow flex flex-col divide-y divide-themeGrayscale300">
                {["Appointment booking", "Appointment booking with payment gateway", "Appointment booking with payment gateway", "Profile add"].map((ele, i) => (
                    <div className='flex justify-between p-4' key={i}>
                        <div className='flex flex-col gap-2'>
                            <h2 className='font-semibold mb-0 text-xs text-themeGrayscale900'>{ele}</h2>
                            <div className='bg-themeGrayscale100 flex gap-2 items-center rounded-md px-2 py-1 text-themeGrayscale600 text-xs font-medium'>
                                <span>{process.env.NEXT_PUBLIC_APP || t("Company")}</span><span><DotIcon /></span><span>{t("20 May 2024")}</span><span><DotIcon /></span><span>{t("20 Hours")}</span>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <Button onClick={() => setCreate(true)} className={"btn btn-dark-outline"}>{t("Raise Issue")}</Button>
                            <Button className={"btn btn-dark"}>{t("Accept")}</Button>
                        </div>
                    </div>
                ))}
            </div> */}
            {create && <RaiseIssueForm
                taskId={currentTaskId}
                onClose={() => { setCreate(false) }}
            />}
        </section>
    )
}
