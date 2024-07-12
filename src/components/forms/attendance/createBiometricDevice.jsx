import BaseForm from "../BaseForm"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateDevice, UpdateDevice } from "@/store/actions/biometric.actions"
import Toast from "@/util/toast";
import { useEffect } from "react";

export default function CreateBiometricDeviceForm({ onClose, object }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { customfield_list } = useSelector((state) => state.customfield)
    const { is_loading } = useSelector((state) => state.biometric)
    const formik = useFormik({
        initialValues: {
            ipAddress: object?.ipAddress || "",
            port: object?.port || "",
            station: object?.station?._id || "",
        },
        validationSchema: Yup.object().shape({
            ipAddress: Yup.string().required(t('IP Address is required')),
            port: Yup.string().required(t('Port is required')),
            station: Yup.string().required(t('Station is required')),
        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateDevice(object._id, values, onCompleted)) : dispatch(CreateDevice(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t("Device updated successfully") : t("Device created successfully"))
        onClose()
    }
    const formElements = [
        {
            type: "text",
            name: "ipAddress",
            label: t('IP Address'),
            placeholder: t("Ip Address"),
            required: true, value: formik.values.ipAddress,
        },
        {
            type: "number",
            name: "port",
            label: t('Port'),
            placeholder: t("Enter port"),
            required: true, value: formik.values.port,
        },
        {
            type: "select",
            name: "station",
            label: t('Station'),
            value: formik.values.station,
            required: true,
            list: customfield_list.filter(item => item.type === 'station')
                .map(item => { return { display: item.name, value: item._id } })
        },
    ]
    const formTitle = object ? t("Update device") : t("Create device")
    return (
        <BaseForm title={formTitle} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} />
    )
}