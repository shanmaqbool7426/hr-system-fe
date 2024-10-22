import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'next-i18next';
import Toast from '@/util/toast';
import { CreateTask, UpdateTask } from '@/store/actions/task.actions';
import { setLoading } from '@/store/slices/task.slice';
import { useDispatch, useSelector } from 'react-redux';
import Storage from "@/util/storage"
export default function CreateTaskForm({ onClose, object, additionFields }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { auth_user } = useSelector((state) => state.auth);
    const { employees_list } = useSelector((state) => state.employee);
    const { task_list, is_loading } = useSelector(state => state.task)

    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
            status: object?.status || "",
            description: object?.description || "",
            dueDate: object?.dueDate || "",
            requiredTime: object?.requiredTime || "",
            priority: object?.priority || "",
            lead: object?.lead?._id || "",
            assignedTo: object?.assignedTo?._id || "",
            board: additionFields?._id || "",
            project: additionFields?.project?._id || "",
            parent: object?.parent || "",
            attachment: null,
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('Task name is required')),
            dueDate: Yup.string().required(t('Task Due date is required')),
            assignedTo: Yup.string().required(t('Member is required')),
            lead: Yup.string().required(t('Leader is required')),
            requiredTime: Yup.string().required(t("Time is required")),
            priority: Yup.string().required(t('Priority is required')),
            description: Yup.string().required(t('Description is required')),
        }),
        onSubmit: async (values) => {
            dispatch(setLoading(true))
            if (values.attachment) {
                const { url } = await Storage.upload(values.attachment, auth_user.company._id)
                values.attachment = url
            }
            return object ? dispatch(UpdateTask(object._id, values, onCompleted)) : dispatch(CreateTask(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t('Task updated successfully') : t('Task created successfully'))
        onClose()
    }
    const filteredLeadList = employees_list.filter(employee => employee._id !== formik.values.assignedTo);
    const filteredAssigneeList = employees_list.filter(employee => employee._id !== formik.values.lead);

    const formElements = [
        {
            type: "text",
            name: "name",
            label: t('Task Name'),
            placeholder: t("Task Name"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "select",
            name: "parent",
            label: t('Parent Task'),
            placeholder: t("Parent Task Name"),
            value: formik.values.parent,
            list: task_list?.map((item) => ({
                value: item?._id,
                display: item?.name,
            })),
            multiple: false
        },
        {
            type: "date",
            name: "dueDate",
            label: t('Due Date'),
            required: true,
            value: formik.values.dueDate,
        },
        {
            type: "select",
            name: "priority",
            label: t("Priority"),
            value: formik.values.priority,
            required: true,
            list: [
                { value: "low", display: "Low" },
                { value: "medium", display: "Medium" },
                { value: "high", display: "High" },
            ]
        },
        {
            type: "time",
            name: "requiredTime",
            label: t('Task Time'),
            required: true,
            value: formik.values.requiredTime,
        },
        {
            type: "select",
            name: "lead",
            label: t('Leader'),
            value: formik.values.lead,
            required: true,
            list: filteredLeadList?.map((item) => ({
                value: item?._id,
                display: item?.firstName + " " + item?.lastName,
            })),
            multiple: false
        },
        {
            type: "select",
            name: "assignedTo",
            label: t('Assign to'),
            value: formik.values.assignedTo,
            required: true,
            list: filteredAssigneeList?.map((item) => ({
                value: item?._id,
                display: item?.firstName + " " + item?.lastName,
            })),
            multiple: false,
        },
        {
            type: "textarea",
            name: "description",
            label: t('Description'),
            containerClass: "col-span-2",
            required: true,
            value: formik.values.description,
        },
        {
            type: "file",
            name: "attachment",
            label: t('Attachment'),
            accept: `image/*,application/pdf,.doc,.docx`,
            className: "col-span-2",
            help: object ? t("Leave empty if don't want to replace old one") : ""
        }
    ]
    return (
        <BaseForm title={object ? "Edit Task" : 'Create Task'} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} />
    )
}
