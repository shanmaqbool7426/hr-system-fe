import { Button, Input, SearchSelect, Switch, ToggleCheck } from "@/components/elements";
import { FetchRemoteTeams } from "@/store/actions/remote-team.actions";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from '@/util/axios';
import Toast from "@/util/toast";
export default function RemoteCollectiveSettings() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { team_list } = useSelector(state => state.remoteteam)
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        dispatch(FetchRemoteTeams())
    }, [])


    const formik = useFormik({
        initialValues: {
            allEmployees: false,
            team: null,
            screenShotEnabled: true,
            blurScreenShot: false,
            screenShotInterval: 3,
            screenShotPerInterval: 3,
            screenShotQuality: "sd",
            storeOfflineData: true,
            idleTime: 3,
            ignoreIdleWhenInactive: false,
            hideScreenshots: false,
            disableQuit: false,
        },
        validationSchema: Yup.object({
            team: Yup.string().when('allEmployees', {
                is: false,
                then: () => Yup.string().required(),
                otherwise: () => Yup.string().nullable()
            }),
            screenShotInterval: Yup.number().when('screenShotEnabled', {
                is: true,
                then: () => Yup.number().required(),
                otherwise: () => Yup.number().nullable()
            }),
            screenShotPerInterval: Yup.number().when('screenShotEnabled', {
                is: true,
                then: () => Yup.number().required(),
                otherwise: () => Yup.number().nullable()
            }),
            screenShotQuality: Yup.string().when('screenShotEnabled', {
                is: true,
                then: () => Yup.string().required(),
                otherwise: () => Yup.string().nullable()
            }),
            idleTime: Yup.number().required(),
            ignoreIdleWhenInactive: Yup.boolean().required(),
            hideScreenshots: Yup.boolean().required(),
            disableQuit: Yup.boolean().required(),
        }),
        onSubmit: (values) => {
            setLoading(true)
            axios.post('/remote/collective-settings', values)
                .then(res => {
                    Toast.success(t("Settings saved successfully"))
                }).finally(() => {
                    setLoading(false)
                })
        }
    })
    return (
        <section className="flex flex-col grow">
            <div className="flex justify-between pb-6">
                <div className="flex flex-col">
                    <h1 className="text-h4 mb-0">{t("Collective Settings")}</h1>
                    <p className="mb-0">{t("Here you can apply setting on remote users collectively")}</p>
                </div>
                <div className="">
                    <Button variant={'primary'} onClick={formik.handleSubmit} is_loading={loading} disabled={loading} >{t("Save Settings")}</Button>
                </div>
            </div>
            <div className="space-y-6">

                {/* select applicable on all remote employees */}
                <div className="zt-card grid grid-cols-2 gap-6 items-center">
                    <Switch
                        name='remoteEmployess'
                        left={true}
                        label={t("Aplicable on all remote employees")}
                        checked={formik.values.allEmployees}
                        onChange={(e) => {
                            formik.setFieldValue('allEmployees', e.target.checked)
                        }} id={'aplicable'} />

                    <Switch
                        name='screenShotEnabled'
                        left={true}
                        label={t("Enable capture Screenshots")}
                        checked={formik.values.screenShotEnabled}
                        onChange={(e) => {
                            formik.setFieldValue('screenShotEnabled', e.target.checked)
                        }} id={'screenShotEnabled'} />

                    {!formik.values.allEmployees &&
                        <SearchSelect label={'Aplicable on selected remote teams'}
                            name='team'
                            placeholder={'Remote Teams'}
                            list={team_list.map(team => ({ display: team.name, value: team._id }))}
                            onChange={(value) => {
                                formik.setFieldValue('team', value)
                            }}
                            error={formik.errors.team}
                        />
                    }
                </div>

                {/* Screenshots Settings */}

                {formik.values.screenShotEnabled && <div className={`zt-card space-y-6`}>
                    <h2 className={`text-h4 mb-0 text-left`}>{t("Screenshots")}</h2>

                    <article className="grid grid-cols-2 gap-6 items-center">

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
                            onChange={(value) => {
                                formik.setFieldValue('screenShotInterval', value)
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
                            onChange={(value) => {
                                formik.setFieldValue('screenShotPerInterval', value)
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
                            onChange={(value) => {
                                formik.setFieldValue('screenShotQuality', value)
                            }}
                            list={[
                                { display: "Standard (640x480)", value: "sd" },
                                { display: "HD (1280x720)", value: "hd" },
                                { display: "Full HD (1920x1080)", value: "full-hd" }
                            ]} />

                    </article>



                </div>}

                {/* Tracking Settings */}
                <div className={`zt-card space-y-6`}>
                    <h2 className={`text-h4 mb-0 text-left`}>{t("Tracking")}</h2>

                    <article className="grid grid-cols-2 gap-6 items-center">

                        <Switch
                            name='storeOfflineData'
                            left={true}
                            label={t("Track offline data")}
                            checked={formik.values.storeOfflineData}
                            onChange={(e) => {
                                formik.setFieldValue('storeOfflineData', e.target.checked)
                            }} id={'storeOfflineData'} />

                        <SearchSelect
                            label={'Idle time tracking'}
                            value={formik.values.idleTime}
                            onChange={(value) => {
                                formik.setFieldValue('idleTime', value)
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
                            onChange={(e) => {
                                formik.setFieldValue('ignoreIdleWhenInactive', e.target.checked)
                            }} id={'ignoreIdleWhenInactive'} />

                        <Switch
                            name='hideScreenshots'
                            left={true}
                            label={t("Hide Screenshots")}
                            checked={formik.values.hideScreenshots}
                            onChange={(e) => {
                                formik.setFieldValue('hideScreenshots', e.target.checked)
                            }} id={'hideScreenshots'} />

                        <Switch
                            name='disableQuit'
                            left={true}
                            label={t("Disable Log Out / Quit")}
                            checked={formik.values.disableQuit}
                            onChange={(e) => {
                                formik.setFieldValue('disableQuit', e.target.checked)
                            }} id={'disableQuit'} />


                    </article>
                </div>

            </div>
        </section>
    )
}