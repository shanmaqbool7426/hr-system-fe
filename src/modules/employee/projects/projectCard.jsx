import { useTranslation } from 'react-i18next';
import { Edit, EyeOn, ThreeDotsVertical } from '../../../components/svg';
import ProgressBar from '../../../components/elements/ProgressBar';
import UserListView from '../../../components/elements/UserListView';
import { DropDown } from '@/components/elements';
import Link from 'next/link';

export default function ProjectCard ({ key, projectData }) {
  const { t } = useTranslation()
  console.log('projectData', projectData);

  return (
    <div key={key} className='zt-projectCard'>
      <div className='zt--projectCardHead'>
        <div>
          <Link href={`${projectData.href? `/${projectData.href}`:"#"}`} className='mb-0 text-h5 no-underline'>{t(projectData.name)}</Link>
          <p className='mb-0'><span>{t(projectData.openTasks)} open tasks</span>,<span>{t(projectData.completedTasks)} tasks completed</span></p>
        </div>
        <DropDown icon={<ThreeDotsVertical className={'text-themePurple'} width={'1.5rem'} />}>
          <ul className="zt-themeDropDownList zt-sm gap-4">
            <li className="!p-0">
              <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                <span><EyeOn /></span>
                <span>Details</span>
              </a>
            </li>
            <li className="!p-0">
              <a onClick={() => editEmployee(item)} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                <span><Edit /></span>
                <span>Edit</span>
              </a>
            </li>
          </ul>
        </DropDown>
      </div>
      <div className='zt--projectCardBody'>
        <p>{t(projectData.description)}</p>

        <div className='zt-projectDeadline flex justify-between gap-6'>
          <span>Deadline</span>
          <time dateTime={t(projectData.deadline)}>{t(projectData.deadline)}</time>
        </div>

        <div className='zt-projectLeaders flex flex-col'>
          <strong>Project Leader</strong>
          <UserListView list={projectData.leaders} limit={2}/>
        </div>

        <div className='zt-projectTeam flex flex-col'>
          <strong>Team</strong>
          <UserListView list={projectData.team} limit={5}/>
        </div>
        <ProgressBar percentage={projectData.progress} variant={'primary'} containerClasses={'flex flex-col gap-4'} titleBarClasses={'mb-0 flex justify-between'} progressClasses={'flex flex-col'} progressBarClasses={'grow rounded-full'} />
      </div>
    </div>
  )
}
