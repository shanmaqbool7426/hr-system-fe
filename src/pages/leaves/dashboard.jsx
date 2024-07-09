import { useState } from "react";
import { useTranslation } from "next-i18next";
import { Button } from "@/components/elements";
import { Leaves } from "@/modules/leaves/dashboard/Leaves";
import { MyRequests } from "@/modules/dashboard/MyRequests";
import { PublicHolidays } from "@/modules/leaves/dashboard/PublicHolidays";
import CreatLeaveRequestForm from "@/components/forms/leaves/creat-leave-request";
import { TeamUnavailability } from "@/modules/leaves/dashboard/TeamUnavailability";
import CreateCPLLeaveForm from "@/components/forms/leaves/create-cpl-request";

export default function LeavesDashboardPage() {
  const { t } = useTranslation()
  const [add, setAdd] = useState(false)
  const [edit, setEdit] = useState(false)
  const [cpl, setCpl] = useState(false)
  return (
    <section className="grid grid-cols-3 gap-6">
      <div className=" flex justify-between items-center col-span-3">
        <h1 className="text-h4 mb-0">{t("Dashboard")}</h1>
        <div className="flex gap-4">
          <Button onClick={() => setCpl(true)} className={''} variant={'dark-outline'}>{t("CPL Request")}</Button>
          <Button onClick={() => setAdd(true)} className={''} variant={'primary'}>{t("Leave Request")}</Button>
        </div>
      </div>
      <Leaves />
      <PublicHolidays />
      <TeamUnavailability />
      <MyRequests />
      {add &&
        <CreatLeaveRequestForm
          object={edit}
          onClose={() => { setAdd(false) }}
        />
      }
      {cpl &&
        <CreateCPLLeaveForm
          object={edit} 
          onClose={() => { setCpl(false) }}
        />
      }
    </section>
  )
}
