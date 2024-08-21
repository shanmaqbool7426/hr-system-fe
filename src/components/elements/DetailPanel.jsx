import { useTranslation } from "react-i18next"


export default function DetailPanel({ children }) {
    const { t } = useTranslation()

    return (
        <div className="zt-backDropSidePanel">
            <div className="zt-sidePanel relative px-4">
            {children}
            </div>
        </div>
    )
}
