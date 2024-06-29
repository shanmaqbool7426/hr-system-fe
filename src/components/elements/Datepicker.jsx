import { useState } from 'react';
import DatePicker from "react-date-picker"
import { InputErrorInfo, Calendar, CloseCross } from "@/components/svg"

export default function Datepicker({ containerClass, label, className, value, onChange, error, ...props }) {
    const DateValue = value ? new Date(value) : null
    return (
        <div className={`zt-formGroup ${containerClass && containerClass}`}>
            {label && <label className="dark:text-themeGrayscale300" htmlFor={props?.id}>
                {label} {props?.required && <sup className="text-[1.25rem] text-themeDanger">*</sup>}
            </label>}
            <DatePicker
                defaultValue={new Date}
                format={"MM/dd/yyyy"}
                dayPlaceholder='DD'
                monthPlaceholder='MM'
                yearPlaceholder='YYYY'
                className={`zt-themeInput zt-dateTimePicker${error ? " zt-error" : ""} ${className}`}
                onChange={onChange}
                value={DateValue}
                calendarIcon={Calendar}
                clearIcon={CloseCross}
                {...props} />
            {error && <span className="zt-errorMessage">
                <InputErrorInfo /> {error}
            </span>}
        </div>
    );
}