import { useTranslation } from 'react-i18next'
import * as Yup from 'yup';
import CreateBoardForm from '@/components/forms/projects/createBoard'
import { Button, Input, Profile } from '@/components/elements'
import { useFormik } from 'formik';
import { ChevronLeft, Download, Edit, PdfIcon, Plus, ShareIcon, Tick, Trash } from '@/components/svg' 
import Link from 'next/link'
import { useEffect, useState } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { FetchProjectDetails , UpdateProject } from '@/store/actions/project.actions' 
import DisplayDate from "@/components/elements/DisplayDate";
import PageLoader from '@/components/elements/PageLoader' 
import ProgressBar from '@/components/elements/ProgressBar'
import Image from 'next/image'
import { useRouter } from 'next/router';
import Toast from '@/util/toast';


export default function ProjectsDetailPage() {
    const { t } = useTranslation()
    const router = useRouter()
    const dispatch = useDispatch()
    const [board, setBoard] = useState(false)
    const [edit, setEdit] = useState(false)
    const { project_detail , is_loading} = useSelector((state) => state.project)

    const formik = useFormik({
        initialValues: {
            name: project_detail?.name || "",
            client: project_detail?.client || "",
            startDate: project_detail?.startDate || "",
            endDate: project_detail?.endDate || "",
            payment: project_detail?.payment || "",
            paymentCycle: project_detail?.paymentCycle || "",
            priority: project_detail?.priority || "",
            leads: project_detail?.leads?.reduce((acc, item) => {
                acc.push(item._id);
                return acc;
              }, []) || [],
            members: project_detail?.members?.reduce((acc, item) => {
                acc.push(item._id);
                return acc;
              }, []) || [],
            description: project_detail?.description || "", 
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required(t('Project name is required')),
            client: Yup.string().required(t('Client name is required')),
            startDate: Yup.string().required(t('Project start date is required')),
            endDate: Yup.string().required(t('Project end date is required')),
            leads: Yup.array().required(t('Project leader is required')),
            members: Yup.array().required(t('Team is required')),
            description: Yup.string().required(t('Description is required')), 
        }),
        onSubmit: (values) => {
             dispatch(UpdateProject(project_detail._id, values, ()=>{
                setEdit(false)
                Toast.success(t('Project Name updated successfully'))
             } )) 
        },
        enableReinitialize: true
    })

    useEffect(() => {
        const projectId = router.query.projectId;
        if (projectId)
            dispatch(FetchProjectDetails(projectId));
    }, [router, dispatch]);

    const removeTags = (str) => {
        if (!str) return ''
        return str.replace(/<\/?[^>]+(>|$)/g, "")
    }
    return (
    <>
        { project_detail &&
        <section className="flex flex-col grow">
            {is_loading && <PageLoader />}
            <div className="flex items-center justify-between pb-6">
                <h1 className="text-h4 mb-0 flex items-center justify-start gap-3">
                    <Link href={`/projects`}><ChevronLeft className={'text-themeGrayscale600'} width={10} /></Link>
                    <span className='shrink-0'>{t(project_detail?.name)} </span>
                </h1>
                <div className='flex gap-4 items-center'>
                    <Button className={"btn btn-primary"} onClick={() => setBoard(true)}>{t("Create Task Board")}</Button>

                </div>
            </div>
            <div className='flex gap-6 items-start'>
                <div className='flex flex-col gap-6'>
                    <div className='bg-white p-6 rounded-lg'>
                        <div className='flex justify-between items-center mb-2'>
                            { edit ? 
                            (<>
                            <form  className="flex items-center gap-4" onSubmit={event => { event.preventDefault(); formik.handleSubmit() }} >
                           
                            <Input type={"text"}
                            name={"name"} 
                            containerClass={'zt-formGroupV2'}
                            className={" text-lg font-bold border focus:outline-none"}
                            value={formik.values.name}
                            formik={formik}
                            />
                            <Button type="submit" className='d-inline cursor-pointer justify-end' is_loading={is_loading} disabled={is_loading || !formik.isValid} ><Tick /></Button>
                            </form>
                            </> 
                            ) 
                            : 
                            (<>
                            <h2 className='text-lg font-bold mb-0'>{t(project_detail?.name)}</h2>
                            <span onClick={() => { setEdit(!edit) }} className='cursor-pointer'><Edit /></span> 
                            </>) 
                            }
                        </div>
                        <span className='text-themeGrayscale600 text-sm block mb-4'>{t("1 open tasks, 9 tasks completed")}</span>
                        <p className='text-themeGrayscale600 text-sm'> {removeTags(project_detail?.description)} </p>
                    </div>
                    <div  className='bg-white p-6 rounded-lg'>
                        <h2 className='text-lg font-bold'>{t("Uploaded files")}</h2>
                        <div className='flex flex-col gap-2'>
                            {[0, 1].map((ele, i) => (
                                <div key={i} className='border items-center border-themeGrayscale300 rounded-lg py-3 px-4 flex justify-between'>
                                    <div className='flex gap-3 items-center'>
                                        <PdfIcon />
                                        <div className='flex flex-col text-xs font-medium'>
                                            <span className='mb-1 text-themeGrayscale900'>{t("AHA Selfcare Mobile Application Test-Cases.pdf")}</span>
                                            <span>{t("1.4 Mb")} &nbsp; <span className='text-lightOrange'>{t("by Jhon Carter")}</span></span>
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Button type="button" variant={'light-success'} className={'!p-2'}>
                                            <ShareIcon className={'h-4 w-4'} />
                                        </Button>
                                        <Button type="button" variant={'light-primary'} className={'!p-2'}>
                                            <Download className={'h-4 w-4'} />
                                        </Button>
                                        <Button type="button" variant={'light-danger'} className={'!p-2'}>
                                            <Trash className={'h-4 w-4'} />
                                        </Button>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-6 min-w-[388px]'>
                    <div className='bg-white p-6 flex flex-col gap-4 rounded-lg border border-themeGrayscale200'>
                        <div className='flex justify-between items-center'>
                            <h2 className='text-lg font-bold mb-0'>{t("Project Details")}</h2>
                            <span className='cursor-pointer'><Edit /></span>
                        </div>
                        <hr className='bg-themeGrayscale200' />
                        <div className='flex justify-between text-sm'>
                            <span className='text-themeGrayscale600'>{t("Total Hours")}</span>
                            <span className='text-themeGrayscale900 font-semibold'>{t("100 Hours")}</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-themeGrayscale600'>{t("Created Date")}</span>
                            <span className='text-themeGrayscale900 font-semibold'>
                                <DisplayDate date={project_detail?.startDate} />
                            </span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-themeGrayscale600'>{t("Deadline")}</span>
                            <span className='text-themeGrayscale900 font-semibold'>
                            <DisplayDate date={project_detail?.endDate} />
                            </span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-themeGrayscale600'>{t("Priority")}</span>
                            <span className='zt-tag zt-tag-danger !rounded-lg !p-2'>{project_detail?.priority}</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-themeGrayscale600'>{t("Status")}</span>
                            <span className='text-themeGrayscale900 font-semibold'>{t(project_detail?.status)}</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-themeGrayscale600'>{t("Created by")}</span>
                            <span className='text-themeGrayscale900 font-semibold'>{t(project_detail?.createdBy?.firstName)} {t(project_detail?.createdBy?.lastName)}</span>
                        </div>
                        <ProgressBar percentage={'40%'} variant={'success'} containerClasses={'flex flex-col gap-4'} titleBarClasses={'mb-0 flex justify-between'} progressClasses={'flex flex-col'} progressBarClasses={'grow rounded-full'} />
                    </div>
                    <div className='bg-white p-6 flex flex-col gap-4 rounded-lg border border-themeGrayscale200'>
                        <div className='flex justify-between items-center'>
                            <h2 className='text-lg font-bold mb-0'>{t("Assigned Leader")}</h2>
                            <Button variant={'dark'} className={'!text-xs !px-6 !py-2'}><Plus className='h-[16px]' /> Add</Button>
                        </div>
                        <hr className='bg-themeGrayscale200' />
                        {project_detail?.leads?.map((lead, index) => (
                            <div key={index} className='flex gap-2 items-center'>
                                <figure>
                                    <Image src='/assets/images/users/user-01.jpg' alt='profile' width={32} height={32} className='rounded-full object-cover' />
                                </figure>
                                <div className='text-xs'>
                                    <h3 className='mb-0 text-xs font-semibold text-themeGrayscale900'>{t(lead?.firstName)} {t(lead?.lastName)} </h3>
                                    <span className='text-themeGrayscale600'>Manager</span>
                                </div>
                            </div>))}
                    </div>
                    <div className='bg-white p-6 flex flex-col gap-4 rounded-lg border border-themeGrayscale200'>
                        <div className='flex justify-between items-center'>
                            <h2 className='text-lg font-bold mb-0'>{t("Assigned Users")}</h2>
                            <Button variant={'dark'} className={'!text-xs !px-6 !py-2'}><Plus className='h-[16px]' /> Add</Button>
                        </div>
                        <hr className='bg-themeGrayscale200' />
                        {project_detail?.members?.map((member, index) => (
                        <div key={index} className='flex gap-2 items-center'>
                            <figure>
                                <Image src='/assets/images/users/user-01.jpg' alt='profile' width={32} height={32} className='rounded-full object-cover' />
                            </figure>
                            <div className='text-xs'>
                                <h3 className='mb-0 text-xs font-semibold text-themeGrayscale900'>{t(member?.firstName)} {t(member?.lastName)} </h3>
                                <span className='text-themeGrayscale600'>{t("Manager")}</span>
                            </div>
                        </div>))}
                    </div>
                </div>
            </div>
        </section>
        }

        {board && <CreateBoardForm
            title={t('Create Task Board')}
            type={'Feedback'}
            onClose={() => { setBoard(false) }}
          />}
    </>)
}