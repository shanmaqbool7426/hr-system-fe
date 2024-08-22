import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { useDispatch, useSelector } from 'react-redux';
import {
    CreateProject,
    UpdateProject,
} from "@/store/actions/project.actions";
import moment from 'moment';
import ImageUpload from '@/components/elements/ImadeUploader';


export default function CreatProjectsForm({ onClose, object, }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading } = useSelector(state => state.project)
    const { employees_list } = useSelector((state) => state.employee);
    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
            client: object?.client || "",
            startDate: object?.startDate || "",
            endDate: object?.endDate || "",
            payment: object?.payment || "",
            paymentCycle: object?.paymentCycle || "",
            priority: object?.priority || "",
            leads: object?.leads?.reduce((acc, item) => {
                acc.push(item._id);
                return acc;
            }, []) || [],
            members: object?.members?.reduce((acc, item) => {
                acc.push(item._id);
                return acc;
            }, []) || [],
            description: object?.description || "",

        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('Project name is required')),
            client: Yup.string().required(t('Client name is required')),
            startDate: Yup.string().required(t('Project start date is required')),
            endDate: Yup.date().required(t('Project end date is required'))
                .test('is-greater', t('End date must be later than start date'),
                    function (value) {
                        const { startDate } = this.parent;
                        return !startDate || !value || moment(value).isAfter(moment(startDate));
                    }),
            leads: Yup.array().required(t('Project leader is required')),
            members: Yup.array().required(t('Team is required')),
            description: Yup.string().required(t('Description is required')),

        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateProject(object._id, values, onCompleted)) : dispatch(CreateProject(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t("Project updated successfully") : t("Project created successfully"))
        onClose()
    }

    const getFilteredEmployees = (list, excludeIds) => {
        return list.filter(employee => !excludeIds.includes(employee._id));
    };

    const filteredLeadsList = getFilteredEmployees(employees_list, formik.values.members);
    const filteredMembersList = getFilteredEmployees(employees_list, formik.values.leads);

    const formElements = [
        {
            type: "text",
            name: "name",
            label: t('Project Name'),
            placeholder: t("Project Name"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "text",
            name: "client",
            label: t('Client'),
            placeholder: t("Client Name"),
            required: true,
            value: formik.values.client,
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
            required: false,
            value: formik.values.paymentCycle,
            list: [
                { value: "monthly", display: "Monthly" },
                { value: "one time", display: "One Time" },

            ]
        },
        {
            type: "select",
            name: "leads",
            label: t('Add Project Leader'),
            value: formik.values.leads,
            required: true,
            list: filteredLeadsList.map((item) => ({
                value: item?._id,
                display: item.firstName + " " + item.lastName,
            })),
            multiple: true,

        },
        {
            type: "select",
            name: "members",
            label: t('Add Team'),
            value: formik.values.members,
            required: true,
            list: filteredMembersList.map((item) => ({
                value: item?._id,
                display: item.firstName + " " + item.lastName,
            })),
            multiple: true,

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
        },
    ]
    return (
        <BaseForm title={object ? "Edit project" : "Create project"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading}>
            <div className='flex flex-col gap-6 col-span-2'>
                <ImageUpload />
            </div>

        </BaseForm>
    )
}