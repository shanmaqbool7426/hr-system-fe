import { Button, Datepicker, DetailPanel, DisplayDate, SearchSelect } from "@/components/elements";
import { ArivalIcon, LeftTimeIcon, ProductiveTimeIcon, RemoteTimeIcon } from '@/components/svg'
import StatsCard from "@/components/elements/Widgets/StatsCard";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import axios from "@/util/axios";
import moment from "moment";
import Image from "next/image";
import Pagination from "@/components/elements/Table/pagination";
import { useDispatch, useSelector } from "react-redux";
import { FetchEmployees } from "@/store/actions/employee.actions";
import { FetchRemoteTeams } from "@/store/actions/remote-team.actions";
export default function TeamRemoteWork() {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [processDetails, setProcessDetails] = useState([])
    const { team_list } = useSelector(state => state.remoteteam)
    const { employees_list } = useSelector(state => state.employee)
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useState({
        team: null,
        employee: null,
        startDate: new Date(),
        endDate: new Date()
    })

    const [stats, setStats] = useState({
        arrival_time: null,
        left_time: null,
        productive_time: null,
        total_remote_time: null,
        process_list: [],
        screenshots: []
    })

    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(8)

    const getStats = async (params = {}) => {
        setLoading(true)
        try {
            let data = await axios.get('/remote/team-remote-work', { params })
            let processed_process_list = data?.process_list?.reduce((acc, item) => {
                const subProcess = item.process.name.split('-').at(0).trim();
                const processName = item.process.name.split('-').at(-1).trim();
                const existingItem = acc.find(i => i.name === processName);
                if (existingItem) {
                    existingItem.time_spent += item.time_spent;
                    if (!existingItem.subProcess.some(sp => sp === subProcess)) {
                        existingItem.subProcess.push(subProcess);
                    }
                } else {
                    acc.push({
                        ...item,
                        name: processName,
                        subProcess: [subProcess]
                    });
                }
                return acc;
            }, []);
            setStats({ ...data, process_list: processed_process_list })
        }
        catch (err) { }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        dispatch(FetchEmployees())
        dispatch(FetchRemoteTeams())
    }, [dispatch])


    const productiveProcesses = stats?.process_list?.filter(item => item?.process?.nature === "productive")
    const unproductiveProcesses = stats?.process_list?.filter(item => item?.process?.nature === "unproductive")
    const neutralProcesses = stats?.process_list?.filter(item => item?.process?.nature === "neutral")

    const getTimeInHoursAndMinutes = (seconds = 0) => {
        const hours = Math.floor(seconds / 3600) || 0;
        const minutes = Math.floor((seconds % 3600) / 60) || 0;
        const remainingSeconds = Math.floor(seconds % 60);
        return hours > 0 ? `${hours}h ${minutes}m ${remainingSeconds}s` : minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
    }

    const differenceInDays = moment(filters?.endDate).diff(moment(filters?.startDate), 'days')


    const indexOfLastItem = page * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const paginatedScreenshots = stats?.screenshots.slice(indexOfFirstItem, indexOfLastItem);


    return (
        <section className="flex flex-col grow">
            <div className="flex justify-between pb-6">
                <div className="flex flex-col">
                    <h1 className="text-h4 mb-0">{t("Team Remote Work")}</h1>
                    <p className="text-body-2 text-gray-500">
                        {t("View your team remote work stats")}
                    </p>
                </div>
                <div className="flex items-end gap-4 px-4">
                    <SearchSelect
                        label={t("Team")}
                        containerClass={'w-max'}
                        name={'team'}
                        value={filters?.team}
                        onChange={(value) => setFilters({ ...filters, team: value })}
                        list={team_list?.map(item => ({ display: item?.name, value: item?._id }))}
                    />
                    <SearchSelect
                        label={t("Employee")}
                        containerClass={'w-max'}
                        name={'employee'}
                        value={filters?.employee}
                        onChange={(value) => setFilters({ ...filters, employee: value })}
                        list={employees_list?.filter(item => item?.workMode === "remote")?.map(item => ({ display: `${item?.firstName} ${item?.lastName}`, value: item?._id }))}
                    />
                    <Datepicker
                        label={t("From Date")}
                        containerClass={'w-max'}
                        name={'startDate'}
                        value={filters?.startDate}
                        onChange={(value) => setFilters({ ...filters, startDate: value })}
                    />
                    <Datepicker
                        label={t("To Date")}
                        containerClass={'w-max'}
                        name={'endDate'}
                        value={filters?.endDate}
                        onChange={(value) => setFilters({ ...filters, endDate: value })}
                    />
                    <Button
                        value={t("Apply")}
                        variant="primary"
                        disabled={loading}
                        is_loading={loading}
                        onClick={() => getStats({ ...filters })}
                    />
                </div>
            </div>

            <div className="zt-card grow space-y-6">
                <div className="grid grid-cols-4 gap-4">
                    <StatsCard title={stats?.arrival_time} description={differenceInDays > 0 ? t("Average Arrival Time") : t("Arrival Time")} icon={<ArivalIcon />} variant="primary" />
                    <StatsCard title={stats?.left_time} description={differenceInDays > 0 ? t("Average Left Time") : t("Left Time")} icon={<LeftTimeIcon />} variant="orange" />
                    <StatsCard title={stats?.productive_time} description={t("Productive Time")} icon={<ProductiveTimeIcon />} variant="green" />
                    <StatsCard title={stats?.total_remote_time} description={t("Total Remote Time")} icon={<RemoteTimeIcon />} variant="purple" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {/* Productive Applications */}
                    <div className=" rounded-2xl overflow-hidden">
                        <div className="bg-themeSuccess px-4 py-6 flex justify-between items-center">
                            <h4 className="text-2xl mb-0 text-white">
                                {t("Productive Applications")}
                            </h4>
                            <span className="text-white/90 text-lg font-medium">{getTimeInHoursAndMinutes(productiveProcesses?.reduce((acc, item) => acc + parseInt(item?.time_spent), 0))}</span>
                        </div>
                        <div className="p-4 h-72  overflow-y-auto bg-themeSuccess/10 space-y-4">
                            {
                                productiveProcesses?.length > 0 ? productiveProcesses?.map((item, index) => (
                                    <div className="flex items-center justify-between" key={index} onClick={() => setProcessDetails(item?.sub_process)}>
                                        <span className="text-md font-medium dark:text-white">{item?.name}</span>
                                        <span className="text-md dark:text-white">{getTimeInHoursAndMinutes(item?.time_spent)}</span>
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
                            <span className="text-white/90 text-lg font-medium">{getTimeInHoursAndMinutes(unproductiveProcesses?.reduce((acc, item) => acc + parseInt(item?.time_spent), 0))}</span>
                        </div>
                        <div className="p-4 h-72  overflow-y-auto bg-themeDanger/10">
                            {
                                unproductiveProcesses?.length > 0 ? unproductiveProcesses?.map((item, index) => (
                                    <div className="flex items-start justify-between" key={index} onClick={() => setProcessDetails(item?.sub_process)}>
                                        <span className="text-md font-medium dark:text-white mb-0 truncate w-2/3">{item?.name}</span>
                                        <span className="text-md dark:text-white">{getTimeInHoursAndMinutes(item?.time_spent)}</span>
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
                            <span className="text-white/90 text-lg font-medium">{getTimeInHoursAndMinutes(neutralProcesses?.reduce((acc, item) => acc + parseInt(item?.time_spent), 0))}</span>
                        </div>
                        <div className="p-4 h-72  overflow-y-auto bg-themePurple/10">
                            {
                                neutralProcesses?.length > 0 ? neutralProcesses?.map((item, index) => (
                                    <div className="flex items-center justify-between" key={index} onClick={() => setProcessDetails(item?.sub_process)}>
                                        <span className="text-md font-medium dark:text-white">{item?.name}</span>
                                        <span className="text-md dark:text-white">{getTimeInHoursAndMinutes(item?.time_spent)}</span>
                                    </div>
                                )) : <div className="flex justify-center items-center h-full">
                                    <p className="text-body-2 text-gray-500">{t("No data found")}</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {stats?.screenshots?.length > 0 && <>
                    <h4 className="text-h4 mb-0">{t("Screenshots")}</h4>
                    <div className="grid grid-cols-4 gap-4">
                        {
                            paginatedScreenshots?.map((item, index) => (
                                <div className="w-full h-full" key={index}>
                                    <figure className="w-full h-full">
                                        <Image src={item?.url} alt={item?.processName} width={100} height={100} className="w-full object-cover" />
                                        <figcaption className="text-themePrimary text-sm">
                                            <span className="font-medium">{item?.processName}</span>
                                            <DisplayDate date={item?.takenAt} time={true} />
                                        </figcaption>
                                    </figure>
                                </div>
                            ))
                        }
                    </div>
                    <Pagination
                        pagination={{
                            totalRecords: stats?.screenshots?.length,
                            showPerPage: false,
                            prevAction: () => page > 1 && setPage(page - 1),
                            clickAction: (value) => setPage(value),
                            nextAction: () => setPage(page + 1),
                        }}
                        currentLength={paginatedScreenshots?.length}
                        perPage={perPage}
                        setPerPage={setPerPage}
                        page={page}
                        setPage={setPage}
                    />
                </>}
            </div>
            {
                processDetails?.length > 0 && <DetailPanel
                    onClose={() => setProcessDetails([])}
                >
                    <div className="flex flex-col gap-4">
                        <h4 className="text-h4 mb-0">{t("Process Details")}</h4>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2 font-bold">
                                {t("Process")}
                            </div>
                            <div className="col-span-1 font-bold text-right">
                                {t("Time Spent")}
                            </div>
                            {processDetails?.map((item, index) => (
                                <>
                                    <div key={index} className="col-span-2 flex flex-col gap-1">
                                        <span className="font-medium">{item?.title}</span>
                                        <DisplayDate date={item?.createdAt} time={true} className="text-sm text-gray-500" />
                                    </div>
                                    <div key={index} className="text-right font-semibold">
                                        {getTimeInHoursAndMinutes(item?.time_spent)}
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>
                </DetailPanel>
            }
        </section>
    )
}