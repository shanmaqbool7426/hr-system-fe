import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { useDispatch, useSelector } from 'react-redux';
import { CreateProject, UpdateProject } from "@/store/actions/project.actions";
import { useState } from 'react';
import BaseForm from '../../BaseForm';
import { Button, Datepicker, SearchSelect, Select, Table, Textarea } from '@/components/elements';
import { Plus, Trash, UploadZipIcon } from '@/components/svg';
import FileUpload from '@/components/elements/FileUpload';

export default function TaxAdjustmentForm({ onClose, object, }) {
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
            name: "category",
            label: t("Category"),
            value: formik.values.category,
            required: true,
            list: [
                { value: "Withholding Tax", display: "Withholding Tax" },
            ]
        },
        {
            type: "select",
            name: "year",
            label: t("Year"),
            value: formik.values.year,
            required: true,
            list: [
                { value: "2024", display: "2024" },
                { value: "2025", display: "2025" },
            ]
        },
        {
            type: "select",
            name: "month",
            label: t("Month"),
            value: formik.values.month,
            required: true,
            list: months
        },
    ]
    const headings = [
        { title: t("Date"), col: "Date" },
        { title: t("Type"), col: "Type" },
        { title: t("Attachment"), col: "Attachment" },
        { title: t("Action"), col: "action" },
    ];
    const rows = [
        {
            Date: <div className='flex justify-center'>
                <Datepicker />
            </div>,
            Type: <div className='flex justify-center'>
                <div className="w-36 ">
                    <SearchSelect
                        placeholder={"Select One"}
                        list={[{ display: "One", value: "One" }]}
                    />
                </div>
            </div>,
            Attachment: <FileUpload
                id={'attachment'}
                name={'attachment'}
                label={t('No File')}
                uploadIcon={<UploadZipIcon />}
                accept={`image/*,application/pdf,.doc,.docx`}

            />,
            action: (<Button variant={"light-danger"} className={"!py-2 !px-2"}>  <Trash />  </Button>
            ),
        },
        {
            Date: <div className='flex justify-center'>
                <Datepicker />
            </div>,
            Type: <div className='flex justify-center'>
                <div className="w-36 ">
                    <SearchSelect
                        placeholder={"Select One"}
                        list={[{ display: "One", value: "One" }]}
                    />
                </div>
            </div>,
            Attachment: <FileUpload
                id={'attachment'}
                name={'attachment'}
                label={t('No File')}
                uploadIcon={<UploadZipIcon />}
                accept={`image/*,application/pdf,.doc,.docx`}

            />,
            action: (<Button variant={"light-danger"} className={"!py-2 !px-2"}>  <Trash />  </Button>
            ),
        },
    ];
    return (
        <BaseForm title={object ? "Add Tax Adjustment" : "Add Tax Adjustment"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading}>
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
                <Textarea containerClass={'w-full'} label={'Description'} name='description'/>
            </div>

        </BaseForm>
    )
}