import { Spinner } from "../svg"

export default function Button({
    value, is_loading, children, variant, size, className, ...props
}) {
    props.disabled = props.disabled || is_loading
    return (
        <button className={`btn ${variant ? `btn-${variant}` : ''} ${size ? `btn-${size}` : ''} ${className}`} {...props}>
            {is_loading && <Spinner />}
            {!is_loading && (children || value)}
        </button>
    )
}

Button.defaultProps = {
    value: "Button",
}