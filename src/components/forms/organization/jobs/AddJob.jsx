import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import BaseForm from '../../BaseForm';
import { list } from 'postcss';

export default function AddJob({  onClose, type, object, additionFields }) {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
            type,
            icon: object?.icon || "",
            prefix: object?.prefix || "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('formik.nameRequired')),
            icon: additionFields.length > 0 ? Yup.string().required(t('formik.nameRequired')) : Yup.string().optional(),
            prefix: additionFields.length > 0 ? Yup.string().required(t('formik.nameRequired')) : Yup.string().optional(),
        }),
        onSubmit: async (values) => {

            return object ? dispatch(UpdateCustomfield(object._id, values, onCompleted)) : dispatch(CreateCustomfield(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`${type} updated successfully`) : t(`${type} created successfully`))
        onClose()
    }
    const formElements = [
        {
            type: "text",
            name: "JobTitle",
            label: t('Job Title'),
            placeholder: t("Job Title"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "select",
            name: "Department",
            label: t('Department'),
            placeholder: t("Department"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "text",
            name: "JobLocation",
            label: t('Job Location'),
            placeholder: t("Job Location"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "text",
            name: "NoofVacancie",
            label: t('No of Vacancie'),
            placeholder: t("-"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "text",
            name: "Experience",
            label: t('Experience'),
            placeholder: t("Experience"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "text",
            name: "Age",
            label: t('Age'),
            placeholder: t("Age"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "text",
            name: "SalaryFrom",
            label: t('Salary From'),
            placeholder: t("Salary From"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "text",
            name: "SalaryTo",
            label: t('Salary To'),
            placeholder: t("Salary To"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "text",
            name: "FlagCount",
            label: t('Flag Count'),
            placeholder: t("Flag Count"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "select",
            name: "ConditionalExemption",
            label: t('Conditional Exemption'),
            placeholder: t("Conditional Exemption"),
            list:[{value: 'none' ,display: 'none'}],
            required: true,
            value: formik.values.name,
        },
        {
            type: "select",
            name: "JobType",
            label: t('Job Type'),
            placeholder: t("Job Type"),
            list:[{value: 'Full Time' ,display: 'Full Time'},{value: 'Part Time' ,display: 'Part Time'}],
            required: true,
            value: formik.values.name,
        },
        {
            type: "select",
            name: "Status",
            label: t('Status'),
            placeholder: t("Status"),
            list:[{value: 'Open' ,display: 'Open'},{value: 'Closed' ,display: 'Closed'}],
            required: true,
            value: formik.values.name,
        },
        {
            type: "textarea",
            name: "Description",
            label: t('Description'),
            placeholder: t("Type Here"),
            list:[{value: 'Open' ,display: 'Open'},{value: 'Closed' ,display: 'Closed'}],
            containerClass: 'col-span-2',
            required: true,
            value: formik.values.name,
        },
    ]
    return (
        <BaseForm title={object ? `Edit Job` : `Add New Job`} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
}

AddJob.defaultProps = {
    additionFields: []
}