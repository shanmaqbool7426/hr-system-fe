import { Button, CheckBox, DropDown, Table } from "@/components/elements";
import UserListView from "@/components/elements/UserListView";
import FeedbackForm from "@/components/forms/projects/feedback";
import RaiseIssueForm from "@/components/forms/projects/raiseIssue";
import { Edit, FeedbackIcon, StarIcon, ThreeDotsVertical, Trash, WarningIcon } from "@/components/svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
const tableData = [
  {
    "leaders": [
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-02.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "" },
    ],
    "team": [
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-03.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-04.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-05.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-06.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-08.jpg" },
      { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-09.jpg" }
    ],
  }
]
export default function CompletedProjectsModule() {
  const { t } = useTranslation()
  const [sortCol, setSortCol] = useState(null)
  const [sortDir, setSortDir] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [feedback, setFeedback] = useState(false)
  const [raiseIssue, setRaiseIssue] = useState(false)

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

  const rows = [
    {
     
      Project: <Link href={'/operations/projects/details'}><span className=''>Office Management</span></Link>,
      ProjectID: "PJT- 001",
      Client: 'Arun',
      Leader: <figure className={`flex justify-center overflow-hidden rounded-full  border-2 border-white m-0`}>
        <Image src={'/assets/images/users/user-03.jpg'} width={32} height={32} alt="Leade" /></figure>,
      Team: <div className="flex justify-center">{tableData.map((ele, i) => (
        <UserListView imgClass="h-[32px] w-[32px]" key={i} list={ele.team} limit={2} />
      ))}</div>,
      TaskTime: "548:00",
      Deadline: "22 March 2023",
      Status: <span className='zt-tag zt-tag-success'>Active</span>,
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
    },
    {
      Project: <Link href={'/operations/projects/details'}><span className=''>Video Calling</span></Link>,
      ProjectID: "PJT- 001",
      Client: 'Arun',
      Leader: <figure className={`flex justify-center overflow-hidden rounded-full  border-2 border-white m-0`}>
        <Image src={'/assets/images/users/user-03.jpg'} width={32} height={32} alt="Leade" /></figure>,
      Team: <div className="flex justify-center">{tableData.map((ele, i) => (
        <UserListView imgClass="h-[32px] w-[32px]" key={i} list={ele.team} limit={2} />
      ))}</div>,
      TaskTime: "548:00",
      Deadline: "22 March 2023",
      Status: <span className='zt-tag zt-tag-success'>Active</span>,
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
    },
  ]

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
      {feedback && <FeedbackForm
        onClose={() => { setFeedback(false) }}
      />}
      {raiseIssue && <RaiseIssueForm
        onClose={() => { setRaiseIssue(false) }}
      />}
    </div>
  )
}
