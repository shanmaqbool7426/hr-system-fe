import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';

export default function AddPenaltyForm({ onClose, object }) {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
            icon: object?.icon || "",
            prefix: object?.prefix || "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('formik.nameRequired')),
        }),
        onSubmit: async (values) => {

            return object ? dispatch(UpdateCustomfield(object._id, values, onCompleted)) : dispatch(CreateCustomfield(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`${type} updated successfully`) : t(`${type} created successfully`))
        onClose()
    }
    const formElements = [{
        type: "text",
        name: "ShiftName",
        label: t('Rule Name'),
        placeholder: t("Rule Name"),
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Employee Group'),
        list: ["Yes", "No"],
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Attendance Flag'),
        list: ["Yes", "No"],
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Action'),
        list: ["Delete", "Edit"],
        required: true,
        value: formik.values.name,
    },
    {
        type: "text",
        name: "ShiftName",
        label: t('Flag Count'),
        placeholder: t("Flag Count"),
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Conditional Exemption'),
        list: ["None", "Yes"],
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Effect Quantity'),
        list: ["9", "7"],
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Effect Frequency'),
        list: ["once", "twice"],
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Employee Exempted'),
        list: ["Jhon Carry, Wick Jerry", "Jhon Carry, Wick Jerry"],
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Employee Status'),
        list: ["All", "No"],
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Gender'),
        list: ["Male", "Fmale"],
        required: true,
        value: formik.values.name,
    },
    {
        type: "text",
        name: "ShiftName",
        label: t('Exempted Count'),
        placeholder: t("Exempted Count"),
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Exempted Penalty Duration'),
        list: ["Full day", "Half day"],
        required: true,
        value: formik.values.name,
    },
    {
        type: "select",
        name: "ShiftName",
        label: t('Apply Penalty On Missing Attendance'),
        list: ["No", "Yes"],
        required: true,
        value: formik.values.name,
    },
    ]
    return (
        <BaseForm title={object ? `Edit New Rule` : `Add Rule`} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />

    )
} 