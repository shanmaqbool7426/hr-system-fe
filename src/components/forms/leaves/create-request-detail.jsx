import BaseForm from "../BaseForm"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateEmployee, FetchEmployees, UpdateEmployee } from "@/store/actions/employee.actions"
import Toast from "@/util/toast";
import { useEffect, useState } from "react";
import { FetchLeavePolicies } from "@/store/actions/leave-policy.actions";
import { Table, Textarea } from "@/components/elements";
import Image from "next/image";

export default function CreateLeaveDetailForm({ onClose, title, request }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [leaveDays, setLeaveDays] = useState(0)
    const { is_loading, employees_list } = useSelector((state) => state.employee)
    const { leave_policies } = useSelector(state => state.leavepolicy)
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const headings = [
        { title: t("Employee Name"), col: 'Employee_Name' },
        { title: t("Status"), col: 'Status' },
        { title: t("Action"), col: "Action" },
        { title: t("Remarks"), col: "Remarks" },
    ]
    const rows = [{
        Employee_Name: <div className="flex items-center gap-3">
            <figure>
                <Image height={24} width={24} src={'/assets/images/users/user-01.jpg'} className="rounded-full" /></figure>
            <div className="flex flex-col text-xs ">
                <span className="font-medium">{t("Jhon Carter")}</span>
                <span className="text-themeGrayscale500">{t("10202325")}</span>
            </div>
        </div>,
        Status: "Requested",
        Action: "-",
        Remarks: "-",
    },
    {
        Employee_Name: <div className="flex items-center gap-3">
            <figure>
                <Image height={24} width={24} src={'/assets/images/users/user-02.jpg'} className="rounded-full" /></figure>
            <div className="flex flex-col text-xs ">
                <span className="font-medium">{t("Jhon Carter")}</span>
                <span className="text-themeGrayscale500">{t("10202325")}</span>
            </div>
        </div>,
        Status: "L 1 Approval",
        Action: "Approved",
        Remarks: "-",
    },
    {
        Employee_Name: <div className="flex items-center gap-3">
            <figure>
                <Image height={24} width={24} src={'/assets/images/users/user-02.jpg'} className="rounded-full" /></figure>
            <div className="flex flex-col text-xs ">
                <span className="font-medium">{t("Jhon Carter")}</span>
                <span className="text-themeGrayscale500">{t("10202325")}</span>
            </div>
        </div>,
        Status: "L 2 Approval",
        Action: "Pending",
        Remarks: "-",
    },
    ]
    const formik = useFormik({
        initialValues: {
            employee: request?.employee?._id || "",
            leaveType: request?.leaveType?._id || "",
            leaveDuration: request?.leaveDuration || "",
            dateForm: request?.dateForm || "",
            dateTo: request?.dateTo || "",
            reason: request?.reason || "",
        },
        validationSchema: Yup.object().shape({
            employee: Yup.string().required(t('formik.employeeRequired')),
            leaveType: Yup.string().required(t('formik.leaveTypeRequired')),
            dateForm: Yup.string().required(t('formik.dateFormRequired')),
            dateTo: Yup.string().required(t('formik.dateToRequired')),
            reason: Yup.string().required(t('formik.reasonRequired')),
        }),
        onSubmit: async (values) => {
            return request ? dispatch(UpdateEmployee(request._id, values, onCompleted)) : dispatch(CreateEmployee(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(request ? t("Leave Request updated successfully") : t("Leave Request created successfully"))
        onClose()
    }
    useEffect(() => {
        if (employees_list.length === 0) {
            dispatch(FetchEmployees())
        }
        if (leave_policies === 0) {
            dispatch(FetchLeavePolicies())
        }
    }, [dispatch])

    useEffect(() => {
        setLeaveDays(formik.values.leaveDuration)
    }, [formik.values.leaveDuration])



    return (
        <BaseForm title={title} formik={formik} onClose={onClose} is_loading={is_loading} >
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
                className={'zt-employeeTable zt-leaveTable col-span-2'}
            />
            <Textarea
                type={'textarea'}
                name={'reason'}
                label={t('Reason')}
                containerClass={'col-span-2'}
                required={true}
            />
        </BaseForm>
    )
}