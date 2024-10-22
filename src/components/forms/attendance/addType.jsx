import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'next-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux'; 

export default function AddTypeForm({ onClose, object }) {
    const { t } = useTranslation() 

    const dispatch = useDispatch()
    
    const formik = useFormik({
        initialValues: {
            name: object?.name || "", 
            icon: object?.icon || "",
            prefix: object?.prefix || "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('Name is required')),
      }),
        onSubmit: async (values) => {

            return object ? dispatch(UpdateCustomfield(object._id, values, onCompleted)) : dispatch(CreateCustomfield(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`${type} updated successfully`) : t(`${type} created successfully`))
        onClose()
    }
    const formElements = [{
        type: "text",
        name: "ShiftName",
        label: t('Reason Type'),
        placeholder: t("Reason Type"),
        required: true,
        value: formik.values.name,
    }, 
    {
        type: "select",
        name: "ShiftName",
        label: t('Validate Request With Respect To Min Working Hrs'),
        list: ["Yes", "No"],
        required: true,
        value: formik.values.name,
    }, 
    {
        type: "text",
        name: "ShiftName",
        label: t('Min Working Hours'),
        placeholder: t("Min Working Hours"),
        required: true,
        value: formik.values.name,
    }, 
    ]
    return (
        <BaseForm title={object ? `Edit Type` : `Add Type`} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
}
 