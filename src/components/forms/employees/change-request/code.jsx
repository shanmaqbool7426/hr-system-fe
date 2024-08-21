import * as Yup from 'yup';
import { useFormik } from 'formik';
import Storage from "@/util/storage"
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import Toast from "@/util/toast";
import { FetchEmployees } from '@/store/actions/employee.actions';
import BaseForm from '../../BaseForm';
import { useEffect, useState } from 'react';
import FileUpload from '@/components/elements/FileUpload';
import { ChangeEmployeeCode, FetchChangeRequests } from '@/store/actions/employee-change-request.actions';
import { setLoading } from '@/store/slices/employee.slice';

export default function ChangeEmployeeCodeForm({ onClose, object }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { employees_list } = useSelector((state) => state.employee)
    const { is_loading } = useSelector((state) => state.employee);
    const { auth_user } = useSelector(state => state.auth);

    const formik = useFormik({
        initialValues: {
            employee: "",
            currentValue: "",
            employeeCode: "",
            effectiveDate: "",
            reason: "",
            detail: "",
            attachment: null,
        },
        validationSchema: Yup.object().shape({
            employee: Yup.string().required(t('Employee is required')),
            employeeCode: Yup.string().required(t('Employee code is required')),
            effectiveDate: Yup.string().required(t('Effective date is required')),
            reason: Yup.string().required(t('Reason is required')),
        }),
        onSubmit: async (values) => {
            dispatch(setLoading(true))
            if (values.attachment) {
                const { url } = await Storage.upload(values.attachment, auth_user.company._id)
                values.attachment = url
            }
            dispatch(ChangeEmployeeCode(values, () => {
                onCompleted();
            }))
        }
    });
    const onCompleted = () => {
        Toast.success(t("Change employee code request created successfully"));
        onClose();
    };
    useEffect(() => {
        const selectedEmployee = employees_list.find(emp => emp._id === formik.values.employee);
        formik.setFieldValue('currentValue', selectedEmployee?.employeeCode)
    }, [formik.values.employee, employees_list]);

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
            type: "text",
            label: t('Current Code'),
            placeholder: t("Current Employee Code"),
            value: formik.values.currentValue,
            readOnly: true,
            className: "cursor-not-allowed"
        },
        {
            type: "text",
            name: 'employeeCode',
            label: 'New Employee Code',
            value: formik.values.employeeCode,
            error: formik.touched.employeeCode && formik.errors.employeeCode,
            required: true
        },
        {
            type: "date",
            name: 'effectiveDate',
            label: 'Effective Date',
            value: formik.values.effectiveDate,
            error: formik.touched.effectiveDate && formik.errors.effectiveDate,
            minDate: new Date,
            required: true
        },
        {
            type: "select",
            name: 'reason',
            label: 'Reason Of Employee Code Change',
            value: formik.values.reason,
            error: formik.touched.reason && formik.errors.reason,
            list: [
                { display: 'Promotion', value: 'promotion' },
                { display: 'Correction', value: 'correction' },
                { display: 'Other', value: 'other' },
            ],
        },
        {
            type: "textarea",
            name: 'detail',
            label: 'Details',
            value: formik.values.detail,
            error: formik.touched.detail && formik.errors.detail,
            containerClass: 'col-span-2',
        },
    ];


    return (
        <BaseForm title={t("Change Employee Code")} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} >
            <FileUpload
                id={'attachment'}
                name={'attachment'}
                label={t('Upload Attachment')}
                accept={`image/*,application/pdf,.doc,.docx`}
                onChange={(file) => {
                    formik.setFieldValue('attachment', file)
                }}
            />
        </BaseForm>
    );
}
