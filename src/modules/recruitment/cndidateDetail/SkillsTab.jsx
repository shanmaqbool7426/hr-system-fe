import React from 'react'
import { useTranslation } from 'react-i18next'

const SkillsTab = () => {
    const { t } = useTranslation()
    const skills=["UX Design","Problem Solving","User Interface Design","Adobe Illustrator","Adobe Photoshop","Interaction Design","Figma","Interactive Prototyping ","Node JS","Invasion"]
    return (
        <div>
            <h2 className='font-bold text-xl'>{t("Skills")}</h2>
            <div className='flex gap-2 flex-wrap'>
                {skills.map((ele,i)=>(
                    <span key={i} className='text-sm font-medium p-3 bg-themeGrayscale100 rounded-xl'>{ele}</span>
                ))}
            </div>

        </div>
    )
}

export default SkillsTab
