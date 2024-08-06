import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateEmployee, UpdateEmployee } from "@/store/actions/employee.actions"
import Toast from "@/util/toast";
import BaseForm from '../../BaseForm';

export default function CreateRepairingRequestForm({ onClose, object }) {
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
            name: "assetId",
            label: t('Asset Id'),
            placeholder: t('Asset Id'),
            value: formik.values.assetId,
            required: true,
        },
        {
            type: "text",
            name: "assetName",
            label: t('Asset Name'),
            placeholder: t('Asset Name'),
            value: formik.values.assetName,
            required: true,
        },
        {
            type: "text",
            name: "issue",
            label: t('Issue'),
            placeholder: t('Issue'),
            value: formik.values.issue,
            required: true,
        },
        {
            type: "date",
            name: "reportedDate",
            label: t('Reported Date'),
            placeholder: t('Reported Date'),
            value: formik.values.reportedDate,
            required: true,
        },
        {
            type: "select",
            name: "assignTechnician",
            label: t('Assign Technician'),
            placeholder: t('Assign Technician'),
            list: [{ display: "Owner", value: "Owner" }, { display: "Employee", value: "Employee" }],
            required: true,
            value: formik.values.assignTechnician,
        },
        {
            type: "select",
            name: "status",
            label: t('Status'),
            placeholder: t('Status'),
            list: [{ display: "Open", value: "Open" }, { display: "Closed", value: "Closed" }],
            required: true,
            value: formik.values.status,
        },
    ]

    return (
        <BaseForm title={object ? 'Edit Repairing Request' : "Repairing Request"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} >

        </BaseForm>
    )
}