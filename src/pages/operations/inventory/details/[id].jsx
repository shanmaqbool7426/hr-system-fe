import AssetDetailCard from '@/modules/employee/assets/AssetDetailCard'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function InventoryDetailPage() {
    const { t } = useTranslation()

    return (
        <section className="flex flex-col grow">
            <div className="flex justify-between pb-6">
                <div className="flex flex-col">
                    <h1 className="text-h4 mb-0">{t("Asset Detail Page")}</h1>
                    <p className="mb-0">{t("View your Asset complete detail here")}</p>
                </div>
            </div>
            <AssetDetailCard />
        </section>
    )
}