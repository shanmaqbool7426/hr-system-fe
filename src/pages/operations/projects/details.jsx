import { useTranslation } from 'react-i18next'

import { Button } from '@/components/elements'
import { ChevronLeft, Download, Edit, PdfIcon, Plus, ShareIcon, Trash } from '@/components/svg' 
import Link from 'next/link'
import { useEffect } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { FetchEmployeeDetails } from '@/store/actions/employee.actions'
import PageLoader from '@/components/elements/PageLoader' 
import ProgressBar from '@/components/elements/ProgressBar'
import Image from 'next/image'
import { useRouter } from 'next/router'
export default function ProjectsDetailPage() {
    const { t } = useTranslation()

    const router = useRouter()
    const dispatch = useDispatch()
    const { is_loading, employee_details } = useSelector((state) => state.employee)
    useEffect(() => {
        const employeeId = router.query.employeeId
        if (employeeId) {
            dispatch(FetchEmployeeDetails(employeeId))
        }
    }, [router, dispatch])

    return (
        <section className="flex flex-col grow">
            {is_loading && <PageLoader />}
            <div className="flex items-center justify-between pb-6">
                <h1 className="text-h4 mb-0 flex items-center justify-start gap-3">
                    <Link href={`/projects`}><ChevronLeft className={'text-themeGrayscale600'} width={10} /></Link>
                    <span className='shrink-0'>{t("Office Management")}</span>
                </h1>
                <div className='flex gap-4 items-center'>
                    <Button onClick={()=>{router.push('/projects/task-board')}} className={"btn btn-dark-outline"}>{t("Task Board")}</Button>
                    <Button className={"btn btn-primary"}>{t("Edit  Project")}</Button>
                </div>
            </div>
            <div className='flex gap-6 items-start'>
                <div className='flex flex-col gap-6'>
                    <div className='bg-white p-6 rounded-lg'>
                        <div className='flex justify-between items-center mb-2'>
                            <h2 className='text-lg font-bold mb-0'>{t("Office Management")}</h2>
                            <span className='cursor-pointer'><Edit /></span>
                        </div>
                        <span className='text-themeGrayscale600 text-sm block mb-4'>{t("1 open tasks, 9 tasks completed")}</span>
                        <p className='text-themeGrayscale600 text-sm'>{t("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum sollicitudin libero vitae est consectetur, a molestie tortor consectetur. Aenean tincidunt interdum ipsum, id pellentesque diam suscipit ut. Vivamus massa mi, fermentum eget neque eget, imperdiet tristique lectus. Proin at purus ut sem pellentesque tempor sit amet ut lectus. Sed orci augue, placerat et pretium ac, hendrerit in felis. Integer scelerisque libero non metus commodo, et hendrerit diam aliquet. Proin tincidunt porttitor ligula, a tincidunt orci pellentesque nec. Ut ultricies maximus nulla id consequat. Fusce eu consequat mi, eu euismod ligula. Aliquam porttitor neque id massa porttitor, a pretium velit vehicula. Morbi volutpat tincidunt urna, vel ullamcorper ligula fermentum at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel elit neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. ")}</p>
                    </div>
                    <div className='bg-white p-6 rounded-lg'>
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
                            <span className='text-themeGrayscale900 font-semibold'>{t("25 Feb 2024")}</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-themeGrayscale600'>{t("Deadline")}</span>
                            <span className='text-themeGrayscale900 font-semibold'>{t("25 May 2024")}</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-themeGrayscale600'>{t("Priority")}</span>
                            <span className='zt-tag zt-tag-danger !rounded-lg !p-2'>{t("High Priority")}</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-themeGrayscale600'>{t("Status")}</span>
                            <span className='text-themeGrayscale900 font-semibold'>{t("Working")}</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-themeGrayscale600'>{t("Created by")}</span>
                            <span className='text-themeGrayscale900 font-semibold'>{t("Created by")}</span>
                        </div>
                        <ProgressBar percentage={'40%'} variant={'success'} containerClasses={'flex flex-col gap-4'} titleBarClasses={'mb-0 flex justify-between'} progressClasses={'flex flex-col'} progressBarClasses={'grow rounded-full'} />
                    </div>
                    <div className='bg-white p-6 flex flex-col gap-4 rounded-lg border border-themeGrayscale200'>
                        <div className='flex justify-between items-center'>
                            <h2 className='text-lg font-bold mb-0'>{t("Assigned Leader")}</h2>
                            <Button variant={'dark'} className={'!text-xs !px-6 !py-2'}><Plus className='h-[16px]' /> Add</Button>
                        </div>
                        <hr className='bg-themeGrayscale200' />
                        <div className='flex gap-2 items-center'>
                            <figure>
                                <Image src='/assets/images/users/user-01.jpg' alt='profile' width={32} height={32} className='rounded-full object-cover' />
                            </figure>
                            <div className='text-xs'>
                                <h3 className='mb-0 text-xs font-semibold text-themeGrayscale900'>{t("Leland Boehm")}</h3>
                                <span className='text-themeGrayscale600'>{t("Manager")}</span>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white p-6 flex flex-col gap-4 rounded-lg border border-themeGrayscale200'>
                        <div className='flex justify-between items-center'>
                            <h2 className='text-lg font-bold mb-0'>{t("Assigned Users")}</h2>
                            <Button variant={'dark'} className={'!text-xs !px-6 !py-2'}><Plus className='h-[16px]' /> Add</Button>
                        </div>
                        <hr className='bg-themeGrayscale200' />
                        <div className='flex gap-2 items-center'>
                            <figure>
                                <Image src='/assets/images/users/user-01.jpg' alt='profile' width={32} height={32} className='rounded-full object-cover' />
                            </figure>
                            <div className='text-xs'>
                                <h3 className='mb-0 text-xs font-semibold text-themeGrayscale900'>{t("Leland Boehm")}</h3>
                                <span className='text-themeGrayscale600'>{t("Manager")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}