import { useTranslation } from 'react-i18next'
import { Tabs } from '@/components/elements'
import { ChevronLeft } from '@/components/svg'
import InfoModule from '@/modules/employee/employeeInfo'
import ProjectsModule from '@/modules/employee/projects'
import SalaryModule from '@/modules/employee/salary'
import DocumentsModule from '@/modules/employee/documents'
import AssetsModule from '@/modules/employee/assets'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { FetchEmployeeDetails } from '@/store/actions/employee.actions'
import PageLoader from '@/components/elements/PageLoader'
import EmployeeProfile from '@/modules/employee/employeeInfo/profile'
import RemoteWorkModule from '@/modules/employee/remoteWork'
import WarningsModule from '@/modules/employee/warnings'

export default function EmployeeDetailPage() {
    const { t } = useTranslation()
    const router = useRouter()
    const dispatch = useDispatch()
    const { is_loading, employee_details,  employee_projects } = useSelector((state) => state.employee)
    useEffect(() => {
        console.log('first', employee_projects)
        const employeeId = router.query.employeeId
        if (employeeId) {
            dispatch(FetchEmployeeDetails(employeeId))
        }
    }, [router, dispatch])

    const employeeId = router.query.employeeId;

    return (
        <section className="flex flex-col grow">
            {is_loading && <PageLoader />}
            <h1 className="text-h4 mb-6 flex items-center justify-start gap-3">
                <Link href={`/employees/list`}><ChevronLeft className={'text-themeGrayscale600'} width={10} /></Link>
                <span className='shrink-0'>{t("Employee Detail")}</span>
            </h1>
            {employee_details &&
                <>
                    <div className='zt-employeeCard zt-employeeInfoCard mb-12 relative'>
                        <EmployeeProfile employeeId={employeeId} />
                    </div>
                    <Tabs
                        containerClasses={'zt-themeTabsV2 grow'}
                        tabNavClasses={'zt-themeTabNav'}
                        tabPanelClasses={'zt-employeeTabsPanel !bg-transparent !p-0'}
                        tabs={["Employee Info", "Projects", "Salary", "Documents", "Assets",'Remote Work', 'Warnings']}
                        panels={
                            [InfoModule, ProjectsModule, SalaryModule, DocumentsModule, AssetsModule,RemoteWorkModule,WarningsModule]
                        }
                    />
                    <DocumentsModule/>
                    <ProjectsModule/>
                </>}
        </section>
    )
}