import { CheckBox, Input, SearchSelect, ToggleCheck } from "@/components/elements";
import { useTranslation } from "next-i18next";

export default function RemoteProfile() {
    const { t } = useTranslation()

    return (
        <section className="zt-card flex flex-col gap-4">
            <div className='zt-card !bg-themeGrayscale100 grid grid-cols-3 col-span-2 gap-4'>
                <h2 className='text-h4 mb-0 col-span-3 text-left'>{t("Screenshots")}</h2>
                <div className="flex gap-6">
                    <span>{t("Enable screen capture")}</span>
                    <ToggleCheck id={'product'}/> 
                </div>
                <SearchSelect  label={'Screenshot interval'} list={[{ display: "5 min", value: "5 min" }, { display: "10 min", value: "10 min" }, { display: "15 min", value: "15 min" }, { display: "30 min", value: "30 min" }]} />
                <SearchSelect  label={'Remote Manager'} list={[{ display: "John", value: "John" }, { display: "Simo", value: "Simo" }, { display: "Alexa", value: "Alexa" }]} />
                <div className="flex gap-6">
                    <span>{t("Blur screenshot capture")}</span>
                    <ToggleCheck id={'capture'}/> 
                </div> 
                <Input label={'Screenshot capture count'} placeholder='03' />
                <SearchSelect label={'Screenshot resolution quality'} list={[{ display: "640x640", value: "640x640" }, { display: "1024x1024", value: "1024x1024" }]} />
            </div>
            <div className='zt-card !bg-themeGrayscale100 grid grid-cols-3 col-span-2 gap-4'>
                <h2 className='text-h4 mb-0 col-span-3 text-left'>{t("Tracking")}</h2>
                <div className="flex gap-6">
                    <span>{t("Meeting time tracking")}</span>
                    <ToggleCheck id={'tracking'}/> 
                </div>
                <div className="flex gap-6">
                    <span>{t("Offline time")}</span>
                    <ToggleCheck id={'offline'}/> 
                </div>  
                <div className="flex gap-6">
                    <span>{t("Allow overtime")}</span>
                    <ToggleCheck id={'fullDay'}/> 
                </div> 
                <SearchSelect label={'Idle time tracking'} list={[{ display: "5 min", value: "5 min" }, { display: "10 min", value: "10 min" }, { display: "15 min", value: "15 min" }, { display: "30 min", value: "30 min" }]} />
                <SearchSelect label={'Default application productivity'} list={[{ display: "Unproductive", value: "Unproductive" }, { display: "Neutral", value: "Neutral" }, { display: "Productive", value: "Productive" }]} />
                <SearchSelect label={'Track week days'} list={[{ display: "Enable", value: "Enable" }, { display: "Disable", value: "Disable" }]} />
            </div>
            <div className='zt-card !bg-themeGrayscale100 grid grid-cols-4 gap-10'>
                <h2 className='text-h4 mb-0 col-span-4 text-left'>{t("Other")}</h2>
                <div className="flex gap-6 justify-between">
                    <span>{t("Hide Offline Times section")}</span>
                    <ToggleCheck id={'hideoffline'}/> 
                </div> 
                <div className="flex gap-6 justify-between">
                    <span>{t("Hide Screenshots")}</span>
                    <ToggleCheck id={'HideScreenshots'}/> 
                </div> 
                <div className="flex gap-6 justify-between">
                    <span>{t("Disable Log Out / Quit")}</span>
                    <ToggleCheck id={'Quit'}/> 
                </div>  
                <div className="flex gap-6 justify-between">
                    <span>{t("Turn off mouse movement")}</span>
                    <ToggleCheck id={'mousemovement'}/> 
                </div> 
                <div className="flex gap-6 justify-between">
                    <span>{t("Disable mobile tracking")}</span>
                    <ToggleCheck id={'mobile'}/> 
                </div> 
                <div className="flex gap-6 justify-between">
                    <span>{t("Disable app tracking")}</span>
                    <ToggleCheck id={'app'}/> 
                </div>  
                <div className="flex gap-6 justify-between">
                    <span>{t("Disable URL tracking")}</span>
                    <ToggleCheck id={'url'}/> 
                </div> 
                <div className="flex gap-6 justify-between">
                    <span>{t("Disable windows title tracking")}</span>
                    <ToggleCheck id={'windows'}/> 
                </div> 
            </div>
        </section>
    )
}