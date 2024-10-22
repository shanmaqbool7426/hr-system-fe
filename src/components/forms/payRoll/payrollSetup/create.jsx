import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import Toast from '@/util/toast';
import { useDispatch, useSelector } from 'react-redux';
import { CreateProject, UpdateProject } from "@/store/actions/project.actions"; 
import BaseForm from '../../BaseForm'; 

export default function PayrollSetupForm({ onClose, object, }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading } = useSelector(state => state.project) 
    const formik = useFormik({
        initialValues: {
            title: object?.title || "", 
            copyPayroll: object?.copyPayroll || "", 
            title: object?.title || "", 
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required(t('Title is required')), 
            copyPayroll: Yup.string().required(t('copyPayroll is required')), 
            copyPayroll: Yup.string().required(t('copyPayroll is required')), 

        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateProject(object._id, values, onCompleted)) : dispatch(CreateProject(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t("Project updated successfully") : t("Project created successfully"))
        onClose()
    } 
    const formElements = [
        
        {
            type: "text",
            name: "title",
            label: t("Payroll Setup Title"),
            placeholder: t("CTO"),
            value: formik.values.title,
            required: true, 
        }, 
        {
            type: "select",
            name: "copyPayroll",
            label: t("Do you want to copy from another payroll setup?"),
            placeholder: t("Yes"),
            list:[{display:"Yes",value:"Yes"},{display:"No", value:"No"}],
            value: formik.values.copyPayroll,
            required: true, 
        },
        {
            type: formik.values.copyPayroll=='Yes'?"select":"hidden",
            name: "payrollSetupTitle",
            label: t("Payroll Setup Title"),
            placeholder: t("General"),
            list:[{display:"General",value:"General"}],
            value: formik.values.payrollSetupTitle,
            required: true, 
        },
    ] 
    return (
        <BaseForm title={"Add Payroll Setup"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading}>
        </BaseForm>
    )
}