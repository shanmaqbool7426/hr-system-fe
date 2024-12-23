import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Toast from "@/util/toast";
import BaseForm from '../BaseForm';
import { ApproveResignation, RejectResignation } from '@/store/actions/employee-resignation.actions';

export default function ResignationActionForm({ onClose, object, action }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { is_loading } = useSelector((state) => state.employee)

    const formik = useFormik({
        initialValues: {
            remarks: ""
        },
        validationSchema: Yup.object().shape({
            remarks: Yup.string().required(t('Remarks is required')),
        }),
        onSubmit: (values) => {
            if (action === "approve") {
                dispatch(ApproveResignation(object._id, values, () => {
                    Toast.success(t('Resignation request approved successfully'))
                    onClose()
                }))
            } else if (action === "reject") {
                dispatch(RejectResignation(object._id, values, () => {
                    Toast.success(t('Resignation request rejected successfully'))
                    onClose()
                }))
            }
        }
    });

    const formElements = [
        {
            type: "textarea",
            name: 'remarks',
            label: t('Remarks'),
            placeholder: t('Enter remarks'),
            value: formik.values.remarks,
            error: formik.touched.remarks && formik.errors.remarks,
            containerClass: 'col-span-2',
            required: true
        },
    ];


    return (
        <BaseForm
            title={action === "approve" ? t("Approve Resignation Request") : t("Reject Resignation Request")}
            formElements={formElements}
            formik={formik}
            onClose={onClose}
            is_loading={is_loading} />
    );
}
