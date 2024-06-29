import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import UserListView from '@/components/elements/UserListView'; 

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
export default function CreateBoardForm({ title, onClose, type, object, additionFields }) {
    const { t } = useTranslation()
    
    const [filters, setFilters] = useState({
        search: "",
        project: null,
        department: null,
        status: null,
    })
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
            type,
            icon: object?.icon || "",
            prefix: object?.prefix || "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('formik.nameRequired')),
            icon: additionFields.length > 0 ? Yup.string().required(t('formik.nameRequired')) : Yup.string().optional(),
            prefix: additionFields.length > 0 ? Yup.string().required(t('formik.nameRequired')) : Yup.string().optional(),
        }),
        onSubmit: async (values) => {

            return object ? dispatch(UpdateCustomfield(object._id, values, onCompleted)) : dispatch(CreateCustomfield(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`${type} updated successfully`) : t(`${type} created successfully`))
        onClose()
    }
    const formElements = [
        {
            type: "select",
            name: "TaskBoardName",
            label: t('Task Board Name'),
            placeholder: t("Task Board Name"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "select",
            name: "ProjectName",
            label: t('Project Name'),
            placeholder: t("Project Name"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "select",
            name: "sprint",
            label: t('Sprint'),
            placeholder: t("1"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "date",
            name: "Due Date",
            label: t('Due Date'), 
            required: true,
            value: formik.values.name,
        },
        
        {
            type: "search",
            name: "search",
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
            name: "search",
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
    ]
    return (
        <BaseForm title={title} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} >
            <div className='grid sm:grid-cols-2 gap-x-6 gap-y-4 py-4'>
                {teamData.map((ele, i) => (
                    <UserListView imgClass="h-[32px] w-[32px]" key={i} list={ele.team} limit={2} />
                ))}
                {teamData.map((ele, i) => (
                    <UserListView imgClass="h-[32px] w-[32px]" key={i} list={ele.leaders} limit={3} />
                ))} 
            </div> 
        </BaseForm>
    )
}

CreateBoardForm.defaultProps = {
    additionFields: []
}