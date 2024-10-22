import React from 'react'
import { useTranslation } from 'next-i18next'

export const EmployeePayslip = () => {
    const { t } = useTranslation()

    return (
        <div className={`zt-card flex flex-col justify-between`}>
            <div>
                <h2 className="font-bold text-lg mb-4">{t("Employee Payslip")}</h2>
                <hr className="dark:border-gray-700 mb-4" />
            </div>
            <div className="flex flex-col gap-2">
                {["June", "May", "April", "March", "February"].map((ele, i) => (
                    <div key={i} className="bg-themeGrayscale50 dark:bg-gray-700 rounded p-3 flex justify-between">
                        <div className="flex flex-col">
                            <h3 className="text-xs mb-0 font-semibold">{ele}</h3>
                            <span className="text-xs text-themeGrayscale500 dark:text-white ">2024</span>
                        </div>
                        <button className="text-themePurple bg-themePurple/10 dark:bg-themePurple dark:text-white rounded-md px-2 py-1 text-xs font-medium">View Payslip</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
