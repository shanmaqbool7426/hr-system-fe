import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'next-i18next';
import Toast from '@/util/toast';
import { useDispatch, useSelector } from 'react-redux';
import { CloseHelpdeskTicket } from '@/store/actions/helpdesk.actions';

export default function CloseTicketForm({ onClose, ticket }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading } = useSelector(state => state.helpdesk)
    const formik = useFormik({
        initialValues: {
            remarks: "",
            repairCost: 0,
        },
        validationSchema: Yup.object().shape({
            remarks: Yup.string().required(t('Remarks is required')),
            repairCost: Yup.number().optional(),
        }),
        onSubmit: async (values) => {
            return dispatch(CloseHelpdeskTicket(ticket._id, values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(t("Ticket closed successfully"))
        onClose()
    }

    const formElements = [
        {
            type: ticket?.hardwareType === 'faulty' ? "number" : "hidden",
            containerClass: "col-span-2",
            name: "repairCost",
            label: t('Repair Cost'),
            step: 1,
            value: parseInt(formik.values.repairCost || 0)
        },
        {
            type: "textarea",
            containerClass: "col-span-2",
            required: true,
            name: "remarks",
            label: t('Remarks'),
        }
    ]
    return (
        <BaseForm title={t("Close Ticket")} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} />
    )
}