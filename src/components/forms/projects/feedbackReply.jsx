import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { useDispatch } from 'react-redux';
import { CreateFeedBack, UpdateFeedBack } from '@/store/actions/feedback.actions';

export default function FeedbackReplyForm({ onClose, object }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
           feedbackReply: object?.feedbackReply || "",
        },
        validationSchema: Yup.object().shape({
            feedbackReply: Yup.string().required(t('Feedback Reply is required')),
      }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateFeedBack(object._id, values, onCompleted)) : dispatch(CreateFeedBack(values, onCompleted))
           
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`Feedback Reply Submitted Successfully`) : t(`Feedback Reply Created Successfully`))
        onClose()
    }
    const formElements = [
        {
            type: "textarea",
            name: "feedbackReply",
            label: t('Give Feedback Reply'),
            containerClass: 'col-span-2',
            value: formik.values.feedbackReply,
            required: true,
        },

    ]
    return (
        <BaseForm title={object ? "Feedback Reply" : "Feedback Reply"} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
} 