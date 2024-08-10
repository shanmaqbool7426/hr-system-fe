import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { useDispatch, useSelector } from 'react-redux';
import { CreateProject, UpdateProject } from "@/store/actions/project.actions";
import BaseForm from '../../BaseForm';
import { Button, Table, Textarea } from '@/components/elements';
import Image from 'next/image';
import { useState } from 'react';
import FileUpload from '@/components/elements/FileUpload';
import { Download } from '@/components/svg';
export default function TaxAdjustmentApprovalForm({ onClose, object, }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading } = useSelector(state => state.project)
    const [sortCol, setSortCol] = useState(null);
    const [sortDir, setSortDir] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const formik = useFormik({
        initialValues: {
            issueTitle: object?.issueTitle || "",
            priority: object?.priority || "",
            departement: object?.departement || "",
            category: object?.category || "",
            subCategory: object?.subCategory || "",
            assetId: object?.assetId || "",
            d: object?.description || "",

        },
        validationSchema: Yup.object().shape({
            issueTitle: Yup.string().required(t('issueTitle is required')),
            priority: Yup.string().required(t('priority is required')),
            departement: Yup.string().required(t('departement is required')),
            category: Yup.string().required(t('category is required')),
            subCategory: Yup.string().required(t('subCategory is required')),
            assetId: Yup.string().required(t('assetId is required')),
            description: Yup.string().required(t('Description is required')),

        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateProject(object._id, values, onCompleted)) : dispatch(CreateProject(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t("Project updated successfully") : t("Project created successfully"))
        onClose()
    }
    const months = [
        { display: 'January', value: "January" },
        { display: 'February', value: "February" },
        { display: 'March', value: "March" },
        { display: 'April', value: "April" },
        { display: 'May', value: "May" },
        { display: 'June', value: "June" },
        { display: 'July', value: "July" },
        { display: 'August', value: "August" },
        { display: 'September', value: "September" },
        { display: 'October', value: "October" },
        { display: 'November', value: "November" },
        { display: 'December', value: "December" },
    ]
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
    const detaileHeadings = [
        { title: t("Date"), col: "Date" },
        { title: t("Type"), col: "Type" },
        { title: t("Category"), col: "Category" },
        { title: t("Amount"), col: "Amount" },
        { title: t("Attachment"), col: "Attachment" },
    ];
    const detailRows = [
        {
            Date: '23 May 2024',
            Type: "Others",
            Category: "Withholding Tax",
            Amount: "$100",
            Attachment: <Button className={'btn btn-light-primary !p-2'}><Download /></Button>,
        },

    ];
    return (
        <BaseForm title={t('Tax Adjustment Approval Routing')} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading}>
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
                <h3 className='text-h4 text-left'>{t("Tax Adjustment Details")}</h3>
                <Table
                    headings={detaileHeadings}
                    rows={detailRows}
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
                <Textarea label={'Description'} disabled={true} placeholder='Remining tax is adjusted as per FBR document attached' />
            </div>
        </BaseForm>
    )
}