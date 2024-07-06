import React, { useState } from 'react'
import InputEmoji from "react-input-emoji";
import { CopyIcon, ForwardIcon, PinIcon, ThreeDotsVertical, Trash } from '@/components/svg'
import { DropDown } from '@/components/elements';
import { useTranslation } from 'react-i18next';

const ReactComponent = ({className}) => {
    const { t } = useTranslation()
    const [text, setText] = useState("");

    function handleOnEnter(text) {
        console.log("enter", text);
    }
    return (
        <div className={`${className} absolute -top-10 hidden chat__emoji  cursor-pointer bg-white shadow-xl rounded-lg p-3 items-center text-xl`}>
            <span title='Like'>👍</span>
            <span title='Heart'>❤️</span>
            <span title='Laugh'>😆</span>
            <span title='Surprized'>😮</span>
            <InputEmoji
                value={text}
                onChange={setText}
                theme='light'
                cleanOnEnter
                onEnter={handleOnEnter}
                placeholder="Type a message"
            />
            <span>|</span>
            <span title='Reply' className='rotate-180'><ForwardIcon /></span>
            <div className='  items-center '>
                <DropDown icon={<ThreeDotsVertical className={'w-5 h-5'} />}>
                    <ul className="zt-themeDropDownList text-sm zt-sm gap-4 w-40">

                        <li className="!p-0">
                            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal'}>
                                <span><ForwardIcon /></span>
                                <span>{t("Forward")}</span>
                            </a>
                        </li>
                        <li className="!p-0">
                            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal'}>
                                <span><CopyIcon /></span>
                                <span>{t("Copy Link")}</span>
                            </a>
                        </li>
                        <li className="!p-0">
                            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal'}>
                                <span><PinIcon /></span>
                                <span>{t("Pin")}</span>
                            </a>
                        </li>
                        <li className="!p-0">
                            <a className={'flex items-center no-underline gap-2 cursor-pointer font-normal'}>
                                <span><Trash /></span>
                                <span>{t("Delete")}</span>
                            </a>
                        </li>
                    </ul>
                </DropDown>
            </div>
        </div>
    )
}

export default ReactComponent
