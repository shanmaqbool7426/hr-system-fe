import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import BaseForm from '../../BaseForm';
import { Table } from '@/components/elements';
import { useState } from 'react';

export default function ViewAdvanceSalaryForm({ onClose, object }) {
    const { t } = useTranslation()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)

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
    const pagination = {
        totalRecords: 5,
        showPerPage: true,
        prevAction: () => page > 1 && setPage(page - 1),
        clickAction: (value) => setPage(value),
        nextAction: () => setPage(page + 1),
    }
    const headings = [
        { title: t("Title"), col: "Title" },
        { title: t("Date"), col: "Date", },
        { title: t("Amount"), col: "Amount", },
    ]

    const rows = [
        {
            Title: "Advance",
            Date: '23 May 2024',
            Amount: "$1200",
        },
        {
            Title: "Advance",
            Date: '23 May 2024',
            Amount: "$1200",
        },
        {
            Title: "Advance",
            Date: '23 May 2024',
            Amount: "$1200",
        },
    ]
    return (
        <BaseForm title={`Employee Advance Salary History `} formik={formik} onClose={onClose} is_loading={false} >
            <div className='col-span-2'>
                <Table
                    headings={headings}
                    rows={rows}
                    sortCol={sortCol}
                    setSortCol={setSortCol}
                    sortDir={sortDir}
                    pagination={pagination}
                    setSortDir={setSortDir}
                    perPage={perPage}
                    setPerPage={setPerPage}
                    page={page}
                    setPage={setPage}
                    className={'zt-employeeTable zt-payrollTable'}
                />
            </div>
        </BaseForm>
    )
}

