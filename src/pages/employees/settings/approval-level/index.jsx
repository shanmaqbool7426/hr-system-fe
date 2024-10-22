import { SearchSelect } from '@/components/elements';
import DisclosureComponent from '@/components/elements/Disclosure';
import React from 'react'
import { useTranslation } from 'next-i18next';

export default function EmployeeSettingPage() {
	const { t } = useTranslation();
	const data = [
		{ label: "Approval Level Type", placeholder: "Select One", value: "Complete" },
		{ label: "Approval Type", placeholder: "Select One", value: "Complete" },
		{ label: "Select Type", placeholder: "Select One", value: "Complete" },
		{ label: "Approval Type 1", placeholder: "Select One", value: "Complete" },
		{ label: "Select Type", placeholder: "Select One", value: "Complete" },
		{ label: "Approval Type 2", placeholder: "Select One", value: "Complete" },
		{ label: "Select Type", placeholder: "Select One", value: "Complete" },
		{ label: "Employee", placeholder: "Select One", value: "Complete" },
	]
	return (
		<section className="flex flex-col grow">
			{/* {is_loading && <PageLoader/>} */}
			<div className="flex flex-col pb-6">
				<h1 className="text-h4 mb-0">{t("Employee Setting")}</h1>
				{/* <p className="mb-0">{t("Manage your employee settings")}</p> */}
			</div>
			<div className="zt-card flex flex-col gap-2 grow">
				<DisclosureComponent disclosureTitle={'Employee Profile Request'} defaultOpen={true}>
					<div className='grid grid-cols-2 gap-4'>
						{data.map((ele, i) => (
							<SearchSelect key={i}
								list={[{ value: `${ele.value}`, display: `${ele.value}` },]}
								label={`${ele.label}`}
								placeholder={`${ele.placeholder}`}
								containerClass="!gap-2"
							/>
						))}
					</div>
				</DisclosureComponent>
				<DisclosureComponent disclosureTitle={'Employee Transfer Request'} defaultOpen={false}>
					<div className='grid grid-cols-2 gap-4'>
						{data.map((ele, i) => (
							<SearchSelect key={i}
								list={[{ value: `${ele.value}`, display: `${ele.value}` },]}
								label={`${ele.label}`}
								placeholder={`${ele.placeholder}`}
								containerClass="!gap-2"
							/>
						))}
					</div>
				</DisclosureComponent>
				<DisclosureComponent disclosureTitle={'Employee Info Request'} defaultOpen={false}>
					<div className='grid grid-cols-2 gap-4'>
						{data.map((ele, i) => (
							<SearchSelect key={i}
								list={[{ value: `${ele.value}`, display: `${ele.value}` },]}
								label={`${ele.label}`}
								placeholder={`${ele.placeholder}`}
								containerClass="!gap-2"
							/>
						))}
					</div>
				</DisclosureComponent>
				<DisclosureComponent disclosureTitle={'Employee Resignation Request'} defaultOpen={false}>
					<div className='grid grid-cols-2 gap-4'>
						{data.map((ele, i) => (
							<SearchSelect key={i}
								list={[{ value: `${ele.value}`, display: `${ele.value}` },]}
								label={`${ele.label}`}
								placeholder={`${ele.placeholder}`}
								containerClass="!gap-2"
							/>
						))}
					</div>
				</DisclosureComponent>
				<DisclosureComponent disclosureTitle={'Delegation Request Setting'} defaultOpen={false}>
					<div className='grid grid-cols-2 gap-4'>
						{data.map((ele, i) => (
							<SearchSelect key={i}
								list={[{ value: `${ele.value}`, display: `${ele.value}` },]}
								label={`${ele.label}`}
								placeholder={`${ele.placeholder}`}
								containerClass="!gap-2"
							/>
						))}
					</div>
				</DisclosureComponent>
				<DisclosureComponent disclosureTitle={'Employee Transition Request'} defaultOpen={false}>
					<div className='grid grid-cols-2 gap-4'>
						{data.map((ele, i) => (
							<SearchSelect key={i}
								list={[{ value: `${ele.value}`, display: `${ele.value}` },]}
								label={`${ele.label}`}
								placeholder={`${ele.placeholder}`}
								containerClass="!gap-2"
							/>
						))}
					</div>
				</DisclosureComponent>
			</div>
		</section>
	)
}