
import BaseForm from "../BaseForm"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateLeavePolicy, UpdateLeavePolicy } from "@/store/actions/leave-policy.actions"
import Toast from "@/util/toast";
import { useState } from "react";

export default function CreateCPLLeaveForm({ onClose, object }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { customfield_list } = useSelector(state => state.customfield)
    const [fileName, setFileName] = useState('No file chosen');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName('No file chosen');
        }
    };
    const formik = useFormik({
        initialValues: {
            employee: object?.employee?._id || "",
            leaveType: object?.leaveType?._id || "",
            leaveDuration: object?.leaveDuration || "",
            dateForm: object?.dateForm || "",
            dateTo: object?.dateTo || "",
            reason: object?.reason || "",
        },
        validationSchema: Yup.object().shape({
            employee: Yup.string().required(t('formik.employeeRequired')),
            leaveType: Yup.string().required(t('formik.leaveTypeRequired')),
            dateForm: Yup.string().required(t('formik.dateFormRequired')),
            dateTo: Yup.string().required(t('formik.dateToRequired')),
            reason: Yup.string().required(t('formik.reasonRequired')),
        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateEmployee(object._id, values, onCompleted)) : dispatch(CreateEmployee(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t("Leave Request updated successfully") : t("Leave Request created successfully"))
        onClose()
    }
    const formElements = [
        {
            type: "select",
            name: "Employee",
            label: t('Employee'),
            placeholder: t("Employee"),
            value: formik.values.employee,
            list: [{ value: "Sick Leave", label: "Sick Leave" }],
            required: true,
        },
        {
            type: "select",
            name: "LeaveType",
            label: t('Leave Type'),
            placeholder: t("Select One"),
            value: formik.values.employee,
            list: [{ value: "Sick Leave", label: "Sick Leave" }],
            required: true,
        },
        {
            type: "select",
            multiple: true,
            name: "Leave Duration",
            label: t('Leave Duration'),
            value: formik.values.employee,
            list: [{ value: "Sick Leave", label: "Sick Leave" }],
            required: true,
        },
        {
            type: "select",
            multiple: true,
            name: "Leave Days",
            label: t('Leave Days'),
            value: formik.values.employee,
            list: [{ value: "Sick Leave", label: "Sick Leave" }],
            required: true,
        },
        {
            type: "date",
            name: "Leave From",
            label: t('Leave From'),
            required: true,
        },
        {
            type: "date",
            name: "Leave To",
            label: t('Leave To'),
            required: true,
        },
        {
            type: "textarea",
            name: "Reason",
            containerClass: 'col-span-2',
            label: t('Reason'),
            required: true,
        },
    ]

    return (
        <BaseForm title={object ? 'Compensatory Leave Request' : "Compensatory Leave Request"} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} >
            <div className="col-span-2">
                <label className='text-sm font-medium mb-4 block text-start'>Upload Attachment</label>
                <div className='rounded-lg flex items-center border border-themeGrayscale300'>
                    <label htmlFor="upload" className='zt-uploadLabel'>Upload Attachment</label>
                    <input type="file" id="upload" className='hidden' onChange={handleFileChange} />
                    <span className='ps-2 text-sm'>{fileName}</span>
                </div>
            </div>
        </BaseForm>
    )
}