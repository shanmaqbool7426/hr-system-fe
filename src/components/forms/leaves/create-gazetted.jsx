
import BaseForm from "../BaseForm"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateLeavePolicy, UpdateLeavePolicy } from "@/store/actions/leave-policy.actions"
import Toast from "@/util/toast";
import { useState } from "react";

export default function CreateGazetedLeaveForm({ onClose, leave ,title}) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { customfield_list } = useSelector(state => state.customfield) 
    const [fileName, setFileName] = useState('No file chosen');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName('No file chosen');
        }
    };
    const formik = useFormik({
        initialValues: {
            name: leave?.name || "",
            entitled: leave?.entitled || false,
            encashable: leave?.encashable || false,
            carryForward: leave?.carryForward || false,
            entitledToStatus: leave?.entitledToStatus.reduce((acc, item) => {
                acc.push(item._id)
                return acc
            }, []) || [],
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('formik.nameRequired')),
            entitled: Yup.string().required(t('formik.entitledRequired')),
            encashable: Yup.string().required(t('formik.encashableRequired')),
            carryForward: Yup.string().required(t('formik.carryForwardRequired')),
            entitledToStatus: Yup.array().required(t('formik.entitledToStatusRequired')).min(1, t('formik.entitledToStatusRequired')),
        }),
        onSubmit: async (values) => {
            onCompleted()
            return leave ? dispatch(UpdateLeavePolicy(leave._id, values, onCompleted)) : dispatch(CreateLeavePolicy(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(leave ? t("Leave policy updated successfully") : t("Leave policy created successfully"))
        onClose()
    }
    const formElements = [
        {
            type: "text",
            name: "Title",
            label: t('Title'),
            placeholder: t("Title"),
            required: true, value: formik.values.name,
        },
        {
            type: "date",
            name: "Date",
            label: t('Date'),
            required: true,
        },
        {
            type: "select",
            name: "Country",
            label: t('Country'),
            placeholder: t("Select One"),
            required: true, value: formik.values.entitled,
        },
        {
            type: "select", 
            name: "Province",
            label: t('Province'), 
            required: true,
        },
        {
            type: "select", 
            name: "City",
            label: t('City'), 
            required: true,
        },
        {
            type: "select", 
            name: "Area",
            label: t('Area'), 
            required: true,
        },
        {
            type: "select", 
            name: "Station",
            label: t('Station'), 
            required: true,
        },
        {
            type: "select", 
            name: "Employee Grade",
            label: t('Employee Grade'), 
            required: true,
        },
        {
            type: "select", 
            name: "Exempted Employees",
            label: t('Exempted Employees'), 
            required: true,
        },
        {
            type: "select", 
            name: "Send Email",
            label: t('Send Email'), 
            required: true,
        },
        {
            type: "textarea",
            name: "Description",
            containerClass: 'col-span-2',
            label: t('Description'),
            required: true,
        },
    ]

    return (
        <BaseForm title={title} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
}