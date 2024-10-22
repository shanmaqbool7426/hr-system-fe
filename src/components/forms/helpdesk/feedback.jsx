import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'next-i18next';
import Toast from '@/util/toast';
import { useDispatch, useSelector } from 'react-redux';
import { FeedbackHelpdeskTicket } from '@/store/actions/helpdesk.actions';

export default function FeedbackForm({ onClose, ticket }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading } = useSelector(state => state.project)
    const formik = useFormik({
        initialValues: {
            feedback: "",
            rating: 0,
        },
        validationSchema: Yup.object().shape({
            feedback: Yup.string().required(t('Feedback is required')),
            rating: Yup.number().min(1, t('Rating is required')).max(5, t('Rating is required')),
        }),
        onSubmit: async (values) => {
            return dispatch(FeedbackHelpdeskTicket(ticket, values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(t("Ticket feedback submitted successfully"))
        onClose()
    }

    const formElements = [
        {
            type: "rating",
            name: "rating",
            label: t('Rating'),
            value: formik.values.rating,
            required: true,
            error: formik.errors.rating,
        },
        {
            type: "textarea",
            containerClass: "col-span-2",
            required: true,
            name: "feedback",
            label: t('Feedback'),
        }
    ]
    return (
        <BaseForm title={t("Feedback Ticket")} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} />
    )
}