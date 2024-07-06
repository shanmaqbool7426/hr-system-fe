// import { Button, DropDown, Textarea } from '@/components/elements'
// import { ImportantIcon, Plus, TextFormatIcon, UpArrow, VoiceIcon } from '@/components/svg'
// import Image from 'next/image'
// import React, { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import InputEmoji from "react-input-emoji";
// import ReactComponent from './ReactComponent'

// const Chat = () => {
//     const { t } = useTranslation()
//     const [chat, setChat] = useState('')
//     const [text, setText] = useState("");

//     function handleOnEnter(text) {
//         console.log("enter", text);
//     }
//     return (
//         <div className='grow border p-3 rounded-lg flex flex-col'>
//             <ul className='flex flex-col gap-4 h-[calc(100vh_-_350px)] mb-4 overflow-y-scroll zt-hideScrollbar p-3'>
//                 <span className='text-center'>{t("Yesturday")}</span>
//                 {[0, 1, 2, 3].map((ele, i) => (
//                     <div key={i} className='flex flex-col items-start gap-4'>
//                         <li className='flex gap-2 items-start max-w-4/5 chat__content relative'>
//                             <figure className='flex shrink-0 justify-center items-center rounded-full h-10 w-10 bg-themeDangerLight relative'>
//                                 <Image src={'/assets/images/users/user-01.jpg'} height={40} width={40} alt='Profile' className='rounded-full object-cover' />
//                                 <span className='absolute bottom-0 right-0 border-white border-2 h-3 w-3 bg-themeSuccess rounded-full'></span>
//                             </figure>
//                             <div className='rounded-lg bg-themeGrayscale50 p-3'>
//                                 <div className='flex justify-between gap-3'>
//                                     <span className='font-bold'>{t("John")}</span>
//                                 </div>
//                                 <div className='flex gap-3'>
//                                     <p className='mb-0'>{t("We will send a confirmation message on your email to recover password")}</p>
//                                     <time datetime="3:00 PM" className='self-end mt-4 text-sm'>{t("3:00 PM")}</time>
//                                 </div>
//                             </div>
//                             <ReactComponent className={'right-0 '} />
//                         </li>
//                         <li className='self-end chat__content relative max-w-4/5 flex gap-2'>
//                             <div className='flex gap-3 bg-themeGrayscale50 rounded-lg p-3'>
//                                 <p className='mb-0'>{t("We will send a confirmation message on your email to recover password")}</p>
//                                 <time className='self-end mt-4 text-sm' datetime="3:00 PM">{t("3:00 PM")}</time>
//                             </div>
//                             <figure className='flex shrink-0 justify-center items-center rounded-full h-10 w-10 bg-themeDangerLight relative'>
//                                 <Image src={'/assets/images/users/user-01.jpg'} height={40} width={40} alt='Profile' className='rounded-full object-cover' />
//                                 <span className='absolute bottom-0 right-0 border-white border-2 h-3 w-3 bg-themeSuccess rounded-full'></span>
//                             </figure>
//                             <ReactComponent className={'left-0 '} />
//                         </li>
//                     </div>
//                 ))}
//             </ul>
//             <div className='relative'>
//                 <Textarea name='chat' value={chat} onChange={(e) => { setChat(e.target.value) }} rows={1} className={'pr-20'} />
//                 <div className='absolute right-2 bottom-2 flex gap-2'>
//                     <DropDown icon={<Button className={'btn btn-primary  !p-2'}><Plus className='h-4 w-4' /></Button>
//                     }>
//                         <ul className="zt-themeDropDownList !bottom-10 !-top-48 text-sm zt-sm gap-3 w-40">
//                             <li className="!p-0">
//                                 <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal'}>
//                                     {/* <span><ForwardIcon /></span> */}
//                                     <span>{t("Attach file")}</span>
//                                 </a>
//                             </li>

//                             <li className="!p-0">
//                                 <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal'}>
//                                     {/* <span><PinIcon /></span> */}
//                                     <span>{t("Record video")}</span>
//                                 </a>
//                             </li>
//                             <li className="!p-0">
//                                 <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal'}>
//                                     {/* <span><Trash /></span> */}
//                                     <span>{t("Schedule meeting")}</span>
//                                 </a>
//                             </li>
//                             <li className="!p-0">
//                                 <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal'}>
//                                     {/* <span><Trash /></span> */}
//                                     <span>{t("Set delivery time")}</span>
//                                 </a>
//                             </li>
//                             <li className="!p-0">
//                                 <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal'}>
//                                     {/* <span><CopyIcon /></span> */}
//                                     <span>{t("Record screen")}</span>
//                                 </a>
//                             </li>
//                         </ul>
//                     </DropDown>
//                     <Button className={'btn btn-primary  !p-2'}>{chat === '' ? <VoiceIcon /> : <UpArrow className={''} />}</Button>
//                 </div>
//             </div>
//             <div className='flex gap-3 items-center px-2 pt-2 chat__content'>
//                 <span><TextFormatIcon className={'text-[#858585]'} /></span>
//                 <span><ImportantIcon className={'text-[#858585]'} /></span>
//                 <InputEmoji
//                     value={text}
//                     onChange={setText}
//                     theme='light'
//                     cleanOnEnter
//                     onEnter={handleOnEnter}
//                     placeholder="Type a message"
//                 />
//             </div>
//         </div>
//     )
// }

