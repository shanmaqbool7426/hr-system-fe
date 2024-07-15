import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CreateBiometricDevice from "@/components/forms/attendance/createBiometricDevice";
import { Button, Tabs } from "@/components/elements";
import AttendanceBiometricSettings from "@/modules/attendance/BiometricSetting";
export default function AttendanceBiometricSettingPage() {
    const { t } = useTranslation();
    const [add, setAdd] = useState(false)

    return (
        <section className="flex flex-col grow relative">
            <div className="flex justify-between pb-6">
                <h1 className="text-h4 mb-0">{t("Biometric Settings")}</h1>
                <Button className={"btn btn-primary"} onClick={() => setAdd(true)}>{t("Add New Device")}</Button>
            </div>
            <AttendanceBiometricSettings />
            {add && <CreateBiometricDevice
                onClose={() => { setAdd(false) }}
            />} 
        </section>
    );
}
