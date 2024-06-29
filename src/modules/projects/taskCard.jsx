import { useTranslation } from 'react-i18next';
import { Edit, EyeOn, Plus, ThreeDotsVertical, TransforIcon, Trash } from '@/components/svg';
import { Button, DropDown } from '@/components/elements';
import ProgressBar from '@/components/elements/ProgressBar';
import Image from 'next/image';

export default function TaskCard({ key, taskData }) {
    const { t } = useTranslation()

    return (
        <div key={key} className={`${taskData.bg} rounded-2xl`}>
            <div className={`rounded-t-2xl px-6 py-4 flex justify-between ${taskData.headBg}`}>
                <h3 className='mb-0 text-lg text-white'>{t(taskData.status)}</h3>
                <DropDown icon={<ThreeDotsVertical className={'text-white'} width={'1.5rem'} />}>
                    <ul className="zt-themeDropDownList zt-sm gap-4">
                        <li className="!p-0">
                            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themePrimary'}>
                                <span><TransforIcon /></span>
                                <span>Transfer</span>
                            </a>
                        </li>
                        <li className="!p-0">
                            <a onClick={() => editEmployee(item)} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                                <span><Edit /></span>
                                <span>Edit</span>
                            </a>
                        </li>
                        <li className="!p-0">
                            <a onClick={() => editEmployee(item)} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
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
                        <h4 className='mb-0 text-base'>{t(taskData.taskName01)}</h4>
                        <DropDown icon={<ThreeDotsVertical className={'text-gray-500'} width={'1.5rem'} />}>
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
                    <ProgressBar percentage={taskData.progress} variant={`${taskData.varient}`} containerClasses={'flex flex-col gap-4'} titleBarClasses={'mb-0 flex justify-between'} progressClasses={'flex flex-col'} progressBarClasses={'grow rounded-full'} />
                    <figure>
                        <Image height={32} width={32} alt='Profile' className='rounded-full' src={'/assets/images/users/user-01.jpg'} />
                    </figure>
                    <div className='flex justify-between'>
                        <div>
                            <time className='text-sm font-semibold mb-2 block' datetime="16-04-2024">16-04-2024</time>
                            <Button variant={`${taskData.normalBtn}`} className={`!p-2 !leading-3 !font-semibold !text-sm`}>{taskData.firstBtn}</Button>
                        </div>
                        <div className='flex flex-col items-center'>
                            <span className='font-semibold text-sm mb-1'>Task Time</span>
                            <span className='font-semibold text-sm text-lightOrange'>03:00</span>
                            <span className='text-xs text-themeGrayscale500'>hh:mm</span>
                        </div>
                        <div className='flex flex-col items-center'>
                            <time className='text-sm font-semibold mb-2 block' datetime="16-04-2024">Status</time>
                            <Button variant={`${taskData.pendingBtn}`} className={`!p-2 !leading-3 !font-semibold !text-sm`}>{taskData.secBtn}</Button>
                        </div>
                    </div>
                </div>
                <div className='bg-white rounded-lg p-3 flex flex-col gap-4'>
                    <div className={`flex justify-between`}>
                        <h4 className='mb-0 text-base'>{t(taskData.taskName02)}</h4>
                        <DropDown icon={<ThreeDotsVertical className={'text-gray-500'} width={'1.5rem'} />}>
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
                    <ProgressBar percentage={taskData.progress} variant={`${taskData.varient}`} containerClasses={'flex flex-col gap-4'} titleBarClasses={'mb-0 flex justify-between'} progressClasses={'flex flex-col'} progressBarClasses={'grow rounded-full'} />
                    <figure>
                        <Image height={32} width={32} alt='Profile' className='rounded-full' src={'/assets/images/users/user-01.jpg'} />
                    </figure>
                    <div className='flex justify-between'>
                        <div>
                            <time className='text-sm font-semibold mb-2 block' datetime="16-04-2024">16-04-2024</time>
                            <Button variant={`${taskData.normalBtn}`} className={`!p-2 !leading-3 !font-semibold !text-sm`}>{taskData.firstBtn}</Button>
                        </div>
                        <div className='flex flex-col items-center'>
                            <span className='font-semibold text-sm mb-1'>Task Time</span>
                            <span className='font-semibold text-sm text-lightOrange'>03:00</span>
                            <span className='text-xs text-themeGrayscale500'>hh:mm</span>
                        </div>
                        <div className='flex flex-col items-center'>
                            <time className='text-sm font-semibold mb-2 block' datetime="16-04-2024">Status</time>
                            <Button variant={`${taskData.pendingBtn}`} className={`!p-2 !leading-3 !font-semibold !text-sm`}>{taskData.secBtn}</Button>
                        </div>
                    </div>
                </div>
                <button className='flex justify-center w-full text-xs font-bold gap-2 p-2'><Plus className='h-4 w-4' />Add New Task</button>
            </div>
        </div>
    )
}
