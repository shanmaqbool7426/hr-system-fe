import { useTranslation } from "next-i18next";
import { Button, CheckBox, Datepicker, DisplayDate, SearchSelect, Table, Textarea } from '@/components/elements';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  FetchChangeRequests } from '@/store/actions/employee-change-request.actions';
import { FetchEmployees } from '@/store/actions/employee.actions';
import ChangeDesignationForm from '@/components/forms/employees/changeRequest/ChangeDesignation';
import { FetchCustomfields } from '@/store/actions/customfield.actions';

export default function DesignationPage() {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const [sortCol, setSortCol] = useState(null)
	const [sortDir, setSortDir] = useState(null)
	const [page, setPage] = useState(1)
	const [change, setChange] = useState(false)
	const [perPage, setPerPage] = useState(10)
	const {change_request_list, employees_list} = useSelector(state => state.employee)
	const { customfield_list } = useSelector(state => state.customfield)
	const currentDesignationRef = useRef(null)
	const [selectedEmployee, setSelectedEmployee] = useState(null);

	useEffect(() => {
		if (employees_list.length === 0)
			dispatch(FetchEmployees())
		dispatch(FetchChangeRequests())
	}, [dispatch])

	useEffect(() => {
        if (selectedEmployee && currentDesignationRef.current) {
            const employee = employees_list.find(emp => emp._id === selectedEmployee);
            if (employee) {
                currentDesignationRef.current.value = employee.designation?.name || "";
            } else {
                currentDesignationRef.current.value = "";
            }
        }
    }, [selectedEmployee, employees_list]);
	
	const pagination = {
		totalRecords: 5,
		showPerPage: true,
		prevAction: () => page > 1 && setPage(page - 1),
		clickAction: (value) => setPage(value),
		nextAction: () => setPage(page + 1),
	}
	const headings = [
		
		{ title: t("Employee"), col: "Employee" },
		{ title: t("Current Designation"), col: "CurrentDesignation" },
		{ title: t("New Designation"), col: "NewDesignation", },
		{ title: t("Effective Date"), col: "EffectiveDate" },
		{ title: t("Reason Of Designation Change"), col: "ReasonOfDesignationChange", },
		{ title: t("Details"), col: "Details", },
	]
	const rows = change_request_list
	.filter(request => request.type === 'designation')
	.map(request => ({
		Employee: `${request?.employee?.firstName} ${request?.employee?.lastName}`, 
		CurrentDesignation: request.currentDesignation, 
		NewDesignation: request.designation?.name, 
		EffectiveDate:  <DisplayDate date={request.effectiveDate}/>  , 
		ReasonOfDesignationChange: request.reason,
		Details: request.detail || '-', 
	}));
	
	
	return (
		<section className="flex flex-col grow">
			<div className="flex justify-between pb-6">
				<h1 className="text-h4 mb-0">{t("Change Designation Request")}</h1>
				<Button onClick={() => setChange(true)} className={"btn btn-primary"}>{t("Change Designation Request")}</Button>
			</div>
			<div className='zt-card grow'>
				<Table
					//   allChecked={allChecked}
					//   handleCheckAll={handleCheckAll}
					headings={headings}
					rows={rows}
					sortCol={sortCol}
					setSortCol={setSortCol}
					sortDir={sortDir}
					pagination={pagination}
					setSortDir={setSortDir}
					perPage={perPage}
					setPerPage={setPerPage}
					page={page}
					setPage={setPage}
					className={'zt-employeeTable zt-changeShiftTable'}
				/>
			</div>
			
			{change &&
				<ChangeDesignationForm onClose={()=>setChange(false)}/>
			}
		</section>
	)
}
