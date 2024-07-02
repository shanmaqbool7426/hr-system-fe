import { ReadPdfIcon, WordIcon } from '@/components/svg'
import React from 'react'
import { useTranslation } from 'react-i18next'

const CertificationTab = () => {
    const { t } = useTranslation()

    return (
        <div>
            <h2 className='font-bold text-xl'>{t("Certifications")}</h2>
            <ul className='zt-candidateExperiance'>
                <li>
                    <span className='flex flex-col'>
                        <span className='font-bold block'>{t("Certificate of Mastery")}</span>
                        <span className='text-themeGrayscale500'>{t("Certificate No. 101012156")}</span>
                    </span>
                </li>
                <li>
                <span className='flex flex-col'>
                        <span className='font-bold block'>{t("Certificate of Attainment")}</span>
                        <span className='text-themeGrayscale500 block mb-6'>{t("Certificate No. 101012156")}</span>
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default CertificationTab
