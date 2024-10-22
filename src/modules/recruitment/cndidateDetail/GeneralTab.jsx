import React from 'react'
import { useTranslation } from 'next-i18next'

const GeneralTab = () => {
    const { t } = useTranslation()
    const data=[
        {text:"Employee CNIC",value:"32309-5999848-9"},
        {text:"Father Name",value:"Jhon Wick"},
        {text:"Passport Number",value:"89623"},
        {text:"Gender",value:"Male"},
        {text:"Martial Status",value:"Married"},
        {text:"Nationality",value:"USA"},
        {text:"Religion",value:"Muslim"},
    ]
    return (
        <div className=''>
            <h2 className='font-bold text-xl'>{t("General")}</h2>
            <h3 className='font-bold text-lg mb-4'>{t("Personal Information")}</h3>
            <div className='flex flex-col gap-4 w-2/6'>
                {data.map((ele,i)=>(
                    <div className='grid grid-cols-2 text-sm' key={i}>
                        <span className='text-themeGrayscale600'>{ele.text}</span>
                        <span className='font-semibold'>{ele.value}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GeneralTab
