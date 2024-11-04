import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'next-i18next';
import Toast from '@/util/toast';
import { CreateRequest, UpdateRequest } from "@/store/actions/attendance-request.actions"
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import axios from '@/util/axios';
export default function CreateAttendanceRequestForm({ onClose, object }) {
    const { t } = useTranslation()
    const { auth_user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [attendance, setAttendance] = useState(null)
    const formik = useFormik({
        initialValues: {
            employee: object?.employee?._id || auth_user._id,
            date: object?.date || "",
            checkInAt: object?.checkInAt || "",
            checkOutAt: object?.checkOutAt || "",
            reason: object?.reason || ""
        },
        validationSchema: Yup.object().shape({
            employee: Yup.string().required(t('Employee is required')),
            date: Yup.string().required(t("Attendance date is required")),
            checkInAt: Yup.string().required(t("InDate is required")),
            checkOutAt: Yup.string().required(t("OutTime is required")),
            reason: Yup.string().required(t("reason is required")),
        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateRequest(object._id, values, onCompleted)) : dispatch(CreateRequest(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`Request updated successfully`) : t(`Request created successfully`))
        onClose()
    }
    const formElements = [
        {
            type: "select",
            name: "employee",
            label: t('Employee'),
            placeholder: "Select Employee",
            list: [{
                value: auth_user._id,
                display: `${auth_user.firstName} ${auth_user.lastName}`
            }],
            required: true,
            value: formik.values.employee,
        },
        {
            type: "date",
            name: "date",
            label: t('Attendance Date'),
            maxDate: new Date,
            required: true,
            value: formik.values.date,
            onChange: async (date) => {
                await formik.setFieldValue("date", date)
                await axios.post(`/attendance/get-attendance`, {
                    employee: formik.values.employee,
                    date: date
                }).then((data) => {
                    setAttendance(data.attendace)
                    formik.setFieldValue("checkInAt", data.attendace?.checkInAt)
                    formik.setFieldValue("checkOutAt", data.attendace?.checkOutAt)
                }).catch((err) => {
                    setAttendance(null)
                })
            }
        },
        {
            type: "time",
            name: "checkInAt",
            label: t('Check In At'),
            maxDate: new Date,
            required: true,
            value: formik.values.checkInAt,
        },
        {
            type: "time",
            name: "checkOutAt",
            label: t('Check Out At'),
            maxDate: new Date,
            required: true,
            value: formik.values.checkOutAt,
        },
        {
            type: "textarea",
            name: "reason",
            label: t('Reason'),
            containerClass: 'col-span-2',
            required: true,
            value: formik.values.reason,

        },
    ]
    return (
        <BaseForm title={object ? t(`Edit Request`) : t(`Create Request`)}
            formElements={formElements}
            formik={formik}
            onClose={onClose}
            alertMessage={formik.values.date && !attendance && t("No attendance found for this date")}
            disabled={!attendance}
            is_loading={false}
        />
    )
}

