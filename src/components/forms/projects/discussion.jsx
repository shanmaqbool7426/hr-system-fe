import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import Chat from '@/modules/connect/Chat';

export default function DiscussionForm({ onClose, object }) {
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
        Toast.success(object ? t(`Feedback updated successfully`) : t(`Feedback created successfully`))
        onClose()
    }
    return (
        <BaseForm title={object ? "Task Name" : "Task Name"} formik={formik} onClose={onClose} is_loading={false} >
            <div className='col-span-2'>
                <span className='text-lg font-bold text-start block mb-1'>{t('Project Name')}</span>
                <Chat />
            </div>
        </BaseForm>
    )
}
