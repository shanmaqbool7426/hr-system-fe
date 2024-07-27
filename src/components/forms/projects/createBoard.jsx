import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateTaskBoard ,UpdateTaskBoard} from '@/store/actions/taskboard.actions';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FetchEmployees } from '@/store/actions/employee.actions';


export default function CreateBoardForm({ title, onClose, type, object, additionFields }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const {is_loading} = useSelector(state=> state.taskboard)
    const { employees_list } = useSelector((state) => state.employee);

    useEffect(() => {
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
            sprintNumber: object?.sprintNumber || "",
            dueDate: object?.dueDate || "",
            leads: additionFields?.leads?.reduce((acc, item) => {
                acc.push(item._id);
                return acc;
              }, []) || [],
            members: additionFields?.members?.reduce((acc, item) => {
                acc.push(item._id);
                return acc;
              }, []) || [],
            project: additionFields?._id || "",
           
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('Project name is required')),
            sprintNumber: Yup.string().required(t('Sprint Number is required')),
            dueDate: Yup.string().required(t('Due Date is required')),
            leads: Yup.array().required(t('Project leader is required')),
            members: Yup.array().required(t('Team is required')),
        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateTaskBoard(object._id, values, onCompleted))
            : dispatch(CreateTaskBoard(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`${type} updated successfully`) : t(`${type} created successfully`))
        onClose()
    }
    const formElements = [
        {
            type: "text",
            name:"name",
            label: t('Task Board Name'),
            placeholder: t("Task Board Name"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "text",
            name: "sprintNumber",
            label: t('Sprint'),
            placeholder: t("1"),
            required: true,
            value: formik.values.sprintNumber,
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
            name: "leads",
            label: t('Add Project Leader'),
            required: true,
            placeholder: t("Search Leader"),
            value: formik.values.leads,
            list: employees_list?.map((item) => ({
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
            list: employees_list?.map((item) => ({
                value: item?._id,
                display: item.firstName + " " + item.lastName,
            })),
            multiple: true,
        },
    ]
    return (
        <BaseForm   title={object ? "Edit Task Board" : title}
        formElements={formElements}
        formik={formik}
        onClose={onClose}
        is_loading={is_loading} >
        </BaseForm>
    )
}

CreateBoardForm.defaultProps = {
    additionFields: []
}