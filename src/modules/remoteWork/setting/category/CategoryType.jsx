import { Button, CheckBox, Select } from '@/components/elements'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const CategoryTypes = () => {
    const { t } = useTranslation()
    const [checkedApps, setCheckedApps] = useState({})

    const AppCategoryData = [
        {
            name: "E-MAIL", color: "bg-themePrimary",
            Apps: [
                { name: "mail.google.com", time: "55m" },
                { name: "Messenger", time: "55m" },  
            ]
        },
        {
            name: "SOCIAL MEDIA", color: "bg-[#E21965]",
            Apps: [
                { name: "Slack", time: "55m" }, 
                { name: "youtube.com", time: "55m" },
                { name: "facebook.com", time: "55m" },
                { name: "netflix.com", time: "55m" },
            ]
        },
        {
            name: "OFFICE APPS", color: "bg-[#079CBD]",
            Apps: [
                { name: "Microsoft Excel", time: "55m" },
                { name: "image.prntscr.com", time: "55m" },
                { name: "Google Chrome", time: "85m" },
                { name: "Putty", time: "55m" },
                { name: "Teams", time: "55m" },
                { name: "drive.google.com", time: "55m" },
            ]
        },
        {
            name: "ENTERTAINMENT", color: "bg-[#F4AC1C]",
            Apps: [
                { name: "Code", time: "55m" },
                { name: "netflix.com", time: "55m" },
                { name: "play.google.com", time: "85m" }, 
            ]
        },
        {
            name: "NEWS", color: "bg-themePurple",
            Apps: [
                { name: "Studio64", time: "55m" },
                { name: "Skype", time: "55m" },
                { name: "DeskTime", time: "85m" }, 
            ]
        },
        {
            name: "UNDEFINED", color: "bg-themeGrayscale500",
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
        <div className='flex flex-col gap-6 zt-card'>
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
                        <Select label='Change status' options={['Email', 'Social Media', 'Office Apps','Entertainment','News','Undefined']} />
                        <Button className={'btn btn-success'}>{t("Confirm")}</Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CategoryTypes
