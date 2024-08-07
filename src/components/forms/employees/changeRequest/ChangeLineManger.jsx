import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import Toast from "@/util/toast";
import { FetchEmployees } from '@/store/actions/employee.actions';
import BaseForm from '../../BaseForm';
import { useEffect, useState } from 'react';
import FileUpload from '@/components/elements/FileUpload';
import {  ChangeGrade, ChangeLineManager, FetchChangeRequests } from '@/store/actions/employee-change-request.actions';
import { uploader } from '@/util/helpers';

export default function ChangeLineManagerForm({ onClose, object }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { employees_list } = useSelector((state) => state.employee)
	const { customfield_list } = useSelector(state => state.customfield)
    const { is_loading } = useSelector((state) => state.employee);
    const [currentLineManager, setCurrentLineManager] = useState("");

    useEffect(() => {
        if (employees_list.length === 0)
            dispatch(FetchEmployees())
    }, [dispatch])

    const formik = useFormik({
		initialValues: {
            employee: "",
			lineManager: "",
			effectiveDate: "",
			reason: "",
			detail: "",
			attachment: null,
		},
		validationSchema: Yup.object().shape({
            employee: Yup.string().required(t('formik.employeeRequired')),
			lineManager: Yup.string().required(t('New Line Manager is Required')),
			effectiveDate: Yup.string().required(t('formik.effectiveDateRequired')),
			reason: Yup.string().required(t('formik.reasonOfDesignationChangeRequired')),
		}),
        onSubmit: async (values) => {
			if (values.attachment) {
				await uploader(values.attachment, (url) => {
					values.attachment = url
					dispatch(ChangeLineManager(values, () => {
						formik.resetForm()
                        onCompleted();
					}))
				})
			} else {
				dispatch(ChangeLineManager(values, () => {
					formik.resetForm()
                    onCompleted();
				}))
			}
		}
	});
    const onCompleted = () => {
        Toast.success(object ? t("Line Manager Change Request Updated Successfully") : t("Line Manager Change Request Created Successfully"));
        dispatch(FetchChangeRequests())
        onClose();
    };

    useEffect(() => {
        const selectedEmployee = employees_list.find(emp => emp._id === formik.values.employee);
        if (selectedEmployee) {
            const lineManager = employees_list.find(field => field._id === selectedEmployee?.lineManager?._id);
            setCurrentLineManager(`${lineManager.firstName} ${lineManager.lastName}`); 
        }
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
            label: t('Current Line Manager'),
            placeholder: t("Enter Line Manager"),
            value: currentLineManager,
            readOnly: true, 
            className:"cursor-not-allowed"
        },
        {
            type: "select",
            name: 'lineManager',
            label: 'New Line Manager',
            value: formik.values.lineManager,
            error: formik.touched.lineManager && formik.errors.lineManager,
            list: employees_list.map((item) => {
                return { display: item.firstName + " " + item.lastName, value: item._id }
            }),
            required: true
        },
        {
            type: "date",
            name:'effectiveDate',
            label:'Effective Date',
            value: formik.values.effectiveDate,
            error: formik.touched.effectiveDate && formik.errors.effectiveDate,   
            required:true
        },
        {
            type: "select",
            name:'reason',
            label:'Reason Of Line Manager Change',
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
            name:'detail',
            label:'Details',
            value: formik.values.detail,
            error: formik.touched.detail && formik.errors.detail,  
            containerClass: 'col-span-2',
        },
    ];


    return (
        <BaseForm title={object ? "Change Line Manager" : "Change Line Manager"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} >
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
