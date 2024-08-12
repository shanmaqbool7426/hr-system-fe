import { Button, CheckBox, Select } from '@/components/elements';
import ChangeAppStatusForm from '@/components/forms/remoteWork/change-app-status';
import { ThreeDotsVertical } from '@/components/svg';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AppsState = ({ action }) => {
    const { t } = useTranslation();
    const [create, setCreate] = useState(false);

    // State to track checked apps for each category
    const [checkedProductiveApps, setCheckedProductiveApps] = useState({});
    const [checkedUnproductiveApps, setCheckedUnproductiveApps] = useState({});
    const [checkedNeutralApps, setCheckedNeutralApps] = useState({});

    const mainData = [
        { status: "Productive Apps", time: "(5h 10Min)", color: "bg-themeSuccess" },
        { status: "Unproductive Apps", time: "(5h 10Min)", color: "bg-themeDanger" },
        { status: "Neutral Apps", time: "(5h 10Min)", color: "bg-LightSlateBlue" },
    ];

    const productiveAppsData = [
        { name: "Meeting with John", time: "55m" },
        { name: "docs.google.com", time: "55m" },
        { name: "Microsoft Excel", time: "55m" },
    ];

    const unproductiveAppsData = [
        { name: "Lightshot", time: "85m" },
        { name: "image.prntscr.com", time: "55m" },
        { name: "flickr.com", time: "55m" },
        { name: "similarweb.com", time: "55m" },
    ];

    const neutralAppsData = [
        { name: "mail.google.com", time: "55m" },
        { name: "wikipedia.org", time: "55m" },
        { name: "maps.google.com", time: "55m" },
        { name: "Calculator", time: "55m" },
        { name: "Microsoft Outlook", time: "55m" },
    ];

    // Functions to handle checkbox changes for each category
    const handleCheckboxChange = (appName, category) => {
        if (category === "Productive Apps") {
            setCheckedProductiveApps(prevState => ({
                ...prevState,
                [appName]: !prevState[appName]
            }));
        } else if (category === "Unproductive Apps") {
            setCheckedUnproductiveApps(prevState => ({
                ...prevState,
                [appName]: !prevState[appName]
            }));
        } else if (category === "Neutral Apps") {
            setCheckedNeutralApps(prevState => ({
                ...prevState,
                [appName]: !prevState[appName]
            }));
        }
    };

    // Functions to check if any checkbox is checked for each category
    const isAnyCheckboxChecked = (category) => {
        if (category === "Productive Apps") {
            return productiveAppsData.some(app => checkedProductiveApps[app.name]);
        } else if (category === "Unproductive Apps") {
            return unproductiveAppsData.some(app => checkedUnproductiveApps[app.name]);
        } else if (category === "Neutral Apps") {
            return neutralAppsData.some(app => checkedNeutralApps[app.name]);
        }
    };

    // Functions to handle select all for each category
    const handleSelectAll = (categoryName) => {
        if (categoryName === "Productive Apps") {
            const allChecked = productiveAppsData.reduce((acc, app) => {
                acc[app.name] = true;
                return acc;
            }, {});
            setCheckedProductiveApps(allChecked);
        } else if (categoryName === "Unproductive Apps") {
            const allChecked = unproductiveAppsData.reduce((acc, app) => {
                acc[app.name] = true;
                return acc;
            }, {});
            setCheckedUnproductiveApps(allChecked);
        } else if (categoryName === "Neutral Apps") {
            const allChecked = neutralAppsData.reduce((acc, app) => {
                acc[app.name] = true;
                return acc;
            }, {});
            setCheckedNeutralApps(allChecked);
        }
    };

    const renderAppData = (appData, checkedApps, category) => (
        appData.map((app, j) => (
            <div key={j} className='flex apps__state px-4 py-1 justify-between items-center'>
                {
                    action ?
                        <CheckBox
                            labelClass='text-base'
                            id={app.name}
                            label={app.name}
                            checked={checkedApps[app.name] || false}
                            onChange={() => handleCheckboxChange(app.name, category)}
                        /> :
                        <p className='mb-0'>{app.name}</p>
                }
                <div className='flex'>
                    <time className='time' dateTime="7m">{app.time}</time>
                    {action &&
                        <button onClick={() => { setCreate(true) }} className='hidden action_btn'>
                            <ThreeDotsVertical />
                        </button>
                    }
                </div>
            </div>
        ))
    );

    return (
        <div className='grid zt-remote__type__grid gap-6 '>
            {mainData.map((ele, i) => (
                <div key={i} className={`border-4 rounded-lg overflow-hidden`}>
                    <div className={`flex gap-3 ${ele.color} text-white p-6 justify-between`}>
                        <div className='flex gap-3 items-end'>
                            <h2 className={`text-h4 text-white mb-0`}>{ele.status}</h2>
                            <span>{ele.time}</span>
                        </div>
                        {action &&
                            <button className='uppercase font-bold' onClick={() => handleSelectAll(ele.status)}>{t("Select All")}</button>
                        }
                    </div>
                    <div className='overflow-y-scroll max-h-96'>
                        {isAnyCheckboxChecked(ele.status) && (
                            <div className='flex items-end gap-4 p-4'>
                                <Select label='Change status' options={['Productive Apps', 'Unproductive Apps', 'Neutral Apps']} />
                                <Button className={'btn btn-success'}>{t("Confirm")}</Button>
                            </div>
                        )}
                        <div className='py-4'>
                            {ele.status === "Productive Apps" && renderAppData(productiveAppsData, checkedProductiveApps, ele.status)}
                            {ele.status === "Unproductive Apps" && renderAppData(unproductiveAppsData, checkedUnproductiveApps, ele.status)}
                            {ele.status === "Neutral Apps" && renderAppData(neutralAppsData, checkedNeutralApps, ele.status)}
                        </div>
                    </div>
                </div>
            ))}
            {create && <ChangeAppStatusForm onClose={() => { setCreate(false) }} />}
        </div>
    );
}

export default AppsState;
