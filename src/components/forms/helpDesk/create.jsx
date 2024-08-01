import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import Storage from '@/util/storage';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { useDispatch, useSelector } from 'react-redux';
import {
    CreateProject,
    UpdateProject,
} from "@/store/actions/project.actions";
import { useState } from 'react';
import moment from 'moment';


export default function CreatHelpDeskForm({ onClose, object, }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading } = useSelector(state => state.project)
    const { employees_list } = useSelector((state) => state.employee);
    const { auth_user } = useSelector(state => state.auth);
    const [fileName, setFileName] = useState(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            try {
                let fileURL = await Storage.upload(file, auth_user?.company?._id, (url) => {
                    formik.setFieldValue('fileURL', url);
                });
                console.log('fileUrl', fileURL)
            } catch (error) {
                console.error("File upload failed", error);
            }
        } else {
            setFileName('No file chosen');
        }
    };

    const formik = useFormik({
        initialValues: {
            issueTitle: object?.issueTitle || "",  
            priority: object?.priority || "",  
            description: object?.description || "",

        },
        validationSchema: Yup.object().shape({
            issueTitle: Yup.string().required(t('Project issueTitle is required')),
            client: Yup.string().required(t('Client name is required')),
            startDate: Yup.string().required(t('Project start date is required')),
            endDate: Yup.date().required(t('Project end date is required'))
                .test('is-greater', t('End date must be later than start date'),
                    function (value) {
                        const { startDate } = this.parent;
                        return !startDate || !value || moment(value).isAfter(moment(startDate));
                    }),
            leads: Yup.array().required(t('Project leader is required')),
            members: Yup.array().required(t('Team is required')),
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
            type: "text",
            name: "issueTitle",
            label: t('Issue Title'),
            placeholder: t("Issue Title"),
            required: true,
            value: formik.values.issueTitle,
        },
        {
            type: "select",
            name: "priority",
            label: t("Priority"),
            value: formik.values.priority,
            required: true,
            list: [
                { value: "low", display: "Low" },
                { value: "normal", display: "Normal" },
                { value: "high", display: "High" },
            ]
        },
        {
            type: "select",
            name: "category",
            label: t('Category'),
            value: formik.values.category,
            required: true,
            list: [
                { value: "low", display: "Low" },
                { value: "normal", display: "Normal" },
                { value: "high", display: "High" },
            ],
            multiple: true,
        },
        {
            type: "select",
            name: "subCategory",
            label: t('Sub Category'),
            value: formik.values.subCategory,
            required: true,
            list: [
                { value: "low", display: "Low" },
                { value: "normal", display: "Normal" },
                { value: "high", display: "High" },
            ],
            multiple: true,
        },
        {
            type: "textarea",
            containerClass: "col-span-2",
            required: true,
            name: "description",
            label: t('Description'),
        }
    ]
    return (
        <BaseForm title={object ? "Submit New Ticket" : "Submit New Ticket"} formElements={formElements} formik={formik} onClose={onClose} is_loading={is_loading}>
            <div className='flex flex-col gap-6 col-span-2'>
                <div>
                    <label className='text-sm font-medium mb-1 block text-start'>Upload File</label>
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