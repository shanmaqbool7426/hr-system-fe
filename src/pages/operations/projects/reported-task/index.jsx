import { useTranslation } from 'react-i18next'
import { DropDown, Table } from '@/components/elements'
import { useState } from 'react'
import { EyeOn, SuccessTick, ThreeDotsVertical, Trash } from '@/components/svg'
import Toast from '@/util/toast'
import AddTaskForm from '@/components/forms/projects/addTask'
import DiscussionForm from '@/components/forms/projects/discussion'
import CreateReportedIssueForm from '@/components/forms/projects/createIssueDetail'

export default function ReportedIssuesPage() {
    const { t } = useTranslation()
    const [board, setBoard] = useState(false)
    const [discussion, setDiscussion] = useState(false)
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [warning, setWarning] = useState(false)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const headings = [
        { title: t("Task Id"), col: "TaskId" },
        { title: t("Task Name"), col: "TaskName" },
        { title: t("Project Name"), col: "ProjectName" },
        { title: t("Task Time"), col: "TaskTime" },
        { title: t("Task Due Date"), col: "TaskDeadline" },
        { title: t("Issue"), col: "issue" },
        { title: t("Action"), col: "action" },
    ]
    const rows = [
        {

            TaskId: "PJG-001",
            TaskName: "Splash",
            ProjectName: "Video calling",
            TaskTime: "01:00",
            TaskDeadline: "18 May 2024",
            issue: 'Time need to increas',
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-40">
                    <li className="!p-0">
                        <a onClick={() => { setWarning(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><EyeOn /></span>
                            <span>{t("Issue detail")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.dynamicTitle(() => {
                                Toast.success(t("Reported Issue Resolved Successfully"))
                            }, t ,"Did you fix this issue with Assignee?")
                        }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccess'}>
                            <span><SuccessTick /></span>
                            <span>{t("Resolved")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>,
        },
        {

            TaskId: "PJG-001",
            TaskName: "Login",
            TaskTime: "01:00",
            ProjectName: "Video calling",
            TaskDeadline: "18 May 2024",
            issue: 'Time need to increas',
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 w-40">
                    <li className="!p-0">
                        <a onClick={() => { setWarning(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><EyeOn /></span>
                            <span>{t("Issue detail")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.dynamicTitle(() => {
                                Toast.success(t("Reported Issue Resolved Successfully"))
                            }, t ,"Did you fix this issue with Assignee?")
                        }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccess'}>
                            <span><SuccessTick /></span>
                            <span>{t("Resolved")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>,
        },
    ]
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
            </div>
            {warning && <CreateReportedIssueForm
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