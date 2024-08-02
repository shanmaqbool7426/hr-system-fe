import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AssignAsset } from "@/store/actions/asset.actions"
import Toast from "@/util/toast";
import BaseForm from '../../BaseForm';
import { useEffect } from 'react';
import { FetchEmployees } from '@/store/actions/employee.actions';

export default function AddTemplateForm({ onClose, asset ,object}) {
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
            type: "text",
            name: "template",
            label: t('Template Name'),
            placeholder: t("Template Name"),
            required: true, 
            value: formik.values.remarks,
        },
    ]
    useEffect(() => {
        if (employees_list.length === 0) {
            dispatch(FetchEmployees())
        }
    }, [dispatch])
 
    return (
        <BaseForm
            title={object?"Add Template":"Add Template"}
            formElements={formElements}
            formik={formik}
            onClose={onClose}
            is_loading={is_loading}
        />
    )
}