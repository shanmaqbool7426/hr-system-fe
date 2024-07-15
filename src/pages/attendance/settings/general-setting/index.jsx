import React from "react";
import { useTranslation } from "react-i18next";
import GeneralSettingModule from "@/modules/attendance/GeneralSetting";
export default function AttendanceGeneralSettingPage() {
  const { t } = useTranslation();
  return (
    <section className="flex flex-col grow relative">
      <div className="flex justify-between pb-12">
        <div className="flex flex-col">
          <h1 className="text-h4 mb-0">{t("Attendance Settings")}</h1>
        </div>
      </div>
      <GeneralSettingModule />
    </section>
  );
}
