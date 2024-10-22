import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions";
import { useSelector, useDispatch } from 'react-redux';
import BaseForm from '../../BaseForm';
import { createJob } from '@/store/actions/job.actions';
import { FetchDepartments } from '@/store/actions/department.actions';
import { useEffect } from 'react';

export default function AddJob({ onClose, type, object, additionFields }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const departments = useSelector(state => state.departments) || [];

    useEffect(() => {
        dispatch(FetchDepartments({}));
    }, [dispatch]);

    useEffect(() => {
    }, [departments]);

    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
            type: object?.jobType || "",
            icon: object?.icon || "",
            prefix: object?.prefix || "",
            department: object?.department || "",
            jobLocation: object?.jobLocation || "",
            noOfVacancies: object?.noOfVacancies || "",
            experience: object?.experience || "",
            age: object?.age || "",
            salaryFrom: object?.salaryFrom || "",
            salaryTo: object?.salaryTo || "",
            jobType: object?.jobType || "",
            status: object?.status || "",
            description: object?.description || "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('formik.nameRequired')),
            icon: additionFields.length > 0 ? Yup.string().required(t('formik.nameRequired')) : Yup.string().optional(),
            prefix: additionFields.length > 0 ? Yup.string().required(t('formik.nameRequired')) : Yup.string().optional(),
        }),
        onSubmit: async (values) => {
            return object
                ? dispatch(UpdateCustomfield(object._id, values, onCompleted))
                : dispatch(createJob(values, onCompleted));
        }
    });

    const onCompleted = () => {
        Toast.success(object ? t(`${type} updated successfully`) : t(`${type} created successfully`));
        onClose();
    }

    const formElements = [
        {
            type: "text",
            name: "name",
            label: t('Job Title'),
            placeholder: t("Job Title"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "select",
            name: "department",
            label: t('Department'),
            placeholder: t("Department"),
            required: true,
            value: formik.values.department,
            list: departments.filter(item => item.type === 'department').map(item => ({
                value: item._id,
                display: item.name
            }))
        },
        {
            type: "text",
            name: "jobLocation",
            label: t('Job Location'),
            placeholder: t("Job Location"),
            required: true,
            value: formik.values.jobLocation,
        },
        {
            type: "text",
            name: "noOfVacancies",
            label: t('No of Vacancies'),
            placeholder: t("-"),
            required: true,
            value: formik.values.noOfVacancies,
        },
        {
            type: "text",
            name: "experience",
            label: t('Experience'),
            placeholder: t("Experience"),
            required: true,
            value: formik.values.experience,
        },
        {
            type: "text",
            name: "age",
            label: t('Age'),
            placeholder: t("Age"),
            required: true,
            value: formik.values.age,
        },
        {
            type: "text",
            name: "salaryFrom",
            label: t('Salary From'),
            placeholder: t("Salary From"),
            required: true,
            value: formik.values.salaryFrom,
        },
        {
            type: "text",
            name: "salaryTo",
            label: t('Salary To'),
            placeholder: t("Salary To"),
            required: true,
            value: formik.values.salaryTo,
        },
        {
            type: "select",
            name: "jobType",
            label: t('Job Type'),
            placeholder: t("Job Type"),
            list: [{ value: 'Full Time', display: 'Full Time' }, { value: 'Part Time', display: 'Part Time' }],
            required: true,
            value: formik.values.jobType,
        },
        {
            type: "select",
            name: "status",
            label: t('Status'),
            placeholder: t("Status"),
            list: [{ value: 'Open', display: 'Open' }, { value: 'Closed', display: 'Closed' }],
            required: true,
            value: formik.values.status,
        },
        {
            type: "textarea",
            name: "description",
            label: t('Description'),
            placeholder: t("Type Here"),
            containerClass: 'col-span-2',
            required: true,
            value: formik.values.description,
        },
    ];

    return (
        <BaseForm title={object ? `Edit Job` : `Add Job`} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    );
}

AddJob.defaultProps = {
    additionFields: []
}
