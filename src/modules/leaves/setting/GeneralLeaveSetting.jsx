// GeneralSettingModule.js
import React, { useState } from 'react';
import DisclosureComponent from "@/components/elements/Disclosure";
import { useTranslation } from "react-i18next";
import { Button, Input, SearchSelect } from '@/components/elements';

export default function GeneralLeaveSetting() {
    const { t } = useTranslation();
    const data = [
        { label: "Approval Level Type", placeholder: "Select One", value: "Complete" },
        { label: "Approval Type", placeholder: "Select One", value: "Complete" },
        { label: "Employee Type", placeholder: "Select One", value: "Complete" },
        { label: "Approval Type 1", placeholder: "Select One", value: "Complete" },
        { label: "Select Type", placeholder: "Select One", value: "Complete" },
        { label: "Approval Type 2", placeholder: "Select One", value: "Complete" },
    ]
    const Quotadata = [
        { label: "Leave Quota Start Date", placeholder: "January 01 (Default)", value: "Complete" },
        { label: "Month", placeholder: "Select One", value: "Jan" },
        { label: "Day", placeholder: "Select One", value: "Mon" },
    ]
    return (
        <div className="zt-card grow">
            <div className="flex justify-between pb-6">
                <h2 className="text-lg mb-0">{t("General Leave Settings")}</h2>
            </div>
            <div className='flex flex-col gap-2'>
                <DisclosureComponent disclosureTitle={'Compensation Leave Forwarding'} defaultOpen={true}>
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
                <DisclosureComponent disclosureTitle={'Leave Quota settings'} defaultOpen={false}>
                    <div className='grid grid-cols-2 gap-4'>
                        {Quotadata.map((ele, i) => (
                            <SearchSelect key={i}
                                list={[{ value: `${ele.value}`, display: `${ele.value}` },]}
                                label={`${ele.label}`}
                                placeholder={`${ele.placeholder}`}
                                containerClass="!gap-2"
                            />
                        ))}
                    </div>
                </DisclosureComponent>
                <DisclosureComponent disclosureTitle={'Compensation Leave settings'} defaultOpen={false}>
                    <Input containerClass={'w-1/2'} placeholder='0.00' label={'Hours  For Full Day'} />
                </DisclosureComponent>
                <DisclosureComponent disclosureTitle={'Station Leave settings'} defaultOpen={false}>
                    <SearchSelect
                        list={[{ value: `No`, display: `No` },]}
                        label={`Allow Station Leave`}
                        placeholder={`No`}
                        containerClass="!gap-2 w-1/2"
                    />
                </DisclosureComponent>
                <DisclosureComponent disclosureTitle={'Leave Report settings'} defaultOpen={false}>
                    <SearchSelect
                        list={[{ value: `No`, display: `No` },]}
                        label={`Show Signatures`}
                        placeholder={`No`}
                        containerClass="!gap-2 w-1/2"
                    />
                </DisclosureComponent>
                <div className='flex gap-5 self-end '>
                    <Button className={'btn btn-dark-outline'}>{t("Cancel")}</Button>
                    <Button className={'btn btn-dark'}>{t("Save")}</Button>
                </div>
            </div>
        </div>
    );
}
