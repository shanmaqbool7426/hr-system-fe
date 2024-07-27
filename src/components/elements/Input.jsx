import { useState } from "react";
import { EyeOn, EyeOff, InputErrorInfo } from "../svg";
export default function Input({ name, formik, className, containerClass, type, label, ...props }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={`zt-formGroup ${containerClass}`}>
            {label && <label className="dark:text-themeGrayscale300" htmlFor={props?.id}>
                {label} {props?.required && <sup className="text-[1.25rem] text-themeDanger">*</sup>}
            </label>}

            {type === "password" ? (
                <div className="relative ">
                    <input
                        name={name}
                        onBlur={formik?.handleBlur}
                        onInput={formik?.handleBlur}
                        className={`zt-themeInput ${formik?.touched[name] && formik.errors[props.name] ? " zt-error" : ""} ${className}`}
                        type={showPassword ? "text" : type}
                        onChange={(e) => { props.onChange ? props.onChange(e) : formik?.handleChange(e) }}
                        {...props}
                    />
                    <span className={`cursor-pointer absolute right-4 h-5 w-5 ${props?.label ? "top-10" : "top-3.5"}`}>
                        {showPassword ?
                            <span className="text-inherit" onClick={() => setShowPassword(false)}><EyeOff /></span>
                            :
                            <span className="text-inherit" onClick={() => setShowPassword(true)}><EyeOn /></span>
                        }
                    </span>
                </div>
            ) : (
                <input
                    name={name}
                    onBlur={formik?.handleBlur}
                    onInput={formik?.handleBlur}
                    className={`zt-themeInput ${formik?.touched[name] && formik?.errors[name] ? " zt-error" : ""}${className}`}
                    type={type}
                    onChange={(e) => { props.onChange ? props.onChange(e) : formik?.handleChange(e) }}
                    {...props}
                />
            )}

            {formik?.touched[name] && formik?.errors[name] && <span className="zt-errorMessage">
                <InputErrorInfo />
                {formik?.errors[name]}
            </span>}
        </div>
    )
}

Input.defaultProps = {
    placeholder: "Type Here",
    type: "text",
    className: "",
    id: (new Date).getTime()
}