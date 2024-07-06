import { Button, Textarea } from '@/components/elements'
import { UpArrow } from '@/components/svg'
import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Chat = () => {
    const { t } = useTranslation()

    return (
        <div className='grow border p-3 rounded-lg flex flex-col'>
            <ul className='flex flex-col gap-4 h-[calc(100vh_-_318px)] mb-4 overflow-y-scroll zt-hideScrollbar p-3'>
                <span className='text-center'>{t("Yesturday")}</span>
                {[0, 1, 2, 3].map((ele, i) => (
                    <div key={i} className='flex flex-col gap-4'>
                        <li className='flex gap-2 items-start w-4/5'>
                            <figure className='flex shrink-0 justify-center items-center rounded-full h-10 w-10 bg-themeDangerLight relative'>
                                <Image src={'/assets/images/users/user-01.jpg'} height={40} width={40} alt='Profile' className='rounded-full object-cover' />
                                <span className='absolute bottom-0 right-0 border-white border-2 h-3 w-3 bg-themeSuccess rounded-full'></span>
                            </figure>
                            <div className='rounded-lg bg-themeGrayscale50 p-3'>
                                <div className='flex justify-between gap-3'>
                                    <span className='font-bold'>{t("John")}</span>
                                    <time datetime="3:00 PM">{t("3:00 PM")}</time>
                                </div>
                                <p className='mb-0'>{t("We will send a confirmation message on your email to recover password")}</p>
                            </div>
                        </li>
                        <li className='self-end flex gap-2'>
                            <div className='flex gap-3 bg-themeGrayscale50 rounded-lg p-3'>
                                <p className='mb-0'>{t("We will send a confirmation message on your email to recover password")}</p>
                                <time className='self-end mt-4 text-sm' datetime="3:00 PM">{t("3:00 PM")}</time>
                            </div>
                            <figure className='flex shrink-0 justify-center items-center rounded-full h-10 w-10 bg-themeDangerLight relative'>
                                <Image src={'/assets/images/users/user-01.jpg'} height={40} width={40} alt='Profile' className='rounded-full object-cover' />
                                <span className='absolute bottom-0 right-0 border-white border-2 h-3 w-3 bg-themeSuccess rounded-full'></span>
                            </figure>
                        </li>
                    </div>
                ))}

                <span className='text-center'>{t("Today")}</span>
                <li className='flex gap-2 items-start w-4/5'>
                    <figure className='flex shrink-0 justify-center items-center rounded-full h-10 w-10 bg-themeDangerLight relative'>
                        <Image src={'/assets/images/users/user-01.jpg'} height={40} width={40} alt='Profile' className='rounded-full object-cover' />
                        <span className='absolute bottom-0 right-0 border-white border-2 h-3 w-3 bg-themeSuccess rounded-full'></span>
                    </figure>
                    <div className='rounded-lg bg-themeGrayscale50 p-3'>
                        <div className='flex justify-between gap-3'>
                            <span className='font-bold'>{t("John")}</span>
                            <time datetime="3:00 PM">{t("3:00 PM")}</time>
                        </div>
                        <p className='mb-0'>{t("We will send a confirmation message on your email to recover password")}</p>
                    </div>
                </li>
                <li className='self-end flex gap-2'>
                    <div className='flex gap-3 bg-themeGrayscale50 rounded-lg p-3'>
                        <p className='mb-0'>{t("We will send a confirmation message on your email to recover password")}</p>
                        <time className='self-end mt-4 text-sm' datetime="3:00 PM">{t("3:00 PM")}</time>
                    </div>
                    <figure className='flex shrink-0 justify-center items-center rounded-full h-10 w-10 bg-themeDangerLight relative'>
                        <Image src={'/assets/images/users/user-02.jpg'} height={40} width={40} alt='Profile' className='rounded-full object-cover' />
                        <span className='absolute bottom-0 right-0 border-white border-2 h-3 w-3 bg-themeSuccess rounded-full'></span>
                    </figure>
                </li>
            </ul>
            <div className='relative'>
                <Textarea rows={1} className={'pr-20'} />
                <Button className={'btn btn-primary absolute right-2 bottom-2 !p-2'}>
                    <UpArrow />
                </Button>
            </div>
        </div>
    )
}

export default Chat
