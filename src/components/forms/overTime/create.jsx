import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';

export default function ApplyOvertimeForm({ onClose, object }) {
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
            label: t('Employee Name'),
            placeholder: "Select Employee",
            list: [{ display: "John", value: "John" }, { display: "Mink", value: "Mink" }],
            required: true,
            value: formik.values.employee,
        },
        {
            type: "text",
            name: "title",
            placeholder: "Title",
            label: t('Title'),
            required: true,
            value: formik.values.title,
        },
        {
            type: "date",
            name: "date",
            label: t('Date'),
            maxDate: new Date,
            required: true,
            value: formik.values.date,
        },
        {
            type: "text",
            name: "overtimeHours",
            placeholder: "5",
            label: t('Overtime Hours'),
            required: true,
            value: formik.values.overtimeHours,
        },
        {
            type: "select",
            name: "overtimeType",
            label: t('Overtime Type'),
            placeholder: "Select Overtime Type",
            list: [{ display: "Work day overtime", value: "Work day overtime" }, { display: "Holidays Overtime", value: "Holidays Overtime" }, { display: "Ghazzatted Holidays", value: "Ghazzatted Holidays" }],
            required: true,
            value: formik.values.overtimeType,
        },
        {
            type: "textarea",
            name: "description",
            label: t('Description'),
            containerClass: 'col-span-2',
            required: true,
            value: formik.values.description,

        },
    ]
    return (
        <BaseForm title={object ? t(`Apply Overtime`) : t(`Apply Overtime`)} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
} 