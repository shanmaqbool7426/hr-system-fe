import React from 'react'

const ProgressBar = ({ title, containerClasses, titleBarClasses, progressClasses, progressBarClasses, variant, percentage, statics }) => {
  return (
    <div className={`${containerClasses}`}>
      <p className={`${titleBarClasses}`}><strong>{title}</strong><span>{statics ? statics : percentage}</span></p>
      <div className={`zt-progress ${progressClasses}`}>
        <div className={`zt-progressBar ${progressBarClasses} zt-${variant}`} style={{ width: `${percentage}` }}></div>
      </div>
    </div>
  )
}

ProgressBar.defaultProps = {
  title: "Progress"
}

export default ProgressBar