import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';

export default function CreateRemoteEmployeeForm({ onClose, object }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: object?.employee?._id || "",
            email: object?.employee?._id || "",
            team: object?.employee?._id || "",
            role: object?.employee?._id || "",
            attendanceDate: object?.attendanceDate || "",
            flagType: object?.flagType || "",
            exemptionType: object?.exemptionType || "",
            reason: object?.exemptionType || "",
        },
        validationSchema: Yup.object().shape({
            employee: Yup.string().required(t('Employee is required')),
            attendanceDate: Yup.string().required(t('Atendance date is required')),
            flagType: Yup.string().required(t('Flag type is required')),
            exemptionType: Yup.string().required(t('Exemption type is required')),
            reason: Yup.string().required(t('Reason is required')),
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
            type: "text",
            name: "name",
            label: t('Name'),
            required: true,
            placeholder: "Enter name",
            value: formik.values.name,
        },
        {
            type: "text",
            name: "email",
            label: t('Email'),
            placeholder: "Enter email",
            required: true,
            value: formik.values.email,
        },
        {
            type: "select",
            name: "team",
            label: t('Team'), 
            list:[{display:"Without Team",value:"Without Team"},{display:"Accounting",value:"Accounting"},{display:"Management",value:"Management"},],
            required: true,
            value: formik.values.team,
        },
        {
            type: "select",
            name: "role",
            label: t('Role'), 
            list:[{display:"Employee",value:"Employee"},{display:"User Manager",value:"User Manager"},{display:"Management",value:"Management"},],
            required: true,
            value: formik.values.role,
        },
        
    ]
    return (
        <BaseForm title={object ? t(`Edit Employee`) : t(`Add Employee`)} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
}

