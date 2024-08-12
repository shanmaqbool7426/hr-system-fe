import { SearchSelect, ToggleCheck } from "@/components/elements";
import RemoteProfile from "@/modules/employee/remoteWorkCards";
import { useTranslation } from "next-i18next";
import { useState } from "react";

export default function Accounts() {
    const { t } = useTranslation()
    const [remoteEmployess, setRemoteEmployess] = useState(false)
    console.log(remoteEmployess, "remoteEmployess");

    return (
        <section className="flex flex-col grow">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex justify-between pb-6">
                <div className="flex flex-col">
                    <h1 className="text-h4 mb-0">{t("Collective")}</h1>
                    <p className="mb-0">{t("Changing the setting here will affect all remote employee settings, including those for remote teams.")}</p>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="zt-employeeCard gap-6">
                    <div className="flex gap-6 items-center">
                        <span>{t("Aplicable on all remote employees")}</span>
                        <ToggleCheck name='remoteEmployess' onChange={() => { setRemoteEmployess(!remoteEmployess) }} id={'aplicable'} />
                    </div>
                    {!remoteEmployess &&
                        <div className="flex items-center gap-6">
                            <span>{t("Aplicable on selected remote teams")}</span>
                            <SearchSelect containerClass='w-72' name='remoteTeams' placeholder={'Remote Teams'} list={[{ display: "Accounting", value: "Accounting" }, { display: "Management", value: "Management" }]} />
                        </div>}
                </div>
                <RemoteProfile />
            </div>

            {/* <div className="flex  gap-6 grow">
                <AccountDetail />
                <AccountSetting />
            </div> */}
        </section>
    )
}