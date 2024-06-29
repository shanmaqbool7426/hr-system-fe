import React from 'react'
import SalaryCard from './salary/salaryCard'
import BankInfoCard from './employeeInfo/BankInfoCard'

export default function SalaryModule () {
  return (
    <div className='grid grid-cols-2 gap-6'>
      <SalaryCard />
      <BankInfoCard />
    </div>
  )
}