import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';

export default function CreateShiftPlanForm({ onClose, object }) {
    const { t } = useTranslation()
    const { t: tv } = useTranslation("validation")

    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            Shift: object?.Shift || "",
            Employee: object?.Employee || "",
        },
        validationSchema: Yup.object().shape({
            Shift: Yup.string().required(tv('Shift is required')),
            Employee: Yup.string().required(tv('Employee is required'))

        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateCustomfield(object._id, values, onCompleted)) : dispatch(CreateCustomfield(values, onCompleted));
        }
    });
    const onCompleted = () => {
        Toast.success(object ? tv(`New shift added successfully`) : tv(`New shift created successfully`));
        onClose();
    };
    const formElements = [
        {
            type: "select",
            name: "Shift",
            label: t('Shift'),
            placeholder: t("Select Shift"),
            list: ["Yes", "No"],
            required: true,
            value: formik.values.name,
            containerClass: "col-span-2"
        },
        {
            type: "select",
            name: "Employee",
            label: t('Employee'),
            placeholder: t("Select Employee"),
            list: ["Yes", "No"],
            required: true,
            value: formik.values.name,
            containerClass: "col-span-2"
        },
        {
            type: "select",
            name: "Employee",
            label: t('Apply On All Working Days In This Week'),
            placeholder: t("Select Once"),
            list: ["Yes", "No"],
            required: true,
            value: formik.values.name,
            containerClass: "col-span-2"
        },
    ]
    return (
        <BaseForm title={object ? t(`Edit New Shift`) : t(`Add Shift`)} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
}

