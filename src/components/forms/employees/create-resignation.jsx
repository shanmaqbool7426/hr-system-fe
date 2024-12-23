import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Toast from "@/util/toast";
import BaseForm from '../BaseForm';
import { CreateResignation, UpdateResignation } from '@/store/actions/employee-resignation.actions';

export default function CreateResignationForm({ onClose, object }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { is_loading, employees_list } = useSelector((state) => state.employee)

    const formik = useFormik({
        initialValues: {
            employee: object ? object.employee._id : "",
            effectiveDate: object ? object.effectiveDate : "",
            lastWorkingDay: object ? object.lastWorkingDay : "",
            reason: object ? object.reason : ""
        },
        validationSchema: Yup.object().shape({
            employee: Yup.string().required(t('Employee is required')),
            effectiveDate: Yup.string().required(t('Effective Date is required')),
            lastWorkingDay: Yup.string().required(t('Last Working Day is required')),
            reason: Yup.string().required(t('Reason is required')),
        }),
        onSubmit: (values) => {

            object ? dispatch(UpdateResignation(object._id, values, () => {
                Toast.success(t('Resignation request updated successfully'))
                onClose()
            })) : dispatch(CreateResignation(values, () => {
                Toast.success(t('Resignation request created successfully'))
                onClose()
            }))
        }
    });

    const formElements = [
        {
            type: "select",
            name: 'employee',
            label: 'Employee',
            value: formik.values.employee,
            error: formik.touched.employee && formik.errors.employee,
            list: employees_list.map((item) => {
                return { display: item.firstName + " " + item.lastName, value: item._id }
            }),
            required: true
        },
        {
            type: "date",
            name: "effectiveDate",
            label: t('Effective Date'),
            value: formik.values.effectiveDate,
            error: formik.touched.effectiveDate && formik.errors.effectiveDate,
            required: true
        },
        {
            type: "date",
            name: 'lastWorkingDay',
            label: 'Last Working Day',
            value: formik.values.lastWorkingDay,
            error: formik.touched.lastWorkingDay && formik.errors.lastWorkingDay,
            required: true
        },
        {
            type: "textarea",
            name: 'reason',
            label: 'Reason',
            value: formik.values.reason,
            error: formik.touched.reason && formik.errors.reason,
            containerClass: 'col-span-2',
            required: true
        },
    ];


    return (
        <BaseForm
            title={object ? t("Edit Resignation Request") : t("Create Resignation Request")}
            formElements={formElements}
            formik={formik}
            onClose={onClose}
            is_loading={is_loading} />
    );
}
