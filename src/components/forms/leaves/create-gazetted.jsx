
import BaseForm from "../BaseForm"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch } from "react-redux"; 
import Toast from "@/util/toast"; 

export default function CreateGazetedLeaveForm({ onClose,object}) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
 
    
    const formik = useFormik({
        initialValues: {
            employee: object?.employee?._id || "",
            leaveType: object?.leaveType?._id || "",
            leaveDuration: object?.leaveDuration || "",
            dateForm: object?.dateForm || "",
            dateTo: object?.dateTo || "",
            reason: object?.reason || "",
        },
        validationSchema: Yup.object().shape({
            employee: Yup.string().required(t('formik.employeeRequired')),
            leaveType: Yup.string().required(t('formik.leaveTypeRequired')),
            dateForm: Yup.string().required(t('formik.dateFormRequired')),
            dateTo: Yup.string().required(t('formik.dateToRequired')),
            reason: Yup.string().required(t('formik.reasonRequired')),
        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateEmployee(object._id, values, onCompleted)) : dispatch(CreateEmployee(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t("Leave Request updated successfully") : t("Leave Request created successfully"))
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
        <BaseForm title={object?"Edit Gazetted Holidays":"Add Gazetted Holidays"} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
}