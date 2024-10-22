import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import Storage from '@/util/storage';
import { useTranslation } from 'next-i18next';
import Toast from '@/util/toast';
import { useDispatch, useSelector } from 'react-redux';
import { AssignHelpdeskTicket, TransferHelpdeskTicket } from '@/store/actions/helpdesk.actions';

export default function AssignTicketForm({ onClose, ticketId, transfer = null }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { employees_list } = useSelector(state => state.employee)
    const { is_loading } = useSelector(state => state.helpdesk)
    const formik = useFormik({
        initialValues: {
            assignTo: "",
        },
        validationSchema: Yup.object().shape({
            assignTo: Yup.string().required(t('Assign to is required')),
        }),
        onSubmit: async (values) => {
            return dispatch(transfer ? TransferHelpdeskTicket(ticketId, values, onCompleted) : AssignHelpdeskTicket(ticketId, values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(transfer ? t("Ticket transferred successfully") : t("Ticket assigned successfully"))
        onClose()
    }

    const formElements = [
        {
            type: "select",
            name: "assignTo",
            label: t("Assign to"),
            value: formik.values.assignTo,
            required: true,
            list: employees_list.filter(item => item._id !== transfer).map(item => ({ value: item._id, display: `${item.firstName} ${item.lastName}` }))
        },
    ]
    return (
        <BaseForm title={transfer ? "Transfer Ticket" : "Assign Ticket"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} />
    )
}