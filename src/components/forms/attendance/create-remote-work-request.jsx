import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { useDispatch, useSelector } from 'react-redux';
import { CreateRemoteWorkRequest, UpdateRemoteWorkRequest } from '@/store/actions/remote-request.actions';

export default function CreateRemoteWorkRequestForm({ onClose, object }) {
    const { t } = useTranslation()
    const { team_list } = useSelector(state => state.remoteteam)
    const { employees_list } = useSelector(state => state.employee)

    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            employee: object?.user?._id || "",
            team: object?.team?._id || "",
            startDate: object?.startDate ? new Date(object?.startDate) : "",
            endDate: object?.endDate ? new Date(object?.endDate) : "",
            reason: object?.reason || "",
        },
        validationSchema: Yup.object().shape({
            employee: Yup.string().required(t('Employee is required')),
            startDate: Yup.string().required(t('Start Date date is required')),
            reason: Yup.string().required(t('Reason is required')),
        }),
        onSubmit: async (values) => {
            return object ?
                dispatch(UpdateRemoteWorkRequest(object._id, values, onCompleted)) :
                dispatch(CreateRemoteWorkRequest(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`Request updated successfully`) : t(`Request created successfully`))
        onClose()
    }
    const formElements = [
        {
            type: "select",
            name: "employee",
            label: t('Employee'),
            placeholder: "Select Employee",
            list: employees_list.map(item => ({ display: `${item.firstName} ${item.lastName}`, value: item._id })),
            required: true,
            value: formik.values.employee,
        },
        {
            type: "select",
            name: "team",
            label: t('Team'),
            placeholder: "Select Team",
            list: team_list.map(item => ({ display: item.name, value: item._id })),
            value: formik.values.team,
        },
        {
            type: "date",
            name: "startDate",
            label: t('Start Date'),
            minDate: new Date,
            required: true,
            value: formik.values.startDate,
        },
        {
            type: "date",
            name: "endDate",
            label: t('End Date'),
            minDate: formik.values.startDate,
            value: formik.values.endDate,
        },
        {
            type: "textarea",
            name: "reason",
            label: t('Reason'),
            containerClass: 'col-span-2',
            value: formik.values.reason,
            required: true,
        },
    ]
    return (
        <BaseForm title={object ? t(`Edit Remote Work Request`) : t(`Create Remote Work Request`)} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
}

