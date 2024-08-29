import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';

export default function AddRequestForm({onClose, object }) {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            employee: object?.employee?._id || "",
            attendanceDate: object?.attendanceDate || "",
            inDate: object?.inDate || "",
            InTime: object?.InTime || "",
            outDate: object?.outDate || "",
            OutTime: object?.OutTime || "",
            reason: object?.reason || ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('Name is required')),
            attendanceDate: Yup.string().required(t("Attendance date is required")),
            inDate: Yup.string().required(t("InDate is required")),
            InTime: Yup.string().required(t("InTime is required")),
            outDate: Yup.string().required(t("outDate is required")),
            OutTime: Yup.string().required(t("OutTime is required")),
            reason: Yup.string().required(t("reason is required")),   
        }),
        onSubmit: async (values) => {

            return object ? dispatch(UpdateCustomfield(object._id, values, onCompleted)) : dispatch(CreateCustomfield(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`${type} Request completed successfully`) : t(`${type} created successfully`))
        onClose()
    }
    const formElements = [
        {
            type: "select",
            name: "employee",
            label: t('Employee'),
            placeholder: "Select Employee",
            list: ["Yes", "No"],
            required: true,
            value: formik.values.employee,
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
            name: "inDate",
            label: t('In Date'),
            maxDate: new Date,
            required: true,
            value: formik.values.inDate,
        },
        {
            type: "select",
            name: "InTime",
            label: t('In Time'),
            placeholder: "9:00 PM",
            list: ["Yes", "No"],
            required: true,
            value: formik.values.InTime,
        },
        {
            type: "date",
            name: "outDate",
            label: t('Out Date'),
            maxDate: new Date,
            required: true,
            value: formik.values.outDate,
        },
        {
            type: "select",
            name: "OutTime",
            label: t('Out Time'),
            placeholder: "9:00 PM",
            list: ["Yes", "No"],
            required: true,
            value: formik.values.OutTime,
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
        <BaseForm title={object ? t(`Edit Request`) : t(`Add Request`)} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
}

