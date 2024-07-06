import BaseForm from "../BaseForm"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateEmployee, FetchEmployees, UpdateEmployee } from "@/store/actions/employee.actions"
import Toast from "@/util/toast";
import { useEffect, useState } from "react";
import { FetchLeavePolicies } from "@/store/actions/leave-policy.actions";

export default function CreatLeaveRequestForm({ onClose, object }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [leaveDays, setLeaveDays] = useState(0)
    const { is_loading, employees_list } = useSelector((state) => state.employee)
    const { leave_policies } = useSelector(state => state.leavepolicy)
    const { auth_user } = useSelector(state => state.auth)
    const formik = useFormik({
        initialValues: {
            employee: object?.employee?._id || "",
            leaveType: object?.leaveType?._id || "",
            leaveDuration: object?.leaveDuration || "",
            dateForm: object?.dateForm || "",
            dateTo: object?.dateTo || "",
            reason: object?.reason || "",
        },
        validationSchema: Yup.object().shape({
            employee: Yup.string().required(t('formik.employeeRequired')),
            leaveType: Yup.string().required(t('formik.leaveTypeRequired')),
            dateForm: Yup.string().required(t('formik.dateFormRequired')),
            dateTo: Yup.string().required(t('formik.dateToRequired')),
            reason: Yup.string().required(t('formik.reasonRequired')),
        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateEmployee(object._id, values, onCompleted)) : dispatch(CreateEmployee(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t("Leave Request updated successfully") : t("Leave Request created successfully"))
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

    const formElements = [
        {
            type: "select",
            name: "leave",
            label: t('Leave Type'),
            value: formik.values.employee,
            list:  [{value:"Sick Leave",label:"Sick Leave"}],
            required: true,
        }, 
        {
            type: "select",
            name: "leaveDuration",
            label: t('Leave Duration'),
            value: formik.values.leaveDuration,
            list: [
                { display: 'Full Day', value: '1' },
                { display: 'Half Day', value: '0.5' },
                { display: 'Quarter Day', value: '0.25' },
                { display: 'Half Quarter Day', value: '0.125' },
            ],
            required: true,
        }, 
        {
            type: "date",
            name: "fromDate",
            label: t('From Date'),
            // maxDate: new Date,
            required: true,
            value: formik.values.fromDate,
        },
        {
            type: "date",
            name: "toDate",
            label: t('To Date'),
            minDate: formik.values.fromDate,
            required: true,
            value: formik.values.toDate,
        },
        {
            type: "number",
            name: "NumberofDays",
            label: t('Number of Days'),
            minDate: formik.values.fromDate,
            required: true,
            value: formik.values.toDate,
        },
        {
            type: "number",
            name: "NumberofDays",
            label: t('Remaining Leaves'),
            minDate: formik.values.fromDate,
            required: true,
            value: formik.values.toDate,
        },
        {
            type: "textarea",
            name: "reason",
            label: t('Reason'),
            containerClass: 'col-span-2',
            value: formik.values.reason,
            required: true,
        },

    ]

    const formTitle = object ? t("Update Leave Request") : t("Create Leave Request")

    return (
        <BaseForm title={formTitle} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} />
    )
}