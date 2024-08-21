import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateEmployee, UpdateEmployee } from "@/store/actions/employee.actions"
import Toast from "@/util/toast";
import BaseForm from '../../BaseForm';
import { useState } from 'react';

export default function CreateAnnouncementForm({ onClose, object }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading } = useSelector((state) => state.employee)
    const [fileName, setFileName] = useState(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            try {
                let fileURL = await Storage.upload(file, auth_user?.company?._id, (url) => {
                    formik.setFieldValue('fileURL', url);
                });
                console.log('fileUrl', fileURL)
            } catch (error) {
                console.error("File upload failed", error);
            }
        } else {
            setFileName('No file chosen');
        }
    };
    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
            description: object?.description || ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('formik.nameRequired')),
            description: Yup.string().required(t('formik.nameRequired')),
        }),
        onSubmit: async (values) => {
            return employee ? dispatch(UpdateEmployee(employee._id, values, onCompleted)) : dispatch(CreateEmployee(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(employee ? t("Employee updated successfully") : t("Employee created successfully"))
        onClose()
    }
    const formElements = [
        {
            type: "text",
            name: "name",
            label: t('Announcement Title'),
            placeholder: t('Work from Home Policy'),
            value: formik.values.name,
            required: true
        },
        {
            type: "select",
            name: "announcementType",
            label: t('Announcement Type'),
            placeholder: t('Announcement Type'),
            list: [{ display: "News", value: "News" }, { display: "Article", value: "Article" }],
            value: formik.values.announcementType,
            required: true,
        },
        {
            type: "date",
            name: "displayStartDate",
            label: t('Display Start Date'),
            value: formik.values.displayStartDate,
            required: true
        },
        {
            type: "date",
            name: "displayEndDate",
            label: t('Display End Date'),
            value: formik.values.displayStartDate,
            required: true
        },
        {
            type: "select",
            name: "status",
            label: t('Employee Status'),
            placeholder: t('Employee Status'),
            list: [{ display: "Permanent", value: "Permanent" }, { display: "Contract", value: "Contract" }],
            value: formik.values.status,
            required: true,
        },
        {
            type: "select",
            name: "gender",
            label: t('Gender'),
            placeholder: t('Gender'),
            list: [{ display: "Male", value: "Male" }, { display: "Female", value: "Female" }, { display: "Other", value: "Other" }],
            value: formik.values.gender,
            required: true,
        },
        {
            type: "select",
            name: "country",
            label: t('Country'),
            placeholder: t('Country'),
            list: [{ display: "Pakistan", value: "Pakistan" }, { display: "India", value: "India" }, { display: "Dubai", value: "Dubai" }],
            value: formik.values.country,
            required: true,
        },
        {
            type: "select",
            name: "Province",
            label: t('Province'),
            placeholder: t('Province'),
            list: [{ display: "Punjab", value: "Punjab" }, { display: "Sindh", value: "Sindh" }, { display: "KPK", value: "KPK" }],
            value: formik.values.Province,
            required: true,
        },
        {
            type: "select",
            name: "City",
            label: t('City'),
            placeholder: t('City'),
            list: [{ display: "Lahore", value: "Lahore" }, { display: "Karachi", value: "Karachi" }],
            value: formik.values.City,
            required: true,
        },
        {
            type: "select",
            name: "Area",
            label: t('Area'),
            placeholder: t('Area'),
            list: [{ display: "Punjab", value: "Punjab" }, { display: "Sindh", value: "Sindh" }, { display: "KPK", value: "KPK" }],
            value: formik.values.Area,
            required: true,
        },
        {
            type: "select",
            name: "Station",
            label: t('Station'),
            placeholder: t('Station'),
            list: [{ display: "Punjab", value: "Punjab" }, { display: "Sindh", value: "Sindh" }, { display: "KPK", value: "KPK" }],
            value: formik.values.Station,
            required: true,
        },
        {
            type: "select",
            name: "Department",
            label: t('Department'),
            placeholder: t('Department'),
            list: [{ display: "HR", value: "HR" }, { display: "Admin", value: "Admin" }],
            value: formik.values.Department,
            required: true,
        },
        {
            type: "select",
            name: "employeeGroup",
            label: t('Employee Group'),
            placeholder: t('Employee Group'),
            list: [{ display: "A", value: "A" }, { display: "B", value: "B" }],
            value: formik.values.employeeGroup,
            required: true,
        },
        {
            type: "select",
            name: "designation",
            label: t('Designation'),
            placeholder: t('Designation'),
            list: [{ display: "CEO", value: "CEO" }, { display: "CTO", value: "CTO" }],
            value: formik.values.designation,
            required: true,
        },
        {
            type: "select",
            name: "exemptedEmployees",
            label: t('Exempted Employees'),
            placeholder: t('Exempted Employees'),
            list: [{ display: "Admin", value: "Admin" }],
            value: formik.values.exemptedEmployees,
            required: true,
        },
        {
            type: "select",
            name: "attachmentOption",
            label: t('Attachment Option'),
            placeholder: t('Attachment Option'),
            list: [{ display: "Pdf", value: "Pdf" }],
            value: formik.values.attachmentOption,
            required: true,
        },
        {
            type: "textarea",
            name: "description",
            label: t('Description'),
            placeholder: t('Description'),
            containerClass: 'col-span-2',
            value: formik.values.description,
            required: true,
        },
    ]

    return (
        <BaseForm title={object ? 'Edit Announcement' : "Add Announcement"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} >
            <div className='col-span-2'>
                <label className='text-sm font-medium mb-1 block text-start'>Upload File</label>
                <div className='rounded-lg flex items-center border border-themeGrayscale300 dark:border-gray-700'>
                    <label htmlFor="upload" className='zt-uploadLabel'>Choose File</label>
                    <input type="file" id="upload" className='hidden' onChange={handleFileChange} />
                    <span className='ps-2 text-sm'>{fileName}</span>
                </div>
            </div>
        </BaseForm>
    )
}