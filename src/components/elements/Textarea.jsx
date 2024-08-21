import { InputErrorInfo } from "../svg"

export default function Textarea({ id, label, error, containerClass, className, ...props }) {

    return (
        <div className={`zt-formGroup ${containerClass}`}>
            {label && <label className="dark:text-themeGrayscale300" htmlFor={id}>
                {label} {props?.required && <sup className="text-[1.25rem] text-themeDanger">*</sup>}
            </label>}
            <textarea
                id={id}
                className={`border dark:bg-gray-700 dark:border-gray-700 border-gray-400 text-gray-900 w-full py-3 px-4 resize-none rounded-md ${error ? "zt-error" : ""} ${className}`}
                {...props}
            />
            {error && <span className="zt-errorMessage">
                <InputErrorInfo />
                {error}
            </span>}
        </div>
    )
}

Textarea.defaultProps = {
    placeholder: "Type Here",
    type: "text",
    className: ""
}