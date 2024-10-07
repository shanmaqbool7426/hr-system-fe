import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateRemoteTeam, UpdateRemoteTeam } from "@/store/actions/remote-team.actions"
import { useDispatch } from 'react-redux';

export default function CreateRemoteTeamForm({ onClose, object }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('Name is required')),
        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateRemoteTeam(object._id, values, onCompleted)) : dispatch(CreateRemoteTeam(values, onCompleted))
        },
        enableReinitialize: true
    })
    const onCompleted = () => {
        Toast.success(object ? t(`Team updated successfully`) : t(`Team created successfully`))
        onClose()
    }

    const formElements = [
        {
            type: 'text',
            name: 'name',
            label: 'Name',
            value: formik.values.name,
            placeholder: 'Enter name',
            required: true,
        },
    ]

    return (
        <BaseForm title={object ? t(`Edit Team`) : t(`Create Team`)} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
}

