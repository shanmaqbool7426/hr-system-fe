import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import { StarIcon } from '@/components/svg';
import { Textarea } from '@/components/elements';

export default function FeedbackForm({ title, onClose, type, object, additionFields }) {
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
            name: "Employee",
            label: t('Employee'),
            containerClass: 'col-span-2',
            value: formik.values.employee,
            required: true,
        },
       
    ]
    return (
        <BaseForm formElements={formElements} title={title} formik={formik} onClose={onClose} is_loading={false} >
            <span className='mb-2 text-sm block text-start mt-6'>{t("Select Rating")}</span>
            <div className='flex gap-1 mb-6'>
                <button><StarIcon className={'h-10 w-10 text-gray-300'} /></button>
                <button><StarIcon className={'h-10 w-10 text-gray-300'} /></button>
                <button><StarIcon className={'h-10 w-10 text-gray-300'} /></button>
                <button><StarIcon className={'h-10 w-10 text-gray-300'} /></button>
                <button><StarIcon className={'h-10 w-10 text-gray-300'} /></button>
            </div> 
            <Textarea label={'Comments'} required></Textarea>
        </BaseForm>
    )
}

FeedbackForm.defaultProps = {
    additionFields: []
}