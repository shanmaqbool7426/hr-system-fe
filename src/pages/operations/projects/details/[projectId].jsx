import { useTranslation } from 'next-i18next'
import CreateProjectsForm from '@/components/forms/projects/create-projects'
import CreateBoardForm from '@/components/forms/projects/createBoard'
import * as Yup from 'yup';
import { Button, DisplayFileSize, DropDown, MultiSelect, Table } from '@/components/elements'
import { ChevronLeft, Download, Edit, EyeOn, PdfIcon, Plus, ShareIcon, ThreeDotsVertical, Tick, Trash } from '@/components/svg'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteAttachment, FetchProjectDetails, UpdateProject } from '@/store/actions/project.actions'
import DisplayDate from "@/components/elements/DisplayDate";
import { useFormik } from 'formik';
import moment from 'moment';
import ProgressBar from '@/components/elements/ProgressBar'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { FetchEmployees } from '@/store/actions/employee.actions';
import { DeleteTaskBoard, FetchProjectTaskBoards } from '@/store/actions/taskboard.actions';
import Toast from '@/util/toast';
import { FetchTasks } from '@/store/actions/task.actions';
import { check_rights } from '@/util/helpers';
import UploadAttachmentForm from '@/components/forms/projects/upload-attachment';
import Profil from '@/components/elements/Profile';


