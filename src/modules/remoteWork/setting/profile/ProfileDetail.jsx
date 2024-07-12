import { CheckBox, Input, SearchSelect, Select } from '@/components/elements';
import Image from 'next/legacy/image';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ProfileDetail = () => {
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
                    <h2 className='text-h4 mb-0'>{t("Personal details")}</h2>
                    <div className='flex gap-4 items-center'>
                        <figure className='relative remote__image'>
                            <Image src={imagePreview} height={100} width={100} className='rounded-full' />
                            <label htmlFor="upload" className='absolute cursor-pointer hidden remote_image_label h-full w-full left-0 top-0 bg-white/25 text-white'>
                                <input type="file" id="upload" className='hidden' onChange={handleImageUpload} />
                                <span>{t("Upload Photo")}</span>
                            </label>
                        </figure>
                        <Input containerClass={'grow'} label={'Name, Surname'} placeholder='John' />
                    </div>
                    <Input label={'User ID'} placeholder='26872824' />
                    <Input label={'Email'} placeholder='John@gmail.com' />
                    <SearchSelect list={[{ display: "Team", value: "Team" }, { display: "Without Team", value: "Without Team" }]} label={'Team'} />
                    <Input label={'Role'} placeholder='Owner' />
                    <Input label={'Phone'} placeholder='+59874' />
                </div>
                <div className='zt-card !bg-themeGrayscale100 flex flex-col gap-3'>
                    <h2 className='text-h4 mb-0'>{t("Geo")}</h2>
                    <Input label={'Timezone'} placeholder='Asia/Karachi' />
                    <Input label={'Time format'} placeholder='12' />
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

export default ProfileDetail;
