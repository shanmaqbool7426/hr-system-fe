import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../../BaseForm';
import { useTranslation } from 'react-i18next';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';

export default function CreateHelpDeskForm({ onClose, object, }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('formik.nameRequired')),
        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateCustomfield(object._id, values, onCompleted)) : dispatch(CreateCustomfield(values, onCompleted))
        }
    })
    const onCompleted = () => {

        onClose()
    }
    const formElements = [
        {
            type: "text",
            name: "Category",
            label: t('Category'),
            placeholder: t("Laptop Issue"),
            required: true,
            value: formik.values.Category,
        },
        {
            type: "select",
            name: "ParentCategory",
            label: t('Parent Category'),
            placeholder: t("Hardware"),
            required: true,
            list: [{ display: "Hardware", value: "Hardware" }],
            value: formik.values.name,
        },
    ]

    return (
        <BaseForm title={object ? `Edit Helpdesk Categories` : `Create Helpdesk Categories`} formElements={formElements} formik={formik} onClose={onClose} is_loading={false}>

        </BaseForm>
    )
}
