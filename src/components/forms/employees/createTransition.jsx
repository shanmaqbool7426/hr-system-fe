import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import Toast from "@/util/toast";
import { FetchEmployees } from '@/store/actions/employee.actions'; 
import { useEffect } from 'react';
import FileUpload from '@/components/elements/FileUpload';
import BaseForm from '../BaseForm';

export default function CreateTransitionForm({ onClose, object }) {
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
			transitionTitle: "",
			employee: "",
			transitionDate: "",
			promoteDemote: "",
			transitionType: "",
			designation: "",
			employeeStatus: "",
			employeeReportTo: "",
			reason: "",
		},
		validationSchema: Yup.object().shape({
			transitionTitle: Yup.string().required(t('formik.transitionTitleRequired')),
			employee: Yup.string().required(t('formik.employeeRequired')),
			transitionDate: Yup.string().required(t('formik.transitionDateRequired')),
			promoteDemote: Yup.string().required(t('formik.promoteDemoteRequired')),
			transitionType: Yup.string().required(t('formik.transitionTypeRequired')),
			designation: Yup.string().required(t('formik.designationRequired')),
			employeeStatus: Yup.string().required(t('formik.employeeStatusRequired')),
			employeeReportTo: Yup.string().required(t('formik.employeeReportToRequired')),
			reason: Yup.string(),
		}),
		onSubmit: (values) => {
			console.log("Form Values:", values); // Logging form values on submit
		}
	});

    const formElements = [
        {
            type: "text",
            name: 'transitionTitle',
            label: 'Transition Title',
            placeholder:"Transition Title",
            value: formik.values.transitionTitle,
            error: formik.touched.transitionTitle && formik.errors.transitionTitle,
            required: true
        },
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
            name: "transitionDate",
            label: t('Transition Date'),  
            value: formik.values.transitionDate,
            error: formik.touched.transitionDate && formik.errors.transitionDate,
            required: true
        }, 
        {
            type: "select",
            name: 'promoteDemote',
            label: 'Promote / Demote',
            value: formik.values.promoteDemote,
            error: formik.touched.promoteDemote && formik.errors.promoteDemote,
            list: [{ display: 'Promote', value: '1' }, { display: 'Demote', value: '2' }],
            required: true
        },
        {
            type: "select",
            name: 'transitionType',
            label: 'Transition Type',
            value: formik.values.transitionType,
            error: formik.touched.transitionType && formik.errors.transitionType,
            list: [{ display: 'Type One', value: '1' }, { display: 'Type Two', value: '2' }],
            required: true
        },
        {
            type: "select",
            name: 'designation',
            label: 'Designation',
            value: formik.values.designation,
            error: formik.touched.designation && formik.errors.designation,
            list: [{ display: 'HR', value: '1' }, { display: 'Admin', value: '2' }],
            required: true
        },
        {
            type: "select",
            name: 'employeeStatus',
            label: 'Employee Status',
            value: formik.values.employeeStatus,
            error: formik.touched.employeeStatus && formik.errors.employeeStatus,
            list: [{ display: 'HR', value: '1' }, { display: 'Admin', value: '2' }],
            required: true
        },   
        {
            type: "select",
            name: 'employeeReportTo',
            label: 'Employee Report To',
            value: formik.values.employeeReportTo,
            error: formik.touched.employeeReportTo && formik.errors.employeeReportTo,
            list: [{ display: 'HR', value: '1' }, { display: 'Admin', value: '2' }],
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
        <BaseForm title={object ? "Add Employee Transition Request" : "Add Employee Transition Request"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} />
    );
}
