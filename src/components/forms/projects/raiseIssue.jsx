import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';

export default function RaiseIssueForm({ onClose, object }) {
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
        Toast.success(object ? t(`Issue updated successfully`) : t(`Issue created successfully`))
        onClose()
    }
    const formElements = [
        {
            type: "text",
            name: "title",
            label: t('Issue Title'),
            containerClass: 'col-span-2',
            value: formik.values.reason,
            required: true,
        },
        {
            type: "textarea",
            name: "reason",
            label: t('Describe Issue'),
            containerClass: 'col-span-2',
            value: formik.values.reason,
            required: true,
        },

    ]
    return (
        <BaseForm title={object ? "Raise Issue" : "Raise Issue"} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
} 