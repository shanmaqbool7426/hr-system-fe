import { Button, CheckBox, Select } from '@/components/elements'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'

const AppsCategory = () => {
    const { t } = useTranslation()
    const [checkedApps, setCheckedApps] = useState({})

    const AppCategoryData = [
        {
            name: "PRODUCTIVE APPS", color: "bg-themeSuccess",
            Apps: [
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
        },
        {
            name: "UNPRODUCTIVE APPS", color: "bg-themeDanger",
            Apps: [
                { name: "Spotify", time: "55m" },
                { name: "Vlc", time: "55m" },
                { name: "pinterest.com", time: "85m" },
                { name: "youtube.com", time: "55m" },
                { name: "facebook.com", time: "55m" },
                { name: "netflix.com", time: "55m" },
            ]
        },
        {
            name: "NEUTRAL  APPS", color: "bg-themeGrayscale500",
            Apps: [
                { name: "figma", time: "55m" },
                { name: "Postman", time: "55m" },
                { name: "Messenger", time: "85m" },
                { name: "Teams", time: "55m" },
                { name: "ONENOTE", time: "55m" },
                { name: "SnippingTool", time: "55m" },
            ]
        },
    ]

    const handleSelectAll = (categoryName) => {
        setCheckedApps(prevState => {
            const updatedState = { ...prevState }
            AppCategoryData.forEach(category => {
                if (category.name === categoryName) {
                    category.Apps.forEach(app => {
                        updatedState[app.name] = true
                    })
                }
            })
            return updatedState
        })
    }

    const handleCheckboxChange = (appName) => {
        setCheckedApps(prevState => ({
            ...prevState,
            [appName]: !prevState[appName]
        }))
    }

    return (
        <div className='flex flex-col gap-6'>
            {AppCategoryData.map((category, i) => (
                <div key={i} className='rounded-lg bg-themeGrayscale50 shadow'>
                    <div className={`${category.color} px-6 py-4 text-white font-bold rounded-t-lg flex justify-between items-center`}>
                        <span>{category.name}</span>
                        <button className='uppercase' onClick={() => handleSelectAll(category.name)}>{t("Select All")}</button>
                    </div>
                    <div className='pt-4 grid divide-x-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {category.Apps.map((app, j) => (
                            <div key={j} className='flex px-6 py-1 justify-between'>
                                <CheckBox
                                    name={app.name}
                                    id={app.name}
                                    label={app.name}
                                    checked={checkedApps[app.name] || false}
                                    onChange={() => handleCheckboxChange(app.name)}
                                />
                                <time dateTime={app.time}>{app.time}</time>
                            </div>
                        ))}
                    </div>
                    <div className='flex items-end gap-4 p-6'>
                        <Select label='Change status' options={['Productive Apps', 'Unproductive Apps', 'Neutral Apps']} />
                        <Button className={'btn btn-success'}>{t("Confirm")}</Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AppsCategory
