import { Activity } from '@/modules/employee/dashboard/Activity';
import { EmployeePerformance } from '@/modules/employee/dashboard/EmployeePerformance';
import { OnGoingProjects } from '@/modules/employee/dashboard/OnGoingProjects';
import { Profile } from '@/modules/employee/dashboard/Profile';
import { Staticts } from '@/modules/employee/dashboard/Staticts';
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function EmployeeDashboardPage() {
	const { t } = useTranslation();

	return (
		<section className="flex flex-col grow">
			{/* {is_loading && <PageLoader/>} */}
			<div className="flex flex-col pb-6">
				<h1 className="text-h4 mb-0 text-themeBlue">{t("Welcome Back, Darlee")}</h1>
			</div>
			<div className="flex flex-col-reverse 2xl:block">
				<div className="w-full 2xl:w-9/12 flex flex-col gap-6 2xl:float-left">
					<Profile />
					<Staticts/>
					<EmployeePerformance/>
					<OnGoingProjects/>
				</div>
				<aside className='zt-activitySidebar'>
					<Activity />
				</aside>
			</div>
		</section>
	)
}