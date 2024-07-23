import BaseForm from "../BaseForm";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateEmployee, UpdateEmployee } from "@/store/actions/employee.actions";
import Toast from "@/util/toast";

export default function ReHireForm({ onClose, object }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { is_loading } = useSelector((state) => state.employee);
    const formik = useFormik({
        initialValues: {
            employeeid: "",
            cnic: "",
        },
        validationSchema: Yup.object().shape({
            employeeid: Yup.string().required(t('Employee id Required')),
            cnic: Yup.string().required(t('CNIC Required')),
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
            name: "employeeid",
            label: t('Employee id'),
            placeholder: t("Enter employee id"),
            required: true, value: formik.values.employeeid,
        },
        {
            type: "text",
            name: "cnic",
            label: t('CNIC'),
            placeholder: t("Enter cnic"),
            required: true, value: formik.values.cnic,
        },
    ];


    return (
        <BaseForm title={object ? "Re-Hire Empolyee" : "Re-Hire Empolyee"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} />
    );
}
