import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ChangeDesignation, FetchChangeRequests } from '@/store/actions/employee-change-request.actions';
import Toast from "@/util/toast";
import { FetchEmployees } from '@/store/actions/employee.actions';
import BaseForm from '../../BaseForm';
import { useEffect, useState } from 'react';
import { uploader } from '@/util/helpers';
import FileUpload from '@/components/elements/FileUpload';


export default function ChangeDesignationForm({ onClose, object }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();	
	const { customfield_list } = useSelector(state => state.customfield)
    const { employees_list } = useSelector((state) => state.employee)
    const { is_loading } = useSelector((state) => state.employee);
    const [currentDesignation, setCurrentDesignation] = useState("");

	useEffect(() => {
		if (employees_list.length === 0)
			dispatch(FetchEmployees())
	}, [dispatch])

   
    const formik = useFormik({
		initialValues: {
			employee: "",
			designation: "",
			effectiveDate: "",
			reason: "",
			detail: "",
			attachment: null,
		},
		validationSchema: Yup.object().shape({
			employee: Yup.string().required(t('formik.employeeRequired')),
			designation: Yup.string().required(t('formik.newDesignationRequired')),
			effectiveDate: Yup.string().required(t('formik.effectiveDateRequired')),
			reason: Yup.string().required(t('formik.reasonOfDesignationChangeRequired')),
		}),
		onSubmit: async (values) => {
			if (values.attachment) {
				await uploader(values.attachment, (url) => {
					values.attachment = url
					dispatch(ChangeDesignation(values, () => {
						formik.resetForm()
                        onCompleted();
					}))
				})
			} else {
				dispatch(ChangeDesignation(values, () => {
					formik.resetForm()
                    onCompleted();
				}))
			}
		}
	});
    const onCompleted = () => {
        Toast.success(object ? t("Designation Change Request saved Updated Successfully") : t("Designation Change Request Created Successfully"));
        dispatch(FetchChangeRequests())
        onClose();
    };
    useEffect(() => {
        const selectedEmployee = employees_list.find(emp => emp._id === formik.values.employee);
        if (selectedEmployee) {
            const designation = customfield_list.find(field => field._id === selectedEmployee.designation?._id);
            console.log('deisgnation', designation)
            setCurrentDesignation(designation ? designation.name : ""); 
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
            label: t('Current Designation'),
            placeholder: t("Current Designation"), 
            value: currentDesignation,
            readOnly: true, 
            className:"cursor-not-allowed"
        },
        {
            type: "select",
            name:'designation',
            label:'New Designation',
            value: formik.values.designation,
            error: formik.touched.designation && formik.errors.designation,  
            list:customfield_list.filter(item => item.type === 'designation').map(item => {
                return { display: item.name, value: item._id }
            }),
            required:true
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
            label:'Reason Of Designation Change',
            value: formik.values.reason,
            error: formik.touched.reason && formik.errors.reason,  
            list: [
                { display: 'Promotion', value: 'promotion' },
                { display: 'Correction', value: 'correction' },
                { display: 'Other', value: 'other' },
            ],
            required:true
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
        <BaseForm title={object ? "Change Designaion" : "Change Designaion"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} >
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
