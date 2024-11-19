import { useTranslation } from 'next-i18next';
import Toast from '@/util/toast';
import axios from '@/util/axios';
import { useDispatch, useSelector } from 'react-redux';

import { Button, CheckBox, DetailPanel, DisplayDate, Profile, SearchSelect } from '@/components/elements';
import { useEffect, useState } from 'react';
import { MdOutlineMail as EmailIcon } from "react-icons/md";
import { LiaBirthdayCakeSolid as BirthdayIcon } from "react-icons/lia";
import { BsLaptop as LaptopIcon } from "react-icons/bs";
import { MdOutlinePhoneInTalk as PhoneIcon } from "react-icons/md";
import { UpdateEmployee } from '@/store/actions/employee.actions';
import { GetOnboardingEmployees } from '@/store/actions/onboarding-offboarding.actions';



export default function CreateOnboardingForm({ onClose, employee }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { onboarding_tasks, onboarding_assets } = useSelector((state) => state.onboardingoffboarding)
    const { customfield_list } = useSelector((state) => state.customfield)
    const onboarding = customfield_list.find((item) => item.type === "employee_status" && item.name === "On Boarding")
    const [filled, setFilled] = useState(null)
    useEffect(() => {
        if (employee) {
            axios.get(`/onboarding-offboarding/process/onboarding/${employee._id}`)
                .then(data => {
                    setFilled(data.process)
                })
        }
    }, [])

    const statusChangeHandler = (value) => {
        axios.patch(`/onboarding-offboarding/process/onboarding/update/${filled._id}`, { employeeStatus: value })
            .then(data => {
                setFilled(data.process)
                Toast.success(t("Status updated"))
            })
    }

    const contactData = [
        {
            icon: <PhoneIcon className={'text-primary dark:text-white w-6 h-6'} />,
            label: t("Contact"),
            value: employee?.phone || "------"
        },
        {
            icon: <EmailIcon className={'text-primary dark:text-white w-6 h-6'} />,
            label: t("Email"),
            value: employee?.email || "------"
        },
        {
            icon: <BirthdayIcon className={'text-primary dark:text-white w-6 h-6'} />,
            label: t("Date of Birth"),
            value: employee?.dob ? <DisplayDate date={employee.dob} /> : "------"
        },
        {
            icon: <LaptopIcon className={'text-primary dark:text-white w-6 h-6'} />,
            label: t("Work Mode"),
            value: employee?.workMode || "------"
        },
    ]

    const taskCompletedHandler = (id) => {
        if (filled?.completedTasks.includes(id)) Toast.warning(t("Already Completed"))
        else {
            axios.patch(`/onboarding-offboarding/process/onboarding/update/${filled._id}`, { completedTasks: [...filled?.completedTasks, id] })
                .then(data => {
                    setFilled(data.process)
                    Toast.success(t("Marked as completed"))
                })
        }
    }

    const completeHandler = () => {
        axios.post(`/onboarding-offboarding/process/onboarding/complete/${filled._id}`)
            .then(data => {
                Toast.success(t("Onboarding Completed"))
                dispatch(GetOnboardingEmployees())
                onClose()
            })
    }

    return (
        <DetailPanel onClose={onClose} className={'max-w-4xl'}>
            <h3 className='mb-4 text-left'>{t("Onboarding Process")}</h3>
            <section className='flex flex-col gap-4 justify-between h-full'>
                <article className='grid grid-cols-2 gap-4'>
                    <div>
                        <div className="flex gap-6 items-center mb-3">
                            <Profile
                                image={employee?.avatar}
                                className={'w-24 h-24'}
                                nameClass={'text-5xl'}
                                name={employee.firstName + " " + employee.lastName}
                                designation={employee?.designation?.name}
                                department={employee?.department?.name}
                            />
                            <div>
                                <h3 className="text-h4 font-bold mb-0 text-left">{employee.firstName + " " + employee.lastName}</h3>
                                <p className="mb-0 text-left" title={t("Designation")}>{employee?.designation?.name || "------"}</p>
                                <h4 className='text-left text-h6 mb-0' title={t("Department")}>{employee?.department?.name || "------"}</h4>
                            </div>
                        </div>

                        <h4 className="text-left">{t("Personal Details ")}</h4>
                        <div className="grid grid-cols-2 gap-2 mb-6">
                            {contactData.map((ele, i) => (
                                <div key={i} className='border border-gray-300 dark:border-gray-600 p-2 rounded-lg space-y-2'>
                                    <h3 className='text-base text-left leading-none mb-0 flex items-center gap-x-2'>
                                        {ele.icon}
                                        {ele.label}
                                    </h3>
                                    <div className='text-left leading-none'>{ele.value}</div>
                                </div>
                            ))}
                        </div>
                        <SearchSelect
                            label={t("Employee Status")}
                            name={`status`}
                            value={filled?.employeeStatus || employee.status?._id}
                            list={customfield_list.filter((item) => item.type === "employee_status").map((item) => ({ display: item.name, value: item._id }))}
                            onChange={statusChangeHandler}
                        />

                        <div className='flex flex-col gap-4 mt-4'>
                            <h4 className='text-left'>{t("Onboarding Assets")}</h4>
                            {onboarding_assets.length > 0 ? onboarding_assets.map((ele, i) => (
                                <div key={i} className='flex justify-between items-center'>
                                    <h2 className='text-h5 mb-0'>{ele?.assetType?.name}</h2>
                                    <SearchSelect name={`asset-${i}`} value={null} placeholder={ele.placeholder} list={[]} />
                                </div>
                            )) : <div className='text-left'>{t("No Data Found")}</div>}
                        </div>
                    </div>

                    <div >
                        <h4 className='text-left'>{t("Onboarding Tasks")}</h4>
                        <div className='flex flex-col gap-4'>
                            {onboarding_tasks.length > 0 ? onboarding_tasks.filter(item => item.active).sort((a, b) => a.name.localeCompare(b.name)).map((item, i) => (
                                <div key={i} className='flex items-center justify-between gap-4 border dark:border-gray-600 p-3 rounded-lg'>
                                    <span className='font-bold'>{item.name}</span>
                                    <CheckBox id={i}
                                        checked={filled?.completedTasks.includes(item._id)}
                                        onChange={() => {
                                            taskCompletedHandler(item._id)
                                        }}
                                    />
                                </div>
                            )) : <div className='text-left'>{t("No Data Found")}</div>}
                        </div>
                    </div>
                </article>
                <div className="flex gap-4">
                    <Button type="button" value={t("Cancel")} className={"w-full"} onClick={onClose} />
                    <Button type="button" value={t("Mark as Completed")} className={"w-full btn-success"} disabled={filled?.employeeStatus === onboarding?._id} onClick={completeHandler} />
                </div>
            </section>
        </DetailPanel>
    )
}
