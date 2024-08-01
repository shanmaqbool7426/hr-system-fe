import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import Toast from "@/util/toast";
import { FetchEmployees } from '@/store/actions/employee.actions';
import BaseForm from '../../BaseForm';
import { useEffect } from 'react';
import FileUpload from '@/components/elements/FileUpload';
// import { ChangeDepartment } from '@/store/actions/employee-change-request.actions';

export default function ChangeDepartementForm({ onClose, object }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { customfield_list } = useSelector(state => state.customfield)
    const { employees_list } = useSelector((state) => state.employee)
    useEffect(() => {
        if (employees_list.length === 0)
            dispatch(FetchEmployees())
    }, [dispatch])
    const { is_loading } = useSelector((state) => state.employee);

    const formik = useFormik({
        initialValues: {
            employee: "",
            currentDepartment: "",
            newDepartment: "",
            effectiveDate: "",
            reasonOfDepartmentChange: "",
            detail: "",
            fileDepartment: "",
        },
        validationSchema: Yup.object().shape({
            employee: Yup.string().required(t('formik.employeeRequired')),
            currentDepartment: Yup.string().required(t('formik.currentDepartmentRequired')),
            newDepartment: Yup.string().required(t('formik.newDepartmentRequired')),
            effectiveDate: Yup.string().required(t('formik.effectiveDateRequired')),
            reasonOfDepartmentChange: Yup.string().required(t('formik.reasonOfDepartmentChangeRequired')),
            detail: Yup.string(),
            fileDepartment: Yup.string(),
        }),
        onSubmit: async (values) => {
            if (values.attachment) {
                await uploader(values.attachment, (url) => {
                    values.attachment = url
                    // dispatch(ChangeDepartment(values, () => {
                    //     formik.resetForm()
                    //     Toast.success(t("Department change request saved successfully"))
                    // }))
                })
            } else {
                // dispatch(ChangeDepartment(values, () => {
                //     formik.resetForm()
                //     Toast.success(t("Request not proceed"))
                // }))
            }
        }
    });
    const onCompleted = () => {
        Toast.success(object ? t("Employee updated successfully") : t("Employee created successfully"));
        onClose();
    };

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
            name: "cnic",
            label: t('Current Department'),
            placeholder: t("Enter Current Department"),
        },
        {
            type: "select",
            name: 'newDepartment',
            label: 'New Department',
            value: formik.values.newDepartment,
            error: formik.touched.newDepartment && formik.errors.newDepartment,
            list: [
                { display: 'IT', value: 'General' },
                { display: 'Finance', value: 'Finance' },
                { display: 'Security', value: 'Security' },
            ],
            required: true
        },
        {
            type: "date",
            name: 'effectiveDate',
            label: 'Effective Date',
            value: formik.values.effectiveDate,
            error: formik.touched.effectiveDate && formik.errors.effectiveDate,
            required: true
        },
        {
            type: "select",
            name: 'reasonOfDepartmentChange',
            label: 'Reason Of Department Change',
            value: formik.values.reasonOfDepartmentChange,
            error: formik.touched.reasonOfDepartmentChange && formik.errors.reasonOfDepartmentChange,
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
            required: true
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
