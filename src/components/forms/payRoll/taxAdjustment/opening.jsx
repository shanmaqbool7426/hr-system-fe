import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { useDispatch, useSelector } from 'react-redux';
import { CreateProject, UpdateProject } from "@/store/actions/project.actions"; 
import BaseForm from '../../BaseForm'; 
export default function TaxOpeningForm({ onClose, object, }) {
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
            d: object?.description || "",

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
    const months = [
        { display: 'January', value: "January" },
        { display: 'February', value: "February" },
        { display: 'March', value: "March" },
        { display: 'April', value: "April" },
        { display: 'May', value: "May" },
        { display: 'June', value: "June" },
        { display: 'July', value: "July" },
        { display: 'August', value: "August" },
        { display: 'September', value: "September" },
        { display: 'October', value: "October" },
        { display: 'November', value: "November" },
        { display: 'December', value: "December" },
    ]
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
            name: "year",
            label: t("Year"),
            value: formik.values.year,
            required: true,
            list: [
                { value: "2024", display: "2024" },
                { value: "2025", display: "2025" },
            ]
        },
        {
            type: "select",
            name: "month",
            label: t("Month"),
            value: formik.values.month,
            required: true,
            list: months
        },
        {
            type: "text",
            name: "amount",
            label: t("Amount"),
            placeholder:"11",
            value: formik.values.amount,
            required: true, 
        },
        {
            type: "textarea",
            name: "description",
            label: t("Description"), 
            containerClass:"col-span-2",
            value: formik.values.description,
            required: true, 
        },
    ] 
    return (
        <BaseForm title={t('Add Opening Tax')} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading}>
        </BaseForm>
    )
}