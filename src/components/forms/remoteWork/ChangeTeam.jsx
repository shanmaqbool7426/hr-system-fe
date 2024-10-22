import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'next-i18next';
import Toast from '@/util/toast';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateEmployee } from '@/store/actions/employee.actions';

export default function ChangeRemoteTeamForm({ onClose, employee = null, team = null }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { employees_list } = useSelector(state => state.employee)
    const { team_list } = useSelector(state => state.remoteteam)
    const formik = useFormik({
        initialValues: {
            employee: employee || "",
            currentTeam: team || "",
            newTeam: "",
        },
        validationSchema: Yup.object().shape({
            employee: Yup.string().required(t('Employee is required')),
            newTeam: Yup.string().required(t('New Team is required')),
        }),
        onSubmit: async (values) => {
            return dispatch(UpdateEmployee(values.employee, { team: values.newTeam }, () => {
                Toast.success(t(`Employee team updated successfully`))
                onClose()
            }))
        }
    })

    const formElements = [
        {
            type: "select",
            name: "employee",
            label: t('Employee'),
            required: true,
            readOnly: !!employee,
            placeholder: "Employee",
            list: employees_list.map(item => ({ display: `${item.firstName} ${item.lastName}`, value: item._id })),
            value: formik.values.employee,
            onChange: async (value) => {
                await formik.setFieldValue("employee", value)
                await formik.setFieldValue("currentTeam", (await employees_list.find(item => item._id === value))?.team?.name || "")
            }
        },
        {
            type: "text",
            name: "currentTeam",
            label: t('Current Team'),
            placeholder: "Current Team",
            value: formik.values.currentTeam,
            readOnly: true
        },
        {
            type: "select",
            name: "newTeam",
            label: t('New Team'),
            required: true,
            placeholder: "New Team",
            list: team_list.map(item => ({ display: item.name, value: item._id })),
            value: formik.values.newTeam,
        },
    ]
    return (
        <BaseForm title={t(`Change Remote Team`)} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
}

