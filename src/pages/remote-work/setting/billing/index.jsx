import { useState } from "react";
import { useTranslation } from "next-i18next";
import { Button } from "@/components/elements";
import CreatePaymentMethodForm from "@/components/forms/remoteWork/createPaymentMethod";
import PaymentMethods from "@/modules/remoteWork/setting/billing/PaymentMethods";
import PaymentContact from "@/modules/remoteWork/setting/billing/PaymentContact";

export default function Billing() {
    const { t } = useTranslation()
    const [create, setCreate] = useState(false)
    return (
        <section className="flex flex-col grow">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex justify-between pb-6">
                <h1 className="text-h4 mb-0">{t("Billing")}</h1>
                <Button onClick={() => setCreate(true)} className={"btn btn-primary"}>{t("Add payment method")}</Button>
            </div>
            <div className="flex gap-6 grow">
                <PaymentMethods />
                <PaymentContact />
            </div>
            {create &&
                <CreatePaymentMethodForm onClose={() => setCreate(false)} />
            }
        </section>
    )
}