import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import { CreateRaiseIssue } from '@/store/actions/task-raise-issue.actions';

export default function RaiseIssueForm({ onClose, object , taskId }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: object?.name || "", 
           description: object?.description || "",
           task: taskId || "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('Task name is required')),
            description: Yup.string().required(t('Description is required')),
      }),
        onSubmit: async (values) => {

            return object ? dispatch(UpdateCustomfield(object._id, values, onCompleted)) : dispatch(CreateRaiseIssue(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`Issue updated successfully`) : t(`Issue created successfully`))
        onClose()
    }
    const formElements = [
        {
            type: "text",
            name: "name",
            label: t('Issue Title'),
            containerClass: 'col-span-2',
            value: formik.values.name,
            required: true,
        },
        {
            type: "textarea",
            name: "description",
            label: t('Describe Issue'),
            containerClass: 'col-span-2',
            value: formik.values.description,
            required: true,
        },

    ]
    return (
        <BaseForm title={object ? "Raise Issue" : "Raise Issue"} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
} 