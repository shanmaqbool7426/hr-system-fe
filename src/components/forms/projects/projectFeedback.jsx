import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'react-i18next';
import Toast from '@/util/toast';
import { useDispatch } from 'react-redux';
import { StarIcon } from '@/components/svg';
import { CreateFeedBack, UpdateFeedBack } from '@/store/actions/feedback.actions';

export default function ProjectFeedbackForm({ onClose, object , project }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const allMembers = [
        ...(project?.leads || []).map(member => ({
            value: member._id,
            display: `${member.firstName} ${member.lastName}  (Leader)`,
        })),
        ...(project?.members || []).map(member => ({
            value: member._id,
            display: `${member.firstName} ${member.lastName}  (Member)`,
        })),
    ];
    console.log('allMembers', allMembers)
    const formik = useFormik({
        initialValues: {
            name: object?.name || "",
            member: object?.member || [],
            rating: object?.rating ||   "",
            comments : object?.comments ||  "",
            project: project?._id || ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('Feedback title is Required')),
            member: Yup.array().required(t('Member is Required')),
            rating: Yup.number().required(t('Rating is required')),
            comments: Yup.string().required(t('Comments is required')),
        }),
        onSubmit: async (values) => {

            return object ? dispatch(UpdateFeedBack(object._id, values, onCompleted)) : dispatch(CreateFeedBack(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t(`Feedback updated successfully`) : t(`Feedback created successfully`))
        onClose()
    }
    const formElements = [
        {
            type: "text",
            name: "name",
            label: t('Feedback Title'), 
            value: formik.values.name,
            required: true,
        },
        {
            type: "select",
            name: "member",
            label: t('Employee'),
            value: formik.values.member, 
            required: true,
            list: allMembers, 
            multiple: true,
        },
        {
            type: "select",
            name: "rating",
            label: t('Select Rating'), 
            value: formik.values.rating,
            required: true,
            list: [
                { value: 1, display: 1 },
                { value: 1.5, display: 1.5 },
                { value: 2, display: 2 },
                { value: 2.5, display: 2.5 },
                { value: 3, display: 3 },
                { value: 3.5, display: 3.5 },
                { value: 4, display: 4 },
                { value: 4.5, display: 4.5 },
                { value: 5, display: 5 },
            ]
        },
        {
            type: "textarea",
            name: "comments",
            label: t('Comments'),
            containerClass: "col-span-2",
            required: true,
            value: formik.values.comments,
        },

    ]
    return (
        <BaseForm formElements={formElements} title={object ? "Feedback" : "Feedback"} formik={formik} onClose={onClose} is_loading={false} >
            <div className='col-span-2'>
                <span className='mb-2 text-sm block text-start mt-6'>{t("Select Rating")}</span>
                <div className='flex gap-1 mb-6'>
                {[...Array(5)].map((_, index) => (
                        <button key={index} onClick={() => formik.setFieldValue('rating', index + 1)}>
                            <StarIcon className={`h-10 w-10 ${formik.values.rating > index ? 'text-themeSecondary' : 'text-gray-300'}`} />
                        </button>
                    ))}
                </div>
            </div>
        </BaseForm>
    )
}
