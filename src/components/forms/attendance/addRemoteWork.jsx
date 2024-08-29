import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';

export default function AddRemoteWorkForm({onClose, object }) {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            Employee: object?.Employee || "",
            attendanceDate: object?.attendanceDate || "",
            startDate: object?.startDate || "",
            endDate: object?.endDate || "",
            reason: object?.reason || "",
        },
        validationSchema: Yup.object().shape({
            Employee: Yup.string().required(t('Employee is required')),
            attendanceDate: Yup.string().required(t('Atendance date is required')),
            startDate: Yup.string().required(t('Start Date date is required')),
            endDate: Yup.string().required(t('End Date is required')),
            reason: Yup.string().required(t('Reason is required')),

        }),
        onSubmit: async (values) => {

            return object ? dispatch(UpdateCustomfield(object._id, values, onCompleted)) : dispatch(CreateCustomfield(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`${type} Remote work request completed successfully`) : t(`${type} created successfully`))
        onClose()
    }
    const formElements = [
        {
            type: "select",
            name: "Employee",
            label: t('Employee'),
            placeholder: "Select Employee",
            list: ["Yes", "No"],
            required: true,
            value: formik.values.name,
        },
        {
            type: "date",
            name: "attendanceDate",
            label: t('Attendance Date'),
            maxDate: new Date,
            required: true,
            value: formik.values.attendanceDate,
        },
        {
            type: "date",
            name: "startDate",
            label: t('Start Date'),
            maxDate: new Date,
            required: true,
            value: formik.values.startDate,
        },
        {
            type: "date",
            name: "endDate",
            label: t('End Date'),
            maxDate: new Date,
            required: true,
            value: formik.values.endDate,
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
    return (
        <BaseForm title={object ? `Edit Remote Work Request` : `Add Remote Work Request`} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
}

