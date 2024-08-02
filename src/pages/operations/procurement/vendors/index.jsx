import { Button, Table } from "@/components/elements";
import { FetchEmployees } from "@/store/actions/employee.actions";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateVendorForm from "@/components/forms/procurement/vendors/createVendor";
import StatusSelect from "@/components/elements/SelectStatus";
import CreateVendorRatingForm from "@/components/forms/procurement/vendors/createRating";

export default function VendorsPage() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { total_records } = useSelector((state) => state.employee)
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [create, setCreate] = useState(false)
    const [rating, setRating] = useState(false)

    const headings = [

        { title: t("Vendor Name"), col: "VendorName" },
        { title: t("Products"), col: "Products" },
        { title: t("Key Person"), col: "KeyPerson" },
        { title: t("Contact"), col: "Contact" },
        { title: t("Responsible Department"), col: "ResponsibleDepartment" },
        { title: t("Quality"), col: "Quality" },
        { title: t("Perfornance"), col: "Perfornance" },
        { title: t("Communication"), col: "Communication" },
        { title: t("Value Addition"), col: "ValueAddition" },
        { title: t("Score"), col: "Score" },
        { title: t("Status"), col: "Status" },
    ]
    const StatusOptions = [
        { value: 'success', label: 'Active', className: 'zt-tag-success' },
        { value: 'danger', label: 'Inactive', className: 'zt-tag-danger' },
    ];
    const item = { status: 'success' };
    const rows = [
        {
            VendorName: "PC",
            Products: "Laptop",
            KeyPerson: "John",
            Contact: "+92 301 564657",
            ResponsibleDepartment: "Admin",
            Quality: "Good",
            Perfornance: "Good",
            Communication: "Good",
            ValueAddition: "Mouse",
            Score: "10",
            Status: <StatusSelect item={item} options={StatusOptions} />,
        },
        {
            VendorName: "PC",
            Products: "Laptop",
            KeyPerson: "John",
            Contact: "+92 301 564657",
            ResponsibleDepartment: "Admin",
            Quality: "Good",
            Perfornance: "Good",
            Communication: "Good",
            ValueAddition: "Mouse",
            Score: "10",
            Status: <StatusSelect item={item} options={StatusOptions} />,
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
                    <h1 className="text-h4 mb-0">{t("Vender")}</h1>
                </div>
                <div className="flex items-start gap-2">
                    <Button className={"btn btn-dark-outline"} onClick={() => setRating(true)}>{t("Vendors Rating")}</Button>
                    <Button className={"btn btn-primary"} onClick={() => setCreate(true)}>{t("Add Venders")}</Button>
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

            {create && <CreateVendorForm onClose={() => { setCreate(false) }} />}
            {rating && <CreateVendorRatingForm onClose={() => { setRating(false) }} />}
        </section>
    )
}