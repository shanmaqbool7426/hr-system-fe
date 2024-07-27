import { useTranslation } from 'react-i18next'
import { Button, CheckBox, Table } from '@/components/elements'
import { useState } from 'react'
import RaiseIssueForm from '@/components/forms/projects/raiseIssue'

export default function AwaitingTasksPage() {
    const { t } = useTranslation()
    const [create, setCreate] = useState(false)
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const headings = [
    
        { title: t("Task Id"), col: "TaskId" },
        { title: t("Task Name"), col: "TaskName" },
        { title: t("Project Name"), col: "ProjectName" },
        { title: t("Task Time"), col: "TaskTime" },
        { title: t("Task Due Date"), col: "TaskDeadline" },
        { title: t("Report"), col: "issue" },
        { title: t("Action"), col: "action" },
    ]
    const rows = [
        {
          
            TaskId: "PJG-001",
            TaskName: "Splash",
            ProjectName: "Video calling",
            TaskTime: "01:00",
            TaskDeadline: "18 May 2024",
            issue: <div>
                <Button onClick={() => setCreate(true)} className={"btn btn-dark"}>{t("Raise Issue")}</Button>
            </div>,
            action: <div className='flex justify-center'>
                <Button className={"btn btn-primary"}>{t("Accept")}</Button>
            </div>
        },
        {
        
            TaskId: "PJG-001",
            TaskName: "Login",
            TaskTime: "01:00",
            ProjectName: "Video calling",
            TaskDeadline: "18 May 2024",
            issue: <div>
                <Button onClick={() => setCreate(true)} className={"btn btn-dark"}>{t("Raise Issue")}</Button>
            </div>,
            action: <div className='flex justify-center'>
                <Button className={"btn btn-primary"}>{t("Accept")}</Button>
            </div>
        },
    ]
    return (
        <section className="flex flex-col grow">
            <div className="flex items-center justify-between pb-6">
                <h1 className="text-h4 mb-0"> {t("Awaiting Tasks")}</h1>
                {/* <div className='flex gap-4 items-center'>
                    <Button onClick={() => setCreate(true)} className={"btn btn-dark"}>{t("Raise Issue")}</Button>
                    <Button className={"btn btn-primary"}>{t("Accept")}</Button>
                </div> */}
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
            </div>
            {/* <div className="w-full bg-white p-6 rounded-lg grow flex flex-col divide-y divide-themeGrayscale300">
                {["Appointment booking", "Appointment booking with payment gateway", "Appointment booking with payment gateway", "Profile add"].map((ele, i) => (
                    <div className='flex justify-between p-4' key={i}>
                        <div className='flex flex-col gap-2'>
                            <h2 className='font-semibold mb-0 text-xs text-themeGrayscale900'>{ele}</h2>
                            <div className='bg-themeGrayscale100 flex gap-2 items-center rounded-md px-2 py-1 text-themeGrayscale600 text-xs font-medium'>
                                <span>{t("Zaffre Tech")}</span><span><DotIcon /></span><span>{t("20 May 2024")}</span><span><DotIcon /></span><span>{t("20 Hours")}</span>
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
                onClose={() => { setCreate(false) }}
            />}
        </section>
    )
}