import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const StatusDropdown = ({ item, options }) => {
    const [status, setStatus] = useState(item?.status || (options[0] && options[0].value) || '');
    const { t } = useTranslation();

    const handleChange = (e) => {
        setStatus(e.target.value);
    };

    return (
        <select
            className={`zt-tag ${options.find(opt => opt.value === status)?.className || 'zt-tag-default'}`}
            value={status}
            onChange={handleChange}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value} className={option.className}>
                    {t(option.label)}
                </option>
            ))}
        </select>
    );
};

export default StatusSelect;
