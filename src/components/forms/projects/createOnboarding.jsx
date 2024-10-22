import * as Yup from 'yup';
import { useFormik } from 'formik';
import BaseForm from '../BaseForm';
import { useTranslation } from 'next-i18next';
import Toast from '@/util/toast';
import { CreateTask, UpdateTask } from '@/store/actions/task.actions';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { BirthdayIcon, EmailIcon, LaptopIcon, PhoneIcon } from '@/components/svg';
import { CheckBox, SearchSelect } from '@/components/elements';

export default function CreateOnboardingForm({ onClose, object, additionFields }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { is_loading } = useSelector(state => state.task)

    const formik = useFormik({
        initialValues: {
            laptop: object?.laptop || "",
            status: object?.status || "",
            description: object?.description || "",
            dueDate: object?.dueDate || "",
            requiredTime: object?.requiredTime || "",
            priority: object?.priority || "",
            leader: object?.leader?.map(item => item._id) || [],
            assignedTo: object?.assignedTo?.map(item => item._id) || [],
            board: additionFields?._id || "",
            project: additionFields?.project?._id || "",
            parent: object?.parent || "",
        },
        validationSchema: Yup.object().shape({
            laptop: Yup.string().required(t('Laptop is required')),
            status: Yup.string().required(t('Status is required')),
            dueDate: Yup.string().required(t('Task Due date is required')),
            assignedTo: Yup.array().required(t('Member is required')),
            leader: Yup.array().required(t('Leader is required')),
            requiredTime: Yup.string().required(t("Time is required")),
            priority: Yup.string().required(t('Priority is required')),
            description: Yup.string().required(t('Description is required')),
        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateTask(object._id, values, onCompleted)) : dispatch(CreateTask(values, onCompleted))
        }
    })
    const onCompleted = () => {
        Toast.success(object ? t('Task updated successfully') : t('Task created successfully'))
        onClose()
    }
    const contactData = [
        {
            icon: <PhoneIcon className={'text-primary'} />,
            label: "Contact No",
            value: "+92 301 645121"
        },
        {
            icon: <EmailIcon className={'text-primary'} />,
            label: "Email",
            value: "Alex@gmail.com"
        },
        {
            icon: <BirthdayIcon className={'text-primary'} />,
            label: "Date of Birth",
            value: "15-12-2000"
        },
        {
            icon: <LaptopIcon className={'text-primary'} />,
            label: "Work Mode",
            value: "Regular"
        },
    ]
    const DevicesData = [
        {
            device: "Laptop",
            placeholder: "REN-L-001",
            list: [{ display: "REN-L-001", value: "REN-L-001" }, { display: "REN-L-002", value: "REN-L-002" }]
        },
        {
            device: "Charger",
            placeholder: "REN-Ch-001",
            list: [{ display: "REN-Ch-001", value: "REN-Ch-001" }, { display: "REN-Ch-002", value: "REN-Ch-002" }]
        },
        {
            device: "Headset",
            placeholder: "REN-Hs-001",
            list: [{ display: "REN-Hs-001", value: "REN-Hs-001" }, { display: "REN-Hs-002", value: "REN-Hs-002" }]
        },
        {
            device: "Mobile",
            placeholder: "REN-Mb-001",
            list: [{ display: "REN-Mb-001", value: "REN-Mb-001" }, { display: "REN-Mb-002", value: "REN-Mb-002" }]
        },
        {
            device: "Converter",
            placeholder: "REN-C-001",
            list: [{ display: "REN-C-001", value: "REN-C-001" }, { display: "REN-C-002", value: "REN-C-002" }]
        },
        {
            device: "LED",
            placeholder: "REN-Ld-001",
            list: [{ display: "REN-Ld-001", value: "REN-Ld-001" }, { display: "REN-Ld-002", value: "REN-Ld-002" }]
        },
    ]
    const onboardTasks = ["New Hire Information", "introduction With Team", 'Email Creation', 'Policy Briefing', 'HRM credentials', 'Project Assigned', 'Educational Document', 'Experienced Letter', 'CNIC Attached', 'Upload Photo', 'Laptop Assigned']
    return (
        <BaseForm title={object ? "Edit Reported Task" : 'Welcome Onboard'} formik={formik} onClose={onClose} is_loading={is_loading} >
            <div className="">
                <div className="flex gap-6 items-center mb-3">
                    <figure className="shrink-0">
                        <Image className="rounded-full" src={'/assets/images/users/user-01.jpg'} height={150} width={150} alt="profile" />
                    </figure>
                    <div>
                        <h3 className="text-h4 font-bold mb-0 text-left">{t("Alex M.")}</h3>
                        <p className="mb-0 text-left">{t("User Interface Designer")}</p>
                        <h4 className='text-left text-h6 mb-0'>{t("Design")}</h4>
                    </div>
                </div>
                <h2 className="text-h4 border-b w-max border-black">{t("Personal Details ")}</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {contactData.map((ele, i) => (
                        <div key={i} className='flex items-center gap-4 border bg-themeGrayscale50 p-2 rounded'>
                            {ele.icon}
                            <div className='flex gap-1 flex-col'>
                                <h3 className='text-base text-left leading-none mb-0'>{ele.label}</h3>
                                <span className='text-left leading-none'>{ele.value}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='flex flex-col gap-4'>
                    {DevicesData.map((ele, i) => (
                        <div key={i} className='flex justify-between items-center'>
                            <h2 className='text-h5 mb-0'>{ele.device}</h2>
                            <SearchSelect name='laptop' value={formik.laptop} placeholder={ele.placeholder} list={ele.list} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="">
                <h2 className='text-h4 text-left border-b border-black w-max pb-1'>{t('Onboarding Tasks')}</h2>
                <div className='flex flex-col gap-4'>
                    {onboardTasks.map((ele, i) => (
                        <div key={i} className='flex items-center justify-between gap-4 border bg-themeGrayscale50 p-3 rounded'>
                            <span className='font-bold'>{ele}</span>
                            <CheckBox id={i} />
                        </div>
                    ))}
                </div>
            </div>
        </BaseForm>
    )
}
