import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast'; 
import BaseForm from '../../BaseForm';

export default function ApplyAdvanceSalaryForm({ onClose, object }) {
    const { t } = useTranslation()
    const { t: tv } = useTranslation("validation")
 
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
            name: Yup.string().required(tv('Name is required')),
            attendanceDate: Yup.string().required(tv("Attendance date is required")),
            inDate: Yup.string().required(tv("InDate is required")),
            InTime: Yup.string().required(tv("InTime is required")),
            outDate: Yup.string().required(tv("outDate is required")),
            OutTime: Yup.string().required(tv("OutTime is required")),
            reason: Yup.string().required(tv("reason is required")),
        }),
        onSubmit: async (values) => {

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
            list: [{ display: "John", value: "John" }, { display: "Mink", value: "Mink" }],
            required: true,
            value: formik.values.employee,
        },
        {
            type: "text",
            name: "title",
            placeholder: "Advance",
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
            name: "amount",
            placeholder: "$12000",
            label: t('Amount'),
            required: true,
            value: formik.values.amount,
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
        <BaseForm title={object ? t(`Apply For Advance Salary`) : t(`Apply For Advance Salary`)} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
}

