import React from 'react'

export default function Radio({ id, onChange, name, className, type, label, variant, size, disabled, ...props }) {

  return (
    <div className={`zt-themeRadio select-none ${variant ? `zt-${variant}` : ''} ${size ? `zt-${size}` : ''} ${className}`}>
      <input id={id} name={name} onChange={onChange} type="radio" {...props} disabled={disabled} />
      <label htmlFor={id}><span>{label}</span></label>
    </div>
  )
}

Radio.defaultProps = {
  className: ""
}