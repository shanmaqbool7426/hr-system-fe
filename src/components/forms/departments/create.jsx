import BaseForm from "../BaseForm"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateDepartment, UpdateDepartment } from "@/store/actions/department.actions"
import Toast from "@/util/toast";
import { FetchEmployees } from "@/store/actions/employee.actions";
import { useEffect } from "react";

export default function CreateDepartmentForm({ onClose, department }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading, departments_list } = useSelector((state) => state.department)
    const { employees_list } = useSelector((state) => state.employee)
    const formik = useFormik({
        initialValues: {
            name: department?.name || "",
            code: department?.code || "",
            parent: department?.parent?._id || "",
            head: department?.head?._id || "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('formik.nameRequired')),
            code: Yup.string().required(t('formik.codeRequired')),
        }),
        onSubmit: async (values) => {
            return department ? dispatch(UpdateDepartment(department._id, values, onCompleted)) : dispatch(CreateDepartment(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(department ? t("Department updated successfully") : t("Department created successfully"))
        onClose()
    }
    const formElements = [
        {
            type: "text",
            name: "name",
            label: t('Department Name'),
            placeholder: t("Enter department name"),
            required: true, value: formik.values.name,
        },
        {
            type: "text",
            name: "code",
            label: t('Department Code'),
            placeholder: t("Enter department code"),
            required: true, value: formik.values.code,
        },
        {
            type: "select",
            name: "parent",
            label: t('Parent Department'),
            value: formik.values.parent,
            list: departments_list.map(item => { return { display: item.name, value: item._id } })
        },
        {
            type: "select",
            name: "head",
            label: t('Head of Department'),
            value: formik.values.head,
            list: employees_list.map(item => { return { display: item.firstName + " " + item.lastName, value: item._id } })
        },
        {
            type: department ? "select" : 'hidden',
            name: "status",
            label: t('Status'),
            value: formik.values.status,
            list: [
                { display: "Active", value: "active" },
                { display: "Inactive", value: "inactive" },
            ]
        },
    ]

    const formTitle = department ? t("Update department") : t("Create department")
    useEffect(() => {
        if (employees_list.length === 0) {
            dispatch(FetchEmployees())
        }
    }, [dispatch])

    return (
        <BaseForm title={formTitle} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} />
    )
}