import { useTranslation } from 'react-i18next';
import { Edit, EyeOn, Plus, ThreeDotsVertical, TransforIcon, Trash } from '@/components/svg';
import { Button, DisplayDate, DropDown } from '@/components/elements';
import ProgressBar from '@/components/elements/ProgressBar';
import Image from 'next/image';
import { useState } from 'react';
import { DeleteTask } from '@/store/actions/task.actions';
import Toast from '@/util/toast';
import { useDispatch } from 'react-redux';
import AddTaskForm from '@/components/forms/projects/addTask';
import UserListView from '@/components/elements/UserListView';
import moment from 'moment'

export default function TaskCard({ key, taskData,statusStyles }) {
    const { t } = useTranslation()
    const [editTask, setEditTask] = useState(null);
    const [task, setTask] = useState(false)
    const dispatch = useDispatch()
    const statusStyle = statusStyles.find(status => status.status.toLowerCase() === taskData.status.toLowerCase()) || {};
    const deleteHandler = (item) => {
        Toast.confirmDelete(() => {
          dispatch(
            DeleteTask(item._id, () => {
              Toast.success(t("Task deleted successfully"));
            })
          );
        }, t);
      };
      const isPastDue = moment(taskData.dueDate).isBefore(moment());
    return (
        <>
        <div key={key} className={`${statusStyle?.bg} rounded-2xl`}>
            <div className={`rounded-t-2xl px-6 py-4 flex justify-between ${statusStyle.headBg}`}>
                <h3 className='mb-0 text-lg text-white'>{t(taskData.status.charAt(0).toUpperCase() + taskData.status.slice(1).toLowerCase())}</h3>
                <DropDown icon={<ThreeDotsVertical className={'text-white'} width={'1.5rem'} />}>
                    <ul className="zt-themeDropDownList zt-sm gap-4">
                        <li className="!p-0">
                            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themePrimary'}>
                                <span><TransforIcon /></span>
                                <span>Transfer</span>
                            </a>
                        </li>
                        <li className="!p-0">
                            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                                <span><Edit /></span>
                                <span>Edit</span>
                            </a>
                        </li>
                        <li className="!p-0">
                            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
                                <span><Trash /></span>
                                <span>Delete</span>
                            </a>
                        </li>
                    </ul>
                </DropDown>
            </div>
            <div className='flex flex-col gap-4 p-6'>
                <div className='bg-white rounded-lg p-3 flex flex-col gap-4'>
                    <div className={`flex justify-between`}>
                        <h4 className='mb-0 text-base'>{t(taskData.name)}</h4>
                        <DropDown icon={<ThreeDotsVertical className={'text-gray-500'} width={'1.5rem'} />}>
                            <ul className="zt-themeDropDownList zt-sm gap-4">
                                <li className="!p-0">
                                    <a onClick={() => {
                                        setEditTask(taskData);
                                        setTask(true);
                                    }}  className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                                        <span><Edit /></span>
                                        <span>Edit</span>
                                    </a>
                                </li>
                                <li className="!p-0">
                                    <a onClick={() => {
                                        deleteHandler(taskData);
                                    }}  className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                                        <span><Trash /></span>
                                        <span>Delete</span>
                                    </a>
                                </li>
                            </ul>
                        </DropDown>
                    </div>
                    <hr className='bg-themeGrayscale200' />
                    {/* <ProgressBar percentage={taskData.progress} variant={`${taskData.varient}`} containerClasses={'flex flex-col gap-4'} titleBarClasses={'mb-0 flex justify-between'} progressClasses={'flex flex-col'} progressBarClasses={'grow rounded-full'} /> */}
                    <UserListView imgClass="h-[32px] w-[32px]"  list={[taskData?.assignedTo]}  />                    
                    <div className='flex justify-between'>
                        <div>
                            <time className='text-sm font-semibold mb-2 block'> <DisplayDate style={{ color: isPastDue ? 'red' : 'black' }} date={taskData.dueDate} /></time>
                            <Button variant={`${taskData.normalBtn}`} className={`!p-2 !leading-3 !font-semibold !text-sm`}>{taskData.firstBtn}</Button>
                        </div>
                        <div className='flex flex-col items-center'>
                            <span className='font-semibold text-sm mb-1'>Task Time</span>
                            <span className='font-semibold text-sm text-lightOrange'> {taskData?.requiredTime} </span>
                            <span className='text-xs text-themeGrayscale500'>hh:mm</span>
                        </div>
                        <div className='flex flex-col items-center'>
                            <time className='text-sm font-semibold mb-2 block' > {taskData?.status.charAt(0).toUpperCase() + taskData.status.slice(1).toLowerCase()} </time>
                            <Button variant={`${taskData.pendingBtn}`} className={`!p-2 !leading-3 !font-semibold !text-sm`}>{taskData.secBtn}</Button>
                        </div>
                    </div>
                </div>
                {/* <button className='flex justify-center w-full text-xs font-bold gap-2 p-2'><Plus className='h-4 w-4' />Add New Task</button> */}
            </div>
        </div>
        {task && <AddTaskForm 
            title={t('Create Task')}
            object={editTask}
            // additionFields={taskboard_details} 
            onClose={() => { 
                setTask(false);
                setEditTask(null);
            }}
        />}
    </>)
}
