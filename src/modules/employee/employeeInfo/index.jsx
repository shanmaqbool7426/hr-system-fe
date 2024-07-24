import React from 'react'

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
import AppointmentCard from '../documents/AppointmentCard';
import SeperationCard from './SeperationInformation';

export default function EmployeeInfoModule() {

  return (
    <div className='grid grid-cols-2 gap-6'>
      <PersonalInfoCard />
      <CompanyInfoCard />
      <AppointmentCard />
      <SeperationCard/>
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