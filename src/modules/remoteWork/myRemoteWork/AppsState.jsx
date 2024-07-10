import ChangeAppStatusForm from '@/components/forms/remoteWork/ChangeAppStatus'
import { ThreeDotsVertical } from '@/components/svg' 
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const AppsState = () => {
    const { t } = useTranslation()
    const [create, setCreate] = useState(false)
    const mainData=[
        {status:"Productive apps - 5h 21m",color:"themeSuccess"},
        {status:"Unproductive apps - 43m",color:"themeDanger"},
        {status:"Neutral apps - 1h 59m",color:"themeGrayscale500"},
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
        <>
        {
            mainData.map((ele,i)=>(
                <div key={i} className='shadow bg-themeGrayscale50 rounded-lg'>
                    <h2 className={`text-h4 rounded-t-lg bg-${ele.color} text-white py-3 px-4`}>{ele.status}</h2>
                    <div className=' grid divide-x-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {AppData.map((ele, i) => (
                            <div key={i} className='flex apps__state px-4 py-1 justify-between items-center'>
                                <div className='flex gap-2 items-center'>
                                    <p className='mb-0'> {ele.name}</p>
                                </div>
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
        </>
    )
}

export default AppsState
