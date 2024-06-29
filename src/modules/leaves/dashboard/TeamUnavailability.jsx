import { SearchSelect } from '@/components/elements'
import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const TeamUnavailability = () => {
    const { t } = useTranslation()
    const data = [
        {
            img: "/assets/images/users/user-01.jpg",
            name: "Jhon Carter",
            designation: "Frontend Developer",
            leaveStatus: "Sick Leave"
        },
        {
            img: "/assets/images/users/user-02.jpg",
            name: "Alicia Berge",
            designation: "UI Designer",
            leaveStatus: "Causal Leave"
        },
        {
            img: "/assets/images/users/user-03.jpg",
            name: "Laurence Mosciski",
            designation: "Backend Developer",
            leaveStatus: "Annual Leave"
        },
        {
            img: "/assets/images/users/user-04.jpg",
            name: "Alicia Berge",
            designation: "UI Designer",
            leaveStatus: "Annual Leave"
        },
        {
            img: "/assets/images/users/user-05.jpg",
            name: "Laurence Mosciski",
            designation: "Backend Developer",
            leaveStatus: "Annual Leave"
        },
        {
            img: "/assets/images/users/user-06.jpg",
            name: "Alicia Berge",
            designation: "UI Designer",
            leaveStatus: "Annual Leave"
        },
    ]
    return (
        <div className='zt-card'>
            <div className='flex justify-between items-center'>
                <h2 className='mb-0 text-lg font-bold'>{t("Team’s Unavailability")}</h2>
                <SearchSelect
                    containerClass='w-36'
                    list={[{ value: `Today`, display: `Today` }, { value: `Tomorrow`, display: `Tomorrow` },]}
                    placeholder={`Today`}
                />
            </div>
            <div className=''>
                {data.map((ele,i)=>(
                    <div key={i} className='p-3 flex justify-between items-center'>
                        <div className='flex gap-2 items-center'>
                            <figure className='shrink-0'>
                                <Image src={ele.img} height={24} width={24} className='rounded-full'/>
                            </figure>
                            <div className='flex flex-col gap-1 text-xs'>
                                <h3 className='font-semibold text-xs mb-0'>{ele.name}</h3>
                                <span className='font-medium text-themeGrayscale500'>{ele.designation}</span>
                            </div>
                        </div>
                        <span className='zt-tag zt-tag-danger !rounded-md !font-semibold'>{ele.leaveStatus}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
