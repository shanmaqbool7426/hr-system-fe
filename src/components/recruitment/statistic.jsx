import React from 'react'
import { LineChart } from '../svg'

export default function Statistic({ variant, statIcon, title, statCount, statRatio }) {
  return (
    <div className={`zt-statistic ${variant && `zt-statistic-${variant}`}`}>
      <div className='flex flex-col gap-4'>
        <span className='zt-statIcon'>{statIcon ? statIcon : 'Provide icon'}</span>
        <span className='zt-statTitle'>{title ? title : 'Title'}</span>
      </div>
      <div className='flex flex-col gap-4'>
        <h2>{statCount ? statCount : 'Provide count'}</h2>
        <span className='zt-statRatio flex items-center gap-2'>
          <em className='text-sm not-italic'>{statRatio ? statRatio : 'Provide Ratio'}</em>
          <LineChart width={'20'} height={'20'} />
        </span>
      </div>
    </div>
  )
}