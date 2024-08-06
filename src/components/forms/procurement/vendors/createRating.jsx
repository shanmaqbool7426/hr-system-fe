import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateEmployee, UpdateEmployee } from "@/store/actions/employee.actions";
import Toast from "@/util/toast";
import BaseForm from '../../BaseForm';
import { StarIcon } from '@/components/svg';
import { Input, SearchSelect, Textarea } from '@/components/elements';

export default function CreateVendorRatingForm({ onClose, object }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { is_loading } = useSelector((state) => state.employee);

    // State to track ratings for each quality criterion
    const [ratings, setRatings] = useState({
        qualityOfProduct: 0,
        qualityOfOutput: 0,
        qualityPriceRatio: 0,
    });

    const formik = useFormik({
        initialValues: {
            vendorName: object?.vendorName || "",
            description: object?.description || "",
            services: object?.services || "",
            contact: object?.contact || "",
            designation: object?.designation || "",
            dept: object?.dept || "",
        },
        validationSchema: Yup.object().shape({
            vendorName: Yup.string().required(t('formik.vendorName Required')),
            description: Yup.string().required(t('formik.nameRequired')),
            services: Yup.string().required(t('formik.servicesRequired')),
            contact: Yup.string().required(t('formik.contactRequired')),
            designation: Yup.string().required(t('formik.designationRequired')),
            dept: Yup.string().required(t('formik.deptRequired')),
        }),
        onSubmit: async (values) => {
            // You can add the ratings to the submitted values if needed
            const submitValues = { ...values, ratings };
            return object ? dispatch(UpdateEmployee(object._id, submitValues, onCompleted)) : dispatch(CreateEmployee(submitValues, onCompleted));
        }
    });

    const onCompleted = () => {
        Toast.success(object ? t("Employee updated successfully") : t("Employee created successfully"));
        onClose();
    };

    const formElements = [
        {
            type: "select",
            name: "vendorName",
            label: t('Vendor Name'),
            list: [{ display: "John", value: "John" }, { display: "Mink", value: "Mink" }],
            placeholder: t('Vendor Name'),
            value: formik.values.vendorName,
            required: true,
        },
        {
            type: "text",
            name: "services",
            label: t('Key Products or Services'),
            placeholder: t('Key Products or Services'),
            required: true,
            value: formik.values.services,
        },
        {
            type: "text",
            name: "contactPerson",
            label: t('Key Contact Person'),
            placeholder: t('John'),
            required: true,
            value: formik.values.contactPerson,
        },
        {
            type: "text",
            name: "contact",
            label: t('Contact'),
            placeholder: t('+92 301 6546545'),
            required: true,
            value: formik.values.contact,
        },
        {
            type: "text",
            name: "designation",
            label: t('Key person Designation'),
            placeholder: t('Manager'),
            required: true,
            value: formik.values.designation,
        },
        {
            type: "text",
            name: "dept",
            label: t('Responsible Dept.'),
            placeholder: t('Admin'),
            required: true,
            value: formik.values.dept,
        },
        {
            type: "select",
            name: "Status",
            label: t('Status'),
            placeholder: t('Status'),
            required: true,
            value: formik.values.Status,
            list: [{ display: "Pass", value: "Pass" }, { display: "Fail", value: "Fail" }]
        },
    ];

    // Handle the star click to update the rating
    const handleStarClick = (criterion, rating) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [criterion]: rating,
        }));
    };

    return (
        <BaseForm title={object ? 'Edit Vendors Rating' : "Add Vendors Rating"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} >
            <div className='zt-card !bg-themeGrayscale100 col-span-2 gap-4'>
                <h2 className='text-h4 text-left mb-3'>{t("Quality")}</h2>
                {[
                    { label: "Quality of Product or Services offered", key: "qualityOfProduct" },
                    { label: 'Quality of Output', key: "qualityOfOutput" },
                    { label: 'Quality Price Ratio', key: "qualityPriceRatio" }
                ].map((criterion, i) => (
                    <div key={i} className='grid grid-cols-2 items-center gap-6 w-full'>
                        <span className='block text-start'>{t(criterion.label)}</span>
                        <div className='flex gap-1 mb-2'>
                            {[...Array(5)].map((_, index) => (
                                <button key={index} onClick={() => handleStarClick(criterion.key, index + 1)}>
                                    <StarIcon className={`h-8 w-8 ${ratings[criterion.key] > index ? 'text-yellow-500' : 'text-gray-300'}`} />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className='zt-card !bg-themeGrayscale100 col-span-2 gap-4'>
                <h2 className='text-h4 text-left mb-3'>{t("Performance")}</h2>
                {[
                    { label: "Performance of Product or Services Demo", key: "PerformanceOfProduct" },
                    { label: 'Timing of Performance', key: "timingOfOutput" },
                    { label: 'Performance Reliability', key: "performanceReliability" }
                ].map((criterion, i) => (
                    <div key={i} className='grid grid-cols-2 items-center gap-6 w-full'>
                        <span className='block text-start'>{t(criterion.label)}</span>
                        <div className='flex gap-1 mb-2'>
                            {[...Array(5)].map((_, index) => (
                                <button key={index} onClick={() => handleStarClick(criterion.key, index + 1)}>
                                    <StarIcon className={`h-8 w-8 ${ratings[criterion.key] > index ? 'text-yellow-500' : 'text-gray-300'}`} />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className='zt-card !bg-themeGrayscale100 col-span-2 gap-4'>
                <h2 className='text-h4 text-left mb-3'>{t("Communication")}</h2>
                {[
                    { label: "Ease of Communication", key: "easeCommunication" },
                    { label: 'Modes of Communication', key: "modesCommunication" },
                    { label: 'Response Time', key: "responseTime" }
                ].map((criterion, i) => (
                    <div key={i} className='grid grid-cols-2 items-center gap-6 w-full'>
                        <span className='block text-start'>{t(criterion.label)}</span>
                        <div className='flex gap-1 mb-2'>
                            {[...Array(5)].map((_, index) => (
                                <button key={index} onClick={() => handleStarClick(criterion.key, index + 1)}>
                                    <StarIcon className={`h-8 w-8 ${ratings[criterion.key] > index ? 'text-yellow-500' : 'text-gray-300'}`} />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Textarea containerClass={'col-span-2'} label={'Remarks'} placeholder='Remarks' />
        </BaseForm>
    );
}
