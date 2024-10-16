import { Button, CheckBox, Input, SearchSelect, Select, ToggleCheck } from "@/components/elements";
import { useTranslation } from "next-i18next";
import { useState } from "react";

export default function RemoteProfile({ gridCols, colSpan, parentClass }) {
    const { t } = useTranslation()

    return (
        <>
            <section className={`flex flex-col gap-4`}>
                <div className={`zt-employeeCard !grid ${gridCols ? gridCols : " grid-cols-3 "} gap-4`}>
                    <h2 className={`text-h4 mb-0 ${colSpan ? colSpan : "col-span-3"}  text-left`}>{t("Screenshots")}</h2>
                    <div className="flex gap-6 items-center justify-between">
                        <span>{t("Enable screen capture")}</span>
                        <ToggleCheck id={'product'} />
                    </div>
                    <SearchSelect containerClass={'!gap-1'} label={'Screenshot interval'} list={[{ display: "5 min", value: "5 min" }, { display: "10 min", value: "10 min" }, { display: "15 min", value: "15 min" }, { display: "30 min", value: "30 min" }]} />
                    <SearchSelect containerClass={'!gap-1'} label={'Remote Manager'} list={[{ display: "John", value: "John" }, { display: "Simo", value: "Simo" }, { display: "Alexa", value: "Alexa" }]} />
                    <div className="flex gap-6 items-center justify-between">
                        <span>{t("Blur screenshot capture")}</span>
                        <ToggleCheck id={'capture'} />
                    </div>
                    <Input containerClass={'!gap-1'} label={'Screenshot capture count'} placeholder='03' />
                    <SearchSelect containerClass={'!gap-1'} label={'Screenshot resolution quality'} list={[{ display: "640x640", value: "640x640" }, { display: "1024x1024", value: "1024x1024" }]} />
                </div>
                <div className={`zt-employeeCard !grid ${gridCols ? gridCols : " grid-cols-3 "} gap-4`}>
                    <h2 className={`text-h4 mb-0 ${colSpan ? colSpan : "col-span-3"}  text-left`}>{t("Tracking")}</h2>
                    <div className="flex gap-6 justify-between items-center">
                        <span>{t("Meeting time tracking")}</span>
                        <ToggleCheck id={'tracking'} />
                    </div>
                    <div className="flex gap-6 items-center justify-between">
                        <span>{t("Offline time")}</span>
                        <ToggleCheck id={'offline'} />
                    </div>
                    <div className="flex gap-6 items-center justify-between">
                        <span>{t("Allow overtime")}</span>
                        <ToggleCheck id={'fullDay'} />
                    </div>
                    <SearchSelect containerClass={'!gap-1'} label={'Idle time tracking'} list={[{ display: "3 min", value: "3 min" }, { display: "5 min", value: "5 min" }, { display: "10 min", value: "10 min" }, { display: "15 min", value: "15 min" }, { display: "30 min", value: "30 min" }]} />
                    <SearchSelect containerClass={'!gap-1'} label={'Default application productivity'} list={[{ display: "Unproductive", value: "Unproductive" }, { display: "Neutral", value: "Neutral" }, { display: "Productive", value: "Productive" }]} />
                    <SearchSelect containerClass={'!gap-1'} label={'Track weekend days'} list={[{ display: "Enable", value: "Enable" }, { display: "Disable", value: "Disable" }]} />
                </div>

                <div className={`zt-employeeCard !grid ${gridCols ? gridCols : " grid-cols-4"} gap-10`}>
                    <h2 className={`text-h4 mb-0  ${colSpan ? colSpan : "col-span-4"} text-left`}>{t("Other")}</h2>
                    <div className="flex gap-6 justify-between">
                        <span>{t("Hide Offline Times section")}</span>
                        <ToggleCheck id={'hideoffline'} />
                    </div>
                    <div className="flex gap-6 justify-between">
                        <span>{t("Hide Screenshots")}</span>
                        <ToggleCheck id={'HideScreenshots'} />
                    </div>
                    <div className="flex gap-6 justify-between">
                        <span>{t("Disable Log Out / Quit")}</span>
                        <ToggleCheck id={'Quit'} />
                    </div>
                    <div className="flex gap-6 justify-between">
                        <span>{t("Turn off mouse movement")}</span>
                        <ToggleCheck id={'mousemovement'} />
                    </div>
                    <div className="flex gap-6 justify-between">
                        <span>{t("Disable mobile tracking")}</span>
                        <ToggleCheck id={'mobile'} />
                    </div>
                    <div className="flex gap-6 justify-between">
                        <span>{t("Disable app tracking")}</span>
                        <ToggleCheck id={'app'} />
                    </div>
                    <div className="flex gap-6 justify-between">
                        <span>{t("Disable URL tracking")}</span>
                        <ToggleCheck id={'url'} />
                    </div>
                    <div className="flex gap-6 justify-between">
                        <span>{t("Disable windows title tracking")}</span>
                        <ToggleCheck id={'windows'} />
                    </div>
                    <div className="flex gap-6 justify-between">
                        <span>{t("Disable offline time editing")}</span>
                        <ToggleCheck id={'offlineEditing'} />
                    </div>
                    <div className="flex gap-6 justify-between">
                        <span>{t("Disable mobile time sync")}</span>
                        <ToggleCheck id={'mobileSync'} />
                    </div>
                </div>
            </section>
        </>
    )
}