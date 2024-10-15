import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux"; 
import { FetchEmployees } from '@/store/actions/employee.actions'; 
import { useEffect } from 'react'; 
import BaseForm from '../BaseForm';

export default function CreateTransferForm({ onClose, object }) {
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
			transferDate: "",
			country: "",
			province: "",
			city: "",
			station: "",
			employeeReportTo: "",
			department: "",
			subDepartment: "",
			vender: "",
			description: "",
		},
		validationSchema: Yup.object().shape({
			employee: Yup.string().required(t('formik.employeeRequired')),
			transferDate: Yup.string().required(t('formik.transferDateRequired')),
			country: Yup.string().required(t('formik.countryRequired')),
			province: Yup.string().required(t('formik.provinceRequired')),
			city: Yup.string().required(t('formik.cityRequired')),
			station: Yup.string().required(t('formik.CityRequired')),
			employeeReportTo: Yup.string().required(t('formik.employeeReportToRequired')),
			department: Yup.string().required(t('formik.departmentRequired')),
			subDepartment: Yup.string().required(t('formik.subDepartmentRequired')),
			vender: Yup.string().required(t('formik.venderRequired')),
			description: Yup.string(),
		}),
		onSubmit: (values) => {
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
            name: "transferDate",
            label: t('Transfer Date'),  
            value: formik.values.transferDate,
            error: formik.touched.transferDate && formik.errors.transferDate,
            required: true
        }, 
        {
            type: "select",
            name: 'country',
            label: 'Country',
            value: formik.values.country,
            error: formik.touched.country && formik.errors.country,
            list: [{ display: 'Pakistan', value: '1' }, { display: 'India', value: '2' }],
            required: true
        },
        {
            type: "select",
            name: 'province',
            label: 'Province',
            value: formik.values.province,
            error: formik.touched.province && formik.errors.province,
            list: [{ display: 'Punjab', value: '1' }, { display: 'KPK', value: '2' }],
            required: true
        },
        {
            type: "select",
            name: 'city',
            label: 'City',
            value: formik.values.city,
            error: formik.touched.city && formik.errors.city,
            list: [{ display: 'HR', value: '1' }, { display: 'Admin', value: '2' }],
            required: true
        },
        {
            type: "select",
            name: 'station',
            label: 'Station',
            value: formik.values.station,
            error: formik.touched.station && formik.errors.station,
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
            type: "select",
            name: 'department',
            label: 'Department',
            value: formik.values.department,
            error: formik.touched.department && formik.errors.department,
            list: [{ display: 'HR', value: '1' }, { display: 'Admin', value: '2' }],
            required: true
        },    
        {
            type: "select",
            name: 'subDepartment',
            label: 'Sub Department',
            value: formik.values.subDepartment,
            error: formik.touched.subDepartment && formik.errors.subDepartment,
            list: [{ display: 'HR', value: '1' }, { display: 'Admin', value: '2' }],
            required: true
        },     
        {
            type: "select",
            name: 'vender',
            label: 'Vender',
            value: formik.values.vender,
            error: formik.touched.vender && formik.errors.vender,
            list: [{ display: 'HR', value: '1' }, { display: 'Admin', value: '2' }],
            required: true
        },   
        {
            type: "textarea",
            name: 'description',
            label: 'Description',
            value: formik.values.description,
            error: formik.touched.description && formik.errors.description,
            containerClass: 'col-span-2',
            required: true
        },
    ];


    return (
        <BaseForm title={object ? "Employee Transfer Request" : "Employee Transfer Request"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} />
    );
}
