import BaseForm from "../BaseForm"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateEmployee, UpdateEmployee } from "@/store/actions/employee.actions"
import Toast from "@/util/toast";
import { CheckBox } from "@/components/elements";

export default function CreateRoleForm({ onClose, role }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading } = useSelector((state) => state.employee)
    const formik = useFormik({
        initialValues: {
            name: role?.name || "",
            description: role?.description || "",
            rights: role?.rights || {}
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
            label: t('Role name'),
            placeholder: t('Role name'),
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

    const formTitle = role ? t("Update employee role") : t("Create employee roles")

    return (
        <BaseForm title={formTitle} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading}>
            <div className="flex flex-col w-full gap-4 col-span-2">
                <h2 className="text-h4 mb-2 text-left">{t('Rights')}</h2>
                <div>
                    <div><CheckBox size={'sm'} label={t('Projects')} /> </div>
                    <div className="flex py-2 gap-x-6">
                        <CheckBox size={'sm'} label={t("View")} />
                        <CheckBox size={'sm'} label={t("Manage")} />
                    </div>
                </div>
                <div>
                    <div><CheckBox size={'sm'} label={t('Taskboards')} /> </div>
                    <div className="flex py-2 gap-x-6">
                        <CheckBox size={'sm'} label={t("View")} />
                        <CheckBox size={'sm'} label={t("Manage")} />
                    </div>
                </div>
                <div>
                    <div><CheckBox size={'sm'} label={t('Tasks')} /> </div>
                    <div className="flex py-2 gap-x-6">
                        <CheckBox size={'sm'} label={t("View")} />
                        <CheckBox size={'sm'} label={t("Employee")} />
                        <CheckBox size={'sm'} label={t("Manage")} />
                    </div>
                </div>
            </div>
        </BaseForm>
    )
}
