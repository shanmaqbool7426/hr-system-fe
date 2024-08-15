import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { useDispatch, useSelector } from 'react-redux';
import { CreateProject, UpdateProject } from "@/store/actions/project.actions";
import BaseForm from '../../BaseForm';
import { Input, Table, ToggleCheck } from '@/components/elements';
import { useState } from 'react';

export default function SalarySetUpForm({ onClose, object, }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const { is_loading } = useSelector(state => state.project)
    const formik = useFormik({
        initialValues: {
            issueTitle: object?.issueTitle || "",
            priority: object?.priority || "",
            departement: object?.departement || "",
            category: object?.category || "",
            subCategory: object?.subCategory || "",
            assetId: object?.assetId || "",
            description: object?.description || "",

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
    const formElements = [
        {
            type: "select",
            name: "employee",
            label: t('Employee'),
            placeholder: t("Employee"),
            required: true,
            value: formik.values.employee,
            list: [
                { value: "John", display: "John" },
                { value: "Mink", display: "Mink" },
            ]
        },
        {
            type: "select",
            name: "payrollSetup",
            label: t('Payroll Setup'),
            placeholder: t("Flexible Shift"),
            required: true,
            value: formik.values.payrollSetup,
            list: [
                { value: "Flexible Shift", display: "Flexible Shift" },
            ]
        },
        {
            type: "select",
            name: "paymentMethod",
            label: t('Payment Method'),
            placeholder: t("Bank"),
            required: true,
            value: formik.values.paymentMethod,
            list: [
                { value: "Bank", display: "Bank" },
            ]
        },
        {
            type: "select",
            name: "employerBank",
            label: t("Employer's Bank"),
            placeholder: t("Bank"),
            required: true,
            value: formik.values.employerBank,
            list: [
                { value: "SCBL", display: "SCBL" },
                { value: "Mezan", display: "Mezan" },
            ]
        },
        {
            type: "select",
            name: "branch",
            label: t("Branch"),
            placeholder: t("Branch A"),
            required: true,
            value: formik.values.branch,
            list: [
                { value: "Branch A", display: "Branch A" },
                { value: "Branch B", display: "Branch B" },
            ]
        },
        {
            type: "select",
            name: "transactionType",
            label: t("Transaction Type"),
            placeholder: t("Bank transfer"),
            required: true,
            value: formik.values.transactionType,
            list: [
                { value: "Bank transfer", display: "Bank transfer" },
            ]
        },
        {
            type: "select",
            name: "currency",
            label: t("US Dollar"),
            value: formik.values.currency,
            placeholder: t("US Dollar"),
            required: true,
            list: [
                { value: "US Dollar", display: "US Dollar" },
            ]
        },
    ]
    const headings = [
        { title: t("Salary Items"), col: "SalaryItems", sort: true },
        { title: t("Amount"), col: "Amount", sort: true },
    ]
    const rows = [
        {
            SalaryItems: 'Basic Salary (90%)',
            Amount: '1900',
        },
    ]
    return (
        <BaseForm title={"Salary Setup"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading}>
            <div className='flex justify-between items-center'>
                <p className='mb-0'>{t("Overtime rates of this Employee")}</p>
                <ToggleCheck id={'Overtime'} />
            </div>
            <div className='flex justify-between items-center'>
                <p className='mb-0'>{t("Short Times Rates Of Employee")}</p>
                <ToggleCheck id={'ShortTimes'} />
            </div>
            <div className='flex justify-between items-center'>
                <p className='mb-0'>{t("Payment Details")}</p>
                <ToggleCheck id={'PaymentDetails'} />
            </div>
            <Input label={'Monthly Gross Salary'} disabled={true} placeholder='$ 200' className={'cursor-not-allowed'} />
            <Input label={'Annual Gross Salary'} disabled={true} placeholder='$ 2400' className={'cursor-not-allowed'} />
            <p className='mb-0 text-lg font-bold text-left col-span-2'>{t("Salary Breakup")}</p>
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
                    className={'zt-employeeTable zt-payrollTable'}
                />
            </div>
            <div className='flex justify-between items-center'>
                <p className='mb-0'>{t("Add Recurring Allowance")}</p>
                <ToggleCheck id={'RecurringAllowance'} />
            </div>
            <div className='flex justify-between items-center'>
                <p className='mb-0'>{t("Add Recurring Deducation")}</p>
                <ToggleCheck id={'RecurringDeducation'} />
            </div>
            <p className='mb-0 text-lg font-bold text-left'>{t("Estimated Monthly Salary")}</p>
            <p className='mb-0 text-lg font-bold text-right'>{t("$19680.00")}</p>

        </BaseForm>
    )
}