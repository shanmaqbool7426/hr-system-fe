import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import Toast from "@/util/toast";
import { FetchEmployees } from '@/store/actions/employee.actions';
import BaseForm from '../../BaseForm';
import { useEffect, useState } from 'react';
import FileUpload from '@/components/elements/FileUpload';
import { uploader } from '@/util/helpers';
import { ChangeDepartment, FetchChangeRequests } from '@/store/actions/employee-change-request.actions';

export default function ChangeDepartementForm({ onClose, object }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { is_loading } = useSelector((state) => state.employee);
    const { departments_list } = useSelector(state => state.department);
    const { employees_list } = useSelector((state) => state.employee)

    const formik = useFormik({
        initialValues: {
            employee: "",
            currentValue: null,
            department: "",
            effectiveDate: "",
            reason: "",
            detail: "",
            attachment: null,
        },
        validationSchema: Yup.object().shape({
            employee: Yup.string().required(t('Employee is required')),
            department: Yup.string().required(t('Department is required')),
            effectiveDate: Yup.string().required(t('Effective date is required')),
            reason: Yup.string().required(t('Reason is required')),
        }),
        onSubmit: async (values) => {
            if (values.attachment) {
                await uploader(values.attachment, (url) => {
                    values.attachment = url
                    dispatch(ChangeDepartment(values, () => {
                        formik.resetForm()
                        onCompleted();
                    }))
                })
            } else {
                dispatch(ChangeDepartment(values, () => {
                    formik.resetForm()
                    onCompleted();
                }))
            }
        }
    });
    const onCompleted = () => {
        Toast.success(object ? t("Department Change Request Updated Successfully") : t("Department Change Request Created Successfully"));
        dispatch(FetchChangeRequests())
        onClose();
    };
    useEffect(() => {
        const selectedEmployee = employees_list.find(emp => emp._id === formik.values.employee);
        formik.setFieldValue('currentValue', selectedEmployee?.department?.name)
    }, [formik.values.employee, employees_list, departments_list]);

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
            label: t('Current Department'),
            placeholder: t("Enter Current Department"),
            value: formik.values.currentValue,
            readOnly: true,
            className: "cursor-not-allowed"
        },
        {
            type: "select",
            name: 'department',
            label: 'New Department',
            value: formik.values.department,
            error: formik.touched.department && formik.errors.department,
            list: departments_list?.map((item) => ({
                value: item?._id,
                display: item.name,
            })),
            required: true
        },
        {
            type: "date",
            name: 'effectiveDate',
            label: 'Effective Date',
            minDate: new Date,
            value: formik.values.effectiveDate,
            error: formik.touched.effectiveDate && formik.errors.effectiveDate,
            required: true
        },
        {
            type: "select",
            name: 'reason',
            label: 'Reason Of Department Change',
            value: formik.values.reason,
            error: formik.touched.reason && formik.errors.reason,
            list: [
                { display: 'Promotion', value: 'promotion' },
                { display: 'Correction', value: 'correction' },
                { display: 'Other', value: 'other' },
            ],
            required: true
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
        <BaseForm title={object ? "Change Department" : "Change Department"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} >
            {/* <div className='col-span-2'> */}
            <FileUpload
                id={'attachment'}
                name={'attachment'}
                label={t('Upload Attachment')}
                accept={`image/*,application/pdf,.doc,.docx`}
                onChange={(file) => {
                    formik.setFieldValue('attachment', file)
                }}
            />
            {/* </div> */}
        </BaseForm>
    );
}
