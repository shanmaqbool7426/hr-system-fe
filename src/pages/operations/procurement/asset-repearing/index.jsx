import { Button, DropDown, Table } from "@/components/elements";
import { FetchEmployees } from "@/store/actions/employee.actions";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateRepairingRequestForm from "@/components/forms/procurement/assetRepearing/create";
import StatusSelect from "@/components/elements/SelectStatus";
import Toast from "@/util/toast";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";


export default function AssetRepearingPage() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { total_records } = useSelector((state) => state.employee)
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [create, setCreate] = useState(false)

    const headings = [

        { title: t("Asset ID"), col: "AssetID" },
        { title: t("Asset Name"), col: "AssetName" },
        { title: t("Issue"), col: "Issue" },
        { title: t("Reported Date"), col: "ReportedDate" },
        { title: t("Assign Technician"), col: "AssignTechnician" },
        { title: t("Status"), col: "Status" },
        { title: t("Action"), col: "action" },
    ]
    const options = [
        { value: 'success', label: 'Owner', className: 'zt-tag-success' },
        { value: 'purple', label: 'Employee', className: 'zt-tag-purple' },
    ];
    const StatusOptions = [
        { value: 'success', label: 'Open', className: 'zt-tag-success' },
        { value: 'danger', label: 'Closed', className: 'zt-tag-danger' },
    ];
    const item = { status: 'success' };
    const rows = [
        {
            AssetID: "098765",
            AssetName: "Printer",
            Issue: "Description",
            ReportedDate: "01-08-2024",
            AssignTechnician: <StatusSelect item={item} options={options} />,
            Status: <StatusSelect item={item} options={StatusOptions} />,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 ">
                    <li className="!p-0">
                        <a onClick={() => { setCreate(true) }} className={'no-underline flex items-center gap-1 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                Toast.success(t("Asset Repearing deleted successfully"))
                            }, t)
                        }} className={'no-underline flex items-center gap-1 cursor-pointer font-normal hover:text-themeDanger'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        },
        {
            AssetID: "098765",
            AssetName: "Printer",
            Issue: "Description",
            ReportedDate: "01-08-2024",
            AssignTechnician: <StatusSelect item={item} options={options} />,
            Status: <StatusSelect item={item} options={StatusOptions} />,
            action: <DropDown icon={<ThreeDotsVertical />}>
                <ul className="zt-themeDropDownList zt-sm gap-4 ">
                    <li className="!p-0">
                        <a onClick={() => { setCreate(true) }} className={'no-underline flex items-center gap-1 cursor-pointer font-normal hover:text-themeSuccessDark'}>
                            <span><Edit /></span>
                            <span>{t("Edit")}</span>
                        </a>
                    </li>
                    <li className="!p-0">
                        <a onClick={() => {
                            Toast.confirmDelete(() => {
                                Toast.success(t("Asset Repearing deleted successfully"))
                            }, t)
                        }} className={'no-underline flex items-center gap-1 cursor-pointer font-normal hover:text-themeDanger'}>
                            <span><Trash /></span>
                            <span>{t("Delete")}</span>
                        </a>
                    </li>
                </ul>
            </DropDown>
        },
    ]
    const pagination = {
        totalRecords: total_records,
        showPerPage: true,
        prevAction: () => page > 1 && setPage(page - 1),
        clickAction: (value) => setPage(value),
        nextAction: () => setPage(page + 1),
    }

    useEffect(() => {
        dispatch(FetchEmployees())
    }, [dispatch])

    return (
        <section className="flex flex-col grow">
            <div className="flex justify-between items-center pb-6">
                <div className="">
                    <h1 className="text-h4 mb-0">{t("Asset Repearing")}</h1>
                </div>
                <div className="flex items-start gap-2">
                    <Button className={"btn btn-primary"} onClick={() => setCreate(true)}>{t("Repairing Request")}</Button>
                </div>
            </div>

            <div className="zt-card grow">
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
                    className={'zt-employeeRoleTable'}
                />
            </div>

            {create && <CreateRepairingRequestForm onClose={() => { setCreate(false) }} />}
        </section>
    )
}