export default function ProjectsDetailPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const [board, setBoard] = useState(false)
  const [create, setCreate] = useState(false)
  const [upload, setUpload] = useState(false)
  const [editProject, setEditProject] = useState(null);
  const [editLeaders, setEditLeaders] = useState(false)
  const [editMembers, setEditMembers] = useState(false)
  const [editBoard, setEditBoard] = useState(null);
  const { project_detail, is_loading, total_tasks, completed_tasks, } = useSelector((state) => state.project)
  const { auth_user } = useSelector((state) => state.auth)
  const { employees_list } = useSelector((state) => state.employee)
  const { taskboard_list } = useSelector(state => state.taskboard);
  const { projectId } = router.query

  useEffect(() => {
    dispatch(FetchEmployees())
    if (projectId) {
      dispatch(FetchTasks(projectId));
      dispatch(FetchProjectTaskBoards(projectId))
      dispatch(FetchProjectDetails(projectId))
    }
  }, [router, dispatch]);


  const progressPercentage = total_tasks > 0 ? ((completed_tasks / total_tasks) * 100).toFixed(0) : 0;



  const deleteHandler = (item) => {
    Toast.confirmDelete(() => {
      dispatch(
        DeleteTaskBoard(item._id, () => {
          Toast.success(t("Task Board deleted successfully"));
        })
      );
    }, t);
  };
  const deleteAttachmentHandler = (id) => {
    Toast.confirmDelete(() => {
      dispatch(DeleteAttachment(id, () => {
        Toast.success(t("Attachment deleted successfully"))
      }))
    }, t)
  }
  const calculateTotalHours = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = moment(startDate);
    const end = moment(endDate);
    const differenceInHours = end.diff(start, 'hours');
    return differenceInHours;
  };

  const totalHours = calculateTotalHours(project_detail?.startDate, project_detail?.endDate);

  const headings = [
    { title: t("Task Boards"), col: "TaskBoards" },
    { title: t("Sprint No"), col: "Sprint" },
    { title: t("Due Date"), col: "DueDate" },
    { title: t("Action"), col: "Action" },
  ]

  const formik = useFormik({
    initialValues: {
      leads: project_detail?.leads?.map((item) => item._id) || [],
      members: project_detail?.members?.map((item) => item._id) || [],
    },
    validationSchema: Yup.object().shape({
      leads: Yup.array().required(t('Project leader is required')),
      members: Yup.array().required(t('Team is required')),
    }),

    onSubmit: values => {
      dispatch(UpdateProject(project_detail._id, values, () => {
        setEditLeaders(false)
        setEditMembers(false)
        Toast.success(t('Project updated successfully'))
      }))
    },
    enableReinitialize: true
  })

  const filteredLeadersList = employees_list.filter(employee => !formik.values.members.includes(employee._id));
  const filteredMembersList = employees_list.filter(employee => !formik.values.leads.includes(employee._id));

  const rows = taskboard_list?.map((item) => ({
    TaskBoards: <Link href={`/operations/projects/task-board-detail/${item?._id}`}><span className=''>{item?.name}</span></Link>,
    Sprint: item?.sprintNumber,
    DueDate: <DisplayDate date={item?.dueDate} />,
    Action: check_rights(auth_user) ? <DropDown icon={<ThreeDotsVertical />}>
      <ul className="zt-themeDropDownList zt-sm gap-1">
        <li className="!p-0">
          <a
            className={
              "flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark"
            }
            onClick={() => {
              setEditBoard(item);
              setBoard(true);
            }}
          >
            <span>
              <Edit />
            </span>
            <span>{t("Edit")}</span>
          </a>
        </li>
        <li className="!p-0">
          <a
            onClick={() => {
              deleteHandler(item);
            }}
            className={
              "flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark"
            }
          >
            <span>
              <Trash />
            </span>
            <span>{t("Delete")}</span>
          </a>
        </li>
      </ul>
    </DropDown> : ""
  }));
  return (
    <>
      {project_detail &&
        <section className="flex flex-col grow">
          <div className="flex items-center justify-between pb-6">
            <h1 className="text-h4 mb-0 flex items-center justify-start gap-3">
              <Link href={`/operations/projects`}><ChevronLeft className={'text-themeGrayscale600'} width={10} /></Link>
              <span className='shrink-0'>{t(project_detail?.name)} </span>
            </h1>
            <div className='flex gap-4 items-center'>
              {check_rights(auth_user) && <Button className={"btn btn-primary"} onClick={() => setBoard(true)}>{t("Create Task Board")}</Button>}
            </div>
          </div>
          <div className='flex gap-6 items-start'>
            <div className='flex flex-col gap-6 grow'>
              {/* Project Description */}
              <div className='zt-card'>
                <div className='flex justify-between items-center mb-2'>
                  <h2 className='text-lg font-bold mb-0'>{t(project_detail?.name)}</h2>
                </div>
                <div className='text-themeGrayscale600 text-sm' dangerouslySetInnerHTML={{ __html: project_detail?.description }}>
                </div>
              </div>
              {/* Project Attachments */}
              <div className='zt-card'>
                <div className="flex justify-between">
                  <h2 className='text-lg font-bold'>{t("Uploaded files")}</h2>
                  <div>
                    <Button variant={'primary'} size={"sm"} value={t("Upload")} onClick={() => setUpload(true)} />
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  {project_detail?.attachments?.length > 0 ?
                    project_detail?.attachments?.map((attachment, index) => (
                      <div key={index} className='border items-center border-themeGrayscale300 dark:border-dark-3 rounded-lg py-3 px-4 flex justify-between'>
                        <div className='flex gap-3 items-center'>
                          <PdfIcon />
                          <div className='flex flex-col gap-1 font-medium'>
                            <div>{attachment.name}</div>
                            <div className='text-xs'><DisplayFileSize size={attachment.size} /></div>
                          </div>
                        </div>
                        <div className='flex gap-2'>
                          <Link href={attachment.link} target='_blank'>
                            <Button type="button" variant={'light-primary'} className={'!p-2'}>
                              <Download className={'h-4 w-4'} />
                            </Button>
                          </Link>
                          <Button type="button" variant={'light-danger'} className={'!p-2'} onClick={() => deleteAttachmentHandler(attachment._id)}>
                            <Trash className={'h-4 w-4'} />
                          </Button>
                        </div>
                      </div>
                    )) :
                    <div className='w-full h-40 flex flex-grow justify-center items-center'>{t("No data found")}</div>
                  }
                </div>
              </div>
              {/* Project Boards */}
              <div className="zt-card">
                <Table
                  checkbox={false}
                  headings={headings}
                  rows={rows}
                  className={'zt-employeeTable zt-projectsTable'} />
              </div>
            </div>

            <div className='flex flex-col gap-6 min-w-[388px]'>
              {/* Project Details */}
              <div className='flex flex-col gap-4 zt-card'>
                <div className='flex justify-between items-center'>
                  <h2 className='text-lg font-bold mb-0'>{t("Project Details")}</h2>
                  {check_rights(auth_user) && <span className='cursor-pointer' onClick={() => {
                    setCreate(true);
                    setEditProject(project_detail);
                  }} ><Edit /></span>}
                </div>
                <hr className='bg-themeGrayscale200' />
                <div className='flex justify-between text-sm'>
                  <span className=''>{t("Total Hours")}</span>
                  <span className=' font-semibold'>{t(totalHours + " Hours")}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className=''>{t("Created Date")}</span>
                  <span className=' font-semibold'>
                    <DisplayDate date={project_detail?.startDate} />
                  </span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className=''>{t("Deadline")}</span>
                  <span className=' font-semibold'>
                    <DisplayDate date={project_detail?.endDate} />
                  </span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className=''>{t("Priority")}</span>
                  <span className=' zt-tag-danger !rounded-lg !p-2'>{t(project_detail?.priority.charAt(0).toUpperCase() + project_detail.priority.slice(1).toLowerCase())}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className=''>{t("Status")}</span>
                  <span className=' font-semibold'>{t(project_detail?.status.charAt(0).toUpperCase() + project_detail.status.slice(1).toLowerCase())}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className=''>{t("Created by")}</span>
                  <span className=' font-semibold'>{t(project_detail?.createdBy?.firstName)} {t(project_detail?.createdBy?.lastName)}</span>
                </div>
                <ProgressBar percentage={`${progressPercentage}%`} variant={'success'} containerClasses={'flex flex-col gap-4'} titleBarClasses={'mb-0 flex justify-between'} progressClasses={'flex flex-col'} progressBarClasses={'grow rounded-full'} />
              </div>
              {/* Project Leads */}
              <div className='flex flex-col gap-4 zt-card'>
                {editLeaders ? (<> <form onSubmit={event => { event.preventDefault(); formik.handleSubmit() }}>
                  <div className='flex justify-between items-center'>
                    <h2 className='text-lg font-bold mb-0'>{t("Add Leader")}</h2>
                    <Button type="submit" value={t("Save")} variant={'dark'} className={'!text-xs !px-6 !py-2'} is_loading={is_loading} disabled={is_loading || !formik.isValid} />
                  </div>
                  <hr className='bg-themeGrayscale200' />

                  <MultiSelect
                    containerClass={'zt-formGroupV2'}
                    className={' gap-4'}
                    name={'leads'}
                    value={formik.values.leads}
                    onChange={(value) => {
                      formik.setFieldValue("leads", value)
                    }}
                    list={filteredLeadersList?.map((item) => ({
                      value: item?._id,
                      display: item.firstName + " " + item.lastName,
                    }))}
                    multiple={true}
                  />
                </form>
                </>) : (<>
                  <div className='flex justify-between items-center'>
                    <h2 className='text-lg font-bold mb-0'>{t("Assigned Leader")}</h2>
                    {check_rights(auth_user) && <Button onClick={() => { setEditLeaders(!editLeaders) }} variant={'dark'} className={'!text-xs !px-6 !py-2'}><Plus className='h-[16px]' /> Add</Button>}
                  </div>
                  <hr className='bg-themeGrayscale200' />
                  {project_detail?.leads?.map((lead, index) => (
                    <div key={index} className='flex gap-2 items-center'>
                      <Profil name={lead.firstName} image={lead.avatar} />
                      <div className='text-xs'>
                        <h3 className='mb-0 text-xs font-semibold text-themeGrayscale900'>{t(lead?.firstName)} {t(lead?.lastName)} </h3>
                        <span className='text-themeGrayscale600'>{t(lead?.designation)}</span>
                      </div>
                    </div>))}
                </>)}
              </div>
              {/* Project Members */}
              <div className='flex flex-col gap-4 zt-card'>
                {editMembers ? (<>
                  <form onSubmit={event => { event.preventDefault(); formik.handleSubmit() }} >
                    <div className='flex justify-between items-center'>
                      <h2 className='text-lg font-bold mb-0'>{t("Add Members")}</h2>
                      <Button type="submit" value={t("Save")} variant={'dark'} className={'!text-xs !px-6 !py-2'} is_loading={is_loading} disabled={is_loading || !formik.isValid} />
                    </div>
                    <hr className='bg-themeGrayscale200' />
                    <MultiSelect
                      containerClass={'zt-formGroupV2'}
                      className={' gap-4'}
                      name={'members'}
                      value={formik.values.members}
                      multiple={true}
                      onChange={(value) => {
                        formik.setFieldValue("members", value)
                      }}
                      list={filteredMembersList?.map((item) => ({
                        value: item?._id,
                        display: item.firstName + " " + item.lastName,
                      }))}
                    />
                  </form>
                </>) : (<>
                  <div className='flex justify-between items-center'>
                    <h2 className='text-lg font-bold mb-0'>{t("Assigned Members")}</h2>
                    {check_rights(auth_user) && <Button variant={'dark'} onClick={() => { setEditMembers(!editMembers) }} className={'!text-xs !px-6 !py-2'}><Plus className='h-[16px]' /> Add</Button>}
                  </div>
                  <hr className='bg-themeGrayscale200' />
                  {project_detail?.members?.map((member, index) => (
                    <div key={index} className='flex gap-2 items-center'>
                      <Profil name={member.firstName} image={member.avatar} />
                      <div className='text-xs'>
                        <h3 className='mb-0 text-xs font-semibold text-themeGrayscale900'>{t(member?.firstName)} {t(member?.lastName)} </h3>
                        <span className='text-themeGrayscale600'>{t(member?.designation)}</span>
                      </div>
                    </div>))}

                </>)}
              </div>
            </div>
          </div>
        </section>
      }
      {create && <CreateProjectsForm
        onClose={() => {
          setCreate(false);
          setEditProject(null);
        }}
        object={editProject} />}

      {board && <CreateBoardForm
        title={t('Create Task Board')}
        type={'Feedback'}
        object={editBoard}
        additionFields={project_detail}
        onClose={() => {
          setBoard(false);
          setEditBoard(null);
        }}
      />}
      {upload && <UploadAttachmentForm projectId={projectId} onClose={() => setUpload(false)} />}
    </>)
}
