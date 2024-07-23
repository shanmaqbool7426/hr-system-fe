import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ChangeDesignation } from '@/store/actions/employee-change-request.actions';
import Toast from "@/util/toast";
import { FetchEmployees } from '@/store/actions/employee.actions';
import BaseForm from '../../BaseForm';
import { useEffect } from 'react';
import FileUpload from '@/components/elements/FileUpload';

export default function ChangeDesignationForm({ onClose, object }) {
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
						Toast.success(t("Designation change request saved successfully"))
					}))
				})
			} else {
				dispatch(ChangeDesignation(values, () => {
					formik.resetForm()
					Toast.success(t("Designation change request saved successfully"))
				}))
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
            name:'employee',
            label:'Employee',
            value: formik.values.employee,
            error: formik.touched.employee && formik.errors.employee,  
            list:employees_list.map((item) => {
                return { display: item.firstName + " " + item.lastName, value: item._id }
            }),
            required:true
        },
        {
            type: "text",
            name: "cnic",
            label: t('Current Designation'),
            placeholder: t("Enter Current Designation"), 
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
            required:true
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
