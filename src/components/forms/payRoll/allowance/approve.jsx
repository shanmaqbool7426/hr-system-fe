import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import BaseForm from '../../BaseForm';
import { Table, Textarea } from '@/components/elements';
import { useState } from 'react';
import Image from 'next/image';

export default function AllowanceApprovalForm({ onClose, object }) {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null);
    const [sortDir, setSortDir] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            employee: object?.employee?._id || "",
            attendanceDate: object?.attendanceDate || "",
            inDate: object?.inDate || "",
            InTime: object?.InTime || "",
            outDate: object?.outDate || "",
            OutTime: object?.OutTime || "",
            reason: object?.reason || ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('Name is required')),
            attendanceDate: Yup.string().required(t("Attendance date is required")),
            inDate: Yup.string().required(t("InDate is required")),
            InTime: Yup.string().required(t("InTime is required")),
            outDate: Yup.string().required(t("outDate is required")),
            OutTime: Yup.string().required(t("OutTime is required")),
            reason: Yup.string().required(t("reason is required")),
        }),
        onSubmit: async (values) => {

            return object ? dispatch(UpdateCustomfield(object._id, values, onCompleted)) : dispatch(CreateCustomfield(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`${type} Request completed successfully`) : t(`${type} created successfully`))
        onClose()
    }
    const formElements = [
        {
            type: "text",
            name: "requesedBY",
            label: t('Requesed BY'),
            placeholder: "John",
            required: true,
            disabled: true,
            className: "cursor-not-allowed",
            value: formik.values.requesedBY,
        },
        {
            type: "text",
            name: "requesedFor",
            label: t('Requesed For'),
            placeholder: "John",
            required: true,
            disabled: true,
            className: "cursor-not-allowed",
            value: formik.values.requesedFor,
        },
    ]

    const headings = [
        { title: t("Employee Name"), col: "EmployeeName" },
        { title: t("Status"), col: "Status" },
        { title: t("Action"), col: "Action" },
        { title: t("Remarks"), col: "Remarks" },
    ];
    const rows = [
        {
            EmployeeName: <div className="flex items-center gap-3">
                <figure>
                    <Image height={24} width={24} src={'/assets/images/users/user-01.jpg'} className="rounded-full" /></figure>
                <div className="flex flex-col text-xs ">
                    <span className="font-medium">{t("Jhon Carter")}</span>
                    <span className="text-themeGrayscale500">{t("10202325")}</span>
                </div>
            </div>,
            Status: "Approved",
            Action: "Approved",
            Remarks: "-",
        },

    ];
    return (
        <BaseForm title={t(`Allowance Approval Routing`)} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} >
            <div className='col-span-2'>
                <Table
                    headings={headings}
                    rows={rows}
                    sortCol={sortCol}
                    setSortCol={setSortCol}
                    sortDir={sortDir}
                    setSortDir={setSortDir}
                    perPage={perPage}
                    setPerPage={setPerPage}
                    page={page}
                    setPage={setPage}
                    className={"zt-employeeTable zt-payrollTable"}
                />
                <h3 className='text-h4 text-left'>{t("Allowance Details")}</h3>
                <Textarea label={'Description'} disabled={true} placeholder='Annual Leave Enhancement' />
            </div>
        </BaseForm>
    )
} 