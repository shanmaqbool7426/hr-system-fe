import { RemoteWork } from '@/components/svg'
import StatsCard from "@/components/elements/Widgets/StatsCard";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { FetchRemoteApplications } from '@/store/actions/remote-application.actions';

export default function ApplicationsPage() {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const { application_list } = useSelector(state => state.remoteapplication)

    useEffect(() => {
        dispatch(FetchRemoteApplications())
    }, [dispatch])


    const productiveProcesses = application_list?.filter(item => item?.nature === "productive")
    const unproductiveProcesses = application_list?.filter(item => item?.nature === "unproductive")
    const neutralProcesses = application_list?.filter(item => item?.nature === "neutral")


    return (
        <section className="flex flex-col grow">
            <div className="flex justify-between pb-6">
                <div className="flex flex-col">
                    <h1 className="text-h4 mb-0">{t("Remote Applications")}</h1>
                    <p className="text-body-2 text-gray-500">
                        {t("View your remote applications")}
                    </p>
                </div>
            </div>

            <div className="zt-card grow space-y-6">
                <div className="grid grid-cols-3 gap-4">
                    <StatsCard title={productiveProcesses?.length || "0"} description={t("Productive")} icon={<RemoteWork />} variant="green" />
                    <StatsCard title={unproductiveProcesses?.length || "0"} description={t("Unproductive")} icon={<RemoteWork />} variant="red" />
                    <StatsCard title={neutralProcesses?.length || "0"} description={t("Neutral")} icon={<RemoteWork />} variant="purple" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {/* Productive Applications */}
                    <div className=" rounded-2xl overflow-hidden">
                        <div className="bg-themeSuccess px-4 py-6 flex justify-between items-center">
                            <h4 className="text-2xl mb-0 text-white">
                                {t("Productive Applications")}
                            </h4>
                        </div>
                        <div className="p-4 h-72  overflow-y-auto bg-themeSuccess/10 space-y-4">
                            {
                                productiveProcesses?.length > 0 ? productiveProcesses?.map((item, index) => (
                                    <div className="flex items-center justify-between" key={index}>
                                        <span className="text-md font-medium dark:text-white">{item?.name}</span>
                                    </div>
                                )) : <div className="flex justify-center items-center h-full">
                                    <p className="text-body-2 text-gray-500">{t("No data found")}</p>
                                </div>
                            }

                        </div>
                    </div>
                    {/* Unproductive Applications */}
                    <div className="rounded-2xl overflow-hidden">
                        <div className="bg-themeDanger px-4 py-6 flex justify-between items-center">
                            <h4 className="text-2xl mb-0 text-white">
                                {t("Unproductive Applications")}
                            </h4>
                        </div>
                        <div className="p-4 h-72  overflow-y-auto bg-themeDanger/10">
                            {
                                unproductiveProcesses?.length > 0 ? unproductiveProcesses?.map((item, index) => (
                                    <div className="flex items-start justify-between" key={index}>
                                        <span className="text-md font-medium dark:text-white mb-0">{item?.name}</span>
                                    </div>
                                )) : <div className="flex justify-center items-center h-full">
                                    <p className="text-body-2 text-gray-500">{t("No data found")}</p>
                                </div>
                            }
                        </div>
                    </div>
                    {/* Neutral Applications */}
                    <div className="rounded-2xl overflow-hidden">
                        <div className="bg-themePurple px-4 py-6 flex justify-between items-center">
                            <h4 className="text-2xl mb-0 text-white">
                                {t("Neutral Applications")}
                            </h4>
                        </div>
                        <div className="p-4 h-72  overflow-y-auto bg-themePurple/10">
                            {
                                neutralProcesses?.length > 0 ? neutralProcesses?.map((item, index) => (
                                    <div className="flex items-center justify-between" key={index}>
                                        <span className="text-md font-medium dark:text-white">{item?.name}</span>
                                    </div>
                                )) : <div className="flex justify-center items-center h-full">
                                    <p className="text-body-2 text-gray-500">{t("No data found")}</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}