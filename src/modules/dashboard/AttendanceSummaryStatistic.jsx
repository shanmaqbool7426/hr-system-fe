import React from 'react'

const COLORS = ['#8C62FF', '#8C62FF', '#8C62FF', '#8C62FF', '#FFD023', '#0BA259', '#55C790', "#E03137", "#243C7A", "#8C62FF"];

export const AttendanceSummaryStatistic = () => {
  return (
    <div className={'zt-attendanceStatistics col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:hidden'}>
      <div className={'zt-attendanceStatisticCard'}>
        <h2><span className={'text-themePurple'}>10</span><sup className={'pl-2 font-normal -top-3 text-sm'}>Days</sup></h2>
        <h3 className={'text-themePurple'}>Present</h3>
      </div>
      <div className={'zt-attendanceStatisticCard'}>
        <h2><span className={'text-themeSecondary'}>02</span><sup className={'pl-2 font-normal -top-3 text-sm'}>Days</sup></h2>
        <h3 className={'text-themeSecondary'}>Late</h3>
      </div>
      <div className={'zt-attendanceStatisticCard'}>
        <h2><span className={'text-themePrimary'}>03</span><sup className={'pl-2 font-normal -top-3 text-sm'}>Days</sup></h2>
        <h3 className={'text-themePrimary'}>Early</h3>
      </div>
      <div className={'zt-attendanceStatisticCard'}>
        <h2><span className={'text-themeSuccessLight'}>04</span><sup className={'pl-2 font-normal -top-3 text-sm'}>Days</sup></h2>
        <h3 className={'text-themeSuccessLight'}>Half Day</h3>
      </div>
      <div className={'zt-attendanceStatisticCard'}>
        <h2><span className={'text-themeGrayscale500'}>05</span><sup className={'pl-2 font-normal -top-3 text-sm'}>Days</sup></h2>
        <h3 className={'text-themeGrayscale500'}>Quarter Days</h3>
      </div>
      <div className={'zt-attendanceStatisticCard'}>
        <h2><span className={'text-lightOrange'}>06</span><sup className={'pl-2 font-normal -top-3 text-sm'}>Days</sup></h2>
        <h3 className={'text-lightOrange'}>Short Day</h3>
      </div>
      <div className={'zt-attendanceStatisticCard'}>
        <h2><span className={'text-themeDanger'}>07</span><sup className={'pl-2 font-normal -top-3 text-sm'}>Days</sup></h2>
        <h3 className={'text-themeDanger'}>Absent</h3>
      </div>
      <div className={'zt-attendanceStatisticCard'}>
        <h2><span className={'text-themePrimary'}>08</span><sup className={'pl-2 font-normal -top-3 text-sm'}>Days</sup></h2>
        <h3 className={'text-themePrimary'}>Absent For Short Time</h3>
      </div>
      <div className={'zt-attendanceStatisticCard'}>
        <h2><span className={'text-themeSuccessDark'}>09</span><sup className={'pl-2 font-normal -top-3 text-sm'}>Days</sup></h2>
        <h3 className={'text-themeSuccessDark'}>Leave</h3>
      </div>
      <div className={'zt-attendanceStatisticCard'}>
        <h2><span className={'text-themeGrayscale300'}>10</span><sup className={'pl-2 font-normal -top-3 text-sm'}>Days</sup></h2>
        <h3 className={'text-themeGrayscale300'}>Missing</h3>
      </div>
      <div className={'zt-attendanceStatisticCard'}>
        <h2><span className={'text-themeGrayscale'}>11</span><sup className={'pl-2 font-normal -top-3 text-sm'}>Days</sup></h2>
        <h3 className={'text-themeGrayscale'}>Off</h3>
      </div>
    </div>
  )
}