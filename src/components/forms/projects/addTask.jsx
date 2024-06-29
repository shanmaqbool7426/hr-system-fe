import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import { useState } from 'react'; 
 
export default function AddTaskForm({ title, onClose, type, object, additionFields }) {
    const { t } = useTranslation()
    
    const [filters, setFilters] = useState({
        search: "",
        project: null,
        department: null,
        status: null,
    })
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
            name: "TaskName",
            label: t('Task Name'),
            placeholder: t("Task Name"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "select",
            name: "subTask",
            label: t('Sub Task'),
            placeholder: t("Sub Task"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "select",
            name: "Task Priority",
            label: t('Task Priority'),
            placeholder: t("High"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "date",
            name: "Due Date",
            label: t('Due Date'), 
            required: true,
            value: formik.values.name,
        },  
        {
            type: "time",
            name: "TaskTime",
            label: t('Task Time'), 
            required: true,
            value: formik.values.name,
        }, 
        {
            type: "select",
            name: "search",
            label: t('Assign To'),
            value: filters.search,
            required: true,
            placeholder: t("Search Member"),
            onChange: (event) => {
                let _filter = { ...filters }
                _filter['search'] = event.target.value
                setFilters(_filter)
            }
        },
        {
            type: "textarea",
            name: "Description",
            label: t('Description'), 
            containerClass:"col-span-2",
            required: true,
            value: formik.values.name,
        }, 
    ]
    return (
        <BaseForm title={title} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} >
          
        </BaseForm>
    )
}

AddTaskForm.defaultProps = {
    additionFields: []
}