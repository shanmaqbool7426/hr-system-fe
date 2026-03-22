import { CheckBox, Input, SearchSelect, Select } from '@/components/elements';
import Image from 'next/legacy/image';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';

const AccountDetail = () => {
    const { t } = useTranslation();
    const [imagePreview, setImagePreview] = useState('/assets/images/users/user-01.jpg');
    const [selectedDays, setSelectedDays] = useState([]);

    const daysOfWeek = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

    const handleDayChange = (day) => {
        setSelectedDays((prevSelectedDays) =>
            prevSelectedDays.includes(day)
                ? prevSelectedDays.filter((d) => d !== day)
                : [...prevSelectedDays, day]
        );
    };
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='zt-card w-3/4 flex justify-between gap-6 shrink-0'>
            <div className='flex flex-col gap-6 w-full'>
                <div className='zt-card !bg-themeGrayscale100 flex flex-col gap-3'>
                    <h2 className='text-h4 mb-0'>{t("Account details")}</h2>
                    <Input label={'Company name'} placeholder={process.env.NEXT_PUBLIC_APP || 'HR Portal'} />
                    <Input label={'Owner'} placeholder='shujat' />
                    <SearchSelect list={[{ display: "Pakistan", value: "Pakistan" }, { display: "India", value: "India" }]} label={'Country'} />
                    <SearchSelect list={[{ display: "Software development", value: "Software development" }, { display: "Art", value: "Art" }]} label={'Industry'} />
                    <div className='flex gap-6'>
                        <div className='flex flex-col'>
                            <strong>{t("Created on")}</strong>
                            <span>{t("July 10, 2024")}</span>
                        </div>
                        <div className='flex flex-col'>
                            <strong>{t("Last update")}</strong>
                            <span>{t("July 10, 2024")}</span>
                        </div>
                    </div>
                </div>
                <div className='zt-card !bg-themeGrayscale100 flex flex-col gap-3'>
                    <h2 className='text-h4 mb-0'>{t("Geo")}</h2>
                    <SearchSelect label={'Timezone'} list={[{ display: "Pakistan", value: "Pakistan" }, { display: "India", value: "India" }]} />
                    <SearchSelect label={'Time format'} list={[{ display: "12h", value: "12h" }, { display: "24h", value: "24h" }]} />
                    <Input label={'Default hourly rate'} placeholder='0' />
                </div>
                <div className='zt-card !bg-themeGrayscale100 flex flex-col gap-3'>
                    <h2 className='text-h4 mb-0'>{t("Projects currency")}</h2>
                    <span className='text-sm'>{t("Currency used for costs, hourly rates, and budgets in the Projects section.")}</span>
                    <SearchSelect label={'Currency'} list={[{ display: "Pakistani rupees", value: "Pakistani rupees" }, { display: "Indian rupees", value: "Indian rupees" }]} />
                </div>
            </div>
            <div className='flex flex-col gap-6 w-full'>
                <div className='zt-card !bg-themeGrayscale100 flex flex-col gap-3'>
                    <h2 className='text-h4 mb-0'>{t("Working days")}</h2>
                    <span>{t("Select days")}</span>
                    <div className="flex flex-wrap gap-2">
                        {daysOfWeek.map((day) => (
                            <div key={day}>
                                <input
                                    type="checkbox"
                                    id={day}
                                    name="days"
                                    value={day}
                                    className="hidden"
                                    checked={selectedDays.includes(day)}
                                    onChange={() => handleDayChange(day)}
                                />
                                <label
                                    htmlFor={day}
                                    className={`cursor-pointer h-10 w-10 flex justify-center items-center border rounded-full transition transform hover:scale-105 ${selectedDays.includes(day) ? 'bg-themePrimary text-white' : 'bg-gray-200'
                                        }`}
                                >
                                    {day}
                                </label>
                            </div>
                        ))}
                    </div>
                    <Select label='Work starts' options={['9:00 AM', '10:00 AM']} placeholder='9:00 AM' />
                    <Select label='Work ends' options={['9:00 AM', '10:00 AM']} placeholder='9:00 AM' />
                    <Select label='Minimum hours' options={['9h 0m', '10h 0m']} placeholder='9:00 AM' />
                    <CheckBox label='Flexible working hours' id={'hours'} />
                </div>
                <div className='zt-card !bg-themeGrayscale100 flex flex-col gap-3'>
                    <h2 className='text-h4 mb-0'>{t("Tracking days")}</h2>
                    <span>{t("Select days")}</span>
                    <div className="flex flex-wrap gap-2">
                        {daysOfWeek.map((day) => (
                            <div key={day}>
                                <input
                                    type="checkbox"
                                    id={day}
                                    name="days"
                                    value={day}
                                    className="hidden"
                                    checked={selectedDays.includes(day)}
                                    onChange={() => handleDayChange(day)}
                                />
                                <label
                                    htmlFor={day}
                                    className={`cursor-pointer h-10 w-10 flex justify-center items-center border rounded-full transition transform hover:scale-105 ${selectedDays.includes(day) ? 'bg-themePrimary text-white' : 'bg-gray-200'
                                        }`}
                                >
                                    {day}
                                </label>
                            </div>
                        ))}
                    </div>
                    <Select label='Tracking starts' options={['9:00 AM', '10:00 AM']} placeholder='9:00 AM' />
                    <Select label='Tracking ends' options={['9:00 AM', '10:00 AM']} placeholder='9:00 AM' />
                </div>
            </div>
        </div>
    );
};

export default AccountDetail;
