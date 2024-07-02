import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import BaseForm from '../../BaseForm'; 

export default function OfferJob({ title, onClose, type, object, additionFields }) {
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
            type: "text",
            name: "offerSalary ",
            label: t('Offer Salary'),
            placeholder: t("Offer Salary"),
            required: true,
            value: formik.values.name,
        }, 
        {
            type: "text",
            name: "designation",
            label: t('Designation'),
            placeholder: t("UI UX Designer"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "text",
            name: "deprtement ",
            label: t('Deprtement '),
            placeholder: t("Deprtement"),
            required: true,
            value: formik.values.name,
        },  
        {
            type: "date",
            name: "dateofjoning",
            label: t('Date of Joning'), 
            required: true,
            value: formik.values.name,
        },  
        {
            type: "textarea",
            name: "description",
            label: t('Description'),
            placeholder: t("Type Here"), 
            containerClass: 'col-span-2',
            required: true,
            value: formik.values.name,
        },
    ]
    return (
        <BaseForm title={title} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
}

OfferJob.defaultProps = {
    additionFields: []
}