import { Datepicker, SearchSelect } from '@/components/elements';
import React from 'react'
import { useTranslation } from 'react-i18next';

export const RepostModule = () => {
    const { t } = useTranslation();

    return (
        <div className='grid grid-cols-2 gap-4'>
            <SearchSelect
                list={["Pakistan", "India", "China"]}
                label={`Country`}
                placeholder={`Select One`}
                containerClass="!gap-2"
            />
            <SearchSelect
                list={["Pakistan", "India", "China"]}
                label={`Province`}
                placeholder={`Select One`}
                containerClass="!gap-2"
            />
            <SearchSelect
                list={["Lahore", "Karachi", "Vehari"]}
                label={`City`}
                placeholder={`Select One`}
                containerClass="!gap-2"
            />
            <SearchSelect
                list={["Lahore", "Karachi", "Vehari"]}
                label={`Area`}
                placeholder={`Select One`}
                containerClass="!gap-2"
            />
            <SearchSelect
                list={["Lahore", "Karachi", "Vehari"]}
                label={`Vendor`}
                placeholder={`Select One`}
                containerClass="!gap-2"
            />
            <SearchSelect
                list={["Lahore", "Karachi", "Vehari"]}
                label={`Station`}
                placeholder={`Select One`}
                containerClass="!gap-2"
            />
            <SearchSelect
                list={["Lahore", "Karachi", "Vehari"]}
                label={`Department`}
                placeholder={`Select One`}
                containerClass="!gap-2"
            />
            <SearchSelect
                list={["Lahore", "Karachi", "Vehari"]}
                label={`Sub Department`}
                placeholder={`Select One`}
                containerClass="!gap-2"
            />
            <SearchSelect
                list={["Lahore", "Karachi", "Vehari"]}
                label={`Employee Group`}
                placeholder={`Select One`}
                containerClass="!gap-2"
            />
            <SearchSelect
                list={["Lahore", "Karachi", "Vehari"]}
                label={`Employee`}
                placeholder={`Select One`}
                containerClass="!gap-2"
            />
            <Datepicker
                name={'startingDate'}
                label={t('From Date')}
                minDate={new Date}
                required
            />
            <Datepicker
                name={'endDate'}
                label={t('End Date')}
                minDate={new Date}
                required
            />
        </div>
    )
}
