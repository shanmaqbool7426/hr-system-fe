import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { useDispatch, useSelector } from 'react-redux';


export default function CreatProjectsForm({ onClose, object, }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading } = useSelector(state => state.project)
    const formik = useFormik({
        initialValues: {
            projectName: object?.projectName || "",
            clientName: object?.clientName || "",
            sprint: object?.sprint || "",
            sprintDueDate: object?.sprintDueDate || "",
            startDate: object?.startDate || "",
            endDate: object?.endDate || "",
            payment: object?.payment || "",
            paymentCycle: object?.paymentCycle || "",
            projectLeader: object?.projectLeader || "",
            team: object?.team || "",
            description: object?.description || "", // Added description
        },
        validationSchema: Yup.object().shape({
            projectName: Yup.string().required(t('Project name is required')),
            clientName: Yup.string().required(t('Client name is required')),
            sprint: Yup.string().required(t('Sprint is required')),
            sprintDueDate: Yup.string().required(t('Sprint due date is required')),
            startDate: Yup.string().required(t('Project start date is required')),
            endDate: Yup.string().required(t('Project end date is required')),
            projectLeader: Yup.string().required(t('Project leader is required')),
            team: Yup.string().required(t('Team is required')),
            description: Yup.string().required(t('Description is required')), // Added validation for description
        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateProject(object._id, values, onCompleted)) : dispatch(CreateProject(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`Project updated successfully`) : t(`Project created successfully`))
        onClose()
    }
    const formElements = [
        {
            type: "text",
            name: "projectName",
            label: t('Project Name'),
            placeholder: t("Office Management"),
            required: true,
            value: formik.values.projectName,
        },
        {
            type: "text",
            name: "clientName",
            label: t('Client'),
            placeholder: t("Jhon Carter"),
            required: true,
            value: formik.values.clientName,
        },

        {
            type: "date",
            name: "startDate",
            label: t('Start Date'),
            required: true,
            value: formik.values.startDate,
        },
        {
            type: "date",
            name: "endDate",
            label: t('End Date'),
            required: true,
            value: formik.values.endDate,
        },
        {
            type: "number",
            name: "payment",
            label: t('Payment'),
            placeholder: t("$5000"),
            required: false,
            value: formik.values.payment,
        },
        {
            type: "select",
            name: "paymentCycle",
            label: t('Payment Cycle'),
            placeholder: t("Fixed"),
            required: false,
            value: formik.values.paymentCycle,
            list: [
                { value: "monthly", display: "Monthly" },
                { value: "one time", display: "One Time" },

            ]
        },
        {
            type: "search",
            name: "projectLeader",
            label: t('Add Project Leader'),
            value: [],
            required: true,
            placeholder: t("Search Leader"),
            onChange: (event) => {
                let _filter = { ...filters }
                _filter['search'] = event.target.value
                setFilters(_filter)
            }
        },
        {
            type: "search",
            name: "team",
            label: t('Add Team'),
            value: [],
            required: true,
            placeholder: t("Search Team Member"),
            onChange: (event) => {
                let _filter = { ...filters }
                _filter['search'] = event.target.value
                setFilters(_filter)
            }
        },
        {
            type: "select",
            name: "priority",
            label: t("Priority"),
            value: formik.values.priority,
            required: true,
            list: [
                { value: "low", display: "Low" },
                { value: "normal", display: "Normal" },
                { value: "high", display: "High" },
            ]
        },
        {
            type: "editor",
            name: "description",
            label: t("Description"),
            value: formik.values.description,
            containerClass: "col-span-2"
        }
    ]
    return (
        <BaseForm title={object ? "Edit project" : "Create project"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} />
    )
}
