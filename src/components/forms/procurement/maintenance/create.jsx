import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateEmployee, UpdateEmployee } from "@/store/actions/employee.actions"
import Toast from "@/util/toast"; 
import BaseForm from '../../BaseForm'; 

export default function CreateMaintenanceForm({ onClose, object }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading } = useSelector((state) => state.employee)
    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
            description: object?.description || ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('formik.nameRequired')),
            description: Yup.string().required(t('formik.nameRequired')),
        }),
        onSubmit: async (values) => {
            return employee ? dispatch(UpdateEmployee(employee._id, values, onCompleted)) : dispatch(CreateEmployee(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(employee ? t("Employee updated successfully") : t("Employee created successfully"))
        onClose()
    }
    const formElements = [
        {
            type: "text",
            name: "issueTitle",
            label: t('Issue Title'),
            placeholder: t('Issue Title'),
            value: formik.values.issueTitle,
            required:true,
        },
        {
            type: "text",
            required:true,
            name: "shceduleType",
            label: t('Shcedule Type'),
            placeholder: t('Shcedule Type'),
            value: formik.values.shceduleType,
        },
        {
            type: "text",
            required:true,
            name: "nextSchedule",
            label: t('Next Schedule'),
            placeholder: t('Next Schedule'),
            value: formik.values.nextSchedule,
        },
        {
            type: "text",
            required:true,
            name: "maintenanceState",
            label: t('Maintenance State'),
            placeholder: t('Maintenance State'),
            value: formik.values.maintenanceState,
        },
        {
            type: "time",
            required:true,
            name: "createdTime",
            label: t('Created Time'),
            placeholder: t('Created Time'),
            value: formik.values.createdTime,
        }, 
    ]
 
    return (
        <BaseForm title={object?'Edit Request Maintenance':"Request Maintenance"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} >
            
        </BaseForm>
    )
}