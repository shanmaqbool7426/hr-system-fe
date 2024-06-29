import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import Toast from "@/util/toast";
import BaseForm from '../../BaseForm';
import { ReturnAsset } from '@/store/actions/asset.actions';
import { FetchEmployees } from '@/store/actions/employee.actions';
import { useEffect } from 'react';

export default function ReturnToForm({ onClose, asset }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading } = useSelector((state) => state.asset)
    const { employees_list } = useSelector((state) => state.employee)
    const formik = useFormik({
        initialValues: {
            returnTo: asset?.returnTo || "",
            returnDate: asset?.returnDate || "",
            remarks: asset?.remarks || "",
        },
        validationSchema: Yup.object().shape({
            returnTo: Yup.string().required(t('formik.returnToRequired')),
            returnDate: Yup.string().required(t('formik.returnDateRequired')),
            remarks: Yup.string().required(t('formik.remarksRequired')),
        }),
        onSubmit: async (values) => {
            return dispatch(ReturnAsset(asset._id, values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(t("Asset returned successfully"))
        onClose()
    }
    const formElements = [
        {
            type: "select",
            name: "returnTo",
            label: t('Return to'),
            required: true,
            value: formik.values.returnTo,
            list: employees_list.map(item => {
                return {
                    value: item._id, display: item.firstName + " " + item.lastName
                }
            })
        },
        {
            type: "date",
            name: "returnDate",
            label: t('Return Date'),
            placeholder: t("Enter return date"),
            required: true,
            value: formik.values.returnDate,
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

    const formTitle = asset ? t("Return To") : t("Assign To")
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