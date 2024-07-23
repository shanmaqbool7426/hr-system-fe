import BaseForm from "../BaseForm";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateEmployee, UpdateEmployee } from "@/store/actions/employee.actions";
import Toast from "@/util/toast";

export default function CreateWarningForm({ onClose, object }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { is_loading } = useSelector((state) => state.employee);
    const formik = useFormik({
        initialValues: {
            warningTitle: "",
            description: "",
        },
        validationSchema: Yup.object().shape({
            warningTitle: Yup.string().required(t('Warning Title Required')),
            description: Yup.string().required(t('description Required')),
        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateEmployee(employee._id, values, onCompleted)) : dispatch(CreateEmployee(values, onCompleted));
        }
    });

    const onCompleted = () => {
        Toast.success(object ? t("Employee updated successfully") : t("Employee created successfully"));
        onClose();
    };

    const formElements = [
        {
            type: "text",
            name: "warningTitle",
            label: t('Warning Title'),
            placeholder: t("Enter Warning Title"),
            required: true, value: formik.values.warningTitle,
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
