import React from 'react'
import { useTranslation } from 'react-i18next'

const EvaluationTab = () => {
    const { t } = useTranslation()
    const screeningData=[
        {text:"Communication Skills",count:"10"},
        {text:"Interpersonal Skills",count:"10"},
        {text:"Motivation and Enthusiasm",count:"10"},
        {text:"References and Background",count:"10"},
        {text:"Cognitive and Personality Assessments",count:"10"},
    ]
    return (
        <div>
            <h2 className='font-bold text-xl'>{t("Evaluations")}</h2>
            <h3 className='text-lg font-semibold mb-2'>{t("Screening")}</h3>
            <div className='flex flex-col gap-4'>
                {screeningData.map((ele,i)=>(
                    <div className='flex justify-between' key={i}>
                        <span>{ele.text}</span>
                        <span>{ele.count}</span>
                    </div>
                ))}
                <span className='text-lg font-semibold'>{t("Interview Feedback")}</span>
                <span className='font-semibold'>{t("First Interview with Mr. John, Team Lead of Design Department ")}</span>
                <div className='flex justify-between'>
                    <span className='font-semibold'>{t("Satisfaction Score")}</span>
                    <span>{t("10")}</span>
                </div>
                <span className='font-semibold'>{t("Feedback")}</span>
                <div className='flex justify-between gap-8 items-center'>
                    <span className=''>{t("Mrs. Usman is good fit to this position. he has technical expertise. I highly recemented this candidate for further process")}</span>
                    <span>{t("10")}</span>
                </div>
                <div className='flex justify-between gap-8 items-center'>
                    <span className='font-semibold'>{t("Second Interview with Mr. John, Team Lead of Design Department ")}</span>
                    <span>{t("03")}</span>
                </div>
                <div className='flex justify-between gap-8 items-center'>
                    <span className='font-semibold'>{t("Satisfaction Score")}</span>
                    <span>{t("01")}</span>
                </div>
            </div>

        </div>
    )
}

export default EvaluationTab
