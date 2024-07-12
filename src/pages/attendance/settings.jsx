import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Tabs } from "@/components/elements";
import ShiftModule from "@/modules/attendance/Shift";
import ExemptionModule from "@/modules/attendance/Exemption";
import FlagSetting from "@/modules/attendance/FlagSetting";
import PenaltyModule from "@/modules/attendance/Penalty";
import BiometricMachine from "./biometric-machine";
import { Tab } from "@headlessui/react";
import GeneralSettingModule from "@/modules/attendance/GeneralSetting";
export default function AttendanceSettingPage() {
  const { t } = useTranslation();
  return (
    <section className="flex flex-col grow relative">
      <div className="flex justify-between pb-12">
        <div className="flex flex-col">
          <h1 className="text-h4 mb-0">{t("Attendance Settings")}</h1>
        </div>
      </div>

      <Tabs
        containerClasses={"zt-themeTabsV2 grow"}
        tabNavClasses={"zt-themeTabNav"}
        tabs={[
          "Shift Plan",
          "Request Reason Type",
          "Flags Setting",
          "Attendance Penalty Rule",
          "General Attendance Settings",
          "Biometric Device Settings",
        ]}
      >
        <Tab.Panels
          className={`zt-themeTabPanels zt-employeeTabsPanel !bg-transparent !p-0 flex flex-col grow`}
        >
          <Tab.Panel className={"zt-themeTabPanel grow"}>
            <ShiftModule />
          </Tab.Panel>
          <Tab.Panel className={"zt-themeTabPanel grow"}>
            <ExemptionModule />
          </Tab.Panel>
          <Tab.Panel className={"zt-themeTabPanel grow"}>
            <FlagSetting />
          </Tab.Panel>
          <Tab.Panel className={"zt-themeTabPanel grow"}>
            <PenaltyModule />
          </Tab.Panel>
          <Tab.Panel className={"zt-themeTabPanel grow"}>
            <GeneralSettingModule />
          </Tab.Panel>
          <Tab.Panel className={"zt-themeTabPanel grow"}>
            <BiometricMachine />
          </Tab.Panel>
        </Tab.Panels>
      </Tabs>
    </section>
  );
}
