import { Minus, Tick } from "../svg";

export default function ToggleCheck({ id, label, value, onChange, className, variant, size, ...props }) {
    delete props.type
    return (
        <div className={`zt-formGroup ${className}`}>
            {label && <span>{label}</span>}
            <div className={`zt-themeToggleCheck`}>
                <input id={id} type='checkbox' className="peer" checked={value} onChange={onChange} {...props} />
                <label htmlFor={id}>
                    <div className={`zt-${variant}`}></div>
                    <span className='zt-toggleDot'>
                        <span className={`zt-toggleActive zt-${variant}`}><Tick /></span>
                        <span className={`zt-toggleInactive`}><Minus /></span>
                    </span>

                </label>
            </div>
        </div>
    )
}