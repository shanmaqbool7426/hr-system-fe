import { Button } from "@/components/elements";
import CreateMealMenuForm from "@/components/forms/meal/create-meal-menu";
import MealListing from "@/modules/meal/MealListing";
import MealPreview from "@/modules/meal/MealPreview";
import { useTranslation } from "next-i18next";
import { useState } from "react";

export default function MealMenu() {
    const { t } = useTranslation()
    const [create, setCreate] = useState(false)
    return (
        <section className="flex flex-col grow">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex justify-between pb-6">
                <h1 className="text-h4 mb-0">{t("Meal Menu")}</h1>
            </div>
            <div className="grow flex flex-col lg:flex-row gap-6">
                <MealListing />
                <MealPreview />
            </div>
            {create && <CreateMealMenuForm onClose={() => { setCreate(false) }} />}
        </section>
    )
}