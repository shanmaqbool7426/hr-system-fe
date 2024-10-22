import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { ChevronLeft } from '@/components/svg'
import PageLoader from '@/components/elements/PageLoader'
import EmployeeProfile from '@/modules/employee/employeeInfo/profile'
import AssetDetailCard from '@/modules/employee/assets/AssetDetailCard'

export default function AssetDetail () {
    const { t } = useTranslation()
    const router = useRouter()
    const { is_loading, employee_details } = useSelector((state) => state.employee)

    return (
        <section className="flex flex-col grow">
            {is_loading && <PageLoader />}
            <h1 className="text-h4 mb-6 flex items-center justify-start gap-3">
                <Link href={`/employees/list`}><ChevronLeft className={'text-themeGrayscale600'} width={10} /></Link>
                <span className='shrink-0'>{t("Employee Detail")}</span>
            </h1>

            <div className='zt-employeeCard zt-employeeInfoCard mb-6 relative'>
                <EmployeeProfile />
            </div>

            <AssetDetailCard />
        </section>
    )
}
