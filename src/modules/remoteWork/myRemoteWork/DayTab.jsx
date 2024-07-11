import React from 'react'
import ActivityStats from './ActivityStats'
import AppsState from './AppsState'

const DayTab = () => {
  return (
    <div className='zt-card grow flex flex-col gap-6'>
        <ActivityStats/>   
        <AppsState/>   
    </div>
  )
}

export default DayTab
