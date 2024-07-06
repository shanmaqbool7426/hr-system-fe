import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { CreateCustomfield, UpdateCustomfield } from "@/store/actions/customfield.actions"
import { useDispatch } from 'react-redux';
import BaseForm from '../../BaseForm'; 

export default function ScheduleInterview({ onClose, object }) {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            name: object?.name || "", 
            icon: object?.icon || "",
            prefix: object?.prefix || "",
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('formik.nameRequired')),
       }),
        onSubmit: async (values) => {

            return object ? dispatch(UpdateCustomfield(object._id, values, onCompleted)) : dispatch(CreateCustomfield(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`Interview updated successfully`) : t(`Interview created successfully`))
        onClose()
    }
    const formElements = [
        {
            type: "text",
            name: "CandidateName",
            label: t('Candidate Name'),
            placeholder: t("Jhon Cater"),
            required: true,
            value: formik.values.name,
        }, 
        {
            type: "text",
            name: "JobTitle",
            label: t('Job Title'),
            placeholder: t("UI UX Designer"),
            required: true,
            value: formik.values.name,
        },
        {
            type: "text",
            name: "InterviewerName",
            label: t('Interviewer Name'),
            placeholder: t("Whick"),
            required: true,
            value: formik.values.name,
        },  
        {
            type: "date",
            name: "InterviewDate",
            label: t('Interview Date'), 
            required: true,
            value: formik.values.name,
        },
        {
            type: "select",
            name: "InterviewerAvailableTime ",
            label: t('Interviewer Available Time '),
            placeholder: t("Interviewer Available Time "),
            list:[{value: '11:00 PM To 12:00PM' ,display: '11:00 PM To 12:00PM'}],
            required: true,
            value: formik.values.name,
        },
        {
            type: "text",
            name: "StartTime",
            label: t('Start Time'),
            placeholder: t("11:00 PM"), 
            required: true,
            value: formik.values.name,
        },
        {
            type: "text",
            name: "EndTime",
            label: t('End Time'),
            placeholder: t("12:00 PM"), 
            required: true,
            value: formik.values.name,
        },
        {
            type: "textarea",
            name: "Comment",
            label: t('Comment'),
            placeholder: t("Type Here"), 
            containerClass: 'col-span-2',
            required: true,
            value: formik.values.name,
        },
    ]
    return (
        <BaseForm title={object?"Schedule Interview":"Schedule Interview"} formElements={formElements} formik={formik} onClose={onClose} is_loading={false} />
    )
}
 