import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateEmployee, UpdateEmployee } from "@/store/actions/employee.actions"
import Toast from "@/util/toast";
import { CheckBox } from "@/components/elements";
import BaseForm from '../../BaseForm';

export default function CreateAnnouncementForm({ onClose, object }) {
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
            label: t('Announcement Title'),
            placeholder: t('Announcement Title'),
            value: formik.values.name,
        },
        {
            type: "text",
            name: "description",
            label: t('Description'),
            placeholder: t('Description'),
            value: formik.values.name,
        },
    ]
 
    return (
        <BaseForm title={object?'Edit Announcement':"Add Announcement"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} >
            <div className="flex flex-col gap-2 w-full mt-4">
              
            </div>
        </BaseForm>
    )
}