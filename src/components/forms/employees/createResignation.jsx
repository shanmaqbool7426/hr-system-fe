import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import Toast from "@/util/toast";
import { FetchEmployees } from '@/store/actions/employee.actions'; 
import { useEffect } from 'react';
import FileUpload from '@/components/elements/FileUpload';
import BaseForm from '../BaseForm';

export default function CreateResignationForm({ onClose, object }) {
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
			resignationDate: "",
			reasonType: "",
			lastPreferredWorkingDate: "",
			reason: "",
			file: "",
		},
		validationSchema: Yup.object().shape({
			employee: Yup.string().required(t('formik.employeeRequired')),
			resignationDate: Yup.string().required(t('formik.resignationDateRequired')),
			reasonType: Yup.string().required(t('formik.reasonTypeRequired')),
			lastPreferredWorkingDate: Yup.string().required(t('formik.lastPreferredWorkingDateRequired')),
			reason: Yup.string(),
			file: Yup.string(),
		}),
		onSubmit: (values) => {
			console.log("Form Values:", values); // Logging form values on submit
		}
	});

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
            type: "date",
            name: "resignationDate",
            label: t('Transition  Date'),  
            value: formik.values.resignationDate,
            error: formik.touched.resignationDate && formik.errors.resignationDate,
            required: true
        }, 
        {
            type: "select",
            name: 'reasonType',
            label: 'Reason Type',
            value: formik.values.reasonType,
            error: formik.touched.reasonType && formik.errors.reasonType,
            list: [{ display: 'One', value: '1' }, { display: 'Two', value: '2' }],
            required: true
        },
        {
            type: "date",
            name: 'lastPreferredWorkingDate',
            label: 'Last preferred Working Date',
            value: formik.values.lastPreferredWorkingDate,
            error: formik.touched.lastPreferredWorkingDate && formik.errors.lastPreferredWorkingDate,
            required: true
        },
        
        {
            type: "textarea",
            name: 'reason',
            label: 'Reason',
            value: formik.values.reason,
            error: formik.touched.reason && formik.errors.reason,
            containerClass: 'col-span-2',
            required: true
        },
    ];


    return (
        <BaseForm title={object ? "Add Resignation Request" : "Add Resignation Request"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} >
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
