import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { useDispatch, useSelector } from 'react-redux';
import { CreateProject, UpdateProject } from "@/store/actions/project.actions";
import BaseForm from '../../BaseForm';

export default function ProvidentFundForm({ onClose, object, }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading } = useSelector(state => state.project)
    const formik = useFormik({
        initialValues: {
            issueTitle: object?.issueTitle || "",
            priority: object?.priority || "",
            departement: object?.departement || "",
            category: object?.category || "",
            subCategory: object?.subCategory || "",
            assetId: object?.assetId || "",
            description: object?.description || "",

        },
        validationSchema: Yup.object().shape({
            issueTitle: Yup.string().required(t('issueTitle is required')),
            priority: Yup.string().required(t('priority is required')),
            departement: Yup.string().required(t('departement is required')),
            category: Yup.string().required(t('category is required')),
            subCategory: Yup.string().required(t('subCategory is required')),
            assetId: Yup.string().required(t('assetId is required')),
            description: Yup.string().required(t('Description is required')),

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
            type: "select",
            name: "employee",
            label: t('Employee'),
            placeholder: t("Employee"),
            required: true,
            value: formik.values.employee,
            list: [
                { value: "John", display: "John" },
                { value: "Mink", display: "Mink" },
            ]
        },
        {
            type: "select",
            name: "providentFundType",
            label: t('Provident Fund Type'),
            placeholder: t("PF Loan"),
            required: true,
            value: formik.values.providentFundType,
            list: [
                { value: "Fixed Amount", display: "Fixed Amount" },
                { value: "Flexible Amount", display: "Flexible Amount" },
            ]
        },
        {
            type: "text",
            name: "employeeShareAmount",
            label: t("Employee Share Amount"),
            placeholder: "6",
            value: formik.values.employeeShareAmount,
            required: true,
        },
        {
            type: "text",
            name: "organizationShareAmount",
            label: t("Organization Share Amount"),
            placeholder: "6",
            value: formik.values.organizationShareAmount,
            required: true,
        }, 
        {
            type: "textarea",
            name: "description",
            label: t("Description"),
            containerClass: "col-span-2",
            value: formik.values.description,
            required: true,
        },
    ]
    return (
        <BaseForm title={object ? "Edit Provident Fund" : "Add Provident Fund"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} />
    )
}