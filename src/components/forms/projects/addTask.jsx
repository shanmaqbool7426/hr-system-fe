import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateTask,UpdateTask,FetchTask } from '@/store/actions/task.actions';
import { FetchEmployees } from '@/store/actions/employee.actions';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'; 
 
export default function AddTaskForm({ onClose, object , additionFields  }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { employees_list } = useSelector((state) => state.employee);
    const {task_list, is_loading } = useSelector(state => state.task)
    useEffect(() => {
        dispatch(FetchTask())
        dispatch(FetchEmployees());
    }, [dispatch]);
    const [filters, setFilters] = useState({
        search: "",
        project: null,
        department: null,
        status: null,
    })

    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
            subTask:object?.subTask || "",
            status: object?.status || "",
            description: object?.description || "", 
            dueDate: object?.dueDate || "",
            requiredTime: object?.requiredTime || "",
            priority: object?.priority || "",
            assignedTo: object?.assignedTo?.reduce((acc, item) => {
                acc.push(item._id);
                return acc;
              }, []) || "",
              board: additionFields?._id || "",
              project: additionFields?.project?._id || "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('Task name is required')),
            status: Yup.string().required(t('Status is required')),
            dueDate: Yup.string().required(t('Task Due date is required')),
            assignedTo: Yup.string().required(t('Members are required')),
            requiredTime : Yup.string().required(t("Time is required")),
            priority: Yup.string().required(t('Priority is required')),
            description: Yup.string().required(t('Description is required')), 
      }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateTask(object._id, values, onCompleted)) : dispatch(CreateTask(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t('Task updated successfully') : t('Task created successfully'))
        onClose()
    }
    const formElements = [
        {
            type: "select",
            name: "name",
            label: t('Task Name'),
            placeholder: t("Task Name"),
            required: true,
            value: formik.values.name,
            list: task_list?.length ? task_list.map((item) => ({
                value: item?._id,
                display: item?.name,
            })) : [],
            multiple: false
        },
        {
            type: "text",
            name: "subTask",
            label: t('Sub Task'),
            placeholder: t("Sub Task Name"),
            required: true,
            value: formik.values.subTask,
        },
        {
            type: "select",
            name: "status",
            label: t('Status'),
            required: true,
            value: formik.values.status,
            list: [
                { value: "pending", display: "Pending" },
                { value: "progress", display: "Progress" },
                { value: "completed", display: "Completed" },


            ]
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
            name: "assignedTo",
            label: t('Assign to'),
            value: formik.values.assignedTo,
            required: true,
            list: employees_list?.map((item) => ({
                value: item?._id,
                display: item.firstName + " " + item.lastName,
            })),
            multiple:false
        },
        {
            type: "textarea",
            name: "description",
            label: t('Description'), 
            containerClass:"col-span-2",
            required: true,
            value: formik.values.description,
        }, 
    ]
    return (
        <BaseForm title={object?"Edit Task":"Add New Task"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} >
          
        </BaseForm>
    )
}
 