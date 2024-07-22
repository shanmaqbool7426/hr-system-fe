import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import Toast from "@/util/toast";
import { FetchEmployees } from '@/store/actions/employee.actions';
import BaseForm from '../../BaseForm';
import { useEffect } from 'react';
import FileUpload from '@/components/elements/FileUpload';

export default function ChangeGradeForm({ onClose, object }) {
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
			currentGrade: "",
			newGrade: "",
			effectiveDate: "",
			reasonOfGradeChange: "",
			detail: "",
			fileGrade: "",
		},
		validationSchema: Yup.object().shape({
			employee: Yup.string().required(t('formik.employeeRequired')),
			currentGrade: Yup.string().required(t('formik.currentGradeRequired')),
			newGrade: Yup.string().required(t('formik.newGradeRequired')),
			effectiveDate: Yup.string().required(t('formik.effectiveDateRequired')),
			reasonOfGradeChange: Yup.string().required(t('formik.reasonOfGradeChangeRequired')),
			detail: Yup.string(),
			fileGrade: Yup.string(),
		}),
		onSubmit: async (values) => {
			if (values.attachment) {
				await uploader(values.attachment, (url) => {
					values.attachment = url;
					dispatch(ChangeDepartment(values, () => {
						formik.resetForm();
						Toast.success(t("Grade change request saved successfully"));
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
            name: "currentGrade",
            label: t('Current Grade'),
            placeholder: t("Enter Current Grade"),
        },
        {
            type: "select",
            name: 'newGrade',
            label: 'New Grade',
            value: formik.values.newGrade,
            error: formik.touched.newGrade && formik.errors.newGrade,
            list: [{ display: 'A', value: '1' }, { display: 'B', value: '2' }],
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
            name: 'reasonOfGradeChange',
            label: 'Reason Of Grade Change',
            value: formik.values.reasonOfGradeChange,
            error: formik.touched.reasonOfGradeChange && formik.errors.reasonOfGradeChange,
            list: [{ display: 'Promotion', value: '1' }, { display: 'Reorganization', value: '2' }],
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
        <BaseForm title={object ? "Change Grade" : "Change Grade"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} >
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
