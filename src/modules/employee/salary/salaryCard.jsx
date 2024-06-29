import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux';

export default function SalaryCard() {
    const { t } = useTranslation()
    const { is_loading, employee_details } = useSelector((state) => state.employee)

    return (
        <div className='zt-employeeCard'>
            <div className='zt--employeeCardHead'>
                <h3>{t('Salary Information')}</h3>
            </div>

            <ul className='zt--employeeCardBody'>
                <li>
                    <span>{t("Basic Salary")}</span>
                    <strong>{employee_details?.salaryDetails?.basicSalary || '------'}</strong>
                </li>
                <li>
                    <span>{t("Medical Allowance")}</span>
                    <strong>{employee_details?.salaryDetails?.medicalAllowance || '------'}</strong>
                </li>
                <li>
                    <span>{t("House Allowance")}</span>
                    <strong>{employee_details?.salaryDetails?.houseAllowance || '------'}</strong>
                </li>
                <li>
                    <span>{t("Mobile Allowance")}</span>
                    <strong>{employee_details?.salaryDetails?.mobileAllowance || '------'}</strong>
                </li>
                <li>
                    <span>{t("Fuel Allowance")}</span>
                    <strong>{employee_details?.salaryDetails?.fuelAllowance || '------'}</strong>
                </li>
                <li>
                    <span>{t("Gross Salary")}</span>
                    <strong>{employee_details?.salaryDetails?.grossSalary || '------'}</strong>
                </li>
            </ul>
        </div>
    )
}