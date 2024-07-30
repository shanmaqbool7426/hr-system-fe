import BaseForm from "../BaseForm";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateEmployee, UpdateEmployee } from "@/store/actions/employee.actions";
import Toast from "@/util/toast";
import { useRouter } from "next/router";
export default function CreateRejectionForm({ onClose, object }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const router =useRouter()
    const { is_loading } = useSelector((state) => state.employee);
    const formik = useFormik({
        initialValues: {
            rejectionTitle: "",
            description: "",
        },
        validationSchema: Yup.object().shape({
            rejectionTitle: Yup.string().required(t('Rejection Title Required')),
            description: Yup.string().required(t('description Required')),
        }),
        onSubmit: async (values) => {
            Toast.success(object ? t("Employee updated successfully") : t("Employee Inacive successfully"));
            onClose();
            router.push('/employees/inactive')
        }
    });

    const onCompleted = () => {
        Toast.success(object ? t("Employee updated successfully") : t("Employee created successfully"));
        onClose();
    };

    const formElements = [
        {
            type: "text",
            name: "rejectionTitle",
            label: t('Rejection Title'),
            placeholder: t("Enter Rejection Title"),
            required: true, value: formik.values.rejectionTitle,
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
        <BaseForm title={object ? "Edit Rejection Reason" : "Rejection Reason"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} />
    );
}
