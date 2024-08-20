import React from 'react'
import { Tick } from '../svg'

export default function CheckBox({ id, onChange, name, className, labelClass, type, label, variant, size, disabled, iconClass, ...props }) {

  return (
    <div className={`zt-check-box select-none ${variant ? `zt-${variant}` : ''} ${size ? `zt-${size}` : ''} ${className}`}>
      <input id={id} onChange={onChange} type="checkbox" {...props} disabled={disabled} />
      <label htmlFor={id}>
        <Tick className={iconClass} />
        <span className={`${labelClass}`}>{label}</span>
      </label>
    </div>
  )
}

CheckBox.defaultProps = {
  className: ""
}