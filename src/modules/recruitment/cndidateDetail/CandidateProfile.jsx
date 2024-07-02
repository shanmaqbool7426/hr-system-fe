import { ChevronLeft } from '@/components/svg'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

const CandidateProfile = () => {
    const { t } = useTranslation()
    return (
        <div className="zt-card flex justify-between">
            <div className='flex gap-4 items-start'>
                <Link href={`/recruitment/candidates`}><ChevronLeft className={'text-themeGrayscale600 mt-3'} width={10} /></Link>
                <div className='flex flex-col gap-4 items-start'>
                    <div className='flex gap-4'>
                        <figure>
                            <Image src={'/assets/images/users/user-01.jpg'} className='rounded-full' height={64} width={64} />
                        </figure>
                        <div className='flex flex-col justify-between'>
                            <div className='flex gap-4'>
                                <h2 className='mb-0 text-xl font-bold'>{t("Vishnu Divakaran")}</h2>
                                <span className='zt-tag !px-3 !rounded-md'>{t("Interview")}</span>
                            </div>
                            <div className='flex gap-2 text-sm text-themeGrayscale500 font-medium'>
                                <span>{t("vishnu.divakaran@gmail.com")}</span><span>|</span><span>{t("+91 6768652551")}</span>                            </div>
                        </div>
                    </div>
                    <span className='zt-tag zt-tag-success !rounded-md'>{t("Short List")}</span>
                </div>
            </div>
            <div className='px-12 border-l border-themeGrayscale300'>
                <span className='pb-4  font-bold block'>{t("Current Status")}</span>
                <div className='grid grid-cols-2 gap-y-2 gap-x-10 text-sm'>
                    <span className='text-themeGrayscale500'>{t("Applied For")}</span>
                    <span className='font-semibold'>{t("MERN Stack")}</span>
                    <span className='text-themeGrayscale500'>{t("Experience")}</span>
                    <span className='font-semibold'>{t("03 years")}</span>
                    <span className='text-themeGrayscale500'>{t("Current Salary")}</span>
                    <span className='font-semibold'>{t("$ 2000")}</span>
                    <span className='text-themeGrayscale500'>{t("Expected Salary")}</span>
                    <span className='font-semibold'>{t("$25000")}</span>
                    <span className='text-themeGrayscale500'>{t("Notice Period")}</span>
                    <span className='font-semibold'>{t("30 Days")}</span>
                </div>
            </div>
        </div>
    )
}

export default CandidateProfile
