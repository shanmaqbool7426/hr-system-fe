import React, { useState } from 'react';
import TimeKeeper from 'react-timekeeper';

export default function TimePicker({
    label,
    value,
    onChange,
    className,
    disabled
}) {

    if (!value) value = '12:30'

    const [time, setTime] = useState((new Date(value)).formatted24)
    const [showClock, setShowClock] = useState(false)
    return (
        <div className='relative zt-formGroup'>
            {label && <label className='dark:text-themeGrayscale300'>{label}</label>}
            <input
                disabled={disabled}
                onClick={() => setShowClock(true)}
                className={`zt-themeInput ${className}`}
                readOnly
                value={value}
                type={"text"}
            />
            {showClock && <TimeKeeper
                hour24Mode
                coarseMinutes={1}
                time={time}
                switchToMinuteOnHourSelect={true}
                closeOnMinuteSelect={true}
                onDoneClick={() => setShowClock(false)}
                onChange={(data) => {
                    onChange(data.formatted24)
                    setTime(data.formatted24)
                }}
            />}
        </div>
    )
}