// export default Chat
import { Button, DropDown, Textarea } from '@/components/elements';
import { ImportantIcon, Plus, TextFormatIcon, UpArrow, VoiceIcon } from '@/components/svg';
import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputEmoji from "react-input-emoji";
import ReactComponent from './ReactComponent';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const Chat = () => {
    const { t } = useTranslation();
    const [chat, setChat] = useState('');
    const [text, setText] = useState('');
    const [isRichText, setIsRichText] = useState(false);

    function handleOnEnter(text) {
        console.log("enter", text);
    }

    return (
        <div className='grow border p-3 rounded-lg flex flex-col'>
            <ul className={`flex flex-col gap-4 ${isRichText ? "h-[calc(100vh_-_440px)]" : "h-[calc(100vh_-_352px)]"} mb-4 overflow-y-scroll zt-hideScrollbar p-3`}>
                <span className='text-center'>{t("Yesterday")}</span>
                {[0, 1, 2, 3].map((ele, i) => (
                    <div key={i} className='flex flex-col items-start gap-4'>
                        <li className='flex gap-2 items-start max-w-4/5 chat__content relative'>
                            <figure className='flex shrink-0 justify-center items-center rounded-full h-10 w-10 bg-themeDangerLight relative'>
                                <Image src={'/assets/images/users/user-01.jpg'} height={40} width={40} alt='Profile' className='rounded-full object-cover' />
                                <span className='absolute bottom-0 right-0 border-white border-2 h-3 w-3 bg-themeSuccess rounded-full'></span>
                            </figure>
                            <div className='rounded-lg bg-themeGrayscale50 p-3'>
                                <div className='flex justify-between gap-3'>
                                    <span className='font-bold'>{t("John")}</span>
                                </div>
                                <div className='flex gap-3'>
                                    <p className='mb-0'>{t("We will send a confirmation message on your email to recover password")}</p>
                                    <time dateTime="3:00 PM" className='self-end mt-4 text-sm'>{t("3:00 PM")}</time>
                                </div>
                            </div>
                            <ReactComponent className={'right-0 '} />
                        </li>
                        <li className='self-end chat__content relative max-w-4/5 flex gap-2'>
                            <div className='flex gap-3 bg-themeGrayscale50 rounded-lg p-3'>
                                <p className='mb-0'>{t("We will send a confirmation message on your email to recover password")}</p>
                                <time className='self-end mt-4 text-sm' dateTime="3:00 PM">{t("3:00 PM")}</time>
                            </div>
                            <figure className='flex shrink-0 justify-center items-center rounded-full h-10 w-10 bg-themeDangerLight relative'>
                                <Image src={'/assets/images/users/user-01.jpg'} height={40} width={40} alt='Profile' className='rounded-full object-cover' />
                                <span className='absolute bottom-0 right-0 border-white border-2 h-3 w-3 bg-themeSuccess rounded-full'></span>
                            </figure>
                            <ReactComponent className={'left-0 '} />
                        </li>
                    </div>
                ))}
            </ul>
            <div className='relative'>
                {isRichText ? (
                    <ReactQuill theme="snow" value={chat} onChange={setChat} className='' />
                ) : (
                    <Textarea name='chat' value={chat} onChange={(e) => setChat(e.target.value)} rows={1} className='pr-20' />
                )}
                <div className='absolute right-2 bottom-2 flex gap-2'>
                    <DropDown icon={<Button className={'btn btn-primary !p-2'}><Plus className='h-4 w-4' /></Button>}>
                        <ul className="zt-themeDropDownList !bottom-10 !-top-48 text-sm zt-sm gap-3 w-40">
                            <li className="!p-0">
                                <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal'}>
                                    <span>{t("Attach file")}</span>
                                </a>
                            </li>
                            <li className="!p-0">
                                <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal'}>
                                    <span>{t("Record video")}</span>
                                </a>
                            </li>
                            <li className="!p-0">
                                <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal'}>
                                    <span>{t("Schedule meeting")}</span>
                                </a>
                            </li>
                            <li className="!p-0">
                                <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal'}>
                                    <span>{t("Set delivery time")}</span>
                                </a>
                            </li>
                            <li className="!p-0">
                                <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal'}>
                                    <span>{t("Record screen")}</span>
                                </a>
                            </li>
                        </ul>
                    </DropDown>
                    <Button className={'btn btn-primary !p-2'}>{chat === '' ? <VoiceIcon /> : <UpArrow className={''} />}</Button>
                </div>
            </div>
            <div className='flex gap-3 items-center px-2 pt-2 chat__content'>
                <span className='cursor-pointer' onClick={() => setIsRichText(!isRichText)}><TextFormatIcon className={'text-[#858585]'} /></span>
                <span><ImportantIcon className={'text-[#858585]'} /></span>
                <InputEmoji
                    value={text}
                    onChange={setText}
                    theme='light'
                    cleanOnEnter
                    onEnter={handleOnEnter}
                    placeholder="Type a message"
                />
            </div>
        </div>
    );
};

export default Chat;
