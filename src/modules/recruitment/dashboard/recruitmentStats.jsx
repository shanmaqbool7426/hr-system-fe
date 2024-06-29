import Image from 'next/image'
import React from 'react'

export const RecruitmentStats = () => {
    const data=[
        {count:"33", img:"/assets/images/asset/interview_schedule.png",text:"Interview Scheduled",textWidth:"w-1/2"},
        {count:"2", img:"/assets/images/asset/interview_schedule_01.png",text:"Interview  Feedback Pending"},
        {count:"2", img:"/assets/images/asset/interview_schedule_02.png",text:"Approval Pending",textWidth:"w-1/2"},
        {count:"12", img:"/assets/images/asset/interview_schedule_03.png",text:"Offer Acceptance Pending"},
        {count:"12", img:"/assets/images/asset/interview_schedule_04.png",text:"Documentations Pending",textWidth:"w-1/2"},
        {count:"12", img:"/assets/images/asset/interview_schedule_05.png",text:"Training Pending",textWidth:"w-1/2"},
        {count:"12", img:"/assets/images/asset/interview_schedule_06.png",text:"Supervisor Allocation Pending"},
        {count:"12", img:"/assets/images/asset/interview_schedule_07.png",text:"Supervisor Allocation Pending"},
    ]
  return (
    <div className='grid custom__grid gap-x-8 gap-y-14 mb-6'>
        {data.map((ele,i)=>(
            <div key={i} className='zt-card relative flex flex-col'>
                <span className='absolute -top-5 -left-5 h-14 w-14 border border-themeGrayscale300 bg-white rounded-2xl font-bold text-3xl flex justify-center items-center'>{ele.count}</span>
               <figure className='shrink-0 self-end h-16 w-16 flex justify-center items-center rounded-full bg-themeBlue/20'>
                    <Image src={ele.img} height={54} width={71} alt='Recruitement Stats'/>
                </figure>  
                <h3 className={`${ele.textWidth} text-sm font-semibold mb-0`}>{ele.text}</h3>               
            </div>
        ))}
    </div>
  )
}
