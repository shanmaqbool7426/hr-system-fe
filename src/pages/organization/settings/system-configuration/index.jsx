import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'; 
import DisclosureComponent from "@/components/elements/Disclosure"; 
import { CheckBox, Table, ToggleCheck } from '@/components/elements';

export default function OrganizationSystemConfigurationSettingPage() {
    const { t } = useTranslation();
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const headings = [
        { title: t("S#"), col: "Sr", check: true },
        { title: t("Description"), col: "Description" },
        { title: t("Status"), col: "Status" },
    ]
    const rows = [
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"1"}
            />,
            Description: 'Calculates Break of Employees',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"2"}
            />,
            Description: 'Exclude Break Time From Working Hours',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"3"}
            />,
            Description: 'When Avail Break then ask for Reason',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"4"}
            />,
            Description: 'Employee Eligibility To Request Attendance After Specific Days',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"5"}
            />,
            Description: 'Employee Eligibility To Request Exemption After Specific Days',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"6"}
            />,
            Description: 'Employee Eligibility To Request Remote Work After Specific Days',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"7"}
            />,
            Description: 'No Of Attendance Request Per Month With Payroll Dates',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"8"}
            />,
            Description: 'Shift Hours For Company',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"9"}
            />,
            Description: 'Allow Remote Work For Company',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"10"}
            />,
            Description: 'Attendance Mark On Approval',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"11"}
            />,
            Description: 'Is Mark Attendance From Multiple Devices',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"12"}
            />,
            Description: 'Allow to Sign Back In',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"13"}
            />,
            Description: 'Validate Employee Shift On Leave',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"14"}
            />,
            Description: 'Allow Manual & Machine log',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"15"}
            />,
            Description: 'Show Additional Fields In Attendance Detail Report',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"16"}
            />,
            Description: 'Shift Request For Previous Dates',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
    ]
    const leaverows = [
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"1"}
            />,
            Description: 'Employee Eligibility To Request Compensation After Specific Days',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"2"}
            />,
            Description: 'Apply Leave/Absent Shift Wise',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"3"}
            />,
            Description: 'Check Payroll Creation when Compensation leave is requested',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
    ]
    const payrollrows = [
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"1"}
            />,
            Description: 'Include Absent Deduction In Tax Calculation',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"2"}
            />,
            Description: 'Absent Days amount Deduct From PF calculation',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"3"}
            />,
            Description: 'Employee Eligibility To Apply Advance Salary Request After Specific Month From Joining Date (Months)',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"4"}
            />,
            Description: 'Advance Salary Request Limit In Fiscal Year',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"5"}
            />,
            Description: 'Employee Eligibility To Apply Loan Request After Specific Month From Joining Date (Months)',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"6"}
            />,
            Description: 'Allow Employee To Apply Loan From PF',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"7"}
            />,
            Description: 'Is Auto Deduction Penalty Carry Forward',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"8"}
            />,
            Description: 'Add Tax Adjustment WTH Tax In Payroll Reports',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"9"}
            />,
            Description: 'Allow To Apply For Advance Salary Request After Specific Days From Payroll Start Date',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"10"}
            />,
            Description: 'Is Apply Multiple Penalties On Same Day',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"11"}
            />,
            Description: 'Is Apply Increment From Salary Change Date',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"12"}
            />,
            Description: 'Allow Employee To Avail Advance Salary Up To Percentage',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"13"}
            />,
            Description: 'Allow Employee To Avail Advance Salary Only For Present Days',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"14"}
            />,
            Description: 'Include Pre-Month Arrears In Pay slip',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"15"}
            />,
            Description: 'Include PF Withdrawal In Pay slip',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"16"}
            />,
            Description: 'Show Expected Pay slip On Dashboard',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"17"}
            />,
            Description: 'Enable Currency In Salary Setup',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"18"}
            />,
            Description: 'Limit No. of Loan Installments',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"19"}
            />,
            Description: 'Payroll Impact On Attendance Leave',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"20"}
            />,
            Description: 'Allow Prior Over Time',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"21"}
            />,
            Description: 'Include Allowance And Deduction In Estimated Salary',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"22"}
            />,
            Description: 'Include Reimbursement In Payslip',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
    ]
    const employeerows = [
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"1"}
            />,
            Description: 'Ask Employee Code When Finally Approve Employee Profile Request',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"2"}
            />,
            Description: 'Allow to Enter Employee Punch Code When Creating new Employee',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"3"}
            />,
            Description: 'Auto Generate Employee Code and Punch Code',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"4"}
            />,
            Description: 'Ask For Salary On Employee Creation',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"5"}
            />,
            Description: 'Ask For Schedule On Employee Creation',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"6"}
            />,
            Description: 'Employee Retirement Age',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"7"}
            />,
            Description: 'Transfer Performance Evaluation When Employee Reports To Change Via Employee Transfer Screen',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"8"}
            />,
            Description: 'Validate Employee For Re-Hiring Process',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"9"}
            />,
            Description: 'Validate DOB On Employee',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"10"}
            />,
            Description: 'Employee Code Limit',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"11"}
            />,
            Description: 'Validate Inactive Employee CNIC',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"12"}
            />,
            Description: 'Allow User To Change Password',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
    ]
    const dashboardrows = [
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"1"}
            />,
            Description: 'Show All Filters In Application',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"2"}
            />,
            Description: 'Show Dashboard Tile On the Basis Of Modules',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"3"}
            />,
            Description: 'Load Dashboard Default',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
    ]
    const Recruitmentrows = [
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"1"}
            />,
            Description: 'Allow Multiple Job Request Against Single Job Title',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
    ]
    const EmployeeSeparationrows = [
        {
            Sr: <CheckBox
                size={'sm'}
                variant={'dark'}
                id="night-shift"
                name={"night-shift"}
                label={"1"}
            />,
            Description: 'Is Leave Deduction On FnF',
            Status: <div className='flex justify-end'><ToggleCheck id="mobileAttendance"
                variant={'dark'}
                name="mobileAttendance"
            /></div>
        },
    ] 
    return (
        <section className="flex flex-col grow relative">
            {/* {is_loading && <PageLoader/>} */}
            <div className="flex justify-between pb-6">
                <div className="flex flex-col">
                    <h1 className="text-h4 mb-0">{t("Organization Settings")}</h1>
                </div>
            </div>
            <div className="zt-card">
                <div className="flex justify-between pb-6">
                    <h2 className="text-h4 mb-0">{t("System Configuration")}</h2>
                </div>
                <div className='flex flex-col gap-4'>
                    <DisclosureComponent disclosureTitle={'Attendance'} defaultOpen={true}>
                        <Table
                            headings={headings}
                            rows={rows}
                            sortCol={sortCol}
                            setSortCol={setSortCol}
                            sortDir={sortDir}
                            setSortDir={setSortDir}
                            perPage={perPage}
                            setPerPage={setPerPage}
                            page={page}
                            setPage={setPage}
                            className={'zt-employeeTable zt-organizationsTable'}
                        />
                    </DisclosureComponent>
                    <DisclosureComponent disclosureTitle={'Leave'} defaultOpen={false}>
                        <Table
                            headings={headings}
                            rows={leaverows}
                            sortCol={sortCol}
                            setSortCol={setSortCol}
                            sortDir={sortDir}
                            setSortDir={setSortDir}
                            perPage={perPage}
                            setPerPage={setPerPage}
                            page={page}
                            setPage={setPage}
                            className={'zt-employeeTable zt-organizationsTable'}
                        />
                    </DisclosureComponent>
                    <DisclosureComponent disclosureTitle={'Pay Roll'} defaultOpen={false}>
                        <Table
                            headings={headings}
                            rows={payrollrows}
                            sortCol={sortCol}
                            setSortCol={setSortCol}
                            sortDir={sortDir}
                            setSortDir={setSortDir}
                            perPage={perPage}
                            setPerPage={setPerPage}
                            page={page}
                            setPage={setPage}
                            className={'zt-employeeTable zt-organizationsTable'}
                        />
                    </DisclosureComponent>
                    <DisclosureComponent disclosureTitle={'Employee'} defaultOpen={false}>
                        <Table
                            headings={headings}
                            rows={employeerows}
                            sortCol={sortCol}
                            setSortCol={setSortCol}
                            sortDir={sortDir}
                            setSortDir={setSortDir}
                            perPage={perPage}
                            setPerPage={setPerPage}
                            page={page}
                            setPage={setPage}
                            className={'zt-employeeTable zt-organizationsTable'}
                        />
                    </DisclosureComponent>
                    <DisclosureComponent disclosureTitle={'Dashboard'} defaultOpen={false}>
                        <Table
                            headings={headings}
                            rows={dashboardrows}
                            sortCol={sortCol}
                            setSortCol={setSortCol}
                            sortDir={sortDir}
                            setSortDir={setSortDir}
                            perPage={perPage}
                            setPerPage={setPerPage}
                            page={page}
                            setPage={setPage}
                            className={'zt-employeeTable zt-organizationsTable'}
                        />
                    </DisclosureComponent>
                    <DisclosureComponent disclosureTitle={'Recruitment'} defaultOpen={false}>
                        <Table
                            headings={headings}
                            rows={Recruitmentrows}
                            sortCol={sortCol}
                            setSortCol={setSortCol}
                            sortDir={sortDir}
                            setSortDir={setSortDir}
                            perPage={perPage}
                            setPerPage={setPerPage}
                            page={page}
                            setPage={setPage}
                            className={'zt-employeeTable zt-organizationsTable'}
                        />
                    </DisclosureComponent>
                    <DisclosureComponent disclosureTitle={'Employee Separation'} defaultOpen={false}>
                        <Table
                            headings={headings}
                            rows={EmployeeSeparationrows}
                            sortCol={sortCol}
                            setSortCol={setSortCol}
                            sortDir={sortDir}
                            setSortDir={setSortDir}
                            perPage={perPage}
                            setPerPage={setPerPage}
                            page={page}
                            setPage={setPage}
                            className={'zt-employeeTable zt-organizationsTable'}
                        />
                    </DisclosureComponent>
                </div>
            </div>
        </section>
    )
}