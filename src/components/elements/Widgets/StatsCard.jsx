export default function StatsCard({ title, description, icon, variant = 'primary', descClass = '', iconClass = '', hideDescription = false }) {
    return <div className={`zt-stats-card variant-${variant}`}>
        <h4 className='title'>{title || '-----'}</h4>
        {!hideDescription && <p className={`desc ${descClass}`}>{description || '-----'}</p>}
        <span className="zt-side-icon-placeholder" />
        {icon && <span className={`zt-side-icon ${iconClass}`}>{icon}</span>}
    </div>
}
