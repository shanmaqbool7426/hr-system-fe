import { DropDown, Tabs } from '@/components/elements'
import { Edit, InfoIcon, MuteIcon, PinIcon, ThreeDotsVertical, Trash } from '@/components/svg'
import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { Tab } from '@headlessui/react'
const ChatHistory = () => {
    const { t } = useTranslation()
    const router = useRouter()
    return (
        <div className='w-1/4 border rounded-lg flex flex-col gap-2 h-[calc(100dvh_-_222px)] overflow-y-scroll zt-hideScrollbar'>
            <Tabs
                containerClasses={'zt-themeTabsV2 grow !gap-2 px-3 '}
                tabNavClasses={'zt-themeTabNav sticky top-0 bg-white z-50 zt-chatTabs p-3 '}
                tabs={["All", "Unread", "Groups"]}
            >
                <Tab.Panels className={`zt-themeTabPanels zt-employeeTabsPanel !bg-transparent !p-0`}>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <ul className='flex flex-col gap-2'>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 6, 7,].map((ele, i) => (
                                <li key={i} className='bg-themeGrayscale50 zt-chat__history p-3 rounded-lg flex gap-3 items-center w-full'>
                                    <figure className='flex shrink-0 justify-center items-center rounded-full h-10 w-10 bg-themeDangerLight relative'>
                                        <Image src={'/assets/images/users/user-01.jpg'} height={40} width={40} alt='Profile' className='rounded-full object-cover' />
                                        <span className='absolute bottom-0 right-0 border-white border-2 h-3 w-3 bg-themeSuccess rounded-full'></span>
                                    </figure>
                                    <div className='flex flex-col justify-between h-full w-[calc(100%_-_50px)]'>
                                        <div className='flex items-center h-5'>
                                            <span className='leading-none grow'>{t("John")}</span>
                                            <span className='text-xs leading-none'>{t("3:00 PM")}</span>
                                            <div className='hidden items-center chat__action'>
                                                <DropDown icon={<ThreeDotsVertical className={'w-5 h-5'} />}>
                                                    <ul className="zt-themeDropDownList zt-sm gap-4 w-40">
                                                        {router.asPath.includes('/groups') &&
                                                            <li className="!p-0">
                                                                <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                                                                    <span><InfoIcon /></span>
                                                                    <span>{t("Info")}</span>
                                                                </a>
                                                            </li>
                                                        }
                                                        <li className="!p-0">
                                                            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
                                                                <span><MuteIcon /></span>
                                                                <span>{t("Mute")}</span>
                                                            </a>
                                                        </li>
                                                        <li className="!p-0">
                                                            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                                                                <span><PinIcon /></span>
                                                                <span>{t("Pin")}</span>
                                                            </a>
                                                        </li>
                                                        <li className="!p-0">
                                                            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                                                                <span><Trash /></span>
                                                                <span>{t("Delete")}</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </DropDown>
                                            </div>

                                        </div>
                                        <span className='text-themeGrayscale600 leading-none text-sm truncate overflow-ellipsis w-full'>{t("You : We will send a confirmation message on your email to recover password")}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>

                    </Tab.Panel>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <ul className='flex flex-col gap-2'>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 6, 7,].map((ele, i) => (
                                <li key={i} className='bg-themeGrayscale50 zt-chat__history p-3 rounded-lg flex gap-3 items-center w-full'>
                                    <figure className='flex shrink-0 justify-center items-center rounded-full h-10 w-10 bg-themeDangerLight relative'>
                                        <Image src={'/assets/images/users/user-01.jpg'} height={40} width={40} alt='Profile' className='rounded-full object-cover' />
                                        <span className='absolute bottom-0 right-0 border-white border-2 h-3 w-3 bg-themeSuccess rounded-full'></span>
                                    </figure>
                                    <div className='flex flex-col justify-between h-full w-[calc(100%_-_50px)]'>
                                        <div className='flex items-center h-5'>
                                            <span className='font-extrabold leading-none grow'>{t("John")}</span>
                                            <span className='text-xs font-bold leading-none'>{t("3:00 PM")}</span>
                                            <div className='hidden items-center chat__action'>
                                                <DropDown icon={<ThreeDotsVertical className={'w-5 h-5'} />}>
                                                    <ul className="zt-themeDropDownList zt-sm gap-4 w-40">
                                                        {router.asPath.includes('/groups') &&
                                                            <li className="!p-0">
                                                                <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                                                                    <span><InfoIcon /></span>
                                                                    <span>{t("Info")}</span>
                                                                </a>
                                                            </li>
                                                        }
                                                        <li className="!p-0">
                                                            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
                                                                <span><MuteIcon /></span>
                                                                <span>{t("Mute")}</span>
                                                            </a>
                                                        </li>
                                                        <li className="!p-0">
                                                            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                                                                <span><PinIcon /></span>
                                                                <span>{t("Pin")}</span>
                                                            </a>
                                                        </li>
                                                        <li className="!p-0">
                                                            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                                                                <span><Trash /></span>
                                                                <span>{t("Delete")}</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </DropDown>
                                            </div>

                                        </div>
                                        <span className='text-themeGrayscale600 leading-none text-sm truncate overflow-ellipsis w-full'>{t("You : We will send a confirmation message on your email to recover password")}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Tab.Panel>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <ul className='flex flex-col gap-2'>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 6, 7,].map((ele, i) => (
                                <li key={i} className='bg-themeGrayscale50 zt-chat__history p-3 rounded-lg flex gap-3 items-center w-full'>
                                    <figure className='flex shrink-0 justify-center items-center rounded-full h-10 w-10 bg-themeDangerLight relative'>
                                        <Image src={'/assets/images/users/user-01.jpg'} height={40} width={40} alt='Profile' className='rounded-full object-cover' />
                                        <span className='absolute bottom-0 right-0 border-white border-2 h-3 w-3 bg-themeSuccess rounded-full'></span>
                                    </figure>
                                    <div className='flex flex-col justify-between h-full w-[calc(100%_-_50px)]'>
                                        <div className='flex items-center h-5'>
                                            <span className='leading-none grow'>{t("John")}</span>
                                            <span className='text-xs leading-none'>{t("3:00 PM")}</span>
                                            <div className='hidden items-center chat__action'>
                                                <DropDown icon={<ThreeDotsVertical className={'w-5 h-5'} />}>
                                                    <ul className="zt-themeDropDownList zt-sm gap-4 w-40">
                                                        <li className="!p-0">
                                                            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                                                                <span><InfoIcon /></span>
                                                                <span>{t("Info")}</span>
                                                            </a>
                                                        </li>
                                                        <li className="!p-0">
                                                            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
                                                                <span><MuteIcon /></span>
                                                                <span>{t("Mute")}</span>
                                                            </a>
                                                        </li>
                                                        <li className="!p-0">
                                                            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                                                                <span><PinIcon /></span>
                                                                <span>{t("Pin")}</span>
                                                            </a>
                                                        </li>
                                                        <li className="!p-0">
                                                            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDangerDark'}>
                                                                <span><Trash /></span>
                                                                <span>{t("Delete")}</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </DropDown>
                                            </div>

                                        </div>
                                        <span className='text-themeGrayscale600 leading-none text-sm truncate overflow-ellipsis w-full'>{t("You : We will send a confirmation message on your email to recover password")}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Tab.Panel>
                </Tab.Panels>
            </Tabs>

        </div>
    )
}

export default ChatHistory
