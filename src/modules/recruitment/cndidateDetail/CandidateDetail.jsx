import { Button, Tabs } from '@/components/elements'
import OfferJob from '@/components/forms/recruitment/candidate-detail/OfferJob'
import ScheduleInterview from '@/components/forms/recruitment/candidate-detail/ScheduleInterview'
import { RadialChart } from '@/modules/dashboard/RadialChart'
import { Tab } from '@headlessui/react'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import GeneralTab from './GeneralTab'
import ExperinceTab from './ExperinceTab'
import EducationTab from './EducationTab'
import CertificationTab from './CertificationTab'
import SkillsTab from './SkillsTab'
import EvaluationTab from './EvaluationTab'
import FeedbackTab from './FeedbackTab'

const CandidateDetail = () => {
    const { t } = useTranslation()
    const [schedule, setSchedule] = useState(false)
    const [job, setJob] = useState(false)
    const qualitiesData = [
        { text: "Qualifications and skills match", score: "10" },
        { text: "Experience Rlevance", score: "50" },
        { text: "Education", score: "06" },
        { text: "Keywords Match", score: "08" },
        { text: "Years of Experience", score: "06" },
        { text: "Job Hopping", score: "06" },
        { text: "Cultural Fit", score: "06" },
        { text: "Interview Performance", score: "06" },
        { text: "References", score: "06" },
        { text: "Additional Factors", score: "06" },
    ]
    return (
        <div className='candidate_detail'>
            <Tabs
                containerClasses={'zt-themeTabsV1'}
                tabNavClasses={'zt-themeTabNav1'}
                tabs={["General", "Experience", "Education", "Certifications", "Skills", "Evaluations", "Feedback"]}
            >
                <Tab.Panels className={`zt-themeTabPanels zt-employeeTabsPanel !bg-transparent !p-0 !pr-96`}>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <GeneralTab />
                    </Tab.Panel>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <ExperinceTab />
                    </Tab.Panel>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <EducationTab />
                    </Tab.Panel>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <CertificationTab />
                    </Tab.Panel>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <SkillsTab />
                    </Tab.Panel>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <EvaluationTab />
                    </Tab.Panel>
                    <Tab.Panel className={'zt-themeTabPanel'}>
                        <FeedbackTab />
                    </Tab.Panel>
                </Tab.Panels>
            </Tabs>
            <div className='flex gap-4 absolute right-5 top-3'>
                <Button onClick={() => setSchedule(true)} className={'btn btn-purple'}>{t("Schedule Interview")}</Button>
                <Button onClick={() => setJob(true)} className={'btn btn-orange'}>{t("Offer Job")}</Button>
            </div>
            <div className='absolute top-24 right-6 border p-6 rounded-2xl'>
                <div className='rounded-2xl mb-6 p-6 bg-themeGrayscale50 flex flex-col items-center gap-2'>
                    <RadialChart circleSize={60} fillColor={'#0BA259'} />
                    <p className='font-semibold'>{t("Evaluation Score:")} <span className='text-themeSuccessDark'> {t("Potential Fit")}</span></p>
                </div>
                <div className='flex flex-col gap-4'>
                    {qualitiesData.map((ele, i) => (
                        <div key={i} className='flex justify-between'>
                            <span>{ele.text}</span>
                            <span>{ele.score}</span>
                        </div>
                    ))}
                </div>
            </div>
            {schedule && <ScheduleInterview
                title={'Schedule Interview'} 
                onClose={() => { setSchedule(false) }}
            />}
            {job && <OfferJob 
                onClose={() => { setJob(false) }}
            />}
        </div>
    )
}

export default CandidateDetail
