import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CreateBiometricDevice from "@/components/forms/attendance/createBiometricDevice";
import { Button, CheckBox, DropDown, Table, Tabs } from "@/components/elements";
import { useDispatch, useSelector } from "react-redux";
import { FetchDevices, SyncDevice } from "@/store/actions/biometric.actions";
import { Edit, ThreeDotsVertical } from "@/components/svg";

export default function AttendanceBiometricSettingPage() {
    const { t } = useTranslation();
    const [add, setAdd] = useState(false)
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const dispatch = useDispatch()
    const { device_list } = useSelector(state => state.biometric)
    useEffect(() => {
        dispatch(FetchDevices())
    }, [dispatch])
    const headings = [
		
        { title: t("IP Address"), col: 'ipAddress' },
        { title: t("Port"), col: "port" },
        { title: t("Station"), col: "station" },
        { title: t("Action"), col: "action" },
    ]

    let filteredrows = device_list.filter((item) => {
        let include = true
        // if (filters.search && filters.search.length > 0) {
        //     let fullname = item.firstName + " " + item.lastName
        //     include = fullname.toLowerCase().includes(filters.search.toLowerCase()) || item.email.toLowerCase().includes(filters.search.toLowerCase())
        //     if (!include) return false
        // }
        // if (filters.status) {
        //     include = item?.status?._id === filters.status
        //     if (!include) return false
        // }
        return include
    }).sort((a, b) => {
        if (sortDir === 'asc') return a[sortCol]?.localeCompare(b[sortCol])
        else return b[sortCol]?.localeCompare(a[sortCol])
    })
    const indexOfLastItem = page * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const paginatedData = filteredrows.slice(indexOfFirstItem, indexOfLastItem);

    const rows = paginatedData.map((item, i) => {
        return {
            ipAddress: item.ipAddress,
            port: item.port,
            station: item?.station?.name,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4">
                    <li className="!p-0">
                        <a onClick={() => { setEdit(item); setAdd(true) }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            dispatch(SyncDevice(item._id, () => {
                                Toast.success("Attendance sync request submitted successfully")
                            }))
                        }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            {/* <span><Edit /></span> */}
                            <span>{t("Sync")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        }
    })
    const pagination = {
        totalRecords: device_list.length,
        showPerPage: true,
        prevAction: () => page > 1 && setPage(page - 1),
        clickAction: (value) => setPage(value),
        nextAction: () => setPage(page + 1),
    }
    return (
        <section className="flex flex-col grow relative">
            <div className="flex justify-between pb-6">
                <h1 className="text-h4 mb-0">{t("Biometric Settings")}</h1>
                <Button className={"btn btn-primary"} onClick={() => setAdd(true)}>{t("Add Device")}</Button>
            </div>
            <div className="zt-card grow">
                <h2 className="font-bold text-xl">{t("Biometric Devices")}</h2>
                <Table
                    headings={headings}
                    rows={rows}
                    sortCol={sortCol}
                    setSortCol={setSortCol}
                    sortDir={sortDir}
                    setSortDir={setSortDir}
                    perPage={perPage}
                    setPerPage={setPerPage}
                    page={page}
                    setPage={setPage}
                    pagination={pagination}
                    className={'zt-employeeTable zt-attendanceTable'}
                />
            </div>
            {add && <CreateBiometricDevice
                onClose={() => { setAdd(false) }}
            />}
        </section>
    );
}
