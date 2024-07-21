import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import Toast from "@/util/toast";
import { FetchEmployees } from '@/store/actions/employee.actions';
import BaseForm from '../../BaseForm';
import { useEffect } from 'react';
import FileUpload from '@/components/elements/FileUpload';

export default function ChangeSalaryForm({ onClose, object }) {
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
		employee: "",
		initialValues: {
			currentSalary: "",
			newSalary: "",
			effectiveDate: "",
			reasonOfChangeSalary: "",
			detail: "",
			fileSalary: "",
		},
		validationSchema: Yup.object().shape({
			employee: Yup.string().required(t('formik.employeeRequired')),
			currentSalary: Yup.string().required(t('formik.currentSalaryRequired')),
			newSalary: Yup.string().required(t('formik.newSalaryRequired')),
			effectiveDate: Yup.string().required(t('formik.effectiveDateRequired')),
			reasonOfChangeSalary: Yup.string().required(t('formik.reasonOfChangeSalaryRequired')),
			detail: Yup.string(),
			fileSalary: Yup.string(),
		}),
		onSubmit: async (values) => {
			if (values.attachment) {
				await uploader(values.attachment, (url) => {
					values.attachment = url;
					dispatch(ChangeDepartment(values, () => {
						formik.resetForm();
						Toast.success(t("Salery change request saved successfully"));
					}));
				});
			} else {
				dispatch(ChangeDesignation(values, () => {
					formik.resetForm();
					Toast.success(t("Request not proceed"));
				}));
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
            name: "currentEmployeeSalary",
            label: t('Current Salary'),
            placeholder: t("Enter Current Salary"),
        },
        {
            type: "select",
            name: 'newEmployeeSalary',
            label: 'New Salary',
            value: formik.values.newEmployeeSalary,
            error: formik.touched.newEmployeeSalary && formik.errors.newEmployeeSalary,
            list: [{ display: '20000', value: '1' }, { display: '350000', value: '2' }],
            required: true
        },
        {
            type: "date",
            name: 'effectiveDate',
            label: 'Effective Date',
            value: formik.values.effectiveDate,
            error: formik.touched.effectiveDate && formik.errors.effectiveDate,
            required: true
        },
        {
            type: "select",
            name: 'reasonOfChangeSalary',
            label: 'Reason Of Salary Change',
            value: formik.values.reasonOfChangeSalary,
            error: formik.touched.reasonOfChangeSalary && formik.errors.reasonOfChangeSalary,
            list: [{ display: 'Performance-Based Increase', value: '1' }, { display: 'Market Adjustment', value: '2' }],
            required: true
        },
        {
            type: "textarea",
            name: 'detail',
            label: 'Details',
            value: formik.values.detail,
            error: formik.touched.detail && formik.errors.detail,
            containerClass: 'col-span-2',
            required: true
        },
    ];


    return (
        <BaseForm title={object ? "Change Salary" : "Change Salary"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} >
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
