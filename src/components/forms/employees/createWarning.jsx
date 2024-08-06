import BaseForm from "../BaseForm";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import Toast from "@/util/toast";
import { CreateWarning, UpdateWarning } from "@/store/actions/employee-warning.actions";

export default function CreateWarningForm({ onClose, object }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { is_loading , employee_details} = useSelector((state) => state.employee);
    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
            description: object?.description || "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('Warning Title Required')),
            description: Yup.string().required(t('description Required')),
        }),
        onSubmit: async (values) => {
            const valuesToSubmit = {
                ...values,
                user: employee_details._id,
            };
              return object
                ? dispatch(UpdateWarning(object._id, values , onCompleted ))
                : dispatch(CreateWarning(valuesToSubmit , onCompleted ))
        }
    });

    const onCompleted = () => {
        Toast.success(object ? t("Employee updated successfully") : t("Warning created successfully"));
        onClose();
    };

    const formElements = [
        {
            type: "text",
            name: "name",
            label: t('Warning Title'),
            placeholder: t("Enter Warning Title"),
            required: true, value: formik.values.name,
        },
        {
            type: "textarea",
            containerClass:"col-span-2",
            name: "description",
            label: t('Description'),
            placeholder: t("Enter description"),
            required: true, value: formik.values.description,
        },
    ];


    return (
        <BaseForm title={object ? "Issue Warning" : "Issue Warning"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} />
    );
}
