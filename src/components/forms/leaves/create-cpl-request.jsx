
import BaseForm from "../BaseForm"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateLeavePolicy, UpdateLeavePolicy } from "@/store/actions/leave-policy.actions"
import Toast from "@/util/toast";
import { useState } from "react";

export default function CreateCPLLeaveForm({ onClose, leave ,title}) {
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
            name: leave?.name || "",
            entitled: leave?.entitled || false,
            encashable: leave?.encashable || false,
            carryForward: leave?.carryForward || false,
            entitledToStatus: leave?.entitledToStatus.reduce((acc, item) => {
                acc.push(item._id)
                return acc
            }, []) || [],
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('formik.nameRequired')),
            entitled: Yup.string().required(t('formik.entitledRequired')),
            encashable: Yup.string().required(t('formik.encashableRequired')),
            carryForward: Yup.string().required(t('formik.carryForwardRequired')),
            entitledToStatus: Yup.array().required(t('formik.entitledToStatusRequired')).min(1, t('formik.entitledToStatusRequired')),
        }),
        onSubmit: async (values) => {
            onCompleted()
            return leave ? dispatch(UpdateLeavePolicy(leave._id, values, onCompleted)) : dispatch(CreateLeavePolicy(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(leave ? t("Leave policy updated successfully") : t("Leave policy created successfully"))
        onClose()
    }
    const formElements = [
        {
            type: "select",
            name: "Employee",
            label: t('Employee'),
            placeholder: t("Employee"),
            required: true, value: formik.values.name,
        },
        {
            type: "select",
            name: "LeaveType",
            label: t('Leave Type'),
            placeholder: t("Select One"),
            required: true, value: formik.values.entitled,
        },
        {
            type: "select",
            multiple: true,
            name: "Leave Duration",
            label: t('Leave Duration'),
            value: formik.values.entitledToStatus,
            list: customfield_list.filter(item => item.type === 'employee_status').map(item => {
                return { value: item._id, display: item.name }
            }),
            required: true,
        },
        {
            type: "select",
            multiple: true,
            name: "Leave Days",
            label: t('Leave Days'),
            value: formik.values.entitledToStatus,
            list: customfield_list.filter(item => item.type === 'employee_status').map(item => {
                return { value: item._id, display: item.name }
            }),
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
        <BaseForm title={title} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} >
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