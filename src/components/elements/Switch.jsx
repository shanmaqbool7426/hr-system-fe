import { Minus, Tick } from "../svg";

export default function Switch({ id, label, checked, onChange, className, variant, size, left = false, ...props }) {
    delete props.type
    if (!id) {
        id = label
    }
    return (
        <div className={`zt-formGroup ${className}`}>
            <div className={`zt-themeToggleCheck`}>
                <input id={id} type='checkbox' className="peer" checked={checked} onChange={onChange} {...props} />
                <label htmlFor={id} className={`dark:text-white flex items-center ${left ? "flex-row-reverse" : ""}`}>
                    <div className="relative">
                        <div className={`zt-${variant}`}></div>
                        <span className='zt-toggleDot'>
                            <span className={`zt-toggleActive zt-${variant}`}><Tick /></span>
                            <span className={`zt-toggleInactive`}><Minus /></span>
                        </span>
                    </div>
                    {label && <span className="">{label}</span>}
                </label>
            </div>
        </div>
    )
}