import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import { Button, Input } from '@/components/elements';
import { useState } from 'react';
import { Trash } from '@/components/svg';

export default function CreateCustomFieldForm({ title, onClose, type, object, additionFields, dynamicFields = false }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [fields, setFields] = useState(object?.fields?.length || 0)
    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
            type,
            icon: object?.icon || "",
            prefix: object?.prefix || "",
            fields: object?.fields || []
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

    const getFields = () => new Array(fields).fill(null)
    return (
        <BaseForm title={object ? `Edit ${title}` : `Create new ${title}`} formElements={formElements} formik={formik} onClose={onClose} is_loading={false}>
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