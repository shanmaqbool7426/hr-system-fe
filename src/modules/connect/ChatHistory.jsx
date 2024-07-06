import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'

const ChatHistory = () => {
    const { t } = useTranslation()

    return (
        <ul className='w-1/4 border rounded-lg p-3 flex flex-col gap-2 h-[calc(100dvh_-_222px)] overflow-y-scroll zt-hideScrollbar'>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 6, 7,].map((ele, i) => (
                <li key={i} className='bg-themeGrayscale50 p-3 rounded-lg flex justify-between'>
                    <div className='flex gap-3 items-center w-full'>
                        <figure className='flex shrink-0 justify-center items-center rounded-full h-10 w-10 bg-themeDangerLight relative'>
                            <Image src={'/assets/images/users/user-01.jpg'} height={40} width={40} alt='Profile' className='rounded-full object-cover' />
                            <span className='absolute bottom-0 right-0 border-white border-2 h-3 w-3 bg-themeSuccess rounded-full'></span>
                        </figure>
                        <div className='flex flex-col justify-between h-full w-[calc(100%_-_50px)]'>
                            <div className='flex items-center'>
                                <span className='font-bold leading-none grow'>{t("John")}</span>
                                <span className='text-xs leading-none'>{t("3:00 PM")}</span>
                            </div>
                            <span className='text-themeGrayscale600 leading-none text-sm truncate overflow-ellipsis w-full'>{t("You : We will send a confirmation message on your email to recover password")}</span>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default ChatHistory
