import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';

export default function AddNewShiftForm({ title, onClose, type, object, additionFields }) {
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
            name: "Shift",
            label: t('Shift'),
            placeholder: "Select Shift",
            list: ["Yes", "No"],
            required: true,
            value: formik.values.name,
            containerClass:"col-span-2"
        },
        {
            type: "select",
            name: "Employee",
            label: t('Employee'),
            placeholder: "Select Employee",
            list: ["Yes", "No"],
            required: true,
            value: formik.values.name,
            containerClass:"col-span-2"
        },
        {
            type: "select",
            name: "Employee",
            label: t('Apply On All Working Days In This Week'),
            placeholder: "Select Once",
            list: ["Yes", "No"],
            required: true,
            value: formik.values.name,
            containerClass:"col-span-2"
        },
    ]
    return (
        <BaseForm title={object ? `Edit ${title}` : `Add ${title}`} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
}

AddNewShiftForm.defaultProps = {
    additionFields: []
}