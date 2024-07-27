import { ChevronLeft, EmailIcon, PhoneIcon } from "@/components/svg";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";

export default function OnboardingDetail() {
    const { t } = useTranslation()

    return (
        <section className="flex flex-col gap-6 grow">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex gap-4">
                <Link href={'/employees/onboarding'}><ChevronLeft width={10} /></Link>
                <h1 className="text-h4 mb-0">{t("Onboarding")}</h1>
            </div>
            <div className="flex justify-between gap-6">
                <div className="w-1/2 zt-card">
                    <h2 className="text-h5">{t("Welcome Alex M.")}</h2>
                    <div className="flex gap-6 items-center">
                        <figure className="shrink-0">
                            <Image className="rounded-full" src={'/assets/images/users/user-01.jpg'} height={150} width={150} alt="profile"/>
                        </figure>
                        <div>
                            <h3 className="text-h6 font-bold mb-1">{t("Alex M.")}</h3>
                            <p className="mb-0">{t("Designer")}</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="mb-2 text-h4 border-b w-max border-black">{t("Personal Details ")}</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <PhoneIcon/>
                            <EmailIcon/>
                            
                        </div>
                    </div>
                </div>
                <div className="w-1/2 zt-card">

                </div>
            </div>
        </section>
    )
}
