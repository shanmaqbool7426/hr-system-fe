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
   
    const [filters, setFilters] = useState({
        search: "",
        project: null,
        department: null,
        status: null,
    })

    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
            status: object?.status || "",
            description: object?.description || "", 
            dueDate: object?.dueDate || "",
            requiredTime: object?.requiredTime || "",
            priority: object?.priority || "",
            leader: object?.leader?.reduce((acc, item) => {
                acc.push(item._id);
                return acc;
            }, []) || "",
            assignedTo: object?.assignedTo?.reduce((acc, item) => {
                acc.push(item._id);
                return acc;
            }, []) || "",
            board: additionFields?._id || "",
            project: additionFields?.project?._id || "",
            parent:object?.parent || "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('Task name is required')),
            status: Yup.string().required(t('Status is required')),
            dueDate: Yup.string().required(t('Task Due date is required')),
            assignedTo: Yup.string().required(t('Members are required')),
            leader: Yup.string().required(t('Leader is required')),
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
    const filteredLeaderList = employees_list.filter(employee => !formik.values.assignedTo.includes(employee._id));
    const filteredMemberList = employees_list.filter(employee => !formik.values.leader.includes(employee._id));

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
            multiple:false
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
            name: "leader",
            label: t('Leader'),
            value: formik.values.leader,
            required: true,
            list: filteredLeaderList?.map((item) => ({
                value: item?._id,
                display: item.firstName + " " + item.lastName,
            })),
            multiple:false
        },
        {
            type: "select",
            name: "assignedTo",
            label: t('Assign to'),
            value: formik.values.assignedTo,
            required: true,
            list: filteredMemberList?.map((item) => ({
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
 