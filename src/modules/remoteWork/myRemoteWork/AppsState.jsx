import { CheckBox } from '@/components/elements'
import ChangeAppStatusForm from '@/components/forms/remoteWork/change-app-status'
import { ThreeDotsVertical } from '@/components/svg'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const AppsState = () => {
    const { t } = useTranslation()
    const [create, setCreate] = useState(false)
    const mainData = [
        { status: "Productive Apps", time: "(5h 10Min)", color: "themePurple" },
        { status: "Unproductive Apps", time: "(5h 10Min)", color: "themeDanger" },
        { status: "Neutral Apps", time: "(5h 10Min)", color: "themeBlue" },
    ]
    const AppData = [
        { name: "Meeting with John", time: "55m" },
        { name: "mail.google.com", time: "55m" },
        { name: "Lightshot", time: "85m" },
        { name: "docs.google.com", time: "55m" },
        { name: "Microsoft Excel", time: "55m" },
        { name: "wikipedia.org", time: "55m" },
        { name: "image.prntscr.com", time: "55m" },
        { name: "flickr.com", time: "55m" },
        { name: "flickr.com", time: "55m" },
        { name: "Slack", time: "55m" },
        { name: "Calculator", time: "55m" },
        { name: "maps.google.com", time: "55m" },
        { name: "similarweb.com", time: "55m" },
        { name: "Preview", time: "55m" },
        { name: "Putty", time: "55m" },
        { name: "Microsoft Outlook", time: "55m" },
        { name: "Microsoft.Notes", time: "55m" },
        { name: "Windows Explorer", time: "55m" },
        { name: "mapon.com", time: "55m" },
        { name: "Terminal", time: "55m" },
    ]
    return (
        <div className='grid lg:grid-cols-2 xl:grid-cols-3 gap-6'>
            {
                mainData.map((ele, i) => (
                    <div key={i} className={`border-4 !border-${ele.color} rounded-lg overflow-hidden`}>
                        <div className={`flex gap-3 bg-${ele.color} text-white p-6 items-end`}>
                            <h2 className={`text-h4 text-white mb-0`}>{ele.status}</h2>
                            <span>{ele.time}</span>
                        </div>
                        <div className=''>
                            {AppData.map((ele, i) => (
                                <div key={i} className='flex apps__state px-4 py-1 justify-between items-center'>
                                    <CheckBox labelClass='text-base' id={ele.name} label={ele.name} />
                                    <div className='flex'>
                                        <time className='time' datetime="7m">{ele.time}</time>
                                        <button onClick={() => { setCreate(true) }} className='hidden action_btn'>
                                            <ThreeDotsVertical />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            }

            {create &&
                <ChangeAppStatusForm
                    onClose={() => { setCreate(false) }}
                />
            }
        </div>
    )
}

export default AppsState
