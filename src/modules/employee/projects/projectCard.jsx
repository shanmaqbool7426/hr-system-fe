import { useTranslation } from 'react-i18next';
import { Edit, EyeOn, ThreeDotsVertical, Trash } from '../../../components/svg';
import CreateProjectsForm from '@/components/forms/projects/createProjects' 
import ProgressBar from '../../../components/elements/ProgressBar';
import UserListView from '../../../components/elements/UserListView';
import { DropDown } from '@/components/elements';
import DisplayDate from "@/components/elements/DisplayDate";
import Link from 'next/link';
import Toast from "@/util/toast";
import { useDispatch, useSelector } from 'react-redux';
import { DeleteProject} from '@/store/actions/project.actions';
import { useState } from 'react';


export default function ProjectCard ({ key, projectData }) {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const [create, setCreate] = useState(false)
  const [editProject, setEditProject] = useState(null);

  const deleteHandler = (item) => {
    Toast.confirmDelete(() => {
      dispatch(
        DeleteProject(item._id, () => {
          Toast.success(t("Project deleted successfully"));
        })
      );
    }, t);
  };

  const removeTags = (str) => {
    if (!str) return ''
    return str.replace(/<\/?[^>]+(>|$)/g, "")
}
  return (
  <>
     <div className='zt-projectCard'>
      <div className='zt--projectCardHead'>
        <div>
          <Link href={`/operations/operations/projects/details/${projectData?._id}`} className='mb-0 text-h5 no-underline'>{t(projectData.name)}</Link>
          <p className='mb-0'><span>{t(projectData.openTasks)} open tasks</span>,<span>{t(projectData.completedTasks)} tasks completed</span></p>
        </div>
        <DropDown icon={<ThreeDotsVertical className={'text-themePurple'} width={'1.5rem'} />}>
          <ul className="zt-themeDropDownList zt-sm gap-4">
          <li className="!p-0">
              <a href={`/operations/projects/details/${projectData?._id}`} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                <span><EyeOn /></span>
                <span>Details</span>
              </a>
            </li>
            <li className="!p-0">
              <a onClick={() => {
                  setEditProject(projectData);
                  setCreate(true);
                }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                <span><Edit /></span>
                <span>Edit</span>
              </a>
            </li>
            <li className="!p-0">
              <a onClick={() => {
                  deleteHandler(projectData);
                }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                <span><Trash /></span>
                <span>Delete</span>
              </a>
            </li>
          </ul>
        </DropDown>
      </div>
      <div className='zt--projectCardBody'>
        <p>{t(removeTags(projectData?.description))}</p>

        <div className='zt-projectDeadline flex justify-between gap-6'>
          <span>Deadline</span>
          <DisplayDate date={projectData.endDate} />
          {/* <time dateTime={t(projectData.deadline)}>{t(projectData.deadline)}</time> */}
        </div>

        <div className='zt-projectLeaders flex flex-col'>
          <strong>Project Leader</strong>
          <UserListView list={projectData.leads} limit={2}/>
        </div>

        <div className='zt-projectTeam flex flex-col'>
          <strong>Team</strong>
          <UserListView list={projectData.members} limit={5}/>
        </div>
        <ProgressBar percentage={projectData.progress} variant={'primary'} containerClasses={'flex flex-col gap-4'} titleBarClasses={'mb-0 flex justify-between'} progressClasses={'flex flex-col'} progressBarClasses={'grow rounded-full'} />
      </div>
    </div>
      {create && <CreateProjectsForm
        onClose={() => {
            setCreate(false);
            setEditProject(null);
          }}
          object={editProject} />}
    </>
  )
}
