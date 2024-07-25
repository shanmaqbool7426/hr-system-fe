import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';

export default function ChangeRemoteTeamForm({ onClose, object }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            employee: object?.employee?._id || "",
            currentTeam: object?.employee?._id || "",
            newTeam: object?.employee?._id || "", 
        },
        validationSchema: Yup.object().shape({
            employee: Yup.string().required(t('Employee is required')), 
            newTeam: Yup.string().required(t('New Team is required')), 
        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateCustomfield(object._id, values, onCompleted)) : dispatch(CreateCustomfield(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`Exemption request updated successfully`) : t(`Exemption request created successfully`))
        onClose()
    }
    const formElements = [
        {
            type: "select",
            name: "employee",
            label: t('Employee'),
            required: true,
            placeholder: "Employee",
            list:[{display:"John",value:"John"}],
            value: formik.values.employee,
        },
        {
            type: "text",
            name: "currentTeam",
            label: t('Current Team'),
            required: true,
            placeholder: "Current Team", 
            value: formik.values.currentTeam,
            readOnly:true
        },
        {
            type: "select",
            name: "newTeam",
            label: t('New Team'),
            required: true,
            placeholder: "New Team",
            list:[{display:"Management",value:"Management"}],
            value: formik.values.newTeam,
        },
    ]
    return (
        <BaseForm title={object ? t(`Change Remote Team`) : t(`Change Remote Team`)} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
}

