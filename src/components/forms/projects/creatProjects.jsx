import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import UserListView from '@/components/elements/UserListView';
import { SearchSelect } from '@/components/elements';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const teamData = [
    {
        "leaders": [
            { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg" },
            { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-02.jpg" },
            { "firstName": "ahmed", "lastName": "raza", "avatar": "" },
        ],
        "team": [
            { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg" },
            { "firstName": "ahmed", "lastName": "raza", "avatar": "" },
            { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-03.jpg" },
            { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-04.jpg" },
            { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-05.jpg" },
            { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-06.jpg" },
            { "firstName": "ahmed", "lastName": "raza", "avatar": "" },
            { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-08.jpg" },
            { "firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-09.jpg" }
        ],
    }
]
export default function CreatProjectsForm({ onClose, object, }) {
    const { t } = useTranslation()
    const [value, setValue] = useState('');
    const [fileName, setFileName] = useState('No file chosen');
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName('No file chosen');
        }
    };
    const [filters, setFilters] = useState({
        search: "",
        project: null,
        department: null,
        status: null,
    })
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            projectName: object?.projectName || "",
            clientName: object?.clientName || "",
            sprint: object?.sprint || "",
            sprintDueDate: object?.sprintDueDate || "",
            startDate: object?.startDate || "",
            endDate: object?.endDate || "",
            payment: object?.payment || "",
            paymentCycle: object?.paymentCycle || "",
            projectLeader: object?.projectLeader || "",
            team: object?.team || "",
            description: object?.description || "", // Added description
        },
        validationSchema: Yup.object().shape({
            projectName: Yup.string().required(t('Project name is required')),
            clientName: Yup.string().required(t('Client name is required')),
            sprint: Yup.string().required(t('Sprint is required')),
            sprintDueDate: Yup.string().required(t('Sprint due date is required')),
            startDate: Yup.string().required(t('Project start date is required')),
            endDate: Yup.string().required(t('Project end date is required')),
            projectLeader: Yup.string().required(t('Project leader is required')),
            team: Yup.string().required(t('Team is required')),
            description: Yup.string().required(t('Description is required')), // Added validation for description
        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateProject(object._id, values, onCompleted)) : dispatch(CreateProject(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`Project updated successfully`) : t(`Project created successfully`))
        onClose()
    }
    const formElements = [
        {
            type: "text",
            name: "projectName",
            label: t('Project Name'),
            placeholder: t("Office Management"),
            required: true,
            value: formik.values.projectName,
        },
        {
            type: "text",
            name: "clientName",
            label: t('Client'),
            placeholder: t("Jhon Carter"),
            required: true,
            value: formik.values.clientName,
        },

        {
            type: "date",
            name: "startDate",
            label: t('Start Date'),
            required: true,
            value: formik.values.startDate,
        },
        {
            type: "date",
            name: "endDate",
            label: t('End Date'),
            required: true,
            value: formik.values.endDate,
        },
        {
            type: "number",
            name: "payment",
            label: t('Payment'),
            placeholder: t("$5000"),
            required: false,
            value: formik.values.payment,
        },
        {
            type: "select",
            name: "paymentCycle",
            label: t('Payment Cycle'),
            placeholder: t("Fixed"),
            required: false,
            value: formik.values.paymentCycle,
            list: [
                { value: "monthly", display: "Monthly" },
                { value: "one time", display: "One Time" },

            ]
        },
        {
            type: "search",
            name: "projectLeader",
            label: t('Add Project Leader'),
            value: filters.search,
            required: true,
            placeholder: t("Search Leader"),
            onChange: (event) => {
                let _filter = { ...filters }
                _filter['search'] = event.target.value
                setFilters(_filter)
            }
        },
        {
            type: "search",
            name: "team",
            label: t('Add Team'),
            value: filters.search,
            required: true,
            placeholder: t("Search Team Member"),
            onChange: (event) => {
                let _filter = { ...filters }
                _filter['search'] = event.target.value
                setFilters(_filter)
            }
        },

        {
            type: "select",
            name: "priority",
            label: t("Priority"),
            value: formik.values.priority,
            required: true,
            list: [
                { value: "low", display: "Low" },
                { value: "high", display: "High" },

            ]
        }

    ]
    return (
        <BaseForm title={object ? "Edit project" : "Create project"} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} >

            <div className='flex flex-col gap-6 col-span-2'>
                <div>
                    <label className='text-sm font-medium mb-3 block text-start'>Description</label>
                    <ReactQuill theme="snow" value={value} onChange={setValue} />
                    {formik.touched.description && formik.errors.description ? (
                        <div className="text-red-600">{formik.errors.description}</div>
                    ) : null}
                </div>
                <div>
                    <label className='text-sm font-medium mb-4 block text-start'>Upload File</label>
                    <div className='rounded-lg flex items-center border border-themeGrayscale300'>
                        <label htmlFor="upload" className='zt-uploadLabel'>Choose File</label>
                        <input type="file" id="upload" className='hidden' onChange={handleFileChange} />
                        <span className='ps-2 text-sm'>{fileName}</span>
                    </div>
                </div>
            </div>
        </BaseForm>
    )
}
