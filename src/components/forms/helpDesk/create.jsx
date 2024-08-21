import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import Storage from '@/util/storage';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { useDispatch, useSelector } from 'react-redux';
import { CreateProject, UpdateProject } from "@/store/actions/project.actions";
import { useState } from 'react';

export default function CreatHelpDeskForm({ onClose, object, }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading } = useSelector(state => state.project)
    const { auth_user } = useSelector(state => state.auth);
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
            issueTitle: object?.issueTitle || "",
            priority: object?.priority || "",
            departement: object?.departement || "",
            category: object?.category || "",
            subCategory: object?.subCategory || "",
            assetId: object?.assetId || "",
            description: object?.description || "",

        },
        validationSchema: Yup.object().shape({
            issueTitle: Yup.string().required(t('issueTitle is required')),
            priority: Yup.string().required(t('priority is required')),
            departement: Yup.string().required(t('departement is required')),
            category: Yup.string().required(t('category is required')),
            subCategory: Yup.string().required(t('subCategory is required')),
            assetId: Yup.string().required(t('assetId is required')),
            description: Yup.string().required(t('Description is required')),

        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateProject(object._id, values, onCompleted)) : dispatch(CreateProject(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t("Project updated successfully") : t("Project created successfully"))
        onClose()
    }
    console.log(formik.values);
    const itCategory = [
        { value: "Hardware Issues", display: "Hardware Issues" },
        { value: "Software Problems", display: "Software Problems" },
        { value: "Printer/Scanner Problems", display: "Printer/Scanner Problems" },
        { value: "Email Problems", display: "Email Problems" },
        { value: "Account and Access Issues", display: "Account and Access Issues" },
        { value: "Security Concerns", display: "Security Concerns" },
        { value: "Data Center Issues", display: "Data Center Issues" },
    ]
    const adminCategory = [
        { value: "Facilities Management", display: "Facilities Management" },
        { value: "Office Supllies", display: "Office Supllies" },
        { value: "Health and Safety", display: "Health and Safety" },
    ]
    const HRCategory = [
        { value: "Payslip", display: "Payslip" },
        { value: "Attendance leaves", display: "Attendance leaves" },
        { value: "Genaral Inquiry", display: "Genaral Inquiry" },
    ]
    const AccountsCategory = [
        { value: "Payslip", display: "Payslip" },
        { value: "Attendance leaves", display: "Attendance leaves" },
        { value: "Genaral Inquiry", display: "Genaral Inquiry" },
    ]
    const FacilitiesManagementSubCategory = [
        { value: "House Keeping", display: "House Keeping" },
        { value: "Air Conditioner", display: "Air Conditioner" },
        { value: "Kitchen Issues", display: "Kitchen Issues" },
        { value: "Lighting Issues", display: "Lighting Issues" },
        { value: "Security Concerns", display: "Security Concerns" },
    ]
    const OfficeSuplliesSubCategory = [
        { value: "Stationary Request", display: "Stationary Request" },
        { value: "Furtinure Issue", display: "Furtinure Issue" },
        { value: "Equipment Request", display: "Equipment Request" },
    ]
    const HealthandSafetySubCategory = [
        { value: "Safety Hazards", display: "Safety Hazards" },
        { value: "Fire Safety", display: "Fire Safety" },
        { value: "First Ail Supplies", display: "First Ail Supplies" },
    ]
    const formElements = [
        {
            type: "text",
            name: "issueTitle",
            label: t('Issue Title'),
            placeholder: t("Issue Title"),
            required: true,
            value: formik.values.issueTitle,
        },
        {
            type: "text",
            name: "assetId",
            label: t('Asset Id'),
            placeholder: t("Asset Id"),
            required: true,
            value: formik.values.assetId,
        },

        {
            type: "select",
            name: "priority",
            label: t("Priority"),
            value: formik.values.priority,
            required: true,
            list: [
                { value: "low", display: "Low" },
                { value: "normal", display: "Normal" },
                { value: "high", display: "High" },
                { value: "Critical", display: "Critical" },
            ]
        },
        {
            type: "select",
            name: "departement",
            label: t("Departement"),
            value: formik.values.departement,
            required: true,
            list: [
                { value: "IT", display: "IT" },
                { value: "Admin", display: "Admin" },
                { value: "HR", display: "HR" },
                { value: "Accounts", display: "Accounts" },
            ]
        },
        {
            type: "select",
            name: "category",
            label: t('Category'),
            value: formik.values.category,
            required: true,
            list: formik.values.departement == 'IT' ? itCategory : formik.values.departement == 'Admin' ? adminCategory : formik.values.departement == 'HR' ? HRCategory : AccountsCategory,
        },
        {
            type: "select",
            name: "subCategory",
            label: t('Sub Category'),
            value: formik.values.subCategory,
            required: true,
            list: formik.values.category == "Facilities Management" ? FacilitiesManagementSubCategory : formik.values.category == "Office Supllies" ? OfficeSuplliesSubCategory : formik.values.category == "Health and Safety" ? HealthandSafetySubCategory : AccountsCategory,
        },

        {
            type: "textarea",
            containerClass: "col-span-2",
            required: true,
            name: "description",
            label: t('Description'),
        }
    ]
    return (
        <BaseForm title={object ? "Submit New Ticket" : "Submit New Ticket"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading}>
            <div className='flex flex-col gap-6 col-span-2'>
                <div>
                    <label className='text-sm font-medium mb-1 block text-start'>Upload File</label>
                    <div className='rounded-lg flex items-center border border-themeGrayscale300 dark:border-gray-700'>
                        <label htmlFor="upload" className='zt-uploadLabel'>Choose File</label>
                        <input type="file" id="upload" className='hidden' onChange={handleFileChange} />
                        <span className='ps-2 text-sm'>{fileName}</span>
                    </div>
                </div>
            </div>

        </BaseForm>
    )
}