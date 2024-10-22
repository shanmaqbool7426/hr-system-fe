import { CheckBox, SearchSelect } from '@/components/elements';
import React from 'react'
import { useTranslation } from 'next-i18next';

const AccountSetting = () => {
    const { t } = useTranslation();
    const trackingData = [
        'Disable app tracking',
        'Disable URL tracking',
        'Disable windows title',
        'Disable private time',
        'Disable mobile time sync',
        'Disable calendar sync',
        'Turn off mouse clicks',
        'Turn off mouse movement',
        'Disable Deleted time editing rights',
        'Disable Private time editing rights',
        'Disable night shifts',
        // 'Enable Meeting time tracking (BETA)'
    ]
    const data = [
        'Hide Owner',
        'Disable new project creation',
        'Disable Project costs',
        'Disable employee shift approval',
        'Hide Dashboard',
        'Hide Team Members section',
        'Hide Colleagues section',
        'Hide Projects section',
        'Hide Work Schedules',
        'Hide Absence calendar',
        // 'Hide Offline Times section',
        // 'Hide Screenshots',
        'Hide Reports section',
        'Hide Exports section',
        'Hide Web timer',
        // 'Disable Log Out / Quit'
    ]
    return (
        <div className='grow zt-card flex flex-col gap-6'>
            {/* <div className='!bg-themeGrayscale100 zt-card flex flex-col gap-3'>
                <h2 className='text-h4 mb-0'>{t("Screenshots")}</h2>
                <CheckBox id={'product'} label={'Enable screen capture'} />
                <CheckBox id={'blur'} label={'Blur screen capture'} />
                <SearchSelect label={'Screen capture interval'} list={[{ display: "5 min", value: "5 min" }, { display: "10 min", value: "10 min" }, { display: "15 min", value: "15 min" }, { display: "30 min", value: "30 min" }]} />
                <SearchSelect label={'Screen capture quality'} list={[{ display: "640x640", value: "640x640" }, { display: "1024x1024", value: "1024x1024" }]} />
            </div> */}
            <div className='!bg-themeGrayscale100 zt-card flex flex-col gap-3'>
                <h2 className='text-h4 mb-0'>{t("Tracking")}</h2>
                {trackingData.map((ele, i) => (
                    <CheckBox key={i} id={i} label={ele} />
                ))}
                {/* <SearchSelect label={'Idle time tracking'} list={[{ display: "5 min", value: "5 min" }, { display: "10 min", value: "10 min" }, { display: "15 min", value: "15 min" }, { display: "30 min", value: "30 min" }]} />
                <SearchSelect label={'Offline time'} list={[{ display: "Enable", value: "Enable" }, { display: "Disable", value: "Disable" }]} />
                <SearchSelect label={'Default application productivity'} list={[{ display: "Unproductive", value: "Unproductive" }, { display: "Neutral", value: "Neutral" }, { display: "Productive", value: "Productive" }]} /> */}
            </div>
            <div className='!bg-themeGrayscale100 zt-card flex flex-col gap-3'>
                <h2 className='text-h4 mb-0'>{t("Other")}</h2>
                {data.map((ele, i) => (
                    <CheckBox key={i} id={i+55} label={ele} />
                ))}
            </div>
        </div>
    )
}

export default AccountSetting
