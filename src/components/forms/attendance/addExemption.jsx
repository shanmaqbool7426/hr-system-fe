import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';

export default function AddExemptionForm({ title, onClose, type, object, additionFields }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
            type,
            icon: object?.icon || "",
            prefix: object?.prefix || "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('formik.nameRequired')),
            icon: additionFields.length > 0 ? Yup.string().required(t('formik.nameRequired')) : Yup.string().optional(),
            prefix: additionFields.length > 0 ? Yup.string().required(t('formik.nameRequired')) : Yup.string().optional(),
        }),
        onSubmit: async (values) => {

            return object ? dispatch(UpdateCustomfield(object._id, values, onCompleted)) : dispatch(CreateCustomfield(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`${type} updated successfully`) : t(`${type} created successfully`))
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
            label: t('Date'),
            maxDate: new Date,
            required: true,
            value: formik.values.attendanceDate,
        },
        {
            type: "select",
            name: "Employee",
            label: t('Flag Type'),
            placeholder: "Select One",
            list: ["Yes", "No"],
            required: true,
            value: formik.values.name,
        },
        {
            type: "select",
            name: "InTime",
            label: t('Exemption Type'),
            placeholder: "Forget mark my attendance",
            list: ["Yes", "No"],
            required: true,
            value: formik.values.name,
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
        <BaseForm title={object ? `Edit ${title}` : `Add ${title}`} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
}

AddExemptionForm.defaultProps = {
    additionFields: []
}