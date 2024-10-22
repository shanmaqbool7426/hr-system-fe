import { ReadPdfIcon, WordIcon } from '@/components/svg'
import React from 'react'
import { useTranslation } from 'next-i18next'

const ExperinceTab = () => {
    const { t } = useTranslation()

    return (
        <div>
            <h2 className='font-bold text-xl'>{t("Candidate Files")}</h2>
            <div className='flex gap-4 mb-6'>
                <div className='flex gap-2 items-center p-2 rounded-lg border bg-themeGrayscale50'>
                    <ReadPdfIcon />
                    <span className='text-sm'>{t("Cover_letter.pdf")}</span>
                    <span className='text-xs text-themeGrayscale500'>{t("2d ago")}</span>
                </div>
                <div className='flex gap-2 items-center p-2 rounded-lg border bg-themeGrayscale50'>
                    <WordIcon />
                    <span className='text-sm'>{t("My_resume.pdf")}</span>
                    <span className='text-xs text-themeGrayscale500'>{t("2d ago")}</span>
                </div>
            </div>
            <h3 className='text-lg font-bold mb-4'>{t("Last Experience")}</h3>
            <ul className='zt-candidateExperiance'>
                <li>
                    <span className='flex flex-col gap-2'>
                        <span className='font-bold'>{t("Senior Data Analyst")}</span>
                        <p className=''>{t("Google")} <span className='text-themeGrayscale500'>{t("(May 2021 - Present)")}</span></p>
                    </span>
                </li>
                <li>
                    <span className='flex flex-col gap-2'>
                        <span className='font-bold'>{t("Junior Data Analyst")}</span>
                        <p className=''>{t("Microsoft")} <span className='text-themeGrayscale500'>{t("(May 2021 - Present)")}</span></p>
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default ExperinceTab
