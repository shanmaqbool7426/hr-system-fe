import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AssignAsset } from "@/store/actions/asset.actions"
import Toast from "@/util/toast";
import BaseForm from '../../BaseForm';
import { useEffect } from 'react';
import { FetchEmployees } from '@/store/actions/employee.actions';

export default function AssignToForm({ onClose, asset }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading } = useSelector((state) => state.asset)
    const { employees_list } = useSelector((state) => state.employee)
    const formik = useFormik({
        initialValues: {
            assignTo: asset?.assignTo || "",
            assignDate: asset?.assignDate || "",
            remarks: asset?.remarks || "",
        },
        validationSchema: Yup.object().shape({
            assignTo: Yup.string().required(t('formik.assignToRequired')),
            assignDate: Yup.string().required(t('formik.assignDateRequired')),
            remarks: Yup.string().required(t('formik.remarksRequired')),
        }),
        onSubmit: async (values) => {
            return dispatch(AssignAsset(asset._id, values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(t("Asset assigned to user successfully"))
        onClose()
    }
    const formElements = [
        {
            type: "select",
            name: "assignTo",
            label: t('Assign to'),
            value: formik.values.assignTo,
            list: employees_list.map(item => {
                return {
                    value: item._id, display: item.firstName + " " + item.lastName
                }
            })
        },
        {
            type: "date",
            name: "assignDate",
            label: t('Assign Date'),
            placeholder: t("Enter assign date"),
            required: true,
            value: formik.values.assignDate,
        },
        {
            type: "textarea",
            name: "remarks",
            label: t('Remarks'),
            placeholder: t("Enter remarks"),
            required: true,
            containerClass: 'col-span-2',
            value: formik.values.remarks,
        },
    ]
    useEffect(() => {
        if (employees_list.length === 0) {
            dispatch(FetchEmployees())
        }
    }, [dispatch])

    const formTitle = asset ? t("Assign To") : t("Assign To")
    return (
        <BaseForm
            title={formTitle}
            formElements={formElements}
            formik={formik}
            onClose={onClose}
            is_loading={is_loading}
        />
    )
}