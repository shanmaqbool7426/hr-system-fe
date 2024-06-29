import React, { useState } from 'react'

import PersonalInfoCard from './PersonalInfoCard';
import CompanyInfoCard from './CompanyInfoCard'
import EmergencyContactCard from './EmergencyContactCard';
import NextOfKinCard from './NextOfKinCard';
import Reference1Card from './Reference1Card';
import Reference2Card from './Reference2Card';
import BankInfoCard from './BankInfoCard';
import GovernmentRegistrationCard from './GovernmentRegistrationCard';
import EducationInformationCard from './EducationInformationCard';
import ExperienceInformationCard from './ExperienceInformationCard';

export default function EmployeeInfoModule() {
  const companyInfo = {
    "Grade": "A",
    "Country": "USA",
    "Station": "Head Office",
    "Allow Attendance Mobile App": "Yes",
    "Allow Attendance Web Portal": "No"
  }

  const experienceInformation = [
    {
      "companyName": "Digital Devlopment Inc",
      "location": "USA",
      "designation": "UI Designer",
      "startDate": "22-01-2003",
      "endDate": "22-01-2005"
    },
    {
      "companyName": "Digital Devlopment Inc",
      "location": "USA",
      "designation": "UI Designer",
      "startDate": "22-01-2003",
      "endDate": "22-01-2005"
    }
  ]

  return (
    <div className='grid grid-cols-2 gap-6'>
      <PersonalInfoCard />
      <CompanyInfoCard />
      <EmergencyContactCard />
      <NextOfKinCard />
      <Reference1Card />
      <Reference2Card />
      <BankInfoCard />
      <GovernmentRegistrationCard />
      <EducationInformationCard />
      <ExperienceInformationCard />
    </div>
  )
}