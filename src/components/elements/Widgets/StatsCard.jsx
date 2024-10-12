export default function StatsCard({ title, description, icon, variant = 'primary' }) {
    return <div className={`zt-stats-card variant-${variant}`}>
        <h4>{title || '-----'}</h4>
        <p>{description || '-----'}</p>
        <span className="zt-side-icon-placeholder" />
        <span className="zt-side-icon">{icon}</span>
    </div>
}
