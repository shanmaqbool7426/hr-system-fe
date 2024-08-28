import ProgressBar from '@/components/elements/ProgressBar'
import React from 'react'
import { useTranslation } from 'react-i18next'

const TicketHistory = () => {
  const { t } = useTranslation()
  const TicketSolverData = [
    { text: "Ticket Owner", value: "100" },
    { text: "Ticket Owner", value: "80" },
    { text: "Ticket Owner", value: "70" },
    { text: "Ticket Owner", value: "60" },
  ]
  return (
    <div className='flex gap-6 mb-6'>
      <div className='zt-card w-1/2 flex flex-col gap-4'>
        <h2 className='m-0 text-2xl font-bold'>{t("Tickets By Priority")}</h2>
        <div className='border rounded-xl p-3'>
          <ProgressBar title={'High'} percentage={`70%`} variant={'danger'} containerClasses={'flex flex-col gap-2'} titleBarClasses={'mb-0 flex justify-between'} progressClasses={'flex flex-col'} progressBarClasses={'grow rounded-full'} />
        </div>
        <div className='border rounded-xl p-3'>
          <ProgressBar title={'Medium'} percentage={`50%`} variant={'lightOrange'} containerClasses={'flex flex-col gap-2'} titleBarClasses={'mb-0 flex justify-between'} progressClasses={'flex flex-col'} progressBarClasses={'grow rounded-full'} />
        </div>
        <div className='border rounded-xl p-3'>
          <ProgressBar title={'Low'} percentage={`43%`} variant={'success'} containerClasses={'flex flex-col gap-2'} titleBarClasses={'mb-0 flex justify-between'} progressClasses={'flex flex-col'} progressBarClasses={'grow rounded-full'} />
        </div>
        <div className='border rounded-xl p-3'>
          <ProgressBar title={'Critical'} percentage={`43%`} variant={'secondary'} containerClasses={'flex flex-col gap-2'} titleBarClasses={'mb-0 flex justify-between'} progressClasses={'flex flex-col'} progressBarClasses={'grow rounded-full'} />
        </div>
      </div>
      <div className='zt-card w-1/2 flex flex-col gap-6'>
        <h2 className='m-0 text-2xl font-bold'>{t("Top Ticket Solvers This week")}</h2>
        {TicketSolverData.map((ele, i) => (
          <div key={i} className='bg-themePrimary rounded-full flex justify-between items-center px-5 py-4 text-white'>
            <span className='text-xl'>{ele.text}</span>
            <span className='font-bold text-2xl'> {ele.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TicketHistory
