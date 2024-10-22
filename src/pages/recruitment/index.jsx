import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Button } from '@/components/elements'
import { UpcomingSchedule } from '@/modules/dashboard/UpcomingSchedule'
import { EmployeeListed } from '@/modules/recruitment/dashboard/EmployeeListed'
import { RecruitmentStats } from '@/modules/recruitment/dashboard/recruitmentStats'
import CandidateFieldForm from '@/components/forms/recruitment/add-candidate/create'

export default function Recruitment() {
  const { t } = useTranslation()

  const [create, setCreate] = useState(false)
  const [edit, setEdit] = useState(false)
  return (
    <section className="flex flex-col grow">
      {/* {is_loading && <PageLoader/>} */}
      <div className="flex justify-between pb-10">
        <div className="flex flex-col">
          <h1 className="text-h4 mb-0">{t("Recruitment")}</h1>
        </div>
        <div className="flex items-start gap-2">
          <Button className={"btn btn-dark-outline"} onClick={() => setCreate(true)}>{t("Add Candidate")}</Button>
          <Button className={"btn btn-dark"}>{t("Add Job")}</Button>
        </div>
      </div>
      <div className="flex flex-col-reverse 2xl:block">
        <div className="w-full 2xl:w-9/12 2xl:float-left">
          <RecruitmentStats />
          <EmployeeListed />
        </div>
        <UpcomingSchedule className={'!h-auto'} title={'Upcoming Meetings'} />
      </div>
      {create && <CandidateFieldForm 
        onClose={() => { setCreate(false); setEdit(null) }}
        object={edit}
      />}
    </section>
  )
}