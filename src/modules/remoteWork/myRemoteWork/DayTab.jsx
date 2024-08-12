import React from 'react' 
import AppsState from './AppsState'
import { ArivalIcon, LeftTimeIcon, ProductiveTimeIcon, RemoteTimeIcon } from '@/components/svg'

const DayTab = () => {
  const activityData = [
    { text: "Arrival Time ",time:"9:00AM",stats:"Last Update July,25 2024, 5:40pm",icon:<ArivalIcon/>, bg:"bg-themeBlue" },
    { text: "Left Time ",time:"6:00PM",stats:"Last Update July,25 2024, 5:40pm",icon:<LeftTimeIcon/>, bg:"bg-themeOrange" },
    { text: "Productive Time ",time:"6 hr",stats:"Last Update July,25 2024, 5:40pm",icon:<ProductiveTimeIcon/>, bg:"bg-themeSuccess" },
    { text: "Total Remote Time ",time:"6 hr",stats:"Last Update July,25 2024, 5:40pm",icon:<RemoteTimeIcon/>, bg:"bg-RoyalHeath" },

  ]
  return (
    <div className='zt-card grow flex flex-col gap-6'>
      <div className='zt-remote__grid grid gap-6'>
        {activityData.map((ele,i)=>(
          <div className={`${ele.bg} rounded-lg text-white`} key={i}>
            <div className='flex items-center gap-3 px-5 pt-5 mb-10'>
              {ele.icon}
              <h2 className='mb-0 font-semibold text-2xl text-white'>{ele.text}</h2>
            </div>
            <h3 className='font-semibold text-2xl text-white px-5 mb-5'>{ele.time}</h3>
            <p className='text-sm px-5 pb-1 mb-4 border-white border-b'>{ele.stats}</p>
          </div>
        ))}
      </div> 
      <AppsState />
    </div>
  )
}

export default DayTab
