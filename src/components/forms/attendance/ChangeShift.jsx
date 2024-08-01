import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';

export default function ChangeShiftForm({ onClose, object }) {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            EmployeeName: object?.EmployeeName || "",
            lineManager: object?.lineManager || "",
            currentShift: object?.currentShift || "",
            requestedShift: object?.requestedShift || "",
            effectedDatefrom: object?.effectedDatefrom || "",
            onward: object?.onward || false,
            tillDate: object?.tillDate || "",
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
    const formElements = [
        {
            type: "text",
            name: "EmployeeName",
            label: t('Employee Name'),
            placeholder: t("Employee Name"),
            required: true,
            value: formik.values.EmployeeName,
        },
        {
            type: "text",
            name: "lineManager",
            label: t('Line Manager'),
            placeholder: t("Line Manager"),
            value: formik.values.lineManager,
            disabled: true,
            className: "cursor-not-allowed"
        },
        {
            type: "text",
            name: "currentShift",
            label: t('Current Shift'),
            placeholder: t("9:00 AM to 6:00 PM"),
            value: formik.values.currentShift,
            disabled: true,
            className: "cursor-not-allowed"
        },
        {
            type: "text",
            name: "requestedShift",
            label: t('Requested Shift'),
            placeholder: t("10:00 AM to 7:00 PM"),
            required: true,
            value: formik.values.requestedShift,
        },
        {
            type: "date",
            name: "effectedDatefrom",
            label: t('Effected Date from'),
            required: true,
            value: formik.values.effectedDatefrom,
        },
        {
            type: "switch",
            name: "onward",
            label: t('Onward'),
            required: true,
            id: "onward",
            value: formik.values.onward,
        },
        {
            type: formik.values.onward ? "hidden" : 'date',
            name: "tillDate",
            label: t('Till Date'),
            required: true,
            value: formik.values.tillDate,
        },
    ]
    return (
        <BaseForm title={object ? `Change Shift` : `Change Shift`} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
}
