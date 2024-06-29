import { useTranslation } from "next-i18next";
import { Button } from "@/components/elements";

export default function LeaveGazettedHolidaysPage() {
  const { t } = useTranslation()

  return (
    <section className="flex flex-col grow">
      <div className="flex justify-between items-center pb-6">
        <div className="">
          <h1 className="text-h4 mb-0">{t("Gazetted Holidays")}</h1>
          <p className="mb-0">{t("Your Gazetted Holidays")}</p>
        </div>
        <div className="flex items-start gap-2">
          <Button className={"btn btn-primary"} onClick={() => setCreate(true)}>{t("Apply Leave")}</Button>
        </div>
      </div>
      <div className="zt-card grow">

      </div>
    </section>
  )
}