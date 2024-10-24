
import { Button, SearchSelect, Switch } from "@/components/elements";
import { FetchRemoteTeams } from "@/store/actions/remote-team.actions";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from '@/util/axios';
import Toast from "@/util/toast";
import RemoteProfile from "./remoteWorkCards";
import { UpdateEmployee } from "@/store/actions/employee.actions";


export default function RemoteWorkModule() {

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { employee_details } = useSelector(state => state.employee)
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            screenShotEnabled: employee_details?.remoteSetting?.screenShotEnabled || false,
            blurScreenShot: employee_details?.remoteSetting?.blurScreenShot || false,
            screenShotInterval: employee_details?.remoteSetting?.screenShotInterval || 3,
            screenShotPerInterval: employee_details?.remoteSetting?.screenShotPerInterval || 3,
            screenShotQuality: employee_details?.remoteSetting?.screenShotQuality || "sd",
            storeOfflineData: employee_details?.remoteSetting?.storeOfflineData || true,
            idleTime: employee_details?.remoteSetting?.idleTime || 3,
            ignoreIdleWhenInactive: employee_details?.remoteSetting?.ignoreIdleWhenInactive || false,
            hideScreenshots: employee_details?.remoteSetting?.hideScreenshots || false,
            disableQuit: employee_details?.remoteSetting?.disableQuit || false,
        },
        validationSchema: Yup.object({
            screenShotInterval: Yup.number().required(t("Screenshot interval is required")),
            screenShotPerInterval: Yup.number().required(t("Screenshots count in given interval is required")),
            screenShotQuality: Yup.string().required(t("Screenshot resolution quality is required")),
            idleTime: Yup.number().required(t("Idle time is required")),
            ignoreIdleWhenInactive: Yup.boolean().required(t("Ignore idle when inactive is required")),
            hideScreenshots: Yup.boolean().required(t("Hide screenshots is required")),
            disableQuit: Yup.boolean().required(t("Disable quit is required")),
        }),
        onSubmit: (values) => {
            setLoading(true)
            dispatch(UpdateEmployee(employee_details?._id, { remoteSetting: values }, () => {
                setLoading(false)
                Toast.success(t("Settings saved successfully"))
            }))
        },
        enableReinitialize: true
    })
    return (

        <div className="space-y-6">

            {/* Screenshots Settings */}

            <div className={`zt-card space-y-6`}>
                <div className="flex justify-between items-center">
                    <h2 className={`text-h4 mb-0 text-left`}>{t("Screenshots")}</h2>
                    <Button variant="primary" onClick={() => { formik.handleSubmit() }} is_loading={loading} disabled={loading}>{t("Save")}</Button>
                </div>

                <article className="grid grid-cols-2 gap-6 items-center">
                    <Switch
                        name='screenShotEnabled'
                        left={true}
                        label={t("Enable capture Screenshots")}
                        checked={formik.values.screenShotEnabled}
                        onChange={(e) => {
                            formik.setFieldValue('screenShotEnabled', e.target.checked)
                        }} id={'screenShotEnabled'} />

                    <Switch
                        name='blurScreenShot'
                        left={true}
                        label={t("Blur screenshot capture")}
                        checked={formik.values.blurScreenShot}
                        onChange={(e) => {
                            formik.setFieldValue('blurScreenShot', e.target.checked)
                        }} id={'blurScreenShot'} />


                    <SearchSelect
                        label={'Screenshot interval'}
                        value={formik.values.screenShotInterval}
                        error={formik.touched.screenShotInterval && formik.errors.screenShotInterval}
                        onChange={async (value) => {
                            await formik.setFieldValue('screenShotInterval', value)
                            await formik.setFieldTouched('screenShotInterval', true)
                        }}
                        list={[
                            { display: "3 min", value: 3 },
                            { display: "5 min", value: 5 },
                            { display: "10 min", value: 10 },
                            { display: "15 min", value: 15 },
                            { display: "30 min", value: 30 }
                        ]} />

                    <SearchSelect
                        label={'Screenshots count in given interval'}
                        value={formik.values.screenShotPerInterval}
                        error={formik.touched.screenShotPerInterval && formik.errors.screenShotPerInterval}
                        onChange={async (value) => {
                            await formik.setFieldValue('screenShotPerInterval', value)
                            await formik.setFieldTouched('screenShotPerInterval', true)
                        }}
                        list={[
                            { display: "1", value: 1 },
                            { display: "3", value: 3 },
                            { display: "5", value: 5 },
                            { display: "10", value: 10 },
                        ]} />

                    <SearchSelect
                        label={'Screenshot resolution quality'}
                        value={formik.values.screenShotQuality}
                        error={formik.touched.screenShotQuality && formik.errors.screenShotQuality}
                        onChange={async (value) => {
                            await formik.setFieldValue('screenShotQuality', value)
                            await formik.setFieldTouched('screenShotQuality', true)
                        }}
                        list={[
                            { display: "Standard (640x480)", value: "sd" },
                            { display: "HD (1280x720)", value: "hd" },
                            { display: "Full HD (1920x1080)", value: "full-hd" }
                        ]} />

                </article>



            </div>

            {/* Tracking Settings */}
            <div className={`zt-card space-y-6`}>
                <h2 className={`text-h4 mb-0 text-left`}>{t("Tracking")}</h2>

                <article className="grid grid-cols-2 gap-6 items-center">

                    <Switch
                        name='storeOfflineData'
                        left={true}
                        label={t("Track offline data")}
                        checked={formik.values.storeOfflineData}
                        onChange={async (e) => {
                            await formik.setFieldValue('storeOfflineData', e.target.checked)
                        }} id={'storeOfflineData'} />

                    <SearchSelect
                        label={'Idle time tracking'}
                        value={formik.values.idleTime}
                        error={formik.touched.idleTime && formik.errors.idleTime}
                        onChange={async (value) => {
                            await formik.setFieldValue('idleTime', value)
                            await formik.setFieldTouched('idleTime', true)
                        }}
                        list={[
                            { display: "1 min", value: 1 },
                            { display: "2 min", value: 2 },
                            { display: "5 min", value: 5 },
                            { display: "10 min", value: 10 },
                            { display: "15 min", value: 15 },
                            { display: "30 min", value: 30 }
                        ]} />


                </article>

            </div>

            {/* Miscellaneous Settings */}
            <div className={`zt-card space-y-6`}>
                <h2 className={`text-h4 mb-0 text-left`}>{t("Miscellaneous")}</h2>

                <article className="grid grid-cols-2 gap-6 items-center">
                    <Switch
                        name='ignoreIdleWhenInactive'
                        left={true}
                        label={t("Ignore idle when inactive")}
                        checked={formik.values.ignoreIdleWhenInactive}
                        onChange={async (e) => {
                            await formik.setFieldValue('ignoreIdleWhenInactive', e.target.checked)
                        }} id={'ignoreIdleWhenInactive'} />

                    <Switch
                        name='hideScreenshots'
                        left={true}
                        label={t("Hide Screenshots")}
                        checked={formik.values.hideScreenshots}
                        onChange={async (e) => {
                            await formik.setFieldValue('hideScreenshots', e.target.checked)
                        }} id={'hideScreenshots'} />

                    <Switch
                        name='disableQuit'
                        left={true}
                        label={t("Disable Log Out / Quit")}
                        checked={formik.values.disableQuit}
                        onChange={async (e) => {
                            await formik.setFieldValue('disableQuit', e.target.checked)
                        }} id={'disableQuit'} />


                </article>
            </div>

        </div>

    )
}