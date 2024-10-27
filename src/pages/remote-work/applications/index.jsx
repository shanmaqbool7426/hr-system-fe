import { RemoteWork } from '@/components/svg'
import StatsCard from "@/components/elements/Widgets/StatsCard";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import Toast from "@/util/toast";
import { useDispatch, useSelector } from "react-redux";
import { FetchRemoteApplications, UpdateRemoteApplications } from '@/store/actions/remote-application.actions';
import { Button, CheckBox, SearchSelect } from '@/components/elements';

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

    const [selectedApplications, setSelectedApplications] = useState([])
    const [selectedNature, setSelectedNature] = useState(null)

    const handleSelectApplication = (event) => {
        const id = event.target.value
        if (event.target.checked) {
            let nature = application_list?.find(item => item?._id === id)?.nature
            setSelectedApplications(prev => prev.filter(item => item.nature === nature))
            setSelectedApplications(prev => [...prev, { id, nature }])
        } else {
            setSelectedApplications(prev => prev.filter(item => item.id !== id))
        }
    }

    const handleChangeNature = () => {
        if (selectedNature) {
            dispatch(UpdateRemoteApplications({
                ids: selectedApplications?.reduce((acc, item) => [...acc, item.id], []),
                nature: selectedNature
            }, () => {
                setSelectedNature(null)
                setSelectedApplications([])
                Toast.success(t("Applications updated successfully"))
            }))
        }
    }
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
                {/* <div className="grid grid-cols-3 gap-4">
                    <StatsCard title={productiveProcesses?.length || "0"} description={t("Productive")} icon={<RemoteWork />} variant="green" />
                    <StatsCard title={unproductiveProcesses?.length || "0"} description={t("Unproductive")} icon={<RemoteWork />} variant="red" />
                    <StatsCard title={neutralProcesses?.length || "0"} description={t("Neutral")} icon={<RemoteWork />} variant="purple" />
                </div> */}
                <h2 className="text-h4 mb-0">{t("Applications")}</h2>
                <div className="grid grid-cols-3 gap-4">
                    {/* Productive Applications */}
                    <div className=" rounded-2xl overflow-hidden">
                        <div className="bg-themeSuccess px-4 py-6 flex justify-between items-center">
                            <h4 className="text-2xl mb-0 text-white">
                                {t("Productive Applications")} ({productiveProcesses?.length || "0"})
                            </h4>
                        </div>
                        <div className="p-4 h-72  overflow-y-auto bg-themeSuccess/10 space-y-4">
                            {
                                selectedApplications?.filter(item => item.nature === "productive")?.length > 0 && <div className="flex gap-2 items-center">
                                    <CheckBox className="zt-sm"
                                        checked={selectedApplications.length === productiveProcesses.length}
                                        id="all-productive"
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                setSelectedApplications(productiveProcesses.map(item => ({ id: item?._id, nature: "productive" })))
                                            } else {
                                                setSelectedApplications([])
                                            }
                                        }}
                                    />
                                    <SearchSelect
                                        containerClass="w-full"
                                        onChange={setSelectedNature}
                                        list={[
                                            {
                                                display: t("Unproductive"),
                                                value: "unproductive"
                                            },
                                            {
                                                display: t("Neutral"),
                                                value: "neutral"
                                            }]}
                                        placeholder={t("Select Nature")} />
                                    <Button variant="primary" disabled={!selectedNature} onClick={handleChangeNature}>{t("Apply")}</Button>
                                </div>
                            }
                            {
                                productiveProcesses?.length > 0 ? productiveProcesses?.map((item, index) => (
                                    <div className="flex items-center gap-2" key={index}>
                                        <CheckBox className="zt-sm" checked={selectedApplications.some(app => app.id === item?._id)} id={item?._id} value={item?._id} onChange={handleSelectApplication} />
                                        <span className="text-md font-medium dark:text-white mb-0">{item?.name}</span>
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
                                {t("Unproductive Applications")} ({unproductiveProcesses?.length || "0"})
                            </h4>
                        </div>
                        <div className="p-4 h-72  overflow-y-auto bg-themeDanger/10">
                            {
                                selectedApplications?.filter(item => item.nature === "unproductive")?.length > 0 && <div className="flex gap-2 items-center">
                                    <CheckBox className="zt-sm"
                                        checked={selectedApplications.length === unproductiveProcesses.length}
                                        id="all-unproductive"
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                setSelectedApplications(unproductiveProcesses.map(item => ({ id: item?._id, nature: "unproductive" })))
                                            } else {
                                                setSelectedApplications([])
                                            }
                                        }}
                                    />
                                    <SearchSelect
                                        containerClass="w-full"
                                        onChange={setSelectedNature}
                                        list={[
                                            {
                                                display: t("Productive"),
                                                value: "productive"
                                            },
                                            {
                                                display: t("Neutral"),
                                                value: "neutral"
                                            }]}
                                        placeholder={t("Select Nature")} />
                                    <Button variant="primary" disabled={!selectedNature} onClick={handleChangeNature}>{t("Apply")}</Button>
                                </div>
                            }
                            {
                                unproductiveProcesses?.length > 0 ? unproductiveProcesses?.map((item, index) => (
                                    <div className="flex items-center gap-2" key={index}>
                                        <CheckBox className="zt-sm" checked={selectedApplications.some(app => app.id === item?._id)} id={item?._id} value={item?._id} onChange={handleSelectApplication} />
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
                                {t("Neutral Applications")} ({neutralProcesses?.length || "0"})
                            </h4>
                        </div>
                        <div className="p-4 h-72  overflow-y-auto bg-themePurple/10">
                            {
                                selectedApplications?.filter(item => item.nature === "neutral")?.length > 0 && <div className="flex gap-2 items-center">
                                    <CheckBox className="zt-sm"
                                        checked={selectedApplications.length === neutralProcesses.length}
                                        id="all-neutral"
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                setSelectedApplications(neutralProcesses.map(item => ({ id: item?._id, nature: "neutral" })))
                                            } else {
                                                setSelectedApplications([])
                                            }
                                        }}
                                    />
                                    <SearchSelect
                                        containerClass="w-full"
                                        onChange={setSelectedNature}
                                        list={[
                                            {
                                                display: t("Productive"),
                                                value: "productive"
                                            },
                                            {
                                                display: t("Unproductive"),
                                                value: "unproductive"
                                            }]}
                                        placeholder={t("Select Nature")} />
                                    <Button variant="primary" disabled={!selectedNature} onClick={handleChangeNature}>{t("Apply")}</Button>
                                </div>
                            }
                            {
                                neutralProcesses?.length > 0 ? neutralProcesses?.map((item, index) => (
                                    <div className="flex items-center gap-2" key={index}>
                                        <CheckBox className="zt-sm" checked={selectedApplications.some(app => app.id === item?._id)} id={item?._id} value={item?._id} onChange={handleSelectApplication} />
                                        <span className="text-md font-medium dark:text-white mb-0">{item?.name}</span>
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