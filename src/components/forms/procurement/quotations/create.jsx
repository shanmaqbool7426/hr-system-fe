import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateEmployee, UpdateEmployee } from "@/store/actions/employee.actions"
import Toast from "@/util/toast";
import BaseForm from '../../BaseForm';
import { useState } from 'react';

export default function CreateQuotationForm({ onClose, object }) {
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
            quoteId: object?.quoteId || "",
            quotationTitle: object?.quotationTitle || "",
            vendor: object?.vendor || "",
            amount: object?.amount || "",
            expiryDate: object?.expiryDate || "",
            status: object?.status || "",
        },
        validationSchema: Yup.object().shape({
            quoteId: Yup.string().required(t('Quote Id Required')),
            quotationTitle: Yup.string().required(t('Quotation Title Required')),
            vendor: Yup.string().required(t('vendor Required')),
            amount: Yup.string().required(t('Amount Required')),
            expiryDate: Yup.string().required(t('Expiry Date Required')),
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
            name: "quoteId",
            label: t('Quote Id'),
            placeholder: t('Quote Id'),
            value: formik.values.quoteId,
            required: true,
        },
        {
            type: "text",
            required: true,
            name: "quotationTitle",
            label: t('Quotation Title'),
            placeholder: t('Quotation Title'),
            value: formik.values.quotationTitle,
        },
        {
            type: "select",
            name: "vendor",
            label: t('Vendor'),
            required: true,
            placeholder: t('Vendor'),
            list: [{ display: "John", value: "John" }, { display: "Mink", value: "Mink" }],
            value: formik.values.vendor,
        },
        {
            type: "text",
            required: true,
            name: "amount",
            label: t('Amount'),
            placeholder: t('Amount'),
            value: formik.values.amount,
        },
        {
            type: "date",
            required: true,
            name: "expiryDate",
            label: t('Expiry Date'),
            placeholder: t('Expiry Date'),
            value: formik.values.expiryDate,
        },
        {
            type: "select",
            required: true,
            name: "status",
            label: t('Status'),
            list: [{ display: "Approved", value: "Approved" }, { display: "Working", value: "Working" }, { display: "Pending", value: "Pending" }],
            id: t('Status'),
            value: formik.values.status,
        },
    ]

    return (
        <BaseForm title={object ? 'Edit Quotation' : "Add Quotation"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} >
            <div className='flex flex-col gap-6 col-span-2'>
                <div>
                    <label className='text-sm font-medium mb-1 block text-start'>Upload File</label>
                    <div className='rounded-lg flex items-center border border-themeGrayscale300'>
                        <label htmlFor="upload" className='zt-uploadLabel'>Choose File</label>
                        <input type="file" id="upload" className='hidden' onChange={handleFileChange} />
                        <span className='ps-2 text-sm'>{fileName}</span>
                    </div>
                </div>
            </div>
        </BaseForm>
    )
}