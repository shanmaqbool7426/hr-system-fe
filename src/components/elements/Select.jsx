
export default function Select({
    className, onChnage, value, options, ...props
}) {

    return (
        <div htmlFor="" className="relative">
            {props?.label && <span className="text-lg"> {props?.label || ""} {props?.required && <sup className="text-red-600">*</sup>}</span>}

            <select value={value} onChange={onChnage} className={`border border-gray-400 text-gray-900 w-full py-3 px-4 rounded-md ${className}`} {...props}>
                {
                    options.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                    ))
                }
            </select>
        </div>
    )
}

Select.defaultProps = {
    options: [],
    className: ""
}