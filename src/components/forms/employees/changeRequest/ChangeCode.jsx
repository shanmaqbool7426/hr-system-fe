import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import Toast from "@/util/toast";
import { FetchEmployees } from '@/store/actions/employee.actions';
import BaseForm from '../../BaseForm';
// import { changeCode } from '@/store/actions/employee-change-request.actions';
import { useEffect } from 'react';
import FileUpload from '@/components/elements/FileUpload';

export default function ChangeCodeForm({ onClose, object }) {
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
			currentEmployeeCode: "",
			newEmployeeCode: "",
			effectiveDate: "",
			reasonOfChangeEmployeeCode: "",
			detail: "",
			fileEmployeeCode: "",
		},
		validationSchema: Yup.object().shape({
			employee: Yup.string().required(t('formik.employeeRequired')),
			currentEmployeeCode: Yup.string().required(t('formik.currentEmployeeCodeRequired')),
			newEmployeeCode: Yup.string().required(t('formik.newEmployeeCodeRequired')),
			effectiveDate: Yup.string().required(t('formik.effectiveDateRequired')),
			reasonOfChangeEmployeeCode: Yup.string().required(t('formik.reasonOfChangeEmployeeCodeRequired')),
			detail: Yup.string(),
			fileEmployeeCode: Yup.string(),
		}),
		onSubmit: async (values) => {
			if (values.attachment) {
				await uploader(values.attachment, (url) => {
					values.attachment = url;
					// dispatch(changeCode(values, () => {
						formik.resetForm();
						Toast.success(t("Grade change request saved successfully"));
					// }));
				});
			} else {
				// dispatch(changeCode(values, () => {
					formik.resetForm();
					Toast.success(t("Request not proceed"));
				// }));
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
            name: "currentEmployeeCode",
            label: t('Current Code'),
            placeholder: t("Enter Current Code"),
        },
        {
            type: "select",
            name: 'newEmployeeCode',
            label: 'New Code',
            value: formik.values.newEmployeeCode,
            error: formik.touched.newEmployeeCode && formik.errors.newEmployeeCode,
            list: [{ display: '1088', value: '1' }, { display: '1085', value: '2' }],
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
            name: 'reasonOfChangeEmployeeCode',
            label: 'Reason Of Code Change',
            value: formik.values.reasonOfChangeEmployeeCode,
            error: formik.touched.reasonOfChangeEmployeeCode && formik.errors.reasonOfChangeEmployeeCode,
            list:[{ display: 'Correction of Errors', value: '1' }, { display: 'System Upgrade or Integration', value: '2' }],
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
        <BaseForm title={object ? "Change Code" : "Change Code"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} >
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
