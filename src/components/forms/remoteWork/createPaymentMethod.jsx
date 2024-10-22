import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'next-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';

export default function CreatePaymentMethodForm({ onClose, object }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: object?.employee?._id || "",
            email: object?.employee?._id || "",
            company: object?.employee?._id || "",
            employee: object?.employee?._id || "",
            attendanceDate: object?.attendanceDate || "",
            flagType: object?.flagType || "",
            exemptionType: object?.exemptionType || "",
            reason: object?.exemptionType || "",
        },
        validationSchema: Yup.object().shape({
            employee: Yup.string().required(t('Employee is required')),
            attendanceDate: Yup.string().required(t('Atendance date is required')),
            flagType: Yup.string().required(t('Flag type is required')),
            exemptionType: Yup.string().required(t('Exemption type is required')),
            reason: Yup.string().required(t('Reason is required')),
        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateCustomfield(object._id, values, onCompleted)) : dispatch(CreateCustomfield(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`Exemption request updated successfully`) : t(`Exemption request created successfully`))
        onClose()
    }
    const formElements = [
        {
            type: "text",
            name: "name",
            label: t('Name'),
            required: true,
            placeholder: "Enter name",
            value: formik.values.name,
        },
        {
            type: "text",
            name: "email",
            label: t('Email'),
            placeholder: "Enter email",
            required: true,
            value: formik.values.email,
        },
        {
            type: "text",
            name: "company",
            label: t('Company'),
            placeholder: "Enter company",
            required: true,
            value: formik.values.company,
        },
        {
            type: "text",
            name: "company",
            label: t('Company Registration Number'),
            placeholder: "Enter Company Registration Number",
            required: true,
            value: formik.values.company,
        },
        {
            type: "text",
            name: "phoneNumber",
            label: t('Phone Number'),
            placeholder: "Enter Phone Number",
            required: true,
            value: formik.values.company,
        },
        {
            type: "text",
            name: "currency",
            label: t('Currency'),
            placeholder: "Enter Currency",
            required: true,
            value: formik.values.company,
        },
        {
            type: "text",
            name: "country",
            label: t('Country'),
            placeholder: "Enter Country",
            required: true,
            value: formik.values.company,
        },
        {
            type: "text",
            name: "city",
            label: t('City'),
            placeholder: "Enter City",
            required: true,
            value: formik.values.company,
        },
        {
            type: "text",
            name: "state",
            label: t('State'),
            placeholder: "Enter State",
            required: true,
            value: formik.values.company,
        },
        {
            type: "text",
            name: "postalCode",
            label: t('ZIP/Postal code'),
            placeholder: "Enter ZIP/Postal code",
            required: true,
            value: formik.values.company,
        },
        {
            type: "text",
            name: "streetAddress",
            label: t('Street Address'),
            placeholder: "Enter Street Address",
            required: true,
            value: formik.values.company,
        },
    ]
    return (
        <BaseForm title={object ? t(`Edit payment method`) : t(`Add payment method`)} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
}

