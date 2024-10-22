import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import Toast from '@/util/toast';
import { useDispatch, useSelector } from 'react-redux';
import { CreateProject, UpdateProject } from "@/store/actions/project.actions";
import { useState } from 'react';
import BaseForm from '../../BaseForm';
import { Button, Datepicker, Input, SearchSelect,  Table, Textarea } from '@/components/elements';
import { Plus, Trash } from '@/components/svg'; 

export default function ReimbursementRequestForm({ onClose, object, }) {
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
            type: "text",
            name: "title",
            label: t("Title"),
            value: formik.values.title,
            required: true,
        },
        {
            type: "date",
            name: "date",
            label: t("Date"),
            value: formik.values.date,
            required: true,
        },
        {
            type: "select",
            name: "includePayslip",
            label: t("Include in Payslip"),
            value: formik.values.includePayslip,
            required: true,
            list: [
                { display: 'No', value: "No" },
                { display: 'Yes', value: "Yes" },
            ]
        },
    ]
    const headings = [
        { title: t("Date"), col: "Date" },
        { title: t("Category"), col: "Category" },
        { title: t("Item"), col: "Item" },
        { title: t("Receipt No"), col: "ReceiptNo" },
        { title: t("Amount"), col: "Amount" },
        { title: t("Action"), col: "action" },
    ];
    const rows = [
        {
            Date: <div className='flex justify-center'>
                <Datepicker />
            </div>,
            Category: <div className='flex justify-center'>
                <div className="w-32">
                    <SearchSelect
                        name='category'
                        placeholder={"Select One"}
                        list={[{ display: "One", value: "One" }]}
                    />
                </div>
            </div>,
            Item: <Input placeholder='0' containerClass={'w-20'} />,
            ReceiptNo: <Input placeholder='0' containerClass={'w-20'} />,
            Amount: <Input placeholder='0' containerClass={'w-20'} />,
            action: (<Button variant={"light-danger"} className={"!py-2 !px-2"}>  <Trash />  </Button>
            ),
        },
        {
            Date: <div className='flex justify-center'>
                <Datepicker />
            </div>,
            Category: <div className='flex justify-center'>
                <div className="w-32">
                    <SearchSelect
                        name='category'
                        placeholder={"Select One"}
                        list={[{ display: "One", value: "One" }]}
                    />
                </div>
            </div>,
            Item: <Input placeholder='0' containerClass={'w-20'} />,
            ReceiptNo: <Input placeholder='0' containerClass={'w-20'} />,
            Amount: <Input placeholder='0' containerClass={'w-20'} />,
            action: (<Button variant={"light-danger"} className={"!py-2 !px-2"}>  <Trash />  </Button>
            ),
        },
    ];
    return (
        <BaseForm title={object ? "Edit Reimbursement" : "Apply For Reimbursement"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading}>
            <div className='flex flex-col items-start gap-6 col-span-2'>
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
                    className={"zt-employeeTable zt-addAttendanceTable"}
                />
                <Button variant={"dark-outline"}>
                    <Plus /> Add Line
                </Button>
                <Textarea containerClass={'w-full'} label={'Description'} name='description' />
            </div>

        </BaseForm>
    )
}