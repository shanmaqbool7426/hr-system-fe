import { useState } from "react";
import { useTranslation } from "next-i18next";
import { Button } from "@/components/elements";
import { Leaves } from "@/modules/leaves/dashboard/Leaves";
import { MyRequests } from "@/modules/dashboard/MyRequests";
import { PublicHolidays } from "@/modules/leaves/dashboard/PublicHolidays";
import AddLeaveRequestForm from "@/components/forms/leaves/add-leave-request";
import { TeamUnavailability } from "@/modules/leaves/dashboard/TeamUnavailability";

export default function LeavesDashboardPage() {
  const { t } = useTranslation()
  const [add, setAdd] = useState(false)
  return (
    <section className="grid grid-cols-3 gap-6">
      <div className="flex justify-between items-center col-span-3">
        <h1 className="text-h4 mb-0">{t("Dashboard")}</h1>
        <div className="flex gap-4">
          <Button className={''} variant={'dark-outline'}>{t("CPL Request")}</Button>
          <Button onClick={() => setAdd(true)} className={''} variant={'primary'}>{t("Leave Request")}</Button>
        </div>
      </div>
      <Leaves />
      <PublicHolidays />
      <TeamUnavailability />
      <MyRequests />
      {add &&
        <AddLeaveRequestForm
          title={t('Add Leave Request')}
          type={'Add Leave Request'}
          onClose={() => { setAdd(false) }}
        />
      }
    </section>
  )
}
