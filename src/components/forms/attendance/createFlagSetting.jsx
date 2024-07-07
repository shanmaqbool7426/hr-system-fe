import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';

export default function CreateFlagForm({ onClose, object }) {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
            icon: object?.icon || "",
            prefix: object?.prefix || "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('formik.nameRequired')),
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
            type: "text",
            name: "flagName",
            label: t('Flag Name'),
            placeholder: t("Flag Name"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "text",
            name: "deduction",
            label: t('Deduction'),
            placeholder: t("Deduction"),
            required: true,
            value: formik.values.name,
        },
    ]
    return (
        <BaseForm title={object ? `Edit Flag/ Salary Deduction` : `Add Flag/ Salary Deduction`} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
}
