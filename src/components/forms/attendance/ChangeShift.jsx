import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'next-i18next';
import Toast from '@/util/toast';
import { CreateChangeShiftRequest, UpdateChangeShiftRequest } from "@/store/actions/change-shift-request.actions"
import { useDispatch, useSelector } from 'react-redux';

export default function ChangeShiftForm({ onClose, object }) {
    const { t } = useTranslation()
    const { employees_list } = useSelector(state => state.employee)
    const { shift_list } = useSelector(state => state.shift)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            employee: object?.employee || null,
            previousShift: object?.previousShift || "",
            requestedShift: object?.requestedShift || "",
            effectiveDate: object?.effectiveDate || "",
            validTill: object?.validTill || null,
        },
        validationSchema: Yup.object().shape({
            employee: Yup.string().required(t('Employee is required')),
            requestedShift: Yup.string().required(t('Requested Shift is required')),
            effectiveDate: Yup.date().required(t('Effective Date is required')),
        }),
        onSubmit: async (values) => {
            delete values.previousShift
            return object ? dispatch(UpdateChangeShiftRequest(object._id, values, onCompleted)) : dispatch(CreateChangeShiftRequest(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`Request updated successfully`) : t(`Request created successfully`))
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
            list: employees_list.map(item => ({ display: `${item.firstName} ${item.lastName}`, value: item._id })),
            onChange: async (value) => {
                const employee = employees_list.find(item => item._id === value)
                await formik.setFieldValue("employee", value)
                await formik.setFieldTouched("employee", true)
                formik.setFieldValue("previousShift", employee?.shiftplan?.name || t("None"))
            }
        },
        {
            type: "text",
            name: "previousShift",
            label: t('Current Shift'),
            placeholder: t("Current Shift"),
            value: formik.values.previousShift,
            readOnly: true,
            className: "cursor-not-allowed"
        },
        {
            type: "select",
            name: "requestedShift",
            label: t('Requested Shift'),
            placeholder: t("Requested Shift"),
            required: true,
            value: formik.values.requestedShift,
            list: shift_list.map(item => ({ display: item.name, value: item._id })),
        },
        {
            type: "date",
            name: "effectiveDate",
            label: t('Effective Date'),
            required: true,
            minDate: new Date(),
            value: formik.values.effectiveDate,
        },
        {
            type: "date",
            name: "validTill",
            label: t('Valid Till'),
            required: false,
            value: formik.values.validTill,
        },
    ]
    return (
        <BaseForm title={object ? t("Edit Change Shift Request") : t("Change Shift Request")} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
}
