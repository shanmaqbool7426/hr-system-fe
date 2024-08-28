import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '@/components/elements';
import { useState } from 'react';
import { Trash } from '@/components/svg';
import { capitalize } from '@/util/helpers';

export default function CreateCustomFieldForm({ title, onClose, type, object, parent, vendor_rating, additionFields, dynamicFields = false }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { customfield_list } = useSelector(state => state.customfield)
    const [fields, setFields] = useState(object?.fields?.length || 0)
    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
            type,
            icon: object?.icon || "",
            prefix: object?.prefix || "",
            fields: object?.fields || [],
            parent: object?.parent?._id || null,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('Name is required')),
            icon: additionFields.length > 0 ? Yup.string().required(t('Icon is required')) : Yup.string().optional(),
            prefix: additionFields.length > 0 ? Yup.string().required(t('Prefix is required')) : Yup.string().optional(),
            category: vendor_rating ? Yup.string().required(t('Category is required')) : Yup.string().optional(),
        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateCustomfield(object._id, values, onCompleted)) : dispatch(CreateCustomfield(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`${capitalize(type)} updated successfully`) : t(`${capitalize(type)} created successfully`))
        onClose()
    }
    const formElements = [{
        type: "text",
        name: "name",
        label: t('Name'),
        placeholder: t("Name"),
        required: true,
        value: formik.values.name,
    }, ...additionFields.map(item => {
        item.value = formik.values[item.name]
        return item
    })]
    if (parent) {
        formElements.push({
            type: "select",
            name: "parent",
            label: t("Parent"),
            value: formik.values.parent,
            list: customfield_list.filter(item => !item.parent && item.type === type).map(item => ({ display: item.name, value: item._id }))
        })
    }
    if (vendor_rating) {
        formElements.push({
            type: "select",
            name: "category",
            label: t("Category"),
            value: formik.values.category,
            list: [
                { display: t("Quality"), value: "quality" },
                { display: t("Performance"), value: "performance" },
                { display: t("Communication"), value: "communication" },
            ],
            required: true
        })
    }

    const getFields = () => new Array(fields).fill(null)
    return (
        <BaseForm title={object ? `Edit ${title}` : `Create ${title}`} formElements={formElements} formik={formik} onClose={onClose} is_loading={false}>
            {dynamicFields &&
                <div className='col-span-2 flex flex-col gap-4'>
                    <hr />
                    <h6 className='text-left mb-0'>Additional Fields</h6>
                    {fields > 0 && getFields().map((item, index) => (
                        <div className='flex gap-4' key={index}>
                            <Input formik={formik} key={index} value={formik.values.fields[index]} containerClass={"w-full"} onChange={(event) => {
                                let field_values = formik.values.fields
                                field_values[index] = event.target.value
                                formik.setFieldValue('fields', field_values)

                            }} />
                            {index === fields - 1 && <div className='flex items-center'>
                                <Trash className={"text-themeDanger"} onClick={() => {
                                    setFields((prev) => prev - 1)
                                    let field_values = formik.values.fields
                                    field_values.pop()
                                    formik.setFieldValue('fields', field_values)
                                }} />

                            </div>}
                        </div>
                    ))}
                    <div className='flex'><Button variant={'primary'} type="button" value={'Add more'} onClick={() => {
                        let field_values = formik.values.fields
                        field_values.push("")
                        formik.setFieldValue('fields', field_values)
                        setFields((prev) => prev + 1)
                    }} /></div>
                </div>}
        </BaseForm>
    )
}

CreateCustomFieldForm.defaultProps = {
    additionFields: []
}