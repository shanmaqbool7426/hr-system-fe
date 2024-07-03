import BaseForm from "../BaseForm"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateEmployee, FetchEmployees, UpdateEmployee } from "@/store/actions/employee.actions"
import Toast from "@/util/toast";
import { useEffect, useState } from "react";
import { FetchLeavePolicies } from "@/store/actions/leave-policy.actions";

export default function CreateLeaveRequestForm({ onClose, request }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [leaveDays, setLeaveDays] = useState(0)
    const { is_loading, employees_list } = useSelector((state) => state.employee)
    const { leave_policies } = useSelector(state => state.leavepolicy)
    const { auth_user } = useSelector(state => state.auth)
    const [fileName, setFileName] = useState('No File Selected');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName('No File Selected');
        }
    };
    const formik = useFormik({
        initialValues: {
            employee: request?.employee?._id || "",
            leaveType: request?.leaveType?._id || "",
            leaveDuration: request?.leaveDuration || "",
            dateForm: request?.dateForm || "",
            dateTo: request?.dateTo || "",
            reason: request?.reason || "",
        },
        validationSchema: Yup.object().shape({
            employee: Yup.string().required(t('formik.employeeRequired')),
            leaveType: Yup.string().required(t('formik.leaveTypeRequired')),
            dateForm: Yup.string().required(t('formik.dateFormRequired')),
            dateTo: Yup.string().required(t('formik.dateToRequired')),
            reason: Yup.string().required(t('formik.reasonRequired')),
        }),
        onSubmit: async (values) => {
            return request ? dispatch(UpdateEmployee(request._id, values, onCompleted)) : dispatch(CreateEmployee(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(request ? t("Leave Request updated successfully") : t("Leave Request created successfully"))
        onClose()
    }
    useEffect(() => {
        if (employees_list.length === 0) {
            dispatch(FetchEmployees())
        }
        if (leave_policies === 0) {
            dispatch(FetchLeavePolicies())
        }
    }, [dispatch])

    useEffect(() => {
        setLeaveDays(formik.values.leaveDuration)
    }, [formik.values.leaveDuration])

    const formElements = [
        {
            type: "select",
            name: "employee",
            label: t('Employee'),
            value: formik.values.employee,
            list: employees_list
                .filter(item => item._id === auth_user?._id)
                .map(item => {
                    return {
                        value: item._id, display: item.firstName + " " + item.lastName
                    }
                }),
            required: true,
        },
        {
            type: "select",
            name: "leaveType",
            label: t('Leave Type'),
            value: formik.values.leaveType,
            list: leave_policies.map(item => {
                return {
                    value: item._id, display: item.name
                }
            }),
            required: true,
        },
        {
            type: "text",
            name: "Entitled",
            label: t('Entitled'),
            required: true,
        },
        {
            type: "text",
            name: "Taken",
            label: t('Taken'),
            required: true,
        },
        {
            type: "text",
            name: "Balance",
            label: t('Balance'),
            required: true,
        },
        {
            type: "select",
            name: "leaveDuration",
            label: t('Leave Duration'),
            value: formik.values.leaveDuration,
            list: [
                { display: 'Full Day', value: '1' },
                { display: 'Half Day', value: '0.5' },
                { display: 'Quarter Day', value: '0.25' },
                { display: 'Half Quarter Day', value: '0.125' },
            ],
            required: true,
        },
        {
            type: 'number',
            readOnly: true,
            label: t('Leave Days'),
            value: leaveDays
        },
        {
            type: "date",
            name: "fromDate",
            label: t('Leave From'),
            // maxDate: new Date,
            required: true,
            value: formik.values.fromDate,
        },
        {
            type: "date",
            name: "toDate",
            label: t('Leave To'),
            minDate: formik.values.fromDate,
            required: true,
            value: formik.values.toDate,
        },
        {
            type: "textarea",
            name: "reason",
            label: t('Reason'),
            containerClass: 'col-span-2',
            value: formik.values.reason,
            required: true,
        },

    ]

    const formTitle = request ? t("Update Leave Request") : t("Create Leave Request")

    return (
        <BaseForm title={formTitle} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading} >
            <div className='col-span-2'>
                <label className='text-sm font-medium mb-4 block text-start'>Upload Attachment</label>
                <div className='rounded-lg flex relative items-center border border-themeGrayscale300'>
                    <label htmlFor="upload" className='zt-uploadLabel'>Upload Attachment</label>
                    <input type="file" id="upload" className='hidden' onChange={handleFileChange} />
                    <span className='ps-2 text-sm'>{fileName}</span>
                </div>
            </div>
        </BaseForm>
    )
}