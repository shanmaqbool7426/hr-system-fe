import { IoCloseSharp } from "react-icons/io5";

export default function DetailPanel({ children, onClose }) {

    return (
        <div className="zt-backDropSidePanel relative">
            {onClose && <IoCloseSharp className="absolute right-4 top-4 dark:text-themeGrayscale300 w-5 h-5  z-10 cursor-pointer" onClick={onClose} />}
            <div className="zt-sidePanel relative px-4 overflow-y-auto">
                {children}
            </div>
        </div>
    )
}
