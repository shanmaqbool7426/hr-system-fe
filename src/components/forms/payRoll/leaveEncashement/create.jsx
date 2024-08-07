import * as Yup from 'yup';
import { useFormik } from 'formik'; 
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import BaseForm from '../../BaseForm';

export default function ApplyLeaveEncashmentForm({ onClose, object }) {
    const { t } = useTranslation()
    const { t: tv } = useTranslation("validation")

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
            name: Yup.string().required(tv('Name is required')),
            attendanceDate: Yup.string().required(tv("Attendance date is required")),
            inDate: Yup.string().required(tv("InDate is required")),
            InTime: Yup.string().required(tv("InTime is required")),
            outDate: Yup.string().required(tv("outDate is required")),
            OutTime: Yup.string().required(tv("OutTime is required")),
            reason: Yup.string().required(tv("reason is required")),
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
            type: "date",
            name: "date",
            label: t('Leave Encashment Date'),
            maxDate: new Date,
            required: true,
            value: formik.values.date,
        },
        {
            type: "select",
            name: "status",
            label: t('Status'),
            placeholder: "Select Status",
            list: [{ display: "Approved", value: "Approved" }, { display: "Rejcted", value: "Rejcted" },{ display: "Pending", value: "Pending" }],
            required: true,
            value: formik.values.status,
        },
        {
            type: "text",
            name: "totalEncashment",
            placeholder: "5",
            label: t('Total Encashment'),
            required: true,
            value: formik.values.totalEncashment,
        },
        {
            type: "text",
            name: "leaveDetails",
            placeholder: "Leave Details",
            label: t('Leave Details'),
            required: true,
            value: formik.values.leaveDetails,
        },
        {
            type: "text",
            name: "approvals",
            placeholder: "Approvals",
            label: t('Approvals'),
            required: true,
            value: formik.values.approvals,
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
        <BaseForm title={object ? t(`Apply Leave Encashment`) : t(`Apply Leave Encashment`)} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
} 