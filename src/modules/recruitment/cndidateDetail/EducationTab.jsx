import { ReadPdfIcon, WordIcon } from '@/components/svg'
import React from 'react'
import { useTranslation } from 'next-i18next'

const EducationTab = () => {
    const { t } = useTranslation()

    return (
        <div>
            <h2 className='font-bold text-xl'>{t("Education Information")}</h2>
            <ul className='zt-candidateExperiance'>
                <li>
                    <span className='flex flex-col'>
                        <span className='font-bold text-sm block mb-1'>{t("International College of Arts and Science (UG)")}</span>
                        <span className='font-semibold text-xs text-themeGrayscale600'>{t("Bsc Computer Science")}</span>
                        <span className='font-semibold text-xs text-themeGrayscale600'>{t("2000 - 2003")}</span>
                    </span>
                </li>
                <li>
                    <span className='flex flex-col'>
                        <span className='font-bold text-sm block mb-1'>{t("International College of Arts and Science (UG)")}</span>
                        <span className='font-semibold text-xs text-themeGrayscale600'>{t("Bsc Computer Science")}</span>
                        <span className='font-semibold text-xs text-themeGrayscale600 mb-6'>{t("2000 - 2003")}</span>
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default EducationTab
