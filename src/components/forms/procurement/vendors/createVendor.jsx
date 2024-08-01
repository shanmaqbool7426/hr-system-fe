import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateEmployee, UpdateEmployee } from "@/store/actions/employee.actions"
import Toast from "@/util/toast"; 
import BaseForm from '../../BaseForm'; 

export default function CreateVendorForm({ onClose, object }) {
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
            name: "name",
            label: t('Name'),
            placeholder: t('Name'),
            value: formik.values.name,
        },
        {
            type: "text",
            name: "contact",
            label: t('Contact'),
            placeholder: t('Contact'),
            value: formik.values.contact,
        },
        {
            type: "select",
            name: "status",
            label: t('Status'),
            placeholder: t('Status'),
            list:[{display:"Active",value:"Active"},{display:"Inactive",value:"Inactive"}],
            value: formik.values.status,
        },
    ]
 
    return (
        <BaseForm title={object?'Edit Vendor':"Add Vendor"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} >
            
        </BaseForm>
    )
}