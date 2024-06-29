import { useState } from "react";
import { EmployeeIcon, SearchIcon } from "../svg";
import { useTranslation } from "next-i18next";
export default function SearchInput({
    customIcon, value, onChange, label,className, ...props
}) {
    const { t } = useTranslation()
    return (
        <div className={`zt-formGroup ${className}`}>
               {label && <label className="dark:text-themeGrayscale300" htmlFor={props?.id}>
                {label} {props?.required && <sup className="text-[1.25rem] text-themeDanger">*</sup>}
            </label>}
            <div className="relative">
                <input name='search' value={value} onChange={onChange} type='search' className="zt-themeInput !pl-11" {...props} />
                <div className="absolute top-0 left-0 w-11 h-full flex items-center justify-center dark:text-themeGrayscale300">
                  {customIcon? <EmployeeIcon/>:
                    <SearchIcon />
                  }
                </div>
            </div>
        </div>
    )